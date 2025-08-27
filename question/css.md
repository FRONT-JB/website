# CSS 면접 질문

## 1. CSS Preprocessor (Sass/SCSS)에 대해 설명해 주세요. (중요도: 4)

**답변:**
CSS Preprocessor는 CSS 확장 언어로, CSS를 더욱 효율적으로 작성할 수 있게 도와주는 도구입니다.

**Sass (Syntactically Awesome Style Sheets)**
- 들여쓰기 기반 문법 (중괄호와 세미콜론 없음)
- 더 간결한 문법 제공

**SCSS (Sassy CSS)**
- CSS와 유사한 문법 (중괄호와 세미콜론 사용)
- 기존 CSS 코드를 쉽게 전환 가능

**주요 기능**

1. **변수 (Variables)**
   ```scss
   $primary-color: #3498db;
   $font-size: 16px;
   
   .header {
     color: $primary-color;
     font-size: $font-size;
   }
   ```

2. **중첩 (Nesting)**
   ```scss
   .navbar {
     background: white;
     
     ul {
       margin: 0;
       
       li {
         list-style: none;
       }
     }
   }
   ```

3. **믹스인 (Mixins)**
   ```scss
   @mixin border-radius($radius) {
     border-radius: $radius;
     -webkit-border-radius: $radius;
     -moz-border-radius: $radius;
   }
   
   .button {
     @include border-radius(10px);
   }
   ```

4. **상속 (Inheritance)**
   ```scss
   %message-shared {
     border: 1px solid #ccc;
     padding: 10px;
   }
   
   .message {
     @extend %message-shared;
   }
   ```

5. **함수 (Functions)**
   ```scss
   @function calculate-rem($size) {
     $rem-size: $size / 16px;
     @return #{$rem-size}rem;
   }
   
   @function pow($number, $exponent) {
     $value: 1;
     @if $exponent > 0 {
       @for $i from 1 through $exponent {
         $value: $value * $number;
       }
     }
     @return $value;
   }
   
   .title {
     font-size: calculate-rem(24px); // 1.5rem
   }
   
   .square {
     width: pow(4, 2) * 1px; // 16px
   }
   ```

6. **조건문과 반복문**
   ```scss
   // 조건문
   $theme: 'dark';
   
   .header {
     @if $theme == 'dark' {
       background-color: #333;
       color: white;
     } @else if $theme == 'light' {
       background-color: #fff;
       color: #333;
     }
   }
   
   // @for 반복문
   @for $i from 1 through 3 {
     .item-#{$i} {
       width: 2em * $i;
     }
   }
   
   // @each 반복문
   $breakpoints: (small: 480px, medium: 768px, large: 1024px);
   
   @each $name, $size in $breakpoints {
     @media (min-width: $size) {
       .container-#{$name} {
         max-width: $size;
       }
     }
   }
   ```

**지원하는 데이터 타입**
- 숫자: `12`, `34px`, `1.2em`
- 문자열: `"Helvetica"`, `'Arial'`, `sans-serif`
- 색상: `#333`, `red`, `rgba(255,0,0,0.5)`
- 불린: `true`, `false`
- null: `null`
- 리스트: `margin: 10px 15px 0 0`
- 맵: `(key1: value1, key2: value2)`

**컴파일**
```bash
# Sass CLI 설치
npm install -g sass

# 컴파일
sass input.scss output.css

# 감시 모드
sass --watch input.scss:output.css
```

**장점**
- 코드 재사용성 향상
- 유지보수 용이
- 더 구조화된 CSS 작성 가능
- 변수와 함수 사용으로 동적 스타일링 가능
- 조건문/반복문으로 프로그래밍적 요소 제공

---

## 2. CSS Position 속성에 대해 설명해 주세요. (중요도: 5)

**답변:**
CSS Position 속성은 HTML 요소를 웹페이지에서 배치하는 방법을 결정합니다.

**static (기본값)**
- 일반적인 문서 흐름에 따라 배치
- top, right, bottom, left 속성이 적용되지 않음
- z-index가 적용되지 않음

**relative**
- 일반적인 위치를 기준으로 상대적 배치
- 원래 위치는 그대로 차지하고 있음
- top, right, bottom, left로 위치 조정 가능
- 다른 요소들은 해당 요소가 이동하지 않은 것처럼 배치됨

