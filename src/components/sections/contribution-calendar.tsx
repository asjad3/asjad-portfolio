"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import type { GitHubContributionDay } from "@/lib/github-types";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

const CONTRIBUTION_COLORS = [
  "bg-[rgba(0,0,0,0.04)]",
  "bg-[rgba(27,31,35,0.08)]",
  "bg-[rgba(27,31,35,0.20)]",
  "bg-[rgba(27,31,35,0.35)]",
  "bg-[rgba(27,31,35,0.50)]",
];

function getLevel(count: number): number {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ContributionCalendar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [data, setData] = useState<GitHubContributionDay[][] | null>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hoveredDay, setHoveredDay] = useState<GitHubContributionDay | null>(null);

  useEffect(() => {
    fetch("/api/github/contributions")
      .then((r) => r.json())
      .then((json) => {
        if (json.error) throw new Error(json.error);
        const weeks = json.data.weeks as { contributionDays: GitHubContributionDay[] }[];
        const days: GitHubContributionDay[][] = weeks.map((w) => w.contributionDays);
        setData(days);
        setTotal(json.data.totalContributions);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const showTooltip = useCallback((day: GitHubContributionDay) => {
    setHoveredDay(day);
  }, []);

  return (
    <section ref={ref} className="mx-auto w-full max-w-[1184px] px-5 py-20 sm:px-6 sm:py-24 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="mb-8 flex flex-col gap-2 sm:mb-10"
      >
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--text-muted)]">
          Activity
        </span>
        <div className="flex items-end gap-3">
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl md:text-4xl">
            Contributions
          </h2>
          {!loading && total > 0 && (
            <span className="font-mono text-sm text-[var(--text-dim)] pb-1">
              {total.toLocaleString()} in the last year
            </span>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="overflow-x-auto pb-4"
      >
        {loading ? (
          <LoadingSkeleton />
        ) : data ? (
          <div className="relative">
            <div className="flex">
              {/* Day labels */}
              <div className="flex flex-col gap-[3px] mr-2 shrink-0 pt-4">
                {DAY_LABELS.map((day, i) => (
                  <div
                    key={i}
                    className="h-[14px] sm:h-[16px] flex items-center font-mono text-[10px] text-[var(--text-dim)] w-[24px]"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Grid */}
              <div className="flex gap-[3px]">
                {data.map((week, weekIdx) => (
                  <div key={weekIdx} className="flex flex-col gap-[3px]">
                    {week.map((day, dayIdx) => {
                      const level = getLevel(day.contributionCount);
                      return (
                        <div
                          key={dayIdx}
                          className={`w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] rounded-sm ${CONTRIBUTION_COLORS[level]} cursor-pointer transition-all hover:ring-1 hover:ring-[var(--text-muted)]`}
                          onMouseEnter={() => showTooltip(day)}
                          onMouseLeave={() => setHoveredDay(null)}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-1.5 mt-4">
              <span className="font-mono text-[10px] text-[var(--text-dim)]">Less</span>
              {CONTRIBUTION_COLORS.map((color, i) => (
                <div key={i} className={`w-[12px] h-[12px] rounded-sm ${color}`} />
              ))}
              <span className="font-mono text-[10px] text-[var(--text-dim)]">More</span>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center font-mono text-sm text-[var(--text-dim)]">
            Unable to load contribution data
          </div>
        )}

        {/* Tooltip */}
        {hoveredDay && (
          <div className="fixed z-50 pointer-events-none rounded-md border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-1.5 shadow-lg"
            style={{
              left: "50%",
              bottom: "4rem",
              transform: "translateX(-50%)",
            }}
          >
            <p className="text-xs font-mono text-[var(--text-primary)]">
              <span className="font-medium">{hoveredDay.contributionCount}</span>{" "}
              contribution{hoveredDay.contributionCount !== 1 ? "s" : ""}
            </p>
            <p className="text-[10px] font-mono text-[var(--text-dim)]">
              {formatDate(hoveredDay.date)}
            </p>
          </div>
        )}
      </motion.div>
    </section>
  );
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-3 w-32 bg-[var(--border)] rounded mb-6" />
      <div className="flex">
        <div className="w-[24px] mr-2 shrink-0" />
        <div className="flex gap-[3px]">
          {Array.from({ length: 52 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-[3px]">
              {Array.from({ length: 7 }).map((_, j) => (
                <div
                  key={j}
                  className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] bg-[var(--border)] rounded-sm"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
