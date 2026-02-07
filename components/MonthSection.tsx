import { Month } from "@/data/curriculum";
import { isMonthUnlocked, getUnlockMonthName } from "@/lib/dates";
import ReadingCard from "./ReadingCard";
import SlideLink from "./SlideLink";
import ComingSoonBadge from "./ComingSoonBadge";

interface MonthSectionProps {
  month: Month;
}

export default function MonthSection({ month }: MonthSectionProps) {
  const unlocked = isMonthUnlocked(month);

  return (
    <section
      id={month.id}
      className={`scroll-mt-24 ${!unlocked ? "opacity-50" : ""}`}
    >
      <div className="flex items-baseline gap-4 flex-wrap">
        <span className="text-sm font-semibold text-amber uppercase tracking-wider">
          Month {month.number}
        </span>
        {!unlocked && <ComingSoonBadge monthName={getUnlockMonthName(month)} />}
      </div>

      <h2 className="mt-2 text-2xl md:text-3xl font-bold">{month.title}</h2>
      <p className="text-slate-muted text-lg italic mt-1">{month.subtitle}</p>

      {unlocked && (
        <>
          <p className="mt-4 text-slate-body leading-relaxed max-w-3xl">
            {month.description}
          </p>

          {month.readings.length > 0 && (
            <div className="mt-6 space-y-4">
              {month.readings.map((reading) => (
                <ReadingCard key={reading.id} reading={reading} />
              ))}
            </div>
          )}

          {month.readings.length === 0 && (
            <p className="mt-6 text-slate-muted italic">
              No assigned readings this month — we&apos;ll bring the conversation ourselves.
            </p>
          )}

          {month.slides && month.slides.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {month.slides.map((slide, i) => (
                <SlideLink key={i} slide={slide} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
