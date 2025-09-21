import { Cards, Card } from "fumadocs-ui/components/card";
import { BookOpenCheckIcon, CalendarIcon } from "lucide-react";

import algorithmRecords from "@/data/algorithm-records.json";
import { source } from "@/lib/source";

interface TilCardsProps {
  year: string;
}

export function TilCards({ year }: TilCardsProps) {
  // 해당 연도의 TIL 문서들 가져오기
  const tilDocs = source
    .getPages()
    .filter(
      (page) =>
        page.url.startsWith(`/docs/personal/${year}/`) &&
        page.url !== `/docs/personal/${year}`,
    )
    .sort((a, b) => {
      // 파일명으로 정렬 (최신 순)
      const aDate = a.url.split("/").pop() || "";
      const bDate = b.url.split("/").pop() || "";
      return bDate.localeCompare(aDate);
    });

  if (tilDocs.length === 0) {
    return (
      <div className="text-muted-foreground py-8 text-center">
        아직 작성된 TIL이 없습니다.
      </div>
    );
  }

  // 현재 월 구하기
  const currentMonth = new Date().getMonth() + 1; // 1-12
  const currentMonthPadded = currentMonth.toString().padStart(2, "0");

  // 문서들을 현재 월과 다른 월로 분리
  const currentMonthDocs = tilDocs.filter((doc) => {
    const fileName = doc.url.split("/").pop() || "";
    return fileName.startsWith(currentMonthPadded);
  });

  const otherMonthDocs = tilDocs.filter((doc) => {
    const fileName = doc.url.split("/").pop() || "";
    return !fileName.startsWith(currentMonthPadded);
  });

  // 다른 월들의 총 문제 수 계산
  const getTotalProblemsCount = () => {
    return algorithmRecords.reduce((total, record) => {
      const recordDate = new Date(record.date.replace(/\./g, "-"));
      const recordMonth = recordDate.getMonth() + 1;

      if (recordMonth !== currentMonth) {
        return total + record.problems.length;
      }
      return total;
    }, 0);
  };

  const totalOtherMonthProblems = getTotalProblemsCount();

  return (
    <Cards className="mt-5">
      {/* 현재 월 TIL들 개별 표시 */}
      {currentMonthDocs.map((doc) => {
        const fileName = doc.url.split("/").pop() || "";
        const displayTitle = doc.data.title || fileName;
        const description = doc.data.description || "Today I Learned";

        return (
          <Card
            key={doc.url}
            title={displayTitle}
            href={doc.url}
            icon={<BookOpenCheckIcon />}
            description={description}
          />
        );
      })}

      {/* 다른 월들을 하나의 카드로 묶어서 표시 */}
      {otherMonthDocs.length > 0 && (
        <Card
          key="other-months"
          title={`${year} - 총 ${totalOtherMonthProblems}문제`}
          href={`/docs/personal/${year}`}
          icon={<CalendarIcon />}
          description={`${currentMonth}월 이전의 모든 알고리즘 학습 기록`}
        />
      )}
    </Cards>
  );
}
