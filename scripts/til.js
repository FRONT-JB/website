#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function createTIL() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1);
  const day = String(today.getDate()).padStart(2, "0");

  const dateString = `${month.padStart(2, "0")}${day}`;
  const yearFolder = path.join(
    __dirname,
    "..",
    "content",
    "docs",
    year.toString(),
  );
  const filePath = path.join(yearFolder, `${dateString}.mdx`);

  // 년도 폴더가 없으면 생성
  if (!fs.existsSync(yearFolder)) {
    fs.mkdirSync(yearFolder, { recursive: true });
    console.log(`📁 ${year} 폴더를 생성했습니다.`);
  }

  // 파일이 이미 존재하는지 확인
  if (fs.existsSync(filePath)) {
    console.log(
      `📝 ${year}년 ${month}월 ${day}일 TIL 파일이 이미 존재합니다: ${dateString}.mdx`,
    );
    return;
  }

  // MDX 파일 내용 생성
  const content = `---
title: "${month}월 ${day}일"
description: "${year}년 ${month}월 ${day}일에 기록한 내용"
---

## 오늘 배운 것 (TIL)

### 

`;

  // 파일 생성
  fs.writeFileSync(filePath, content, "utf8");
  console.log(
    `✨ ${year}년 ${month}월 ${day}일 TIL 파일을 생성했습니다: ${dateString}.mdx`,
  );
}

createTIL();
