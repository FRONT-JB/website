# 브라우저 & 웹 기술 면접 질문

## 1. 브라우저 주소창에 URL을 입력했을 때 일어나는 과정을 설명해 주세요. (중요도: 5)

**답변:**
브라우저 주소창에 URL을 입력했을 때 다음과 같은 과정이 일어납니다:

**1. URL 파싱**
- 브라우저가 입력된 URL을 파싱하여 프로토콜, 도메인, 포트, 경로 등을 분석
- 입력된 문자열이 유효한 URL인지 검증

**2. DNS 조회**
- 브라우저 캐시에서 도메인의 IP 주소 확인
- 없으면 OS 캐시, 라우터 캐시, ISP 캐시 순서로 확인
- 모든 캐시에 없으면 DNS 서버에 요청하여 IP 주소 조회
- 계층적 DNS 조회: 루트 → TLD → 권한 있는 네임서버

**3. TCP 연결 설정**
- IP 주소를 얻은 후 해당 서버와 TCP 3-way handshake 수행
- SYN → SYN-ACK → ACK 패킷 교환으로 연결 설정

**4. HTTPS의 경우 TLS 핸드셰이크**
- SSL/TLS 인증서 검증
- 암호화 키 교환
- 보안 연결 설정

**5. HTTP 요청 전송**
- GET, POST 등의 HTTP 메서드로 요청 전송
- Headers, Body 등 필요한 데이터 포함

**6. 서버 응답**
- 서버가 요청을 처리하고 HTTP 응답 반환
- 상태 코드 (200, 404, 500 등)
- Response Headers
- HTML, CSS, JS 등의 리소스

**7. 브라우저 렌더링**
- HTML 파싱하여 DOM Tree 구성
- CSS 파싱하여 CSSOM Tree 구성
- DOM + CSSOM = Render Tree 생성
- Layout(Reflow) 계산
- Paint 및 Composite

**8. 추가 리소스 로드**
- HTML 내 참조된 CSS, JS, 이미지 등 추가 요청
- 병렬로 다운로드 및 처리
- JavaScript 실행으로 DOM 조작 가능

---

## 2. 브라우저 렌더링 엔진의 동작 과정을 상세히 설명해 주세요. (중요도: 5)

**답변:**
브라우저 렌더링 엔진은 HTML, CSS, JavaScript를 해석하여 사용자가 볼 수 있는 웹페이지로 변환하는 소프트웨어입니다.

**주요 렌더링 엔진**
- **Webkit**: Safari, 구 Chrome
- **Blink**: Chrome, Opera, Edge
- **Gecko**: Firefox

**렌더링 과정**

**1. HTML 파싱 & DOM Tree 구성**
```
HTML → Tokenizer → Parser → DOM Tree
```
- HTML 문서를 토큰으로 분해
- 토큰을 파싱하여 노드 객체 생성
- 노드들을 트리 구조로 연결하여 DOM 구성

**2. CSS 파싱 & CSSOM Tree 구성**
```
CSS → Tokenizer → Parser → CSSOM Tree
```
- CSS 파일과 스타일 태그의 CSS를 파싱
- 선택자와 속성을 분석하여 스타일 규칙 생성
- CSSOM (CSS Object Model) 트리 구축

**3. JavaScript 실행**
- HTML 파싱 중 `<script>` 태그를 만나면 파싱 중단
- JavaScript 엔진이 스크립트 실행
- DOM 또는 CSSOM 수정 가능
- `async`, `defer` 속성으로 비동기 실행 가능

**4. Render Tree 구성**
```
DOM Tree + CSSOM Tree = Render Tree
```
- DOM의 각 노드에 해당하는 스타일 정보 계산
- `display: none` 요소는 제외
- 시각적으로 보이는 요소만 포함

**5. Layout (Reflow)**
- 각 노드의 정확한 위치와 크기 계산
- viewport 크기를 기준으로 상대적 크기를 절대적 크기로 변환
- Box Model 계산 (margin, border, padding, content)

**6. Paint (Repaint)**
- Layout에서 계산된 정보를 바탕으로 실제 픽셀로 변환
- 배경색, 텍스트, 그림자, border 등을 그리기
- 여러 레이어로 분할하여 처리

**7. Composite**
- 여러 레이어를 합성하여 최종 화면 생성
- GPU를 활용한 하드웨어 가속 적용
- 3D transform, opacity 등이 별도 레이어로 처리

**중요한 특징**

**점진적 렌더링**
- 모든 HTML이 파싱되기를 기다리지 않고 부분적으로 화면에 표시
- 사용자 경험 개선

**JavaScript의 파싱 차단**
- `<script>` 태그는 HTML 파싱을 중단시킴
- `async`: 다운로드는 병렬, 실행 시점에만 파싱 중단
- `defer`: 다운로드는 병렬, HTML 파싱 완료 후 실행

**리플로우와 리페인트 최소화**
- DOM/CSS 변경 시 렌더링 과정 재실행
- 성능 최적화를 위해 변경사항 배치 처리

---

## 3. Critical Rendering Path에 대해 설명해 주세요. (중요도: 4)

**답변:**
Critical Rendering Path(CRP)는 브라우저가 HTML, CSS, JavaScript를 받아 화면에 픽셀을 렌더링하기까지의 중요한 단계들을 말합니다.

**CRP의 주요 단계**

**1. HTML 파싱 → DOM**
- HTML 문서를 바이트 → 문자 → 토큰 → 노드 → DOM 순으로 변환
- 점진적으로 처리되어 부분적 렌더링 가능

