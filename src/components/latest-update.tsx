import { getRelatedCommitMessages } from "@/utils/octokit";
import { Card, Cards } from "fumadocs-ui/components/card";
import { BookIcon, LayoutListIcon } from "lucide-react";

export default async function LatestUpdate() {
  const { latestBlogCommitList, latestDocsCommitList } =
    await getRelatedCommitMessages();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4">
      <p className="tex-sm text-center font-medium text-zinc-700 dark:text-zinc-300">
        최근 업데이트
      </p>

      <Cards className="px-4">
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
