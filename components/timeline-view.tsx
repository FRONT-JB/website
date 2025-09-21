"use client";

import { useState } from "react";
import { Calendar, ChevronDown, ChevronRight } from "lucide-react";
import algorithmRecordsData from "@/data/algorithm-records.json";
import { cn } from "@/lib/cn";

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

type TimelineItem =
  | { type: "current"; record: AlgorithmRecord }
  | {
      type: "grouped";
      monthKey: string;
      data: { count: number; platforms: Set<string> };
    };

export default function TimelineView() {
  const algorithmRecords: AlgorithmRecord[] =
    algorithmRecordsData as AlgorithmRecord[];

  // 현재 월 구하기
  const currentMonth = new Date().getMonth() + 1;

  // 현재 월과 다른 월 데이터 분리
  const currentMonthRecords = algorithmRecords.filter((record) => {
    const recordDate = new Date(record.date.replace(/\./g, "-"));
    return recordDate.getMonth() + 1 === currentMonth;
  });

  const otherMonthRecords = algorithmRecords.filter((record) => {
    const recordDate = new Date(record.date.replace(/\./g, "-"));
    return recordDate.getMonth() + 1 !== currentMonth;
  });

  // 다른 월들을 월별로 그룹화하여 총 문제 수 계산
  const getGroupedOtherMonths = () => {
    const grouped: {
      [key: string]: { count: number; platforms: Set<string> };
    } = {};

    otherMonthRecords.forEach((record) => {
      const recordDate = new Date(record.date.replace(/\./g, "-"));
      const monthKey = `${recordDate.getFullYear()}.${String(recordDate.getMonth() + 1).padStart(2, "0")}`;

      if (!grouped[monthKey]) {
        grouped[monthKey] = { count: 0, platforms: new Set() };
      }

      grouped[monthKey].count += record.problems.length;
      record.problems.forEach((problem) => {
        grouped[monthKey].platforms.add(problem.platform);
      });
    });

    return grouped;
  };

  const groupedOtherMonths = getGroupedOtherMonths();

  // 각 날짜별 펼침/접힘 상태 관리 (최신 현재 월 날짜는 기본값으로 열려있음)
  const [expandedDates, setExpandedDates] = useState<Set<string>>(
    new Set([currentMonthRecords[0]?.date]),
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

  const allItems: TimelineItem[] = [
    ...currentMonthRecords.map((record) => ({
      type: "current" as const,
      record,
    })),
    ...Object.entries(groupedOtherMonths).map(([monthKey, data]) => ({
      type: "grouped" as const,
      monthKey,
      data,
    })),
  ].sort((a, b) => {
    // 최신순 정렬
    if (a.type === "current" && b.type === "current") {
      return b.record.date.localeCompare(a.record.date);
    } else if (a.type === "current") {
      return -1; // 현재 월이 먼저
    } else if (b.type === "current") {
      return 1;
    } else {
      return b.monthKey.localeCompare(a.monthKey);
    }
  });

  return (
    <div className="space-y-3">
      {allItems.map((item, index) => (
        <div
          key={item.type === "current" ? item.record.date : item.monthKey}
          className="relative"
        >
          {/* Timeline line */}
          {index !== allItems.length - 1 && (
            <div className="bg-fd-border absolute top-8 left-[15px] h-full w-0.5" />
          )}

          <div className="flex items-start space-x-3">
            {/* Timeline dot */}
            <div className="bg-fd-primary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full shadow-sm">
              <Calendar className="text-fd-primary-foreground h-4 w-4" />
            </div>

            <div className="flex flex-1 flex-col gap-4">
              {item.type === "current" ? (
                // 현재 월 레코드 - 토글 가능
                <>
                  <div
                    className="cursor-pointer"
                    onClick={() => toggleExpanded(item.record.date)}
                  >
                    <div className="flex items-center gap-2">
                      <h3 className="text-fd-foreground m-0 text-lg font-semibold">
                        {item.record.date}
                      </h3>

                      {expandedDates.has(item.record.date) ? (
                        <ChevronDown className="text-fd-muted-foreground h-4 w-4" />
                      ) : (
                        <ChevronRight className="text-fd-muted-foreground h-4 w-4" />
                      )}
                    </div>

                    <p className="text-fd-muted-foreground m-0 mt-1 text-sm">
                      {[
                        ...new Set(item.record.problems.map((p) => p.platform)),
                      ].join(", ")}
                      에서 {item.record.problems.length}개 문제 해결
                    </p>
                  </div>

                  {expandedDates.has(item.record.date) && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {item.record.problems.map((problem, problemIndex) => (
                        <div
                          key={problemIndex}
                          className={cn(
                            "bg-fd-card text-fd-card-foreground block rounded-lg border p-4 shadow-md transition-colors",
                            "border-l-4",
                            problem.platform === "백준" && "border-l-blue-500",
                            problem.platform === "프로그래머스" &&
                              "border-l-zinc-500",
                            problem.platform === "리트코드" &&
                              "border-l-orange-500",
                          )}
                          data-card={true}
                        >
                          <span className="text-fd-muted-foreground m-0 block cursor-default text-sm">
                            {problem.platform}
                          </span>

                          <a
                            href={problem.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="not-prose text-fd-foreground mb-2 inline-block cursor-pointer text-sm font-medium underline underline-offset-2 hover:text-zinc-600"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {problem.title}
                          </a>

                          <div className="flex flex-wrap gap-1">
                            {problem.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="bg-fd-secondary text-fd-secondary-foreground focus:ring-fd-ring inline-flex cursor-default items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold focus:ring-2 focus:ring-offset-2 focus:outline-none"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                // 다른 월 그룹 - 토글 없이 요약만 표시
                <div className="cursor-default">
                  <div className="flex items-center gap-2">
                    <h3 className="text-fd-foreground m-0 text-lg font-semibold">
                      {item.monthKey}
                    </h3>
                  </div>

                  <p className="text-fd-muted-foreground m-0 mt-1 text-sm">
                    {Array.from(item.data.platforms).join(", ")}에서 총{" "}
                    {item.data.count}개 문제 해결
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
