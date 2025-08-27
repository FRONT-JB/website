# 웹 성능 최적화 면접 질문

## 1. JavaScript 실행으로 인한 렌더링 중단에 대해 설명해 주세요. (중요도: 5)

**답변:**
브라우저는 HTML을 파싱하는 도중 `<script>` 태그를 만나면 파싱을 중단하고 JavaScript를 실행합니다. 이는 JavaScript가 DOM을 조작할 수 있기 때문입니다.

**렌더링이 멈추는 이유**
1. **Single Thread**: JavaScript 엔진과 렌더링 엔진이 같은 스레드에서 동작
2. **DOM 조작 가능성**: JavaScript가 DOM을 변경할 수 있어 파싱 중단 필요
3. **Synchronous Execution**: 기본적으로 JavaScript는 동기적으로 실행

**문제가 되는 경우**
```html
<!DOCTYPE html>
<html>
<head>
  <!-- CSS는 여기 -->
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div>첫 번째 콘텐츠</div>
  
  <!-- 이 스크립트가 오래 걸리면 아래 HTML이 렌더링되지 않음 -->
  <script>
    // 무거운 연산
    for (let i = 0; i < 1000000000; i++) {
      // 시간이 오래 걸리는 작업
    }
  </script>
  
  <div>두 번째 콘텐츠</div> <!-- 위 스크립트 완료 후 렌더링 -->
</body>
</html>
```

**해결 방법**

**1. async 속성 사용**
```html
<script async src="script.js"></script>
```
- 스크립트 다운로드는 병렬로 진행
- 다운로드 완료 시 즉시 실행 (HTML 파싱 중단)
- 실행 순서 보장 안 됨

**2. defer 속성 사용**
```html
<script defer src="script.js"></script>
```
- 스크립트 다운로드는 병렬로 진행
- HTML 파싱 완료 후 실행
- 실행 순서 보장됨

**3. 스크립트 위치 조정**
```html
<body>
  <!-- HTML 콘텐츠 -->
  
  <!-- body 태그 끝나기 직전에 배치 -->
  <script src="script.js"></script>
</body>
```

**4. 동적 스크립트 로딩**
```javascript
// 필요한 시점에 스크립트 로드
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// 사용
loadScript('/path/to/script.js').then(() => {
  console.log('스크립트 로드 완료');
});
```

**5. Web Worker 사용**
```javascript
// 무거운 작업은 Web Worker에서 처리
const worker = new Worker('heavy-task-worker.js');
worker.postMessage({ data: largeData });

worker.onmessage = function(e) {
  const result = e.data;
  updateUI(result);
};

// heavy-task-worker.js
self.onmessage = function(e) {
  const data = e.data.data;
  
  // 무거운 계산 수행
  const result = heavyCalculation(data);
  
  self.postMessage(result);
};
```

**6. 작업 분할 (Time Slicing)**
```javascript
// 무거운 작업을 작은 단위로 분할
function heavyTaskWithSlicing(data, callback) {
  const chunkSize = 1000;
  let index = 0;
  
  function processChunk() {
    const endIndex = Math.min(index + chunkSize, data.length);
    
    // 작은 단위로 처리
    for (let i = index; i < endIndex; i++) {
      processItem(data[i]);
    }
    
    index = endIndex;
    
    if (index < data.length) {
      // 다음 프레임에서 계속 처리
      requestAnimationFrame(processChunk);
    } else {
      callback();
    }
  }
  
  processChunk();
}
```

---

## 2. 렌더링 성능 최적화 방법에 대해 설명해 주세요. (중요도: 5)

**답변:**
렌더링 성능 최적화는 사용자에게 더 빠르고 부드러운 경험을 제공하기 위한 핵심 기술입니다.

**주요 최적화 전략**

**1. Critical Rendering Path 최적화**
```html
<!-- Above-the-fold CSS를 인라인으로 -->
<style>
  .hero-section {
    height: 100vh;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  }
</style>

<!-- 비중요한 CSS는 비동기 로드 -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

**2. 이미지 최적화**
```html
<!-- 반응형 이미지 -->
<picture>
  <source media="(max-width: 768px)" srcset="mobile.webp" type="image/webp">
  <source media="(max-width: 768px)" srcset="mobile.jpg">
  <source srcset="desktop.webp" type="image/webp">
  <img src="desktop.jpg" alt="Responsive image" loading="lazy">
</picture>

