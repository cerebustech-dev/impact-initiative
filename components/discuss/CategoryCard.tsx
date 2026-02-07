import Link from "next/link";
import { Month } from "@/data/curriculum";
import { isMonthUnlocked, getUnlockMonthName } from "@/lib/dates";
import { timeAgo } from "@/lib/format";
import ComingSoonBadge from "@/components/ComingSoonBadge";

interface CategoryCardProps {
  month: Month;
  threadCount: number;
  latestActivity: Date | null;
}

export default function CategoryCard({
  month,
  threadCount,
  latestActivity,
}: CategoryCardProps) {
  const unlocked = isMonthUnlocked(month);

  if (!unlocked) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm shadow-card-shadow opacity-50">
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="text-sm font-semibold text-amber uppercase tracking-wider">
            Month {month.number}
          </span>
          <ComingSoonBadge monthName={getUnlockMonthName(month)} />
        </div>
        <h3 className="mt-2 text-lg font-bold">{month.title}</h3>
        <p className="text-sm text-slate-muted italic mt-1">{month.subtitle}</p>
      </div>
    );
  }

  return (
    <Link
      href={`/discuss/${month.id}`}
      className="group block bg-white rounded-xl p-6 shadow-sm shadow-card-shadow hover:shadow-md hover:shadow-card-shadow hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="flex items-baseline gap-3">
        <span className="text-sm font-semibold text-amber uppercase tracking-wider">
          Month {month.number}
        </span>
      </div>
      <h3 className="mt-2 text-lg font-bold group-hover:text-amber transition-colors">
        {month.title}
      </h3>
      <p className="text-sm text-slate-muted italic mt-1">{month.subtitle}</p>
      <div className="mt-4 flex items-center gap-4 text-xs text-slate-muted">
        <span>
          {threadCount} {threadCount === 1 ? "thread" : "threads"}
        </span>
        {latestActivity && <span>Last activity {timeAgo(latestActivity)}</span>}
      </div>
    </Link>
  );
}
