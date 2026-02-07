import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MONTHS } from "@/data/curriculum";
import { isMonthUnlocked } from "@/lib/dates";
import { getThreadsByMonth } from "@/lib/forum";
import ThreadListItem from "@/components/discuss/ThreadListItem";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Discussion | The Impact Initiative",
  robots: { index: false, follow: false },
};

interface PageProps {
  params: Promise<{ monthId: string }>;
}

export default async function MonthThreadsPage({ params }: PageProps) {
  const { monthId } = await params;
  const month = MONTHS.find((m) => m.id === monthId);
  if (!month) notFound();

  const unlocked = isMonthUnlocked(month);
  if (!unlocked) notFound();

  const threadRows = await getThreadsByMonth(monthId);

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <Link
          href="/discuss"
          className="text-sm text-amber font-medium hover:underline underline-offset-2"
        >
          &larr; All months
        </Link>

        <div className="mt-4 flex items-baseline gap-3 flex-wrap">
          <span className="text-sm font-semibold text-amber uppercase tracking-wider">
            Month {month.number}
          </span>
        </div>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold">{month.title}</h1>
        <p className="text-slate-muted text-lg italic mt-1">{month.subtitle}</p>

        <div className="mt-8 flex items-center justify-between">
          <span className="text-sm text-slate-muted">
            {threadRows.length} {threadRows.length === 1 ? "thread" : "threads"}
          </span>
          <Link
            href={`/discuss/${monthId}/new`}
            className="inline-flex items-center px-5 py-2.5 bg-amber text-white font-semibold rounded-xl hover:bg-amber-dark transition-colors shadow-lg shadow-amber/20 text-sm"
          >
            New Topic
          </Link>
        </div>

        {threadRows.length === 0 ? (
          <div className="mt-8 text-center py-12 bg-white rounded-xl shadow-sm shadow-card-shadow">
            <p className="text-slate-muted">No threads yet. Start the conversation!</p>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {threadRows.map((t) => (
              <ThreadListItem
                key={t.id}
                id={t.id}
                monthId={monthId}
                title={t.title}
                displayName={t.displayName}
                isPinned={t.isPinned}
                replyCount={t.replyCount}
                updatedAt={t.updatedAt}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
