import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import ReadingCard from "@/components/ReadingCard";
import { MONTHS } from "@/data/curriculum";
import { isMonthUnlocked } from "@/lib/dates";

export const revalidate = 3600;

export default function Home() {
  // Find the latest unlocked month
  const unlockedMonths = MONTHS.filter(isMonthUnlocked);
  const currentMonth = unlockedMonths[unlockedMonths.length - 1];

  return (
    <>
      <HeroSection />

      {/* Program overview */}
      <section className="py-16 bg-white/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-serif font-bold text-amber">6</div>
              <div className="mt-1 text-sm text-slate-muted font-medium uppercase tracking-wider">
                Months
              </div>
              <p className="mt-2 text-slate-body text-sm">
                From foundations to the future of leadership
              </p>
            </div>
            <div>
              <div className="text-3xl font-serif font-bold text-amber">14+</div>
              <div className="mt-1 text-sm text-slate-muted font-medium uppercase tracking-wider">
                Readings
              </div>
              <p className="mt-2 text-slate-body text-sm">
                Essays, papers, lectures, and books from leading thinkers
              </p>
            </div>
            <div>
              <div className="text-3xl font-serif font-bold text-amber">1</div>
              <div className="mt-1 text-sm text-slate-muted font-medium uppercase tracking-wider">
                Goal
              </div>
              <p className="mt-2 text-slate-body text-sm">
                Build your AI leadership voice and bring it to your team
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current month preview */}
      {currentMonth && (
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-sm font-semibold text-amber uppercase tracking-wider">
                Now Reading
              </span>
              <span className="text-slate-muted text-sm">
                Month {currentMonth.number}
              </span>
            </div>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold">
              {currentMonth.title}
            </h2>
            <p className="text-slate-muted text-lg italic mt-1">
              {currentMonth.subtitle}
            </p>
            <p className="mt-4 text-slate-body leading-relaxed max-w-3xl">
              {currentMonth.description}
            </p>

            {currentMonth.readings.length > 0 && (
              <div className="mt-6 space-y-4">
                {currentMonth.readings.map((reading) => (
                  <ReadingCard key={reading.id} reading={reading} />
                ))}
              </div>
            )}

            <div className="mt-8">
              <Link
                href="/curriculum"
                className="text-amber font-semibold hover:underline underline-offset-2"
              >
                View full curriculum &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
