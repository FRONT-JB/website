"use client";

import { useState } from "react";
import { Calendar, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/utils/cn";
import algorithmRecordsData from "@/data/algorithm-records.json";

interface AlgorithmProblem {
  title: string;
  platform: "백준" | "리트코드" | "프로그래머스";
  link: string;
  tags: string[];
}

interface AlgorithmRecord {
  date: string;
  problems: AlgorithmProblem[];
}

export default function TimelineView() {
  const algorithmRecords: AlgorithmRecord[] =
    algorithmRecordsData as AlgorithmRecord[];

  // 각 날짜별 펼침/접힘 상태 관리 (최신 날짜는 기본값으로 열려있음)
  const [expandedDates, setExpandedDates] = useState<Set<string>>(
    new Set([algorithmRecords[0]?.date]),
  );

  const toggleExpanded = (date: string) => {
    setExpandedDates((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(date)) {
        newSet.delete(date);
      } else {
        newSet.add(date);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-3">
      {algorithmRecords.map((record, index) => (
        <div key={index} className="relative">
          {/* Timeline line */}
          {index !== algorithmRecords.length - 1 && (
            <div className="absolute left-[15px] top-8 h-full w-0.5 bg-fd-border" />
          )}

          <div className="flex items-start space-x-3">
            {/* Timeline dot */}
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-fd-primary shadow-sm">
              <Calendar className="h-4 w-4 text-fd-primary-foreground" />
            </div>

            <div className="flex flex-1 flex-col gap-4">
              <div
                className="cursor-pointer"
                onClick={() => toggleExpanded(record.date)}
              >
                <div className="flex items-center gap-2">
                  <h3 className="m-0 text-lg font-semibold text-fd-foreground">
                    {record.date}
                  </h3>

                  {expandedDates.has(record.date) ? (
                    <ChevronDown className="h-4 w-4 text-fd-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-fd-muted-foreground" />
                  )}
                </div>

                <p className="m-0 mt-1 text-sm text-fd-muted-foreground">
                  {[...new Set(record.problems.map((p) => p.platform))].join(
                    ", ",
                  )}
                  에서 {record.problems.length}개 문제 해결
                </p>
              </div>

              {expandedDates.has(record.date) && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {record.problems.map((problem, problemIndex) => (
                    <div
                      key={problemIndex}
                      className={cn(
                        "block rounded-lg border bg-fd-card p-4 text-fd-card-foreground shadow-md transition-colors",
                        "border-l-4",
                        problem.platform === "백준" && "border-l-blue-500",
                        problem.platform === "프로그래머스" &&
                          "border-l-zinc-500",
                        problem.platform === "리트코드" &&
                          "border-l-orange-500",
                      )}
                      data-card={true}
                    >
                      <span className="m-0 block cursor-default text-sm text-fd-muted-foreground">
                        {problem.platform}
                      </span>

                      <a
                        href={problem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="not-prose mb-2 inline-block cursor-pointer text-sm font-medium text-fd-foreground underline underline-offset-2 hover:text-zinc-600"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {problem.title}
                      </a>

                      <div className="flex flex-wrap gap-1">
                        {problem.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="inline-flex cursor-default items-center rounded-full border border-transparent bg-fd-secondary px-2.5 py-0.5 text-xs font-semibold text-fd-secondary-foreground focus:outline-none focus:ring-2 focus:ring-fd-ring focus:ring-offset-2"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