**absolute**
- 가장 가까운 positioned 조상 요소를 기준으로 배치
- 일반적인 문서 흐름에서 제거됨
- 조상 요소가 없으면 body를 기준으로 배치
- 스크롤해도 위치 고정되지 않음

**fixed**
- viewport를 기준으로 배치
- 일반적인 문서 흐름에서 제거됨
- 스크롤해도 항상 같은 위치에 고정
- 모달, 네비게이션 바 등에 주로 사용

**sticky**
- 스크롤 위치에 따라 relative와 fixed 사이를 전환
- 지정된 임계값을 넘으면 fixed처럼 동작
- 부모 요소의 범위를 벗어나면 다시 일반 흐름을 따름

**사용 예시:**
```css
/* Sticky Header */
.header {
  position: sticky;
  top: 0;
  background: white;
  z-index: 100;
}

/* Modal Overlay */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Tooltip */
.tooltip {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
}
```

---

## 3. CSS Margin과 Padding의 차이점을 설명해 주세요. (중요도: 4)

**답변:**
Margin과 Padding은 모두 요소 주변의 공간을 조절하는 속성이지만, 적용되는 영역과 동작 방식이 다릅니다.

**Margin (외부 여백)**
- 요소의 경계 바깥쪽 공간
- 다른 요소와의 거리를 조절
- 배경색이 적용되지 않음
- 음수값 사용 가능
- 인접한 margin끼리 겹침(margin collapse) 발생 가능

**Padding (내부 여백)**
- 요소의 경계 안쪽, 콘텐츠와 경계 사이의 공간
- 요소 내부의 여백을 조절
- 요소의 배경색이나 배경 이미지가 적용됨
- 음수값 사용 불가
- 겹침 현상 없음

**Box Model에서의 위치:**
```
┌─────────────────────────────────┐
│           Margin                │
│  ┌─────────────────────────┐    │
│  │        Border           │    │
│  │  ┌─────────────────┐    │    │
│  │  │    Padding      │    │    │
│  │  │  ┌───────────┐  │    │    │
│  │  │  │  Content  │  │    │    │
│  │  │  └───────────┘  │    │    │
│  │  └─────────────────┘    │    │
│  └─────────────────────────┘    │
└─────────────────────────────────┘
```

**사용 예시:**
```css
.element {
  margin: 20px;    /* 다른 요소와 20px 간격 */
  padding: 15px;   /* 내용과 경계 사이 15px 간격 */
  border: 2px solid black;
}

/* 방향별 지정 */
.box {
  margin-top: 10px;
  margin-right: 15px;
  margin-bottom: 10px;
  margin-left: 15px;
  /* 또는 margin: 10px 15px; */
  
  padding-top: 5px;
  padding-right: 10px;
  padding-bottom: 5px;
  padding-left: 10px;
  /* 또는 padding: 5px 10px; */
}
```

**주요 차이점:**
1. **적용 영역**: Margin은 요소 외부, Padding은 요소 내부
2. **배경**: Padding 영역에는 배경이 적용되지만 Margin 영역에는 적용되지 않음
3. **클릭 영역**: Padding 영역은 클릭 가능하지만 Margin 영역은 불가능
4. **Collapse**: 세로 margin은 겹칠 수 있지만 padding은 겹치지 않음
5. **음수값**: Margin은 음수값 가능, Padding은 불가능

---

## 4. CSS Reflow와 Repaint에 대해 설명해 주세요. (중요도: 5)

**답변:**
Reflow와 Repaint는 브라우저가 웹 페이지를 렌더링하는 과정에서 발생하는 중요한 개념입니다.

**Reflow (리플로우)**
- DOM 요소의 기하학적 속성(위치, 크기)이 변경될 때 발생
- 레이아웃을 다시 계산하는 과정
- 페이지의 일부 또는 전체를 다시 렌더링
- 성능상 비용이 높은 작업

**Reflow를 발생시키는 속성:**
- width, height
- margin, padding
- border
- position
- top, left, right, bottom
- font-size
- display
- float
- overflow

**Repaint (리페인트)**
- 요소의 외관 변화가 레이아웃에 영향을 주지 않을 때 발생
- 색상, 투명도 등의 시각적 속성만 변경
- Reflow보다 성능상 비용이 낮음