**2. CSS 파싱 → CSSOM**
- CSS를 파싱하여 CSSOM(CSS Object Model) 생성
- CSS는 렌더링 차단 리소스 (render-blocking resource)
- 모든 CSS가 파싱될 때까지 렌더링 지연

**3. DOM + CSSOM → Render Tree**
- 화면에 표시될 요소들만 포함
- `display: none` 요소는 제외
- `visibility: hidden` 요소는 포함 (공간은 차지하므로)

**4. Layout 계산**
- 각 요소의 정확한 크기와 위치 계산
- viewport 크기 기준으로 상대값을 절대값으로 변환

**5. Paint**
- 레이아웃 정보를 바탕으로 실제 픽셀로 그리기

**성능 최적화 방법**

**1. HTML 최적화**
```html
<!-- 중요한 CSS를 인라인으로 -->
<style>
  /* Above the fold 스타일 */
  .hero { display: block; }
</style>

<!-- 비중요한 CSS는 비동기 로드 -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

**2. CSS 최적화**
```css
/* CSS 파일 크기 최소화 */
/* 미사용 CSS 제거 */
/* CSS 압축 */
```

**3. JavaScript 최적화**
```html
<!-- 비동기 로드 -->
<script async src="analytics.js"></script>

<!-- 지연 로드 -->
<script defer src="app.js"></script>

<!-- 중요하지 않은 스크립트는 나중에 로드 -->
<script>
  window.addEventListener('load', function() {
    const script = document.createElement('script');
    script.src = 'non-critical.js';
    document.head.appendChild(script);
  });
</script>
```

**4. 리소스 우선순위 제어**
```html
<!-- DNS 사전 조회 -->
<link rel="dns-prefetch" href="//example.com">

<!-- 리소스 사전 로드 -->
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>

<!-- 다음 페이지 사전 로드 -->
<link rel="prefetch" href="/next-page.html">
```

**측정 도구**
- Chrome DevTools Performance 탭
- Lighthouse
- WebPageTest
- Core Web Vitals 지표

**핵심 지표**
- **FCP (First Contentful Paint)**: 첫 번째 콘텐츠가 그려지는 시간
- **LCP (Largest Contentful Paint)**: 가장 큰 콘텐츠가 그려지는 시간
- **CLS (Cumulative Layout Shift)**: 레이아웃 이동 점수
- **FID (First Input Delay)**: 첫 번째 입력 응답 시간

---

## 4. 브라우저 캐싱 전략에 대해 설명해 주세요. (중요도: 4)

**답변:**
브라우저 캐싱은 웹 성능을 향상시키기 위해 리소스를 로컬에 저장하는 메커니즘입니다.

**캐시의 종류**

**1. Browser Cache (HTTP Cache)**
- 브라우저가 HTTP 응답을 로컬에 저장
- 같은 리소스 재요청 시 네트워크 요청 없이 사용

**2. Memory Cache**
- RAM에 저장되는 일시적 캐시
- 탭을 닫으면 사라짐
- 가장 빠른 접근 속도

**3. Disk Cache**
- 하드 디스크에 저장되는 영구적 캐시
- 브라우저를 재시작해도 유지
- Memory Cache보다 느리지만 용량이 큼

**HTTP 캐시 제어 헤더**

**1. Cache-Control**
```http
# 최대 1년간 캐시
Cache-Control: max-age=31536000

# 캐시하지 않음
Cache-Control: no-cache

# 저장하지 않음
Cache-Control: no-store

# 공개 캐시 허용 (CDN 등)
Cache-Control: public

# 사설 캐시만 허용
Cache-Control: private
```

**2. ETag (Entity Tag)**
```http
# 서버 응답
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"

# 클라이언트 요청
If-None-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"

# 변경되지 않았다면
HTTP/1.1 304 Not Modified
```

**3. Last-Modified**
```http
# 서버 응답
Last-Modified: Wed, 21 Oct 2023 07:28:00 GMT

# 클라이언트 요청
If-Modified-Since: Wed, 21 Oct 2023 07:28:00 GMT
```

**캐싱 전략**

**1. Immutable Assets (변하지 않는 자산)**
```http
# 파일명에 해시 포함: app.abc123.js
Cache-Control: public, max-age=31536000, immutable
```

**2. HTML Files**
```http
# 항상 최신 상태 확인
Cache-Control: no-cache
```

**3. API Responses**
```http
# 짧은 시간 캐시
Cache-Control: private, max-age=300
```

**4. Static Assets**
```http
# 중간 시간 캐시 + 검증
Cache-Control: public, max-age=86400
ETag: "version-hash"
```

**Cache Busting 전략**

**1. 파일명 해싱**
```javascript
// 빌드 시 파일명에 해시 추가
// app.js → app.abc123.js
// style.css → style.def456.css
```

**2. 쿼리 매개변수**
```html
<!-- 버전 매개변수 추가 -->
<script src="app.js?v=1.2.3"></script>
<link href="style.css?v=1.2.3" rel="stylesheet">
```

**3. URL 경로 버전 관리**
```
/v1/api/users
/v2/api/users
```

**Service Worker 캐싱**
```javascript
// Service Worker를 통한 고급 캐싱
self.addEventListener('fetch', event => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  }
});
```

**캐시 무효화 검증**
```javascript
// 개발자 도구에서 캐시 상태 확인
// Application → Storage → Cache Storage
// Network → Disable cache 옵션 활용
```

**모범 사례**
1. **정적 자산**: 긴 캐시 시간 + 파일명 해싱
2. **HTML**: 짧은 캐시 시간 또는 no-cache
3. **API**: 적절한 캐시 시간 + ETag 활용
4. **CDN**: 공개 캐시 허용으로 글로벌 배포
5. **모바일**: 네트워크 비용 고려한 적극적 캐싱