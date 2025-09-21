#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { input, select } = require("@inquirer/prompts");
const chalk = require("chalk");

function printHeader() {
  console.clear();
  console.log(
    chalk.cyan.bold("╭─────────────────────────────────────────────╮"),
  );
  console.log(
    chalk.cyan.bold("│") +
      chalk.white.bold("          🎯 알고리즘 문제 추가하기          ") +
      chalk.cyan.bold("│"),
  );
  console.log(
    chalk.cyan.bold("╰─────────────────────────────────────────────╯"),
  );
  console.log();
}

async function getRequiredInput(message) {
  let value;
  do {
    value = await input({
      message: chalk.blue("📝 " + message),
      theme: { prefix: chalk.cyan("?") },
    });
    if (!value.trim()) {
      console.log(chalk.red("❌ 이 필드는 필수입니다. 값을 입력해주세요.\n"));
    }
  } while (!value.trim());
  return value.trim();
}

async function getRequiredTags(message) {
  let value;
  do {
    value = await input({
      message: chalk.blue("🏷️  " + message),
      theme: { prefix: chalk.cyan("?") },
    });
    const tags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    if (tags.length === 0) {
      console.log(
        chalk.red(
          "❌ 태그는 필수입니다. 최소 하나 이상의 태그를 입력해주세요.\n",
        ),
      );
    } else {
      return tags;
    }
  } while (true);
}

async function addAlgorithmProblem() {
  const dataPath = path.join(__dirname, "../src/data/algorithm-records.json");

  try {
    printHeader();

    const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

    const today = new Date()
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\. /g, ".")
      .replace(/\.$/, "");

    let todayRecord = data.find((record) => record.date === today);

    if (!todayRecord) {
      todayRecord = {
        date: today,
        problems: [],
      };
      data.unshift(todayRecord);
    }

    console.log(
      chalk.yellow.bold(`📅 오늘 날짜 (${today})에 문제를 추가합니다.`),
    );
    console.log(chalk.gray("─".repeat(45)));
    console.log();

    const title = await getRequiredInput("문제 제목:");
    const platform = await select({
      message: chalk.blue("🏢 플랫폼을 선택하세요:"),
      choices: [
        { name: "🟢 프로그래머스", value: "프로그래머스" },
        { name: "🔵 백준", value: "백준" },
        { name: "🟡 리트코드", value: "리트코드" },
      ],
      theme: { prefix: chalk.cyan("?") },
    });

    let link;
    if (platform === "프로그래머스") {
      const problemNumber = await getRequiredInput("문제 번호:");
      link = `https://school.programmers.co.kr/learn/courses/30/lessons/${problemNumber}`;
      console.log(chalk.gray(`🔗 생성된 링크: ${link}\n`));
    } else {
      link = await getRequiredInput("링크:");
    }

    const tags = await getRequiredTags("태그 (쉼표로 구분):");

    const newProblem = {
      title,
      platform,
      link,
      tags,
    };

    todayRecord.problems.push(newProblem);

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    console.log();
    console.log(
      chalk.green.bold("╭─────────────────────────────────────────────╮"),
    );
    console.log(
      chalk.green.bold("│") +
        chalk.white.bold("        ✅ 문제가 성공적으로 추가됨!        ") +
        chalk.green.bold("│"),
    );
    console.log(
      chalk.green.bold("╰─────────────────────────────────────────────╯"),
    );
    console.log();
    console.log(chalk.cyan.bold("📋 추가된 문제 정보:"));
    console.log(chalk.gray("─".repeat(25)));
    console.log(chalk.blue.bold("제목:"), chalk.white(newProblem.title));
    console.log(chalk.blue.bold("플랫폼:"), chalk.white(newProblem.platform));
    console.log(chalk.blue.bold("링크:"), chalk.white(newProblem.link));
    console.log(
      chalk.blue.bold("태그:"),
      chalk.white(newProblem.tags.join(", ")),
    );
    console.log();
  } catch (error) {
    console.log();
    console.log(
      chalk.red.bold("╭─────────────────────────────────────────────╮"),
    );
    console.log(
      chalk.red.bold("│") +
        chalk.white.bold("         ❌ 오류가 발생했습니다!          ") +
        chalk.red.bold("│"),
    );
    console.log(
      chalk.red.bold("╰─────────────────────────────────────────────╯"),
    );
    console.log();
    console.log(chalk.red(error.message));
    console.log();
  }
}

addAlgorithmProblem();
