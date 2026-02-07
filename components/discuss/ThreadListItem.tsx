import Link from "next/link";
import { timeAgo } from "@/lib/format";

interface ThreadListItemProps {
  id: string;
  monthId: string;
  title: string;
  displayName: string;
  isPinned: boolean;
  replyCount: number;
  updatedAt: Date;
}

export default function ThreadListItem({
  id,
  monthId,
  title,
  displayName,
  isPinned,
  replyCount,
  updatedAt,
}: ThreadListItemProps) {
  return (
    <Link
      href={`/discuss/${monthId}/${id}`}
      className="group block bg-white rounded-xl p-5 shadow-sm shadow-card-shadow hover:shadow-md hover:shadow-card-shadow hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="flex items-start gap-3">
        {isPinned && (
          <span className="shrink-0 mt-0.5 text-amber" title="Pinned">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-4 h-4"
            >
              <path d="M16 2c.55 0 1 .45 1 1v3.39l1.74 1.74c.28.28.43.66.38 1.05l-.64 4.47c-.06.44-.38.8-.8.94L14 15.71V21c0 .55-.45 1-1 1h-2c-.55 0-1-.45-1-1v-5.29l-3.68-1.12c-.42-.14-.74-.5-.8-.94l-.64-4.47c-.05-.39.1-.77.38-1.05L7 6.39V3c0-.55.45-1 1-1h8z" />
            </svg>
          </span>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-serif font-semibold text-slate-heading group-hover:text-amber transition-colors truncate">
            {title}
          </h3>
          <div className="mt-1.5 flex items-center gap-3 text-xs text-slate-muted">
            <span>{displayName}</span>
            <span aria-hidden="true">&middot;</span>
            <span>
              {replyCount} {replyCount === 1 ? "reply" : "replies"}
            </span>
            <span aria-hidden="true">&middot;</span>
            <span>{timeAgo(updatedAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
