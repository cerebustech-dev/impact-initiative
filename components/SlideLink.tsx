import { SlideResource } from "@/data/curriculum";

interface SlideLinkProps {
  slide: SlideResource;
}

export default function SlideLink({ slide }: SlideLinkProps) {
  return (
    <a
      href={slide.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 bg-cream-dark text-slate-body rounded-lg hover:bg-amber hover:text-white transition-colors text-sm font-medium"
    >
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
          d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5"
        />
      </svg>
      {slide.title}
      <span className="text-xs opacity-60 uppercase">{slide.type === "pdf" ? "PDF" : "Slides"}</span>
    </a>
  );
}
