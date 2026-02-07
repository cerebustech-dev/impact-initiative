interface ComingSoonBadgeProps {
  monthName: string;
}

export default function ComingSoonBadge({ monthName }: ComingSoonBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cream-dark text-slate-muted text-sm font-medium rounded-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
        />
      </svg>
      Coming in {monthName}
    </span>
  );
}
