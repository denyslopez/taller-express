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

          <h2 className="te-anime-text font-display font-bold text-2xl md:text-[28px] tracking-tight text-te-text leading-none">
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
          <Link href={viewMoreHref} className="view-more h-10">
            <span className="circle" />
            <span className="button-text text-[13.5px]">
              {viewMoreLabel}
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}
