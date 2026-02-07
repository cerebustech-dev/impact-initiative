import type { Metadata } from "next";
import { MONTHS } from "@/data/curriculum";
import { getMonthStats } from "@/lib/forum";
import CategoryCard from "@/components/discuss/CategoryCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Discussion | The Impact Initiative",
  robots: { index: false, follow: false },
};

export default async function DiscussPage() {
  const stats = await getMonthStats();

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold">Discussion</h1>
        <p className="mt-4 text-lg text-slate-body max-w-2xl leading-relaxed">
          Share your thoughts, debate the readings, and learn from your cohort.
          Pick a month to join the conversation.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {MONTHS.map((month) => {
            const monthStats = stats[month.id];
            return (
              <CategoryCard
                key={month.id}
                month={month}
                threadCount={monthStats?.threadCount ?? 0}
                latestActivity={monthStats?.latestActivity ?? null}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
