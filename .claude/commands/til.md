---
allowed-tools: Bash, Read, Edit, Grep, Glob
description: TIL 파일 생성 및 내용 자동 작성
---

## TIL 생성 및 내용 작성 프로세스

### 1. TIL 파일 생성

1. `node scripts/til.js` 명령어를 사용하여 기본 TIL 템플릿 파일을 생성합니다.

### 2. Git 커밋 히스토리 분석

1. `git log --oneline --since="YYYY-MM-DD 00:00:00" --until="YYYY-MM-DD 23:59:59"` 명령어로 오늘 날짜의 커밋을 확인합니다.
2. 오늘 날짜의 커밋이 있는 경우, `git show --name-only [커밋해시]` 명령어로 각 커밋의 변경된 파일을 확인합니다.
3. 변경된 파일이 `content/blog`, `content/docs`, `src/data/algorithm-records.json` 중 하나라도 포함된 커밋만 분석 대상으로 합니다.

### 3. 변경사항 분석 및 내용 작성

#### 3-1. src/data/algorithm-records.json 변경사항이 있는 경우

- `content/docs/2025/0727.mdx` 파일의 형식을 참조하여 알고리즘 학습 내용을 요약해서 기록합니다.

#### 3-2. content/blog, content/docs 폴더 변경사항이 있는 경우

- `content/docs/2025/0726.mdx` 파일의 형식을 참조하여 학습 내용을 요약해서 기록합니다.

#### 3-3. content/\*\*, src/data/algorithm-records.json 둘 다 변경사항이 있는 경우

- 두 변경사항을 모두 분석하여 하나의 TIL에 통합합니다.
- 알고리즘 학습 내용(`0727.mdx` 형식)과 일반 학습 내용(`0726.mdx` 형식)을 적절히 조합하여 작성합니다.
- 각 학습 영역을 구분된 섹션으로 나누어 체계적으로 정리합니다.

#### 3-4. 분석 대상 파일의 변경사항이 없는 경우

- 기본 템플릿 형식 그대로 빈 TIL 파일을 유지합니다.

### 4. 실행 단계

1. `node scripts/til.js` 실행하여 기본 템플릿 생성
2. Git 히스토리 분석으로 오늘의 커밋 확인
3. 각 커밋의 변경된 파일이 분석 대상 파일(`content/blog`, `content/docs`, `src/data/algorithm-records.json`)에 포함되는지 확인
4. 분석 대상 파일의 변경사항이 있는 커밋만 선별하여 내용 분석
5. 변경사항 유형에 따라 적절한 기존 TIL 형식을 참조하여 내용 작성:
   - 알고리즘만: `0727.mdx` 형식
   - 일반 학습만: `0726.mdx` 형식
   - 둘 다: 두 형식을 통합하여 섹션별로 구분
6. 생성된 TIL 파일에 분석한 내용을 자동으로 채워넣음