**Repaint만 발생시키는 속성:**
- color
- background-color
- visibility
- border-style
- border-radius
- box-shadow
- opacity (경우에 따라)

**성능 최적화 방법:**

1. **CSS 변경 최소화**
   ```javascript
   // 나쁜 예
   element.style.width = '100px';
   element.style.height = '100px';
   element.style.margin = '10px';
   
   // 좋은 예
   element.className = 'optimized-class';
   ```

2. **DOM 조작 최소화**
   ```javascript
   // 나쁜 예
   for (let i = 0; i < items.length; i++) {
     document.body.appendChild(items[i]);
   }
   
   // 좋은 예
   const fragment = document.createDocumentFragment();
   for (let i = 0; i < items.length; i++) {
     fragment.appendChild(items[i]);
   }
   document.body.appendChild(fragment);
   ```

3. **CSS Transform 활용**
   ```css
   /* Reflow 발생 */
   .element {
     left: 100px;
     top: 100px;
   }
   
   /* Transform 사용 (GPU 가속) */
   .element {
     transform: translate(100px, 100px);
   }
   ```

4. **will-change 속성 활용**
   ```css
   .element {
     will-change: transform;
   }
   ```

**브라우저 최적화:**
- 브라우저는 여러 변경사항을 한 번에 처리하려고 시도
- 강제로 레이아웃 정보에 접근하면 즉시 Reflow 발생
- 애니메이션 시에는 transform과 opacity 사용 권장

**측정 방법:**
- 브라우저 개발자 도구의 Performance 탭
- Layout과 Paint 이벤트 모니터링
- 실제 성능 영향 측정 후 최적화 적용

---

## 5. CSS 단위 px, em, rem의 차이점을 설명해 주세요. (중요도: 5)

**답변:**
CSS에서 사용하는 주요 크기 단위들의 특징과 차이점입니다.

**px (픽셀)**
- 절대 단위
- 화면의 픽셀 하나를 기준으로 함
- 고정된 크기로 반응형 디자인에 제한적
- 정확한 크기 제어가 필요할 때 사용

```css
.element {
  font-size: 16px;  /* 항상 16픽셀 */
  width: 200px;     /* 항상 200픽셀 */
}
```

**em**
- 상대 단위
- 부모 요소의 font-size를 기준으로 계산
- 중첩될 경우 계산이 복잡해질 수 있음
- 컴포넌트의 상대적 크기 조절에 유용

```css
.parent {
  font-size: 20px;
}

.child {
  font-size: 1.2em;  /* 20px × 1.2 = 24px */
  padding: 0.5em;    /* 24px × 0.5 = 12px (자신의 font-size 기준) */
}

.nested {
  font-size: 1.2em;  /* 24px × 1.2 = 28.8px */
}
```

**rem (root em)**
- 상대 단위
- 루트 요소(html)의 font-size를 기준으로 계산
- 중첩 문제 없이 일관된 크기 계산 가능
- 반응형 디자인에 가장 적합

```css
html {
  font-size: 16px;  /* 1rem = 16px */
}

.element {
  font-size: 1.5rem;    /* 16px × 1.5 = 24px */
  margin: 2rem;         /* 16px × 2 = 32px */
  padding: 0.75rem;     /* 16px × 0.75 = 12px */
}

/* 반응형 예시 */
@media (max-width: 768px) {
  html {
    font-size: 14px;  /* 모든 rem 단위가 비례적으로 축소 */
  }
}
```

**사용 권장사항:**
- **px**: 테두리, 그림자 등 정확한 픽셀 제어가 필요한 경우
- **em**: 컴포넌트 내부의 상대적 크기 (padding, margin 등)
- **rem**: 전체적인 텍스트 크기, 레이아웃 크기

**실무 예시:**
```css
/* 반응형 타이포그래피 */
html {
  font-size: 16px;
}

h1 {
  font-size: 2.5rem;    /* 40px, 반응형 대응 */
}

.button {
  padding: 0.75rem 1.5rem;  /* 12px 24px, 글꼴 크기에 비례 */
  border: 1px solid #ccc;    /* 정확한 경계선 */
  border-radius: 0.25rem;    /* 4px, 비례적 모서리 */
}
```

