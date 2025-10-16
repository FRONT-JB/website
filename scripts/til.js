#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function updateMetaJson(yearFolder, dateString) {
  const metaPath = path.join(yearFolder, "meta.json");

  // meta.json 읽기 또는 생성
  let metaData;
  if (fs.existsSync(metaPath)) {
    metaData = JSON.parse(fs.readFileSync(metaPath, "utf8"));
  } else {
    metaData = {
      title: `${path.basename(yearFolder)}년`,
      pages: [],
    };
  }

  // 이미 존재하지 않으면 맨 앞에 추가 (역순 정렬)
  if (!metaData.pages.includes(dateString)) {
    metaData.pages.unshift(dateString);
    fs.writeFileSync(metaPath, JSON.stringify(metaData, null, 2), "utf8");
    console.log(`📋 meta.json에 ${dateString} 추가 (최신순 정렬)`);
  }
}

function getTodayAlgorithmProblems(today) {
  const dataPath = path.join(__dirname, "../src/data/algorithm-records.json");

  if (!fs.existsSync(dataPath)) {
    return [];
  }

  try {
    const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    const todayFormatted = today
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\. /g, ".")
      .replace(/\.$/, "");

    const todayRecord = data.find((record) => record.date === todayFormatted);
    return todayRecord ? todayRecord.problems : [];
  } catch (error) {
    console.log("알고리즘 기록을 읽는 중 오류 발생:", error.message);
    return [];
  }
}

function generateTilContent(year, month, day, problems) {
  const dayWithoutPadding = parseInt(day, 10);
  let content = `---
title: "${month}월 ${dayWithoutPadding}일"
description: "${year}년 ${month}월 ${dayWithoutPadding}일에 기록한 내용"
---

## 오늘 배운 것 (TIL)

`;

  if (problems.length > 0) {
    content += `프로그래머스에서 ${problems.length}개 문제 해결

## 핵심 요약 (TL;DR)

`;

    // 태그 기반으로 요약 생성
    const allTags = [...new Set(problems.flatMap((p) => p.tags))];
    const tagDescription = allTags.join(", ");
    content += `${tagDescription} 관련 문제들을 통해 알고리즘 문제 해결 능력을 키웠다.

## 풀어본 문제들

`;

    problems.forEach((problem, index) => {
      content += `### ${index + 1}. ${problem.title}

- [문제링크](${problem.link})
- **핵심**: 
- **학습 포인트**: 
- **태그**: ${problem.tags.join(", ")}

`;
    });

    content += `---

## 오늘의 깨달음

`;
  } else {
    content += `### 

`;
  }

  return content;
}

function createTIL() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1);
  const day = String(today.getDate()).padStart(2, "0");

  const dateString = `${month.padStart(2, "0")}${day}`;

  // 현재 월과 비교하여 경로 결정
  const currentMonth = today.getMonth() + 1; // 1-12
  const isCurrentMonth = currentMonth === parseInt(month, 10);

  let targetFolder;
  if (isCurrentMonth) {
    // 현재 월이면 personal/year/ 바로 하위에
    targetFolder = path.join(
      __dirname,
      "..",
      "content",
      "docs",
      "personal",
      year.toString(),
    );
  } else {
    // 현재 월이 아니면 archive 폴더에
    targetFolder = path.join(
      __dirname,
      "..",
      "content",
      "docs",
      "personal",
      year.toString(),
      "archive",
    );
  }

  const filePath = path.join(targetFolder, `${dateString}.mdx`);

  // 대상 폴더가 없으면 생성
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder, { recursive: true });
    console.log(`📁 ${targetFolder} 폴더를 생성했습니다.`);
  }

  // 파일이 이미 존재하는지 확인
  if (fs.existsSync(filePath)) {
    console.log(
      `📝 ${year}년 ${month}월 ${day}일 TIL 파일이 이미 존재합니다: ${dateString}.mdx`,
    );
    // 파일이 이미 존재해도 meta.json은 업데이트
    const metaFolder = path.join(
      __dirname,
      "..",
      "content",
      "docs",
      "personal",
      year.toString(),
    );
    updateMetaJson(metaFolder, dateString);
    return;
  }

  // 오늘의 알고리즘 문제들 가져오기
  const problems = getTodayAlgorithmProblems(today);

  // MDX 파일 내용 생성
  const content = generateTilContent(year, month, day, problems);

  // 파일 생성
  fs.writeFileSync(filePath, content, "utf8");
  console.log(
    `✨ ${year}년 ${month}월 ${day}일 TIL 파일을 생성했습니다: ${dateString}.mdx`,
  );

  // meta.json 업데이트
  const metaFolder = path.join(
    __dirname,
    "..",
    "content",
    "docs",
    "personal",
    year.toString(),
  );
  updateMetaJson(metaFolder, dateString);
}

createTIL();
