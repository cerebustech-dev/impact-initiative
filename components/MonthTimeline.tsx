import { Month } from "@/data/curriculum";
import { isMonthUnlocked } from "@/lib/dates";

interface MonthTimelineProps {
  months: Month[];
}

export default function MonthTimeline({ months }: MonthTimelineProps) {
  return (
    <nav className="hidden lg:block sticky top-24 self-start">
      <div className="relative pl-6">
        {/* Vertical line */}
        <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-cream-dark" />

        <ul className="space-y-4">
          {months.map((month) => {
            const unlocked = isMonthUnlocked(month);
            return (
              <li key={month.id}>
                <a
                  href={`#${month.id}`}
                  className={`group flex items-center gap-3 text-sm transition-colors ${
                    unlocked
                      ? "text-slate-body hover:text-amber"
                      : "text-slate-muted"
                  }`}
                >
                  {/* Dot */}
                  <span
                    className={`absolute left-[5px] w-2.5 h-2.5 rounded-full border-2 ${
                      unlocked
                        ? "bg-amber border-amber"
                        : "bg-cream border-slate-muted"
                    }`}
                  />
                  <span className="font-medium">
                    {month.number}. {month.title}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