<!-- Lazy Loading -->
<img src="placeholder.jpg" data-src="actual-image.jpg" loading="lazy" alt="Lazy loaded image">
```

**3. JavaScript 최적화**
```javascript
// 디바운싱으로 이벤트 최적화
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 스크롤 이벤트 최적화
const debouncedScrollHandler = debounce(() => {
  console.log('Scroll event fired');
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);

// Intersection Observer로 효율적인 요소 감지
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 화면에 보일 때만 처리
      loadContent(entry.target);
      observer.unobserve(entry.target);
    }
  });
});

document.querySelectorAll('.lazy-content').forEach(el => {
  observer.observe(el);
});
```

**4. DOM 조작 최적화**
```javascript
// 배치 DOM 업데이트
function updateMultipleElements(elements, data) {
  // DocumentFragment 사용
  const fragment = document.createDocumentFragment();
  
  data.forEach(item => {
    const element = createElement(item);
    fragment.appendChild(element);
  });
  
  // 한 번에 DOM에 추가
  container.appendChild(fragment);
}

// requestAnimationFrame 활용
function animateElement(element) {
  let start = null;
  
  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    
    // 애니메이션 로직
    element.style.transform = `translateX(${progress / 10}px)`;
    
    if (progress < 2000) {
      requestAnimationFrame(step);
    }
  }
  
  requestAnimationFrame(step);
}
```

**5. CSS 최적화**
```css
/* GPU 가속 활용 */
.animated-element {
  will-change: transform;
  transform: translateZ(0); /* 하드웨어 가속 강제 */
}

/* 효율적인 셀렉터 사용 */
.specific-class { /* 좋음 */ }
div > div > div { /* 피해야 함 */ }

/* 레이아웃 변경을 피하고 composite만 발생시키기 */
.smooth-animation {
  /* reflow 발생 */
  /* left: 100px; */
  
  /* composite만 발생 */
  transform: translateX(100px);
}

/* 반응형 이미지를 위한 aspect-ratio */
.image-container {
  aspect-ratio: 16/9;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

**6. 리소스 우선순위 제어**
```html
<!-- 중요한 리소스 미리 로드 -->
<link rel="preload" href="hero-image.jpg" as="image">
<link rel="preload" href="critical-font.woff2" as="font" type="font/woff2" crossorigin>

<!-- DNS 조회 미리 수행 -->
<link rel="dns-prefetch" href="//cdn.example.com">

<!-- 다음 페이지 미리 로드 -->
<link rel="prefetch" href="/next-page.html">
```

**7. Service Worker 활용**
```javascript
// 캐싱 전략
self.addEventListener('fetch', event => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request).then(fetchResponse => {
          const responseClone = fetchResponse.clone();
          caches.open('images-cache').then(cache => {
            cache.put(event.request, responseClone);
          });
          return fetchResponse;
        });
      })
    );
  }
});
```

**8. 성능 측정 및 모니터링**
```javascript
// Performance API 활용
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    if (entry.entryType === 'paint') {
      console.log(`${entry.name}: ${entry.startTime}ms`);
    }
  });
});

observer.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });

// Core Web Vitals 측정
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    if (entry.entryType === 'largest-contentful-paint') {
      console.log('LCP:', entry.startTime);
    }
  }
}).observe({ entryTypes: ['largest-contentful-paint'] });
```

**성능 지표**
- **FCP (First Contentful Paint)**: 첫 번째 콘텐츠 렌더링 시간
- **LCP (Largest Contentful Paint)**: 가장 큰 콘텐츠 렌더링 시간
- **FID (First Input Delay)**: 첫 번째 입력 지연 시간
- **CLS (Cumulative Layout Shift)**: 누적 레이아웃 이동 점수

**도구**
- Chrome DevTools Performance 탭
- Lighthouse
- WebPageTest
- Core Web Vitals 확장 프로그램

---

## 3. 브라우저 저장소 비교 (LocalStorage vs SessionStorage vs Cookie vs IndexedDB) (중요도: 4)

**답변:**
웹 애플리케이션에서 클라이언트 측 데이터 저장을 위한 다양한 옵션들의 특징과 사용 사례입니다.

**저장소 비교표**

| 특성 | LocalStorage | SessionStorage | Cookie | IndexedDB |
|------|--------------|----------------|---------|-----------|
| **용량** | 5-10MB | 5-10MB | 4KB | 무제한* |
| **지속성** | 영구적 | 탭 닫으면 삭제 | 만료일 설정 가능 | 영구적 |
| **서버 전송** | 없음 | 없음 | 자동 전송 | 없음 |
| **스코프** | 오리진별 | 탭별 | 도메인별 | 오리진별 |
| **API** | 동기 | 동기 | 동기 | 비동기 |
| **데이터 타입** | 문자열만 | 문자열만 | 문자열만 | 모든 타입 |

**1. LocalStorage**
```javascript
// 데이터 저장
localStorage.setItem('user', JSON.stringify({
  id: 1,
  name: 'John',
  preferences: { theme: 'dark' }
}));

// 데이터 읽기
const userData = JSON.parse(localStorage.getItem('user'));

// 데이터 삭제
localStorage.removeItem('user');

// 모든 데이터 삭제
localStorage.clear();

// 키 목록 조회
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  console.log(key, localStorage.getItem(key));
}
```

**사용 사례:**
- 사용자 설정 (테마, 언어 등)
- 장바구니 내용
- 폼 데이터 임시 저장
- 오프라인 데이터 캐싱

**2. SessionStorage**
```javascript
// 세션 동안만 유지되는 데이터
sessionStorage.setItem('currentSession', JSON.stringify({
  userId: 123,
  startTime: Date.now(),
  pagePath: window.location.pathname
}));

// 페이지 간 상태 전달
function navigateWithState(url, state) {
  sessionStorage.setItem('navigationState', JSON.stringify(state));
  window.location.href = url;
}

// 새 페이지에서 상태 복원
const navigationState = JSON.parse(
  sessionStorage.getItem('navigationState')
);
```

**사용 사례:**
- 다중 단계 폼 데이터
- 세션 기반 상태 관리
- 임시 데이터 저장
- 페이지 간 데이터 전달

**3. Cookie**
```javascript
// 쿠키 설정 헬퍼 함수
function setCookie(name, value, days = 7, options = {}) {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  
  let cookieString = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=${options.path || '/'}`;
  
  if (options.domain) cookieString += `; domain=${options.domain}`;
  if (options.secure) cookieString += '; secure';
  if (options.httpOnly) cookieString += '; httpOnly';
  if (options.sameSite) cookieString += `; sameSite=${options.sameSite}`;
  
  document.cookie = cookieString;
}

