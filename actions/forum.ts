"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { threads, posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { MONTHS } from "@/data/curriculum";
import { isMonthUnlocked } from "@/lib/dates";

async function requireAuth(): Promise<{ id: string; email: string | null | undefined }> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  return { id: session.user.id, email: session.user.email };
}

function requireAdmin(email: string | null | undefined) {
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  if (!adminEmail || email?.toLowerCase() !== adminEmail) {
    throw new Error("Forbidden");
  }
}

function validateMonth(monthId: string) {
  const month = MONTHS.find((m) => m.id === monthId);
  if (!month || !isMonthUnlocked(month)) {
    throw new Error("This month is locked or does not exist.");
  }
  return month;
}

export async function createThread(formData: FormData) {
  const user = await requireAuth();
  const monthId = formData.get("monthId") as string;
  const title = (formData.get("title") as string)?.trim();
  const body = (formData.get("body") as string)?.trim();

  if (!title || !body) {
    return { error: "Title and body are required." };
  }
  if (title.length > 200) {
    return { error: "Title must be 200 characters or fewer." };
  }
  if (body.length > 20_000) {
    return { error: "Body is too long (max 20,000 characters)." };
  }

  validateMonth(monthId);

  const [thread] = await db
    .insert(threads)
    .values({
      monthId,
      title,
      body,
      authorId: user.id,
    })
    .returning({ id: threads.id });

  redirect(`/discuss/${monthId}/${thread.id}`);
}

export async function createPost(formData: FormData) {
  const user = await requireAuth();
  const threadId = formData.get("threadId") as string;
  const monthId = formData.get("monthId") as string;
  const body = (formData.get("body") as string)?.trim();

  if (!body) {
    return { error: "Reply cannot be empty." };
  }
  if (body.length > 20_000) {
    return { error: "Reply is too long (max 20,000 characters)." };
  }

  validateMonth(monthId);

  // Verify thread belongs to the claimed month
  const [thread] = await db
    .select({ monthId: threads.monthId })
    .from(threads)
    .where(eq(threads.id, threadId))
    .limit(1);

  if (!thread || thread.monthId !== monthId) {
    return { error: "Thread not found." };
  }

  // Insert reply
  await db.insert(posts).values({
    threadId,
    body,
    authorId: user.id,
  });

  // Bump thread's updatedAt
  await db
    .update(threads)
    .set({ updatedAt: new Date() })
    .where(eq(threads.id, threadId));

  redirect(`/discuss/${monthId}/${threadId}`);
}

export async function deleteThread(threadId: string, monthId: string) {
  const user = await requireAuth();
  requireAdmin(user.email);

  await db.delete(threads).where(eq(threads.id, threadId));

  redirect(`/discuss/${monthId}`);
}

export async function deletePost(postId: string, monthId: string, threadId: string) {
  const user = await requireAuth();
  requireAdmin(user.email);

  await db.delete(posts).where(eq(posts.id, postId));

  redirect(`/discuss/${monthId}/${threadId}`);
}

export async function togglePin(threadId: string, monthId: string) {
  const user = await requireAuth();
  requireAdmin(user.email);

  const [thread] = await db
    .select({ isPinned: threads.isPinned })
    .from(threads)
    .where(eq(threads.id, threadId))
    .limit(1);

  if (!thread) throw new Error("Thread not found");

  await db
    .update(threads)
    .set({ isPinned: !thread.isPinned })
    .where(eq(threads.id, threadId));

  redirect(`/discuss/${monthId}/${threadId}`);
}
