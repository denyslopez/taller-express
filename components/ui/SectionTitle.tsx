import Link from "next/link";

interface SectionTitleProps {
  title: string;
  description?: string;
  viewMoreHref?: string;
  viewMoreLabel?: string;
}

export default function SectionTitle({
  title,
  description,
  viewMoreHref,
  viewMoreLabel = "Ver más →",
}: SectionTitleProps) {
  return (
    <div className="flex items-end justify-between w-full mb-10 pb-4 border-b border-te-glass-border">
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 flex-grow">
        {/* Title Group with 4-point star */}
        <div className="flex items-center gap-3">
          {/* 4-point star SVG */}
          <svg
            className="w-5 h-5 text-te-orange shrink-0 animate-pulse"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z" />
          </svg>

          <h2 className="te-anime-text font-display font-semibold text-2xl md:text-[28px] tracking-tight text-te-text leading-none">
            {title}
          </h2>
        </div>

        {/* Inline description */}
        {description && (
          <span className="hidden md:inline font-body text-[14.4px] text-te-muted">
            {description}
          </span>
        )}
      </div>

      {/* Optional .view-more Button */}
      {viewMoreHref && (
        <div className="shrink-0 pl-4">
          <Link href={viewMoreHref} className="view-more h-8 md:h-10 group/btn relative">
            {/* Circle background - expands on hover */}
            <span className="circle" />
            
            {/* Static Icon Container - Placed exactly where the circle is, but doesn't move on hover */}
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center z-20 text-[#111111] pointer-events-none">
              {/* Chevron Icon - Visible by default, hidden on hover */}
              <svg
                className="w-3 h-3 md:w-3.5 md:h-3.5 absolute transition-opacity duration-300 opacity-100 group-hover/btn:opacity-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              {/* Arrow Icon - Hidden by default, visible on hover */}
              <svg
                className="w-3 h-3 md:w-3.5 md:h-3.5 absolute transition-opacity duration-300 opacity-0 group-hover/btn:opacity-100"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>

            <span className="button-text">
              {viewMoreLabel}
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}
