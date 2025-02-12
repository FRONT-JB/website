import { getRelatedCommitMessages } from "@/utils/octokit";
import { Card, Cards } from "fumadocs-ui/components/card";
import { BookIcon, LayoutListIcon } from "lucide-react";

export default async function LatestUpdate() {
  const { latestBlogCommitList, latestDocsCommitList } =
    await getRelatedCommitMessages();

  return (
    <div className="mx-auto flex max-w-[594px] flex-col gap-2 px-4 pt-2 md:pb-10">
      <p className="tex-sm text-center font-medium text-muted-foreground">
        최근 업데이트
      </p>

      <Cards>
        {latestDocsCommitList.map((commit) => (
          <Card
            icon={<BookIcon />}
            key={commit?.message}
            title={commit?.message}
            description={`${commit?.date}에 작성됨`}
            href={commit?.url}
          />
        ))}

        {latestBlogCommitList.map((commit) => (
          <Card
            icon={<LayoutListIcon />}
            key={commit?.message}
            title={commit?.message}
            description={`${commit?.date}에 작성됨`}
            href={commit?.url}
          />
        ))}
      </Cards>
    </div>
  );
}
