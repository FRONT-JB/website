# Frontend 면접 질문

## 1. DNS에 대해 설명해 주세요. (중요도: 5)

**답변:**
도메인 이름 시스템 서버(Domain Name System Servers)는 URL들의 이름과 IP주소를 저장하고 있는 데이터베이스로, 웹사이트를 위한 주소록입니다.
숫자로 된 IP주소 대신 사용자가 사용하기 편리하도록 주소를 매핑해 주는 역할을 합니다.

---

## 2. 브라우저 렌더링 과정에 대해 설명해 주세요. (중요도: 5)

**답변:**
브라우저 렌더링은 HTML, CSS, JavaScript 파일을 사용자가 웹사이트를 볼 수 있도록 해주는 과정입니다.

1. **파싱(Parsing)**: HTML 파일을 파싱해서 DOM Tree를 구성합니다.
2. **스타일**: CSS 파일을 파싱해서 CSSOM Tree를 구성합니다.
3. **렌더 트리**: DOM Tree와 CSSOM Tree를 결합하여 Render Tree를 구성합니다.
4. **레이아웃**: 각 노드들의 스크린에서의 좌표에 따라 위치를 결정합니다.
5. **페인트**: 실제 화면에 그립니다.

---

## 3. REST API에 대해 설명해 주세요. (중요도: 5)

**답변:**
REST API는 REST 아키텍처의 제약조건을 준수하는 애플리케이션 프로그래밍 인터페이스를 뜻합니다.

**REST의 특징**
1. **Stateless(무상태)**: 각 요청 간 클라이언트의 콘텍스트가 서버에 저장되어서는 안 됩니다.
2. **Cacheable(캐시 처리 가능)**: 웹에서 사용하는 기존 인프라를 그대로 활용이 가능합니다.
3. **Self-descriptiveness(자체 표현 구조)**: REST API 메시지만 보고도 이를 쉽게 이해할 수 있는 자체 표현 구조로 되어 있습니다.
4. **Client - Server 구조**: 클라이언트는 유저와 관련된 처리를, 서버는 REST API를 제공함으로써 각각의 역할이 확실하게 구분되고 일괄적인 인터페이스로 분리되어 작동할 수 있게 합니다.
5. **계층형 구조**: 다중 계층으로 구성될 수 있으며 보안, 로드 밸런싱, 암호화 계층을 추가해 구조상의 유연함을 둘 수 있습니다.

---

## 4. HTTP와 HTTPS의 차이점에 대해 설명해 주세요. (중요도: 5)

**답변:**
HTTP는 서버/클라이언트 모델을 따라 데이터를 주고받기 위한 프로토콜입니다.
HTTPS는 HTTP에 데이터 암호화가 추가된 프로토콜입니다.

**HTTP의 문제점**
- 평문 통신이기 때문에 도청이 가능합니다.
- 통신 상대를 확인하지 않기 때문에 위장이 가능합니다.
- 완전성을 증명할 수 없기 때문에 변조가 가능합니다.

**HTTPS의 특징**
- 데이터가 암호화되어 전송됩니다.
- SSL/TLS 인증서를 통해 서버의 신원을 확인할 수 있습니다.
- 데이터 무결성을 보장합니다.

---

## 5. CSR과 SSR의 차이점에 대해 설명해 주세요. (중요도: 5)

**답변:**
CSR(Client Side Rendering)은 클라이언트에서 페이지를 렌더링하는 방식이고,
SSR(Server Side Rendering)은 서버에서 페이지를 렌더링하는 방식입니다.

**CSR의 특징**
- 장점: 첫 로딩만 기다리면, 동적으로 빠르게 렌더링이 됩니다. 서버에게 추가적인 요청을 보내지 않아도 됩니다.
- 단점: 첫 페이지 로딩 시간이 길어집니다. SEO에 문제가 있을 수 있습니다.

**SSR의 특징**
- 장점: 첫 페이지 로딩이 빠릅니다. SEO에 유리합니다.
- 단점: 매번 서버에 요청을 해야 합니다.

---

## 6. SPA에 대해 설명해 주세요. (중요도: 5)

**답변:**
SPA(Single Page Application)는 하나의 HTML 페이지와 애플리케이션 실행에 필요한 JavaScript와 CSS 같은 모든 자산을 로드하는 애플리케이션입니다.
페이지 또는 후속 페이지의 상호작용은 서버로부터 새로운 페이지를 불러오지 않으므로 페이지가 다시 로드되지 않습니다.

