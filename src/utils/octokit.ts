import { Octokit, RestEndpointMethodTypes } from "@octokit/rest";

type CommitResponse =
  RestEndpointMethodTypes["repos"]["listCommits"]["response"];
type DetailedCommitResponse =
  RestEndpointMethodTypes["repos"]["getCommit"]["response"];

const OTCOKIT_COMMIT_PAYLOAD = {
  owner: "front-jb", // 귀하의 GitHub 사용자명
  repo: "website", // 레포지토리 이름
  per_page: 3, // 가져올 커밋 수
};

export async function getRelatedCommitMessages() {
  const octokit = new Octokit({
    auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
  });

  try {
    const docsResponse: CommitResponse = await octokit.repos.listCommits({
      ...OTCOKIT_COMMIT_PAYLOAD,
      path: "content/docs",
    });

    const blogResponse: CommitResponse = await octokit.repos.listCommits({
      ...OTCOKIT_COMMIT_PAYLOAD,
      path: "content/blog",
    });

    const getCommitDetails = async (sha: string) => {
      const detail: DetailedCommitResponse = await octokit.repos.getCommit({
        ...OTCOKIT_COMMIT_PAYLOAD,
        ref: sha,
      });

      return detail.data;
    };

    const latestDocsCommitList = await Promise.all(
      docsResponse.data.map(async (commit) => {
        const details = await getCommitDetails(commit.sha);

        const addedFileTypeList = (details.files || [])
          .filter(
            (file) =>
              file.filename.includes("content/docs") &&
              file.status === "added" &&
              file.filename.includes(".mdx"),
          )
          .map((file) => file.filename);

        const url = addedFileTypeList[0]?.split("content")[1].split(".")[0];

        return addedFileTypeList.length > 0
          ? {
              message: commit.commit.message.split("docs:")[1],
              date: new Date(
                commit.commit.author?.date || "",
              ).toLocaleDateString("ko-KR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              }),
              url,
            }
          : null;
      }),
    ).then((commits) => commits.filter(Boolean));

    const latestBlogCommitList = await Promise.all(
      blogResponse.data.map(async (commit) => {
        const details = await getCommitDetails(commit.sha);

        const addedFileTypeList = (details.files || [])
          .filter(
            (file) =>
              file.filename.includes("content/blog") && file.status === "added",
          )
          .map((file) => file.filename);

        const url = addedFileTypeList[0]?.split("content")[1].split(".")[0];

        return addedFileTypeList.length > 0
          ? {
              message: commit.commit.message.split("blog:")[1],
              date: new Date(
                commit.commit.author?.date || "",
              ).toLocaleDateString("ko-KR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              }),
              url,
            }
          : null;
      }),
    ).then((commits) => commits.filter(Boolean)); // null 값 제거

    return {
      latestDocsCommitList,
      latestBlogCommitList,
    };
  } catch (error) {
    console.error("Error fetching commits:", error);
    throw error;
  }
}
