import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MONTHS } from "@/data/curriculum";
import { isMonthUnlocked } from "@/lib/dates";
import NewThreadForm from "@/components/discuss/NewThreadForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "New Topic | The Impact Initiative",
  robots: { index: false, follow: false },
};

interface PageProps {
  params: Promise<{ monthId: string }>;
}

export default async function NewThreadPage({ params }: PageProps) {
  const { monthId } = await params;
  const month = MONTHS.find((m) => m.id === monthId);
  if (!month || !isMonthUnlocked(month)) notFound();

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-2xl mx-auto px-6">
        <Link
          href={`/discuss/${monthId}`}
          className="text-sm text-amber font-medium hover:underline underline-offset-2"
        >
          &larr; Month {month.number}: {month.title}
        </Link>

        <h1 className="mt-4 text-2xl md:text-3xl font-bold">New Topic</h1>
        <p className="mt-2 text-slate-muted">
          Start a new discussion in{" "}
          <span className="font-medium text-slate-body">{month.title}</span>
        </p>

        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm shadow-card-shadow">
          <NewThreadForm monthId={monthId} />
        </div>
      </div>
    </div>
  );
}