---

## 6. CSS 뷰포트 단위(vh, vw, vmin, vmax)에 대해 설명해 주세요. (중요도: 4)

**답변:**
뷰포트 단위는 브라우저의 뷰포트 크기를 기준으로 하는 상대 단위입니다.

**vh (Viewport Height)**
- 뷰포트 높이의 1%
- 1vh = 뷰포트 높이의 1/100

**vw (Viewport Width)**
- 뷰포트 너비의 1%
- 1vw = 뷰포트 너비의 1/100

**vmin (Viewport Minimum)**
- 뷰포트의 너비와 높이 중 작은 값의 1%
- 1vmin = min(1vw, 1vh)

**vmax (Viewport Maximum)**
- 뷰포트의 너비와 높이 중 큰 값의 1%
- 1vmax = max(1vw, 1vh)

**사용 예시:**
```css
/* 전체 화면 섹션 */
.hero-section {
  height: 100vh;        /* 화면 전체 높이 */
  width: 100vw;         /* 화면 전체 너비 */
}

/* 반응형 텍스트 크기 */
.responsive-title {
  font-size: 4vw;       /* 뷰포트 너비에 비례 */
  max-font-size: 3rem;  /* 최대 크기 제한 */
  min-font-size: 1.5rem; /* 최소 크기 제한 */
}

/* 정사각형 유지 */
.square {
  width: 50vmin;        /* 작은 쪽 기준으로 정사각형 */
  height: 50vmin;
}

/* 모달 창 */
.modal {
  width: 80vw;
  height: 60vh;
  max-width: 800px;
  max-height: 600px;
}
```

**실제 계산 예시:**
```
뷰포트 크기: 1920px × 1080px

vh: 1vh = 1080px / 100 = 10.8px
vw: 1vw = 1920px / 100 = 19.2px
vmin: 1vmin = min(19.2px, 10.8px) = 10.8px
vmax: 1vmax = max(19.2px, 10.8px) = 19.2px
```

**주의사항:**
- 모바일에서 주소창/툴바 높이 변화로 vh 값이 변할 수 있음
- 브라우저 호환성 확인 필요
- 과도한 사용 시 접근성 문제 발생 가능

---

## 7. CSS Flexbox와 CSS Grid의 차이점과 사용 시나리오를 설명해 주세요. (중요도: 5)

**답변:**
Flexbox와 Grid는 모두 레이아웃을 위한 CSS 기술이지만 서로 다른 목적과 특징을 가집니다.

**Flexbox (1차원 레이아웃)**
- 한 방향(행 또는 열)으로만 아이템을 배치
- 컨테이너 내 아이템들 간의 공간 분배와 정렬에 특화
- 유연한 크기 조정과 순서 변경 가능

```css
.flex-container {
  display: flex;
  justify-content: space-between;  /* 수평 정렬 */
  align-items: center;             /* 수직 정렬 */
  flex-direction: row;             /* 방향 설정 */
}

.flex-item {
  flex: 1;        /* 동일한 크기로 확장 */
  flex-grow: 1;   /* 확장 비율 */
  flex-shrink: 0; /* 축소 방지 */
}
```

**CSS Grid (2차원 레이아웃)**
- 행과 열을 동시에 제어하는 2차원 레이아웃
- 복잡한 레이아웃 구조를 간단하게 구현
- 명시적인 그리드 라인과 영역 정의 가능

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* 3개 열 */
  grid-template-rows: auto 1fr auto;      /* 3개 행 */
  grid-gap: 20px;                         /* 간격 */
  
  grid-template-areas: 
    "header header header"
    "sidebar main aside"
    "footer footer footer";
}

.grid-item {
  grid-area: main;                        /* 영역 할당 */
  grid-column: 2 / 4;                     /* 열 위치 */
  grid-row: 1 / span 2;                   /* 행 위치와 크기 */
}
```

**사용 시나리오 비교:**

**Flexbox 사용 케이스:**
- 네비게이션 바
- 카드 목록 (균등 분할)
- 센터링 정렬
- 동적 크기 조정이 필요한 컴포넌트

```css
/* 네비게이션 예시 */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-links {
  display: flex;
  gap: 1rem;
}

