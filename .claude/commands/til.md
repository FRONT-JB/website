---
allowed-tools: Bash, Read, Edit, Grep, Glob
description: TIL 파일 생성 및 내용 자동 작성
---

## TIL 생성 및 내용 작성 프로세스

### 1. TIL 파일 생성

1. `node scripts/til.js` 명령어를 사용하여 기본 TIL 템플릿 파일을 생성합니다.
2. **파일 위치 결정**: 현재 월과 비교하여 TIL 파일 위치를 결정합니다.
   - 현재 월(9월)인 경우: `content/docs/personal/YYYY/` 바로 하위에 생성
   - 현재 월이 아닌 경우: `content/docs/personal/YYYY/archive/` 하위에 생성
3. 만약 오늘 날짜의 TIL 파일이 이미 존재하고 커밋되어 있다면, 해당 커밋 이후의 변경사항들을 찾아서 기존 내용에 추가로 정리합니다.

### 2. Git 커밋 히스토리 분석

1. TIL 스크립트를 실행한 시점의 날짜(오늘)만을 대상으로 합니다.
2. `git log --oneline --since="YYYY-MM-DD 00:00:00" --until="YYYY-MM-DD 23:59:59"` 명령어로 오늘 날짜의 커밋만 확인합니다.
3. 만약 오늘 날짜의 TIL 파일이 이미 커밋되어 있다면, 해당 TIL 커밋 이후의 변경사항만 분석합니다.
   - `git log --oneline --since="[TIL_커밋_시각]" --until="YYYY-MM-DD 23:59:59"` 명령어로 TIL 커밋 이후부터 오늘 끝까지의 커밋들을 확인합니다.
4. 오늘 날짜의 커밋이 있는 경우, `git show --name-only [커밋해시]` 명령어로 각 커밋의 변경된 파일을 확인합니다.
5. 변경된 파일이 `content/blog`, `content/docs`, `src/data/algorithm-records.json` 중 하나라도 포함된 커밋만 분석 대상으로 합니다.
6. `chore:`, `style:` 프리픽스가 달린 커밋은 분석 대상에서 제외합니다.

### 3. 변경사항 분석 및 내용 작성

#### 3-1. src/data/algorithm-records.json 변경사항이 있는 경우

- `content/docs/personal/2025/archive/0727.mdx` 파일의 형식을 참조하여 알고리즘 학습 내용을 요약해서 기록합니다.

#### 3-2. content/blog, content/docs 폴더 변경사항이 있는 경우

- `content/docs/personal/2025/archive/0726.mdx` 파일의 형식을 참조하여 학습 내용을 요약해서 기록합니다.

#### 3-3. content/\*\*, src/data/algorithm-records.json 둘 다 변경사항이 있는 경우

- 두 변경사항을 모두 분석하여 하나의 TIL에 통합합니다.
- 알고리즘 학습 내용(`0727.mdx` 형식)과 일반 학습 내용(`0726.mdx` 형식)을 적절히 조합하여 작성합니다.
- 각 학습 영역을 구분된 섹션으로 나누어 체계적으로 정리합니다.

#### 3-4. 분석 대상 파일의 변경사항이 없는 경우

- 기본 템플릿 형식 그대로 빈 TIL 파일을 유지합니다.

#### 3-5. 기존 TIL 파일이 커밋되어 있고 추가 변경사항이 있는 경우

- 기존 TIL 내용을 유지하면서 새로운 변경사항을 추가 섹션으로 작성합니다.
- "추가 학습 내용" 또는 "오후 학습" 등의 섹션을 만들어 구분합니다.
- 기존 요약 부분도 새로운 내용을 반영하여 업데이트합니다.

### 4. 실행 단계

1. `node scripts/til.js` 실행하여 기본 템플릿 생성 (파일이 이미 존재하면 스킵)
   - 현재 월인 경우 `personal/YYYY/` 바로 하위에 생성
   - 과거 월인 경우 `personal/YYYY/archive/` 하위에 생성
2. TIL 스크립트 실행 시점의 날짜(오늘)에 해당하는 커밋만 분석 대상으로 제한
3. Git 히스토리 분석으로 오늘의 커밋 확인
4. 오늘 날짜의 TIL 파일이 이미 커밋되어 있는지 확인
   - 커밋되어 있다면: TIL 커밋 이후부터 오늘 끝까지의 변경사항만 분석
   - 커밋되어 있지 않다면: 오늘 전체 커밋 분석
5. 각 커밋의 변경된 파일이 분석 대상 파일(`content/blog`, `content/docs`, `src/data/algorithm-records.json`)에 포함되는지 확인
6. `chore:`, `style:` 프리픽스가 달린 커밋은 분석 대상에서 제외
7. 분석 대상 파일의 변경사항이 있고 `chore:`, `style:` 프리픽스가 없는 오늘 날짜 커밋만 선별하여 내용 분석
8. 변경사항 유형에 따라 적절한 기존 TIL 형식을 참조하여 내용 작성:
   - 알고리즘만: `content/docs/personal/2025/archive/0727.mdx` 형식
   - 일반 학습만: `content/docs/personal/2025/archive/0726.mdx` 형식
   - 둘 다: 두 형식을 통합하여 섹션별로 구분
   - 기존 TIL에 추가: 기존 내용 유지하면서 새 섹션 추가
9. 생성된 TIL 파일에 분석한 내용을 자동으로 채워넣음
