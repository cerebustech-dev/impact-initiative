import { Reading, ReadingType } from "@/data/curriculum";

const typeBadgeColors: Record<ReadingType, string> = {
  article: "bg-blue-50 text-blue-700",
  paper: "bg-purple-50 text-purple-700",
  essay: "bg-emerald-50 text-emerald-700",
  lecture: "bg-rose-50 text-rose-700",
  book: "bg-amber-50 text-amber-700",
};

const typeBadgeLabels: Record<ReadingType, string> = {
  article: "Article",
  paper: "Paper",
  essay: "Essay",
  lecture: "Lecture",
  book: "Book",
};

interface ReadingCardProps {
  reading: Reading;
}

export default function ReadingCard({ reading }: ReadingCardProps) {
  return (
    <a
      href={reading.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white rounded-xl p-6 shadow-sm shadow-card-shadow hover:shadow-md hover:shadow-card-shadow hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h4 className="font-serif text-lg font-semibold text-slate-heading group-hover:text-amber transition-colors">
            {reading.title}
          </h4>
          <p className="text-sm text-slate-muted mt-1">{reading.author}</p>
        </div>
        <span
          className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${typeBadgeColors[reading.type]}`}
        >
          {typeBadgeLabels[reading.type]}
        </span>
      </div>
      <p className="mt-3 text-sm text-slate-body leading-relaxed">
        {reading.summary}
      </p>
      <div className="mt-4 text-sm text-amber font-medium group-hover:underline underline-offset-2">
        Read this &rarr;
      </div>
    </a>
  );
}
