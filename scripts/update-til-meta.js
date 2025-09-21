#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function updateTilMeta() {
  const docsPath = path.join(__dirname, "..", "content", "docs");

  // 년도 폴더들 찾기
  const yearFolders = fs
    .readdirSync(docsPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory() && /^\d{4}$/.test(dirent.name))
    .map((dirent) => dirent.name);

  yearFolders.forEach((year) => {
    const yearPath = path.join(docsPath, year);
    const metaPath = path.join(yearPath, "meta.json");

    // MDX 파일들 찾기 (MMDD 형식, archive 폴더 제외)
    const entries = fs.readdirSync(yearPath, { withFileTypes: true });
    const mdxFiles = entries
      .filter(
        (entry) =>
          entry.isFile() &&
          entry.name.endsWith(".mdx") &&
          /^\d{4}\.mdx$/.test(entry.name),
      )
      .map((entry) => entry.name.replace(".mdx", ""))
      .sort((a, b) => b.localeCompare(a)); // 역순 정렬 (최신순)

    if (mdxFiles.length > 0) {
      // 기존 meta.json에서 아카이브 구조 확인
      let existingPages = [];
      if (fs.existsSync(metaPath)) {
        try {
          const existingMeta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
          existingPages = existingMeta.pages || [];
        } catch (e) {
          // 파싱 오류 시 빈 배열 사용
        }
      }

      // 아카이브 구조 찾기
      const archiveIndex = existingPages.indexOf("---아카이브---");
      const archiveStructure =
        archiveIndex !== -1
          ? existingPages.slice(archiveIndex)
          : ["---아카이브---", "..."];

      const metaData = {
        title: `${year}년`,
        pages: [...mdxFiles, ...archiveStructure],
      };

      fs.writeFileSync(metaPath, JSON.stringify(metaData, null, 2), "utf8");
      console.log(
        `✅ ${year}년 meta.json 업데이트 (${mdxFiles.length}개 파일)`,
      );
      console.log(
        `   최신: ${mdxFiles[0]} → 과거: ${mdxFiles[mdxFiles.length - 1]}`,
      );
    }
  });
}

updateTilMeta();