/* 카드 목록 예시 */
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  flex: 1 1 300px;  /* 최소 300px, 균등 확장 */
}
```

**Grid 사용 케이스:**
- 전체 페이지 레이아웃
- 복잡한 카드 그리드
- 반응형 이미지 갤러리
- 대시보드 레이아웃

```css
/* 페이지 레이아웃 예시 */
.page-layout {
  display: grid;
  min-height: 100vh;
  grid-template-areas: 
    "header"
    "main"
    "footer";
  grid-template-rows: auto 1fr auto;
}

/* 반응형 갤러리 예시 */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: 200px;
  gap: 1rem;
}
```

**선택 가이드라인:**
- **1차원 정렬** → Flexbox
- **2차원 레이아웃** → Grid
- **컴포넌트 레벨** → Flexbox
- **페이지 레벨** → Grid
- **동적 크기** → Flexbox
- **고정된 구조** → Grid

**함께 사용하기:**
```css
.page {
  display: grid;
  grid-template-areas: "header" "main" "footer";
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2rem;
}

---

## 8. CSS 우선순위(Specificity)와 캐스케이딩에 대해 설명해 주세요. (중요도: 5)

**답변:**
CSS의 우선순위는 여러 규칙이 같은 요소에 적용될 때 어떤 스타일이 최종적으로 적용될지 결정하는 메커니즘입니다.

**우선순위 계산 방식:**
CSS 우선순위는 4단계로 구성되며, 왼쪽부터 높은 순위를 가집니다.

```
[인라인 스타일] [ID 선택자] [클래스/속성/가상클래스] [요소 선택자]
      1000          100              10                   1
```

**우선순위 예시:**
```css
/* 우선순위: 0001 */
div {
  color: black;
}

/* 우선순위: 0010 */
.text {
  color: blue;
}

/* 우선순위: 0011 */
div.text {
  color: green;
}

/* 우선순위: 0100 */
#content {
  color: red;
}

/* 우선순위: 0111 */
div#content.text {
  color: purple;
}

/* 우선순위: 1000 */
<div style="color: orange;">텍스트</div>
```

**!important 규칙:**
- 가장 높은 우선순위를 가짐
- 남용하면 유지보수가 어려워짐
- 가능한 사용을 피하는 것이 좋음

```css
.text {
  color: blue !important; /* 다른 모든 규칙보다 우선 */
}

#content {
  color: red; /* !important가 있는 규칙에 밀림 */
}
```

**캐스케이딩 규칙:**
같은 우선순위일 때는 다음 순서로 적용됩니다:

1. **소스 순서**: 나중에 선언된 규칙이 우선
2. **중요도**: !important 선언
3. **출처**: 사용자 스타일 < 사이트 스타일 < 사용자 !important 스타일

```css
/* 같은 우선순위 (0010)일 때 */
.button {
  background: blue; /* 이 규칙이 먼저 선언됨 */
}

.button {
  background: red;  /* 이 규칙이 최종 적용됨 */
}
```

**실무에서의 우선순위 관리:**

**좋은 예시:**
```css
/* 구체성을 점진적으로 높이기 */
.card { }                    /* 기본 스타일 */
.card.featured { }           /* 특별한 상태 */
.card.featured.premium { }   /* 더 구체적인 상태 */
```

**피해야 할 예시:**
```css
/* ID 선택자 남용 */
#header #nav #menu li a { } /* 과도하게 구체적 */

/* !important 남용 */
.text {
  color: blue !important;
  font-size: 16px !important;
  margin: 10px !important;
}
```

**우선순위 디버깅 팁:**
1. 브라우저 개발자 도구에서 스타일 확인
2. 취소선으로 표시된 규칙은 다른 규칙에 의해 덮어써진 것
3. computed 탭에서 최종 적용된 값 확인

**BEM 방법론으로 우선순위 관리:**
```css
/* BEM 방법론 사용 시 우선순위가 일정함 */
.card { }                    /* 0010 */
.card__header { }            /* 0010 */
.card__body { }              /* 0010 */
.card--featured { }          /* 0010 */
.card__header--large { }     /* 0010 */
```

이렇게 하면 우선순위 충돌을 최소화하고 예측 가능한 스타일링이 가능합니다.