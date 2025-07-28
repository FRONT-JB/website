---
allowed-tools: Bash, Read, Edit, Grep, Glob
description: TIL 파일 생성 및 내용 자동 작성
---

## TIL 생성 및 내용 작성 프로세스

### 1. TIL 파일 생성

1. `node scripts/til.js` 명령어를 사용하여 기본 TIL 템플릿 파일을 생성합니다.

### 2. Git 커밋 히스토리 분석

1. `git log --oneline --since="YYYY-MM-DD 00:00:00" --until="YYYY-MM-DD 23:59:59"` 명령어로 오늘 날짜의 커밋을 확인합니다.
2. 오늘 날짜의 커밋이 있는 경우 해당 커밋들을 분석합니다.

### 3. 변경사항 분석 및 내용 작성

#### 3-1. algorithm-records.json 변경사항이 있는 경우

- `content/docs/2025/0727.mdx` 파일의 형식을 참조하여 알고리즘 학습 내용을 요약해서 기록합니다.

#### 3-2. /content/blog, /content/docs 폴더 변경사항이 있는 경우

- `content/docs/2025/0726.mdx` 파일의 형식을 참조하여 학습 내용을 요약해서 기록합니다.

#### 3-3. 커밋 변경사항이 없는 경우

- 기본 템플릿 형식 그대로 빈 TIL 파일을 유지합니다.

### 4. 실행 단계

1. `node scripts/til.js` 실행하여 기본 템플릿 생성
2. Git 히스토리 분석으로 오늘의 변경사항 확인
3. 변경사항에 따라 적절한 기존 TIL 형식을 참조하여 내용 작성
4. 생성된 TIL 파일에 분석한 내용을 자동으로 채워넣음