**장점**
- 빠르고 반응성이 좋습니다.
- 서버에 대한 HTTP 요청 수가 줄어듭니다.
- 프론트엔드와 백엔드의 분리로 개발 효율성이 높습니다.

**단점**
- 초기 로딩 속도가 느릴 수 있습니다.
- SEO에 불리할 수 있습니다.
- 보안 문제가 발생할 수 있습니다.

---

## 7. SEO에 대해 설명해 주세요. (중요도: 5)

**답변:**
SEO(Search Engine Optimization)는 검색 엔진 최적화를 뜻하며, 검색 엔진에서 찾기 쉽도록 사이트를 개선하는 프로세스입니다.

**SEO를 위한 방법들**
- 적절한 HTML 태그 사용 (title, meta, h1~h6 등)
- 시맨틱 마크업 사용
- 이미지에 alt 속성 추가
- 사이트맵 제공
- 모바일 친화적인 웹사이트 구축
- 페이지 로딩 속도 최적화
- HTTPS 사용
- 소셜 미디어 메타 태그 활용

---

## 8. CSS 선택자 우선순위에 대해 설명해 주세요. (중요도: 5)

**답변:**
CSS 선택자 우선순위는 동일한 요소에 둘 이상의 CSS 규칙이 적용될 때 어떤 규칙을 적용할지 결정하는 방법입니다.

**우선순위 순서**
1. **인라인 스타일**: 1000점
2. **ID 선택자**: 100점
3. **클래스 선택자, 속성 선택자, 가상 클래스**: 10점
4. **요소 선택자, 가상 요소**: 1점

**중요한 규칙들**
- !important는 모든 우선순위를 무시합니다.
- 같은 우선순위라면 나중에 선언된 스타일이 적용됩니다.
- 상속된 스타일은 직접 적용된 스타일보다 우선순위가 낮습니다.

---

## 9. JavaScript 호이스팅에 대해 설명해 주세요. (중요도: 5)

**답변:**
호이스팅(Hoisting)은 변수 선언과 함수 선언이 해당 스코프의 최상단으로 끌어올려지는 JavaScript의 특성입니다.

**var 키워드**
- 변수 선언이 스코프 최상단으로 호이스팅됩니다.
- 초기화는 호이스팅되지 않아 undefined 값을 갖습니다.

**let, const 키워드**
- 변수 선언은 호이스팅되지만 초기화는 되지 않습니다.
- Temporal Dead Zone에 의해 선언 전 접근 시 ReferenceError가 발생합니다.

**함수 선언문**
- 함수 전체가 호이스팅되어 선언 전에도 호출 가능합니다.

**함수 표현식**
- 변수만 호이스팅되고 함수는 호이스팅되지 않습니다.

---

## 10. 이벤트 버블링과 캡처링에 대해 설명해 주세요. (중요도: 5)

**답변:**
이벤트 버블링과 캡처링은 DOM에서 이벤트가 전파되는 방식입니다.

**이벤트 버블링(Event Bubbling)**
- 이벤트가 발생한 요소에서 시작하여 부모 요소로 전파되는 방식
- 기본적으로 모든 이벤트는 버블링됩니다.

**이벤트 캡처링(Event Capturing)**
- 최상위 부모 요소에서 시작하여 이벤트가 발생한 요소로 전파되는 방식
- addEventListener의 세 번째 매개변수를 true로 설정하면 캡처링 단계에서 이벤트를 처리합니다.

**이벤트 전파 중단**
- event.stopPropagation(): 이벤트 전파를 중단합니다.
- event.preventDefault(): 기본 동작을 취소합니다.

---

## 11. Promise와 async/await에 대해 설명해 주세요. (중요도: 5)

**답변:**
Promise는 JavaScript에서 비동기 작업을 처리하기 위한 객체이며, async/await은 Promise를 더 쉽게 사용할 수 있게 해주는 문법입니다.

**Promise의 상태**
- **Pending**: 비동기 처리가 아직 완료되지 않은 상태
- **Fulfilled**: 비동기 처리가 성공적으로 완료된 상태
- **Rejected**: 비동기 처리가 실패한 상태

