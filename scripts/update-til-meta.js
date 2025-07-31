#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function updateTilMeta() {
  const docsPath = path.join(__dirname, "..", "content", "docs");
  
  // 년도 폴더들 찾기
  const yearFolders = fs.readdirSync(docsPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && /^\d{4}$/.test(dirent.name))
    .map(dirent => dirent.name);

  yearFolders.forEach(year => {
    const yearPath = path.join(docsPath, year);
    const metaPath = path.join(yearPath, "meta.json");
    
    // MDX 파일들 찾기 (MMDD 형식)
    const mdxFiles = fs.readdirSync(yearPath)
      .filter(file => file.endsWith('.mdx') && /^\d{4}\.mdx$/.test(file))
      .map(file => file.replace('.mdx', ''))
      .sort((a, b) => b.localeCompare(a)); // 역순 정렬 (최신순)

    if (mdxFiles.length > 0) {
      const metaData = {
        title: `${year}년`,
        pages: mdxFiles
      };

      fs.writeFileSync(metaPath, JSON.stringify(metaData, null, 2), "utf8");
      console.log(`✅ ${year}년 meta.json 업데이트 (${mdxFiles.length}개 파일)`);
      console.log(`   최신: ${mdxFiles[0]} → 과거: ${mdxFiles[mdxFiles.length - 1]}`);
    }
  });
}

updateTilMeta();