// 쿠키 읽기 헬퍼 함수
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }
  return null;
}

// 사용 예시
setCookie('authToken', 'abc123', 30, {
  secure: true,
  httpOnly: true,
  sameSite: 'strict'
});

// JWT 토큰 저장 (보안 고려)
setCookie('jwt', token, 1, {
  secure: true,
  httpOnly: true,
  sameSite: 'lax'
});
```

**사용 사례:**
- 인증 토큰
- 사용자 인증 상태
- 추적 및 분석
- 서버와 공유해야 하는 소량 데이터

**4. IndexedDB**
```javascript
// IndexedDB 래퍼 클래스
class IndexedDBHelper {
  constructor(dbName, version = 1) {
    this.dbName = dbName;
    this.version = version;
    this.db = null;
  }
  
  async init(schema) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        schema(db);
      };
    });
  }
  
  async add(storeName, data) {
    const transaction = this.db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.add(data);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  
  async get(storeName, key) {
    const transaction = this.db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  
  async getAll(storeName) {
    const transaction = this.db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}

// 사용 예시
const dbHelper = new IndexedDBHelper('MyAppDB', 1);

await dbHelper.init((db) => {
  // Users 스토어 생성
  if (!db.objectStoreNames.contains('users')) {
    const userStore = db.createObjectStore('users', { keyPath: 'id' });
    userStore.createIndex('email', 'email', { unique: true });
  }
  
  // Posts 스토어 생성
  if (!db.objectStoreNames.contains('posts')) {
    const postStore = db.createObjectStore('posts', { keyPath: 'id' });
    postStore.createIndex('userId', 'userId', { unique: false });
  }
});

// 데이터 저장
await dbHelper.add('users', {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  avatar: new Blob([...]) // 바이너리 데이터도 저장 가능
});

// 데이터 조회
const user = await dbHelper.get('users', 1);
const allUsers = await dbHelper.getAll('users');
```

**사용 사례:**
- 대용량 데이터 저장
- 오프라인 애플리케이션
- 이미지, 파일 등 바이너리 데이터
- 복잡한 구조의 데이터
- PWA 데이터 저장

**선택 가이드**

**언제 어떤 것을 사용할까?**
1. **LocalStorage**: 간단한 설정, 소량 데이터, 영구 저장
2. **SessionStorage**: 임시 데이터, 탭 범위 데이터
3. **Cookie**: 서버와 공유 필요, 인증 관련, 소량 데이터
4. **IndexedDB**: 대용량 데이터, 복잡한 쿼리, 오프라인 지원

**보안 고려사항**
- 민감한 정보는 암호화 후 저장
- XSS 공격에 주의 (모든 클라이언트 저장소는 JS로 접근 가능)
- Cookie의 경우 httpOnly, secure, sameSite 속성 활용
- 저장된 데이터는 사용자가 언제든 삭제할 수 있음을 고려