**Promise의 메서드**
- then(): 성공했을 때 실행할 콜백 함수를 등록
- catch(): 실패했을 때 실행할 콜백 함수를 등록
- finally(): 성공/실패 여부와 상관없이 실행할 콜백 함수를 등록

**async/await**
- async 함수는 항상 Promise를 반환합니다.
- await 키워드는 Promise가 처리될 때까지 기다립니다.
- try-catch 문으로 에러 처리가 가능합니다.

---

## 12. 클로저에 대해 설명해 주세요. (중요도: 5)

**답변:**
클로저(Closure)는 함수가 선언될 당시의 렉시컬 환경(Lexical Environment)을 기억하여, 함수가 스코프 밖에서 실행될 때에도 그 환경에 접근할 수 있게 하는 개념입니다.

**클로저의 특징**
- 외부 함수의 변수에 접근할 수 있습니다.
- 외부 함수가 종료된 후에도 외부 함수의 변수에 접근 가능합니다.
- 데이터 프라이버시를 제공합니다.

**클로저의 활용**
- 데이터 은닉과 캡슐화
- 모듈 패턴 구현
- 콜백 함수에서 상태 유지
- 함수형 프로그래밍에서의 커링(Currying)

---

## 13. JavaScript 프로토타입에 대해 설명해 주세요. (중요도: 5)

**답변:**
프로토타입(Prototype)은 JavaScript에서 객체 간 상속을 구현하는 메커니즘입니다.
모든 JavaScript 객체는 다른 객체로의 참조인 프로토타입을 가지고 있습니다.

**프로토타입 체인**
- 객체의 프로퍼티나 메서드에 접근할 때, 해당 객체에 없으면 프로토타입 체인을 따라 상위 프로토타입에서 찾습니다.
- 프로토타입 체인의 끝은 Object.prototype입니다.

**프로토타입 활용**
- 생성자 함수의 prototype 프로퍼티를 통해 메서드와 프로퍼티를 공유할 수 있습니다.
- 메모리 효율성을 높일 수 있습니다.
- 객체 간 상속 관계를 구현할 수 있습니다.

---

## 14. this 바인딩에 대해 설명해 주세요. (중요도: 5)

**답변:**
this는 JavaScript에서 실행 컨텍스트에 따라 다른 값을 참조하는 키워드입니다.

**this 바인딩 규칙**
1. **기본 바인딩**: 전역 객체(브라우저에서는 window)에 바인딩
2. **암시적 바인딩**: 메서드 호출 시 해당 객체에 바인딩
3. **명시적 바인딩**: call, apply, bind 메서드를 사용하여 명시적으로 바인딩
4. **new 바인딩**: new 키워드로 생성자 함수 호출 시 새로 생성된 객체에 바인딩

**화살표 함수의 this**
- 화살표 함수는 자신의 this를 가지지 않고, 상위 스코프의 this를 상속받습니다.
- call, apply, bind로 this를 변경할 수 없습니다.

---

## 15. CORS에 대해 설명해 주세요. (중요도: 5)

**답변:**
CORS(Cross-Origin Resource Sharing)는 웹 페이지가 다른 도메인, 프로토콜, 포트의 리소스에 접근할 수 있도록 허용하는 메커니즘입니다.

**동일 출처 정책(Same-Origin Policy)**
- 보안상의 이유로 웹 브라우저는 동일한 출처의 리소스만 접근을 허용합니다.
- 출처는 프로토콜, 도메인, 포트가 모두 같아야 합니다.

**CORS 동작 방식**
1. **Simple Request**: GET, HEAD, POST 메서드로 단순한 요청
2. **Preflight Request**: OPTIONS 메서드로 사전 요청을 보내 서버의 허용 여부를 확인

**CORS 해결 방법**

**1. 개발 단계에서 쉽게 해결**
- 웹 브라우저 실행 옵션이나 플러그인을 통한 동일 출처 정책 회피
- Chrome: `google-chrome --disable-web-security --user-data-dir`
- Chrome 확장: CORS Unblock, Allow CORS

**2. JSONP 방식**
```javascript
// JSONP 요청 예시
function jsonpRequest(url, callbackName) {
  const script = document.createElement('script');
  script.src = url + '?callback=' + callbackName;
  document.head.appendChild(script);
}

// 콜백 함수 정의
function handleResponse(data) {
  console.log(data);
}

// JSONP 요청 실행
jsonpRequest('https://example.com/api/data', 'handleResponse');
```

