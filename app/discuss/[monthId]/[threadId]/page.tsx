import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MONTHS } from "@/data/curriculum";
import { isMonthUnlocked } from "@/lib/dates";
import { getThread, getPostsByThread } from "@/lib/forum";
import { auth } from "@/lib/auth";
import PostCard from "@/components/discuss/PostCard";
import ReplyForm from "@/components/discuss/ReplyForm";
import AdminActions from "@/components/discuss/AdminActions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Discussion | The Impact Initiative",
  robots: { index: false, follow: false },
};

interface PageProps {
  params: Promise<{ monthId: string; threadId: string }>;
}

export default async function ThreadPage({ params }: PageProps) {
  const { monthId, threadId } = await params;

  const month = MONTHS.find((m) => m.id === monthId);
  if (!month || !isMonthUnlocked(month)) notFound();

  const thread = await getThread(threadId);
  if (!thread || thread.monthId !== monthId) notFound();

  const replies = await getPostsByThread(threadId);
  const session = await auth();
  const isAdmin =
    session?.user?.email?.toLowerCase() ===
    process.env.ADMIN_EMAIL?.toLowerCase();

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <Link
          href={`/discuss/${monthId}`}
          className="text-sm text-amber font-medium hover:underline underline-offset-2"
        >
          &larr; Month {month.number}: {month.title}
        </Link>

        <h1 className="mt-4 text-2xl md:text-3xl font-bold">{thread.title}</h1>

        {/* Original post */}
        <div className="mt-6">
          <PostCard
            id={thread.id}
            body={thread.body}
            displayName={thread.displayName}
            authorId={thread.authorId}
            createdAt={thread.createdAt}
            isOriginalPost
            adminActions={
              isAdmin ? (
                <AdminActions
                  threadId={thread.id}
                  monthId={monthId}
                  isPinned={thread.isPinned}
                />
              ) : undefined
            }
          />
        </div>

        {/* Replies */}
        {replies.length > 0 && (
          <div className="mt-6 space-y-4">
            <h2 className="text-sm font-semibold text-slate-muted uppercase tracking-wider">
              {replies.length} {replies.length === 1 ? "Reply" : "Replies"}
            </h2>
            {replies.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                body={post.body}
                displayName={post.displayName}
                authorId={post.authorId}
                createdAt={post.createdAt}
                adminActions={
                  isAdmin ? (
                    <AdminActions postId={post.id} monthId={monthId} threadId={thread.id} />
                  ) : undefined
                }
              />
            ))}
          </div>
        )}

        {/* Reply form */}
        <div className="mt-8">
          <h2 className="text-sm font-semibold text-slate-muted uppercase tracking-wider mb-3">
            Reply
          </h2>
          <ReplyForm threadId={threadId} monthId={monthId} />
        </div>
      </div>
    </div>
  );
}
