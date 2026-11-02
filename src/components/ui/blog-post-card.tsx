import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

/**
 * Format an ISO `YYYY-MM-DD` date without `Intl`.
 *
 * `new Date("2026-11-02")` is UTC midnight, so `toLocaleDateString()` can render
 * the previous day in negative-offset timezones, and the server/client renders
 * would disagree. Splitting the string keeps the date stable everywhere.
 */
function formatPostDate(value: string) {
  const [year, month, day] = value.slice(0, 10).split("-");
  const monthLabel = MONTHS[Number(month) - 1];
  if (!year || !monthLabel || !day) return value;
  return `${monthLabel} ${Number(day)}, ${year}`;
}

const blogPostCardVariants = cva(
  "group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-border-strong [@media(hover:hover)]:hover:shadow-lg [@media(hover:hover)]:hover:shadow-brand-cyan/10",
  {
    variants: {
      variant: {
        default: "",
        /** Lead story: full-width cover art above a larger content block. */
        featured: "border-border-strong/70",
        /** Archive card: compact type with cover art on top. */
        media: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BlogPostCardProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Link>, "href" | "children">,
    VariantProps<typeof blogPostCardVariants> {
  /** Primary category, e.g. "Architecture". */
  category: string;
  /** ISO date (`YYYY-MM-DD`). */
  publishedAt: string;
  title: string;
  summary: string;
  /** Cover art. Rendered by the `featured` and `media` variants. */
  imageUrl?: string;
  href: string;
  /** Shows in the footer of both variants when provided. */
  readingTimeMinutes?: number;
  /** Featured lead stories show the byline; compact cards leave it off. */
  author?: string;
  readMoreText?: string;
  /** Editorial order label for compact cards, e.g. "02". */
  index?: string;
}

/**
 * BlogPostCard — editorial card for the homepage insights ledger.
 *
 * Composed from `card-18`: the `featured` variant keeps the cover art and
 * larger type (stacked above the content, because the covers are designed
 * 1200×630 posters), the `media` variant adds the same cover to an archive
 * card, and the compact variant drops the image and the CTA so the homepage
 * lead story stays the single focal point. The whole card is one link — no
 * nested interactive elements — and hover motion is CSS-only so the global
 * reduced-motion kill-switch applies.
 */
const BlogPostCard = React.forwardRef<HTMLAnchorElement, BlogPostCardProps>(
  (
    {
      className,
      variant = "default",
      category,
      publishedAt,
      title,
      summary,
      imageUrl,
      href,
      readingTimeMinutes,
      author,
      readMoreText = "Read the article",
      index,
      ...props
    },
    ref
  ) => {
    const isFeatured = variant === "featured";
    const isMedia = variant === "media";
    const showImage = Boolean(imageUrl) && (isFeatured || isMedia);
    const date = formatPostDate(publishedAt);

    return (
      <Link
        ref={ref}
        href={href}
        aria-label={`Read ${title}`}
        className={cn(
          blogPostCardVariants({ variant: variant ?? "default" }),
          className
        )}
        {...props}
      >
        {showImage && imageUrl ? (
          <div className="relative aspect-[1200/630] w-full shrink-0 overflow-hidden border-b border-border bg-background">
            <Image
              src={imageUrl}
              alt=""
              fill
              sizes={
                isFeatured
                  ? "(min-width: 1280px) 780px, (min-width: 1024px) 66vw, 100vw"
                  : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              }
              className="object-cover transition-transform duration-700 ease-out [@media(hover:hover)]:group-hover:scale-[1.02]"
            />
          </div>
        ) : null}

        <div
          className={cn(
            "flex flex-1 flex-col",
            isFeatured ? "justify-between p-6 md:p-8" : "p-5 sm:p-6"
          )}
        >
          <div>
            <div className="mb-4 flex items-center justify-between gap-3">
              <Badge variant="brand-outline">{category}</Badge>
              {isFeatured ? (
                <time
                  dateTime={publishedAt}
                  className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
                >
                  {date}
                </time>
              ) : index ? (
                <span
                  aria-hidden="true"
                  className="font-mono text-xs tracking-[0.14em] text-muted-foreground/70"
                >
                  {index}
                </span>
              ) : null}
            </div>

            <h3
              className={cn(
                isFeatured
                  ? "text-2xl font-semibold tracking-[-0.02em] sm:text-3xl"
                  : "heading-card"
              )}
            >
              <span className="bg-gradient-to-r from-brand-cyan to-brand-blue bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 [@media(hover:hover)]:group-hover:bg-[length:100%_2px]">
                {title}
              </span>
            </h3>

            <p
              className={cn(
                "mt-3 text-muted-foreground",
                isFeatured
                  ? "text-base leading-relaxed"
                  : "line-clamp-3 text-sm leading-relaxed"
              )}
            >
              {summary}
            </p>
          </div>

          {isFeatured ? (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                {author ? (
                  <>
                    <span>{author}</span>
                    <span aria-hidden="true">·</span>
                  </>
                ) : null}
                {typeof readingTimeMinutes === "number" ? (
                  <span>{readingTimeMinutes} min read</span>
                ) : null}
              </div>
              <span
                className={cn(
                  buttonVariants({ variant: "brand" }),
                  "pointer-events-none"
                )}
              >
                {readMoreText}
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </div>
          ) : (
            <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-5 text-xs text-muted-foreground">
              <time dateTime={publishedAt}>{date}</time>
              {typeof readingTimeMinutes === "number" ? (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{readingTimeMinutes} min read</span>
                </>
              ) : null}
            </div>
          )}
        </div>
      </Link>
    );
  }
);

BlogPostCard.displayName = "BlogPostCard";

export { BlogPostCard, blogPostCardVariants };
