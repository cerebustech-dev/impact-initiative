import type { ReactNode } from "react";

interface PostCardProps {
  id: string;
  body: string;
  displayName: string;
  authorId: string;
  createdAt: Date;
  isOriginalPost?: boolean;
  adminActions?: ReactNode;
}

export default function PostCard({
  body,
  displayName,
  createdAt,
  isOriginalPost,
  adminActions,
}: PostCardProps) {
  const dateStr = createdAt.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-sm shadow-card-shadow ${
        isOriginalPost ? "border-l-4 border-amber" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber/10 flex items-center justify-center text-amber font-semibold text-sm">
            {displayName[0]?.toUpperCase()}
          </div>
          <div>
            <span className="font-medium text-sm text-slate-heading">
              {displayName}
            </span>
            <span className="ml-2 text-xs text-slate-muted">{dateStr}</span>
          </div>
        </div>
        {adminActions}
      </div>
      <div className="mt-4 text-slate-body leading-relaxed whitespace-pre-wrap">
        {body}
      </div>
    </div>
  );
}