**3. 서버에서 CORS 헤더 설정**

**Node.js (Express)**
```javascript
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
```

**PHP**
```php
<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
?>
```

**CORS 헤더 설명**
- `Access-Control-Allow-Origin`: 요청을 허용할 출처
- `Access-Control-Allow-Methods`: 허용할 HTTP 메서드
- `Access-Control-Allow-Headers`: 허용할 헤더
- `Access-Control-Allow-Credentials`: 쿠키 전송 허용 여부

---

## 16. Webpack에 대해 설명해 주세요. (중요도: 5)

**답변:**
Webpack은 JavaScript 애플리케이션을 위한 모듈 번들러입니다.
여러 개의 파일과 모듈을 하나 또는 여러 개의 번들로 합쳐주는 역할을 합니다.

**Webpack의 주요 개념**
1. **Entry**: 번들링을 시작할 진입점
2. **Output**: 번들된 파일이 저장될 위치와 파일명
3. **Loader**: JavaScript가 아닌 파일들을 모듈로 변환
4. **Plugin**: 번들 최적화, 에셋 관리, 환경 변수 주입 등의 작업 수행
5. **Mode**: development, production, none 중 하나를 설정

**Webpack의 장점**
- 모듈 시스템 지원
- 코드 스플리팅
- 로더를 통한 다양한 파일 처리
- 플러그인을 통한 확장성
- 개발 서버 제공

---

## 17. 디자인 패턴 중 옵저버 패턴에 대해 설명해 주세요. (중요도: 5)

**답변:**
옵저버 패턴(Observer Pattern)은 객체의 상태 변화를 관찰하는 관찰자들, 즉 옵저버들의 목록을 객체에 등록하여 상태 변화가 있을 때마다 메서드 등을 통해 객체가 직접 목록의 각 옵저버에게 통지하도록 하는 디자인 패턴입니다.

**구성 요소**
- **Subject(주제)**: 상태를 가지고 있으며, 옵저버들을 관리합니다.
- **Observer(관찰자)**: 주제의 상태 변화를 통지받는 객체입니다.

**장점**
- 느슨한 결합을 유지할 수 있습니다.
- 런타임에 객체 간의 관계를 설정할 수 있습니다.
- 개방-폐쇄 원칙을 준수합니다.

**JavaScript에서의 활용**
- DOM 이벤트 시스템
- MVC, MVP, MVVM 패턴
- React의 상태 관리
- Node.js의 EventEmitter

---

## 18. 웹 성능 최적화 방법에 대해 설명해 주세요. (중요도: 5)

**답변:**
웹 성능 최적화는 사용자 경험을 향상시키기 위한 핵심적인 작업입니다.

**최적화 방법**

**1. 리소스 최적화**
- **이미지 최적화**: WebP 포맷 사용, 적절한 크기, lazy loading
- **CSS/JS 미니파이**: 공백 제거, 주석 제거, 변수명 단축
- **번들링**: Webpack, Rollup 등으로 파일 합쳐서 HTTP 요청 횟수 감소
- **코드 스플리팅**: 어플리케이션을 여러 단계로 나눈어 필요시만 로드

**2. 렌더링 최적화**
- **Critical CSS**: Above-the-fold 컨텐츠의 CSS를 인라인으로 삽입
- **비동기 CSS 로드**: 비중요 CSS를 나중에 로드
- **서버사이드 렌더링**: 초기 렌더링 속도 증진
- **프리렌더링**: 예상 페이지를 런타임에 미리 로드

**3. 네트워크 최적화**
- **CDN 활용**: 전 세계 여러 지점에서 컨텐츠 제공
- **HTTP/2 사용**: 멀티플렉싱, 서버 푸시 등 최신 기능 활용
- **캠싱 전략**: 브라우저 캠싱, HTTP 캠싱 및 CDN 캠싱 최적화
- **압축**: Gzip 또는 Brotli 압축으로 전송 크기 감소

**4. JavaScript 최적화**
- **Tree Shaking**: 사용하지 않는 코드 제거
- **Lazy Loading**: 필요한 시점에만 사용
- **Debounce/Throttle**: 이벤트 처리 최적화
- **Web Workers**: 무거운 작업을 별도 스레드에서 처리

