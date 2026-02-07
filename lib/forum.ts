import { db } from "@/lib/db";
import { threads, posts, users } from "@/db/schema";
import { eq, desc, asc, sql, count } from "drizzle-orm";

function displayName(name: string | null, email: string | null): string {
  return name || email?.split("@")[0] || "Unknown";
}

export async function getThreadsByMonth(monthId: string) {
  const rows = await db
    .select({
      id: threads.id,
      title: threads.title,
      monthId: threads.monthId,
      isPinned: threads.isPinned,
      createdAt: threads.createdAt,
      updatedAt: threads.updatedAt,
      authorName: users.name,
      authorEmail: users.email,
      replyCount: sql<number>`(
        SELECT COUNT(*) FROM posts WHERE posts.thread_id = ${threads.id}
      )`,
    })
    .from(threads)
    .leftJoin(users, eq(threads.authorId, users.id))
    .where(eq(threads.monthId, monthId))
    .orderBy(desc(threads.isPinned), desc(threads.updatedAt));

  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    monthId: r.monthId,
    isPinned: r.isPinned,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
    displayName: displayName(r.authorName, r.authorEmail),
    replyCount: r.replyCount,
  }));
}

export async function getThread(threadId: string) {
  const [row] = await db
    .select({
      id: threads.id,
      title: threads.title,
      body: threads.body,
      monthId: threads.monthId,
      isPinned: threads.isPinned,
      createdAt: threads.createdAt,
      updatedAt: threads.updatedAt,
      authorId: threads.authorId,
      authorName: users.name,
      authorEmail: users.email,
    })
    .from(threads)
    .leftJoin(users, eq(threads.authorId, users.id))
    .where(eq(threads.id, threadId))
    .limit(1);

  if (!row) return null;

  return {
    id: row.id,
    title: row.title,
    body: row.body,
    monthId: row.monthId,
    isPinned: row.isPinned,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    authorId: row.authorId,
    displayName: displayName(row.authorName, row.authorEmail),
  };
}

export async function getPostsByThread(threadId: string) {
  const rows = await db
    .select({
      id: posts.id,
      body: posts.body,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
      authorId: posts.authorId,
      authorName: users.name,
      authorEmail: users.email,
    })
    .from(posts)
    .leftJoin(users, eq(posts.authorId, users.id))
    .where(eq(posts.threadId, threadId))
    .orderBy(asc(posts.createdAt));

  return rows.map((r) => ({
    id: r.id,
    body: r.body,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
    authorId: r.authorId,
    displayName: displayName(r.authorName, r.authorEmail),
  }));
}

export async function getMonthStats() {
  const rows = await db
    .select({
      monthId: threads.monthId,
      threadCount: count(threads.id),
      latestActivity: sql<number>`MAX(${threads.updatedAt})`,
    })
    .from(threads)
    .groupBy(threads.monthId);

  const stats: Record<
    string,
    { threadCount: number; latestActivity: Date | null }
  > = {};

  for (const row of rows) {
    stats[row.monthId] = {
      threadCount: row.threadCount,
      latestActivity: row.latestActivity
        ? new Date(row.latestActivity)
        : null,
    };
  }

  return stats;
}
