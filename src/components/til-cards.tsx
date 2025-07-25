// @ts-ignore
import { Cards, Card } from "fumadocs-ui/components/card";
import { BookOpenCheckIcon } from "lucide-react";
import { source } from "@/app/source";

interface TilCardsProps {
  year: string;
}

export function TilCards({ year }: TilCardsProps) {
  // 해당 연도의 TIL 문서들 가져오기
  const tilDocs = source
    .getPages()
    .filter(
      (page) =>
        page.url.startsWith(`/docs/${year}/`) && page.url !== `/docs/${year}`,
    )
    .sort((a, b) => {
      // 파일명으로 정렬 (최신 순)
      const aDate = a.url.split("/").pop() || "";
      const bDate = b.url.split("/").pop() || "";
      return bDate.localeCompare(aDate);
    });

  if (tilDocs.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        아직 작성된 TIL이 없습니다.
      </div>
    );
  }

  return (
    <Cards className="mt-5">
      {tilDocs.map((doc) => {
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
    </Cards>
  );
}