**5. 데이터베이스 최적화**
- **쿼리 최적화**: 인덱스 사용, N+1 문제 해결
- **페이지네이션**: 대량 데이터를 나눈어 처리
- **캠싱**: 데이터베이스 결과를 메모리나 철시에 저장

**성능 측정 지표**
- **FCP (First Contentful Paint)**: 첫 번째 컨텐츠 렌더링 시간
- **LCP (Largest Contentful Paint)**: 가장 큰 컨텐츠 렌더링 시간
- **FID (First Input Delay)**: 첫 번째 입력 지연 시간
- **CLS (Cumulative Layout Shift)**: 누적 레이아웃 이동
- **TTI (Time to Interactive)**: 상호작용 가능 시간

**도구 및 모니터링**
- **Google Lighthouse**: 전반적인 웹 성능 감사
- **WebPageTest**: 상세한 로드 테스트
- **Chrome DevTools**: Performance 탭을 통한 실시간 성능 분석
- **Core Web Vitals**: Google이 제공하는 사용자 경험 지표

---

## 19. 모바일 웹 개발 시 고려사항에 대해 설명해 주세요. (중요도: 4)

**답변:**
모바일 웹 개발은 데스크톱과 다른 여러 고려사항이 있습니다.

**주요 고려사항**

**1. 반응형 디자인**
```css
/* 모바일 퍼스트 접근 */
@media screen and (max-width: 768px) {
  .container {
    padding: 10px;
    font-size: 14px;
  }
}

/* 플렉스박스를 활용한 레이아웃 */
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

/* CSS Grid를 활용한 레이아웃 */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
```

**2. 터치 인터페이스**
```javascript
// 터치 이벤트 처리
document.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchmove', handleTouchMove);
document.addEventListener('touchend', handleTouchEnd);

// 스와이프 제스처 구현
function handleSwipe(startX, endX) {
  const threshold = 50;
  const diff = startX - endX;
  
  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      // 왼쪽으로 스와이프
      slideNext();
    } else {
      // 오른쪽으로 스와이프
      slidePrev();
    }
  }
}
```

**3. 성능 최적화**
```javascript
// 레이지 로딩
// Intersection Observer를 활용
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => {
  observer.observe(img);
});

// Service Worker를 활용한 오프라인 지원
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(() => console.log('SW registered'))
    .catch(console.error);
}
```

**4. 사용성 개선**
```html
<!-- 반응형 이미지 -->
<picture>
  <source media="(max-width: 768px)" srcset="mobile.jpg">
  <source media="(max-width: 1024px)" srcset="tablet.jpg">
  <img src="desktop.jpg" alt="Responsive image">
</picture>

<!-- 접근성 향상 -->
<button 
  aria-label="메뉴 열기" 
  tabindex="0"
  role="button"
>
  ☰
</button>
```

**5. 데이터 사용량 고려**
```javascript
// 연결 상태 확인
const connection = navigator.connection;
if (connection) {
  if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
    // 낮은 품질 컨텐츠 제공
    loadLowQualityImages();
  } else {
    // 높은 품질 컨텐츠 제공
    loadHighQualityImages();
  }
}

// 데이터 절약 모드
if (navigator.connection && navigator.connection.saveData) {
  // 필수 컨텐츠만 로드
  loadEssentialContentOnly();
}
```

**6. PWA (Progressive Web App) 기능**
```javascript
// Web App Manifest
{
  "name": "My App",
  "short_name": "MyApp",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}

// 푸시 알림
if ('Notification' in window && 'serviceWorker' in navigator) {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      // 푸시 알림 설정
    }
  });
}
```

**7. 모바일 브라우저 특이사항**
```css
/* iOS Safari의 바닥 바를 고려한 안전 영역 */
.safe-area {
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}

/* 모바일에서 호버 효과 비활성화 */
@media (hover: none) and (pointer: coarse) {
  .hover-effect:hover {
    /* 모바일에서는 호버 스타일 비활성화 */
  }
}

/* 줄 바꿈 방지 */
html {
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
}

/* 터치 액션 최적화 */
.touch-target {
  min-height: 44px;
  min-width: 44px;
}
```

