import type { Metadata } from "next";
import MonthSection from "@/components/MonthSection";
import MonthTimeline from "@/components/MonthTimeline";
import { MONTHS, PROGRAM_CONFIG } from "@/data/curriculum";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Curriculum | The Impact Initiative",
  description: `The full 6-month reading list for ${PROGRAM_CONFIG.title}.`,
};

export default function CurriculumPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold">Curriculum</h1>
        <p className="mt-4 text-lg text-slate-body max-w-2xl leading-relaxed">
          Six months of carefully curated readings that build on each other —
          from understanding the AI landscape to leading your team through it.
          New months unlock as the program progresses.
        </p>
      </div>

      <div className="mt-12 max-w-5xl mx-auto px-6">
        <div className="lg:grid lg:grid-cols-[180px_1fr] lg:gap-12">
          <MonthTimeline months={MONTHS} />

          <div className="space-y-16">
            {MONTHS.map((month) => (
              <MonthSection key={month.id} month={month} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