**테스트 방법**
- **다양한 디바이스**: iPhone, Android, 태블릿 등 다양한 기기에서 테스트
- **브라우저 테스트**: Chrome Mobile, Safari Mobile, Samsung Internet 등
- **성능 테스트**: 느린 네트워크 환경에서의 성능 테스트
- **사용성 테스트**: 실제 사용자를 통한 UX 테스트

---

## 20. 반응형 디자인의 브레이크포인트와 미디어 쿼리 전략에 대해 설명해 주세요. (중요도: 4)

**답변:**
반응형 디자인에서 브레이크포인트는 다양한 화면 크기에 맞춰 레이아웃이 변경되는 지점을 의미합니다.

**일반적인 브레이크포인트:**
```css
/* Mobile First 접근법 */
/* Extra small devices (phones, 576px and down) */
@media (max-width: 575.98px) { 
  /* 모바일 스타일 */
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) { 
  /* 큰 모바일/작은 태블릿 스타일 */
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) { 
  /* 태블릿 스타일 */
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) { 
  /* 데스크톱 스타일 */
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) { 
  /* 큰 데스크톱 스타일 */
}

/* Extra extra large devices (1400px and up) */
@media (min-width: 1400px) { 
  /* 매우 큰 화면 스타일 */
}
```

**Custom Properties를 활용한 브레이크포인트:**
```css
:root {
  --breakpoint-xs: 0;
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  --breakpoint-xxl: 1400px;
}

/* SCSS/SASS에서 사용 */
$breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px
);

@mixin respond-to($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    @media (min-width: map-get($breakpoints, $breakpoint)) {
      @content;
    }
  }
}

// 사용법
.container {
  width: 100%;
  padding: 1rem;
  
  @include respond-to(md) {
    padding: 2rem;
    max-width: 768px;
  }
  
  @include respond-to(lg) {
    max-width: 1024px;
  }
}
```

**컨테이너 쿼리 (현대적 접근법):**
```css
/* 컨테이너 쿼리를 사용한 내재적 반응형 디자인 */
.card-container {
  container-type: inline-size;
}

@container (min-width: 300px) {
  .card {
    display: flex;
    flex-direction: row;
  }
}

@container (max-width: 299px) {
  .card {
    display: block;
  }
}
```

**모바일 퍼스트 vs 데스크톱 퍼스트:**

**모바일 퍼스트 (권장):**
```css
/* 기본: 모바일 스타일 */
.navigation {
  display: block;
}

.nav-item {
  display: block;
  width: 100%;
  padding: 1rem;
}

/* 태블릿 이상 */
@media (min-width: 768px) {
  .navigation {
    display: flex;
  }
  
  .nav-item {
    width: auto;
    padding: 0.5rem 1rem;
  }
}
```

**데스크톱 퍼스트:**
```css
/* 기본: 데스크톱 스타일 */
.navigation {
  display: flex;
}

.nav-item {
  width: auto;
  padding: 0.5rem 1rem;
}

/* 태블릿 이하 */
@media (max-width: 767.98px) {
  .navigation {
    display: block;
  }
  
  .nav-item {
    display: block;
    width: 100%;
    padding: 1rem;
  }
}
```

**고급 미디어 쿼리 기능:**
```css
/* 방향 기반 */
@media (orientation: landscape) {
  .hero {
    height: 60vh;
  }
}

@media (orientation: portrait) {
  .hero {
    height: 80vh;
  }
}

/* 해상도 기반 */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .logo {
    background-image: url('logo@2x.png');
    background-size: contain;
  }
}

/* 선호 색상 스키마 */
@media (prefers-color-scheme: dark) {
  body {
    background-color: #121212;
    color: #ffffff;
  }
}

/* 동작 감소 선호 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* 호버 지원 여부 */
@media (hover: hover) {
  .button:hover {
    background-color: #0056b3;
  }
}

@media (hover: none) {
  .button {
    /* 터치 디바이스용 스타일 */
  }
}
```

**실무에서의 브레이크포인트 전략:**
1. **컨텐츠 기반**: 디자인이 깨지는 지점에서 브레이크포인트 설정
2. **주요 디바이스 고려**: 실제 사용자가 많이 사용하는 디바이스 크기 우선
3. **테스트 우선**: 다양한 디바이스에서 실제 테스트
4. **유연성 유지**: 고정된 크기보다는 유연한 레이아웃 추구