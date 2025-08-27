# JavaScript 면접 질문

## 1. Sync와 Async의 차이점을 설명해 주세요. (중요도: 5)

**답변:**
Sync는 요청을 보내고 해당 요청에 대한 응답을 기다리는 것을 의미하고, Async는 요청에 대한 응답을 기다리지 않고 다음 동작을 수행하는 것을 의미합니다.

예시로 alert와 같은 작업은 블로킹이고 setTimeout, fetch와 같은 작업들은 논블로킹입니다.

---

## 2. Blocking과 Non-Blocking의 차이를 설명해 주세요. (중요도: 5)

**답변:**
블로킹과 논블로킹은 작업을 수행할 때 제어권이 누구한테 있는지에 따라 구분됩니다.

블로킹은 한 작업이 완료될 때까지 다음 작업을 수행하지 않는 것을 의미합니다.

논블로킹은 한 작업이 완료되지 않아도 다음 작업을 수행할 수 있는 것을 의미합니다.

---

## 3. 콜백함수에 대해 설명해 주세요. (중요도: 5)

**답변:**
**콜백함수**
- 다른 함수의 인자로써 이용되는 함수
- 어떤 이벤트에 의해 호출되는 함수

콜백함수는 다른 함수에 매개변수로 넘겨준 함수를 뜻합니다.

---

## 4. 콜백지옥의 의미와 콜백지옥을 해결하는 방법을 설명해 주세요. (중요도: 5)

**답변:**
콜백 지옥은 익명 함수에 콜백 함수를 전달하는 과정에서 콜백 내에서 함수 호출이 반복되어 코드의 들여쓰기 수준이 지나치게 깊어지는 현상을 말합니다.
이는 주로 이벤트 처리나 서버 통신과 같은 비동기 작업을 제어하는 데 사용되지만, 이러한 방식은 코드의 가독성을 저하시키고 유지보수를 어렵게 만듭니다.

**해결 방법**
1. 코딩 패턴으로 콜백 익명 함수를 각각의 함수로 분리
2. Promise 사용
3. Async + Await 사용

---

## 5. Event loop에 대해 설명해 주세요. (중요도: 5)

**답변:**
자바스크립트의 이벤트 루프는 단일 스레드에서 실행되는 비동기 작업을 처리하는 메커니즘입니다. 이벤트 루프는 Call stack, Micro task queue, Macro task queue로 구성됩니다.

Micro task queue에는 Promise, async/await 과 같은 작업들이 들어가고, Macro task queue에는 Web API (setInterval, setTimeout)와 같은 작업들이 들어갑니다.

이벤트 루프는 Call stack을 확인하고, Call stack이 비어있는 경우 Micro task queue의 작업을 Call stack으로 옮깁니다. 그리고 Micro task queue가 비어있는 경우, Macro task queue의 작업을 Call stack으로 옮기고 처리합니다.

---

## 6. Promise와 Async, Await의 차이를 설명해 주세요. (중요도: 5)

**답변:**
**Promise**
비동기 작업이 맞이할 미래의 완료 또는 실패와 그 결과 값입니다.

**Promise 상태**
- **Pending**: 초기 상태, 이행하지도 실패하지도 않은 상태
- **Fulfilled**: 연산이 성공적으로 완료된 상태
- **Rejected**: 연산이 실패한 상태

```javascript
// Promise 생성
function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve({ id: 1, name: 'John' });
      } else {
        reject(new Error('데이터를 불러올 수 없습니다'));
      }
    }, 1000);
  });
}

// Promise 사용
getData()
  .then(data => console.log('성공:', data))
  .catch(error => console.error('에러:', error))
  .finally(() => console.log('작업 완료'));
```

**Async/Await**
- `async`: 해당 함수는 항상 Promise를 반환합니다
- `await`: Promise가 처리될 때까지 대기합니다

```javascript
// async/await 기본 사용법
async function fetchUser() {
  try {
    const response = await fetch('/api/user');
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('사용자 정보를 불러오는 중 에러:', error);
    throw error;
  }
}
```

**주요 차이점**
- Promise: `.then()`, `.catch()` 체이닝 방식
- async/await: 동기 코드처럼 작성, try-catch로 에러 처리
- async/await이 더 직관적이고 가독성이 좋음

**병렬 처리**
```javascript
// 순차 처리 (느림)
async function sequential() {
  const user = await fetchUser();
  const posts = await fetchPosts(); // user 완료 후 실행
}

// 병렬 처리 (빠름)
async function parallel() {
  const [user, posts] = await Promise.all([
    fetchUser(),
    fetchPosts()
  ]);
}
```

---

## 7. map과 forEach의 차이를 설명해 주세요. (중요도: 5)

**답변:**
map은 원본 배열을 변경하지 않고 새로운 배열을 생성합니다.

forEach는 반환 값이 없으며, 원본 배열을 직접 변경합니다.

---

## 8. var, let, const의 차이를 설명해 주세요. (중요도: 5)

**답변:**
**var**
- 중복 선언 가능
- 함수레벨 스코프

**let**
- 중복 선언 불가능
- 재할당 가능
- 블록레벨 스코프

**const**
- 중복 선언 불가능
- 재할당 불가능
- 블록레벨 스코프

---

## 9. 메서드 체이닝에 대해 설명해 주세요. (중요도: 5)

**답변:**
자기 자신을 반환하는 함수를 연결하여 호출하는 것을 메서드 체이닝이라고 합니다.

코드가 간략해지는 장점이 있지만 에러 발생 시 어느 부분에서 에러가 발생했는지 알기 어렵다는 단점이 있습니다.

---

## 10. 일반 함수와 화살표 함수의 차이 (중요도: 5)

**답변:**
**일반 함수**
- 함수 호출방식에 따라 this에 바인딩할 객체가 동적으로 결정됨
- new 키워드를 통해 constructor 함수로 사용 가능
- 함수 실행 시 암묵적으로 arguments 변수가 전달되어 사용 가능

**화살표 함수**
화살표 함수는 ES6부터 도입된 함수로 function 키워드 대신 화살표 =>를 사용해 좀 더 간략하게 함수를 정의할 수 있는 방식입니다.

**문법**
```javascript
// 기본 문법
let 함수명 = (매개변수) => { 실행문 }

// 매개변수가 하나인 경우 소괄호 생략 가능
let 함수명 = 매개변수 => { 실행문 }

// 실행문이 하나이고 return만 있는 경우 중괄호와 return 생략 가능
let 두배만들기 = x => x * 2;
```

**특징**
- prototype property가 없기 때문에 new 키워드를 사용하여 constructor 함수로 사용할 수 없음
- arguments 객체를 생성하지 않음
- 화살표 함수의 this는 언제나 상위 스코프의 this(Lexical this)를 가리키며, this에 바인딩할 객체가 정적으로 결정됨
- 클로저(Closure)로 사용 가능
- 호이스팅이 되지 않음

**this 바인딩 차이**
```javascript
// 일반 함수
function normalFunction() {
  console.log(this); // 호출 방식에 따라 this가 결정됨
}

// 화살표 함수
let arrowFunction = () => {
  console.log(this); // 상위 스코프의 this 사용
}
```

**사용 예시**
```javascript
// 배열 메서드와 함께 사용
let numbers = [1, 2, 3, 4, 5];
let doubled = numbers.map(x => x * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// 이벤트 핸들러에서 사용
button.addEventListener('click', () => {
  console.log('버튼이 클릭되었습니다!');
});
```

---

## 11. this의 의미를 설명해 주세요. (중요도: 5)

**답변:**
this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수이며, 함수의 호출 방식에 따라 특정 객체를 바인딩하게 됩니다.

1. 생성자 함수 내부에서 'this'는 생성자 함수가 생성할 인스턴스에 바인딩됩니다.
2. Call, Apply, 또는 Bind 메서드를 사용할 때는, 'this'는 함수에 첫 번째 인자로 전달된 객체에 바인딩됩니다.
3. 객체 내부의 메서드에서 호출될 때는 'this'는 해당 객체에 바인딩됩니다.
4. 위의 세 가지 경우를 제외한 일반 함수 호출에서는 'this'는 전역 객체에 바인딩됩니다.
5. 화살표 함수 내부에서 'this'를 사용할 경우, 'this'는 해당 화살표 함수가 선언된 상위 스코프의 'this'에 바인딩됩니다.

---

## 12. 함수 선언형과 함수 표현식의 차이를 설명해 주세요. (중요도: 5)

**답변:**
함수 선언형(Function Declaration)의 경우 function 키워드를 사용하여 함수를 정의합니다. 함수 선연형은 호이스팅 되기 때문에 코드가 실행되기 전에 로드되고 선언하기 전에도 호출이 가능합니다.

함수 표현식(Function Expression)의 경우 변수에 함수를 할당하는 방식으로 함수를 정의합니다. 함수 표현식은 함수가 선언된 이후에만 호출이 가능하며, 함수가 할당된 변수가 접근 가능한 스코프 내에서만 호출할 수 있습니다.

---

## 13. 호이스팅에 대해 설명해 주세요. (중요도: 5)

**답변:**
호이스팅(Hoisting)은 변수 및 함수의 선언이 스코프 내의 최상단으로 끌어올려지는 것 같은 현상을 말하는데, 이는 자바스크립트 엔진이 코드 실행 전에 변수와 함수의 메모리 공간을 미리 할당해주기 때문입니다.

자바스크립트에서는 인터프리터가 변수와 함수의 메모리 공간을 선언 전에 미리 할당해 줍니다.
이로 인해 변수 및 함수 선언이 스코프의 최상단으로 끌어올려진 것 같은 현상이 발생하는데, 이를 호이스팅이라고 합니다.

**주의할 점:** 함수 표현식은 호이스팅되지 않습니다. 함수 표현식은 변수에 함수를 할당하는 형태로, 변수의 할당 부분만 호이스팅됩니다.

---

## 14. 이벤트 버블링과 이벤트 캡처링에 대해 설명해 주세요. (중요도: 5)

**답변:**
이벤트 버블링(Event Bubbling)은 이벤트가 발생한 요소에서 상위 요소로 이벤트가 전파되는 과정을 말합니다.

이벤트 캡처링(Event Capturing)은 이벤트가 상위 요소에서 하위 요소로 이벤트가 전파되는 과정을 말합니다.

---

## 15. 이벤트 전파와 이벤트 위임에 대해 설명해 주세요. (중요도: 5)

**답변:**
이벤트 전파(Event Propagation)는 DOM 트리 상의 특정 Element node에서 이벤트가 발생하여 다른 Element node로 이벤트가 전파되는 것을 의미합니다.
이벤트의 전파는 Event capturing -> Target -> Event bubbling 순으로 일어납니다.

이벤트 위임(Event Delegation)은 하위 요소마다 이벤트를 추가하지 않고 상위 요소에서 하위 요소의 이벤트들을 제어하는 것을 의미합니다.

---

## 16. 클로저에 대해 설명해 주세요. (중요도: 5)

**답변:**
클로저란(Closure), 함수가 속한 렉시컬 스코프(Lexical scope)를 기억하여 함수가 렉시컬 스코프 밖에서 실행될 때도 그 스코프에 접근할 수 있는 함수를 의미합니다.

클로저는 주로 캡슐화와 정보 은닉을 위해서 활용됩니다.

---

## 17. 렉시컬 스코프에 대해 설명해 주세요. (중요도: 5)

**답변:**
렉시컬 스코프(Lexical scope)란 함수가 선언되는 위치에 따라서 상위 스코프가 결정되는 개념을 의미하며, 다른 말로 정적 스코프(Static scope)라고도 부릅니다.

---

## 18. 렉시컬 환경에 대해 설명해 주세요. (중요도: 5)

**답변:**
렉시컬 환경(Lexical Environment)은 변수 식별자, 해당 변수에 바인딩 된 값, 스코프 체인을 포함하는 자료 구조입니다. 함수를 호출할 때 마다 새로운 렉시컬 환경이 생성되며, 함수의 실행 컨텍스트에 대한 정보를 담고 있습니다. 그리고 함수 실행이 종료되면 해당 렉시컬 환경은 제거됩니다.

---

## 19. 실행 컨텍스트에 대해 설명해 주세요. (중요도: 5)

**답변:**
실행 컨텍스트(Execution Context)는 코드가 실행될 때 생성되는 환경을 나타내는 추상적인 개념입니다. 실행 컨텍스트에는 변수 객체, 스코프 체인, this와 같은 정보들이 포함되며, 스택 구조로 관리됩니다. 그리고 실행이 완료되면 해당 실행 컨텍스트는 스택에서 제거됩니다.

---

## 20. 스코프와 스코프 체인에 대해 설명해주세요. (중요도: 5)

**답변:**
**스코프**
스코프란 변수(식별자)에 접근할 수 있는 유효한 범위를 뜻합니다.

1. **전역 스코프(Global scope)**
   - 코드 어디에서든지 접근 가능

2. **함수 스코프(Local scope)**
   - 함수 내에서만 유효한 범위를 갖게 하는 스코프
   - 전역 스코프와 반대되는 개념으로 지역 스코프(Local scope)라고도 불림

3. **블록 스코프(Block scope)**
   - 블록단위{} 내에서만 유효한 범위를 갖게 하는 스코프

**스코프 체인**
스코프 체인이란, 현재 스코프에서 식별자를 검색할 때 상위 스코프를 연쇄적으로 찾아나가는 방식을 의미합니다.
변수를 참조할 때 자바스크립트 엔진은 스코프 체인을 통해 해당 변수를 참조하는 코드의 스코프부터 상위 스코프 방향으로 이동하며 선언된 변수를 검색합니다.

---

## 21. 프로토타입과 프로토타입 체인에 대해 설명해 주세요. (중요도: 5)

**답변:**
**프로토타입**
자바스크립트는 프로토타입 기반의 언어이며, 프로토타입이란 객체의 원형을 뜻합니다. 즉, 모든 객체는 프로토타입(prototype)이라는 객체를 가지고 각각의 프로토타입으로부터 property와 method를 상속받습니다.

**프로토타입 체인**
자바스크립트는 특정 객체의 property나 method에 접근하려고 할 때, 해당 property나 method가 없을 시 [[Prototype]]이 가리키는 링크를 따라 자신의 부모 역할을 하는 프로토타입 객체의 property나 method를 차례대로 검색합니다. 이를 프로토타입 체인(prototype chain)이라고 합니다.

---

## 22. 깊은 복사와 얕은 복사의 차이점을 설명해 주세요. (중요도: 5)

**답변:**
깊은 복사의 경우 새로운 메모리 공간을 확보하여 완전히 복사하는 것을 의미합니다.

반면, 얕은 복사의 경우 참조 타입 데이터가 저장한 메모리 주소값을 복사하는 것을 의미합니다.

따라서 얕은 복사 후 원시값과 복사된 값 모두 똑같은 참조를 가리키고 있기 때문에 복사된 값을 수정할 시 원시값에 영향을 끼치게 되므로 주의해야 합니다.

---

## 23. 구조 분해 할당(destructuring) 대해 설명해 주세요. (중요도: 5)

**답변:**
객체, 배열의 값을 추출해서 변수에 바로 할당할 수 있는 ES6에서 도입된 편리한 문법입니다.

---

## 24. spread 문법과 rest 문법의 차이에 대해 설명해 주세요. (중요도: 5)

**답변:**
spread 문법은 객체나 배열의 데이터를 풀어놓는 역할을 하고 rest 문법은 spread 문법과 반대로 전달받은 데이터를 배열 또는 객체 안에 채워 넣는 역할을 합니다.

---

## 25. ES6에서 생긴 큰 변화들에 대해 설명해 주세요. (중요도: 5)

**답변:**
1. **let & const 키워드**
   - 함수 스코프를 가지는 var 키워드와는 다르게 블록 스코프를 가짐
   - 재선언 불가
   - const의 경우 재할당 불가

2. **화살표 함수(Arrow function)**
   - 간결한 표현
   - this를 가지고 있지 않아 객체 메서드로 사용하기 부적합
   - 호이스팅 되지 않음

3. **for...of 반복문**
   - 반복 가능한 객체(Array, String, Map, Set 등등)의 값을 순회
   - Object에 for...of 문법 사용 시 TypeError 발생
   - value를 리턴

4. **for...in 반복문**
   - 객체의 속성을 순회
   - key를 리턴 (배열의 경우 index)

5. **클래스(class)**
   - class 키워드로 클래스 생성
   - constructor로 생성자 정의
   - this로 인스턴스 객체에 접근 가능
   - new로 인스턴스 객체 생성 가능
   - 호이스팅 X

6. **프로미스(Promise)**
   - 비동기 처리를 위한 패턴

7. **템플릿 리터럴(Template literals)**
   - 문자열 내 표현식을 삽입할 수 있는 리터럴

8. **기본 매개 변수(Default parameters)**
   - 함수의 매개변수에 기본값 설정 가능

9. **나머지 매개 변수(Rest parameter)**
   - 개수가 정해지지 않은 매개변수들을 배열로 받음

10. **전개 연산자(Spread operator)**
    - 반복 가능한 객체를 전개하여 전달

11. **구조 분해 할당(Destructuring assignment)**
    - 배열이나 객체의 속성을 해체하여 그 값을 별도의 변수에 할당할 수 있는 표현식

12. **제너레이터(Generator)**
    - 코드 블록의 실행을 일시 중지했다가 필요한 시점에 재개할 수 있는 특수한 함수

13. **import & export(가져오기 및 내보내기)**

---

## 26. Ajax에 대해 설명해 주세요. (중요도: 5)

**답변:**
Ajax란 Asynchronous Javascript And XML의 약자로,
브라우저가 가지고 있는 XMLHttpRequest 객체를 이용해서 서버와 브라우저가 비동기 방식으로 데이터를 교환할 수 있는 통신 기능입니다.

---

## 27. import와 require의 차이점에 대해 설명해 주세요. (중요도: 5)

**답변:**
import와 require는 둘 다 외부 파일이나 라이브러리의 코드를 불러오는 역할을 하지만, 다른 문법적 구조를 가지고 있습니다. 또한 하나의 프로그램에서 두 키워드를 동시에 사용할 수 없습니다.

**require**
- NodeJS에서 사용되고 있는 CommonJS의 키워드
- 프로그램의 어느 지점에서나 호출 가능
- 복수객체 내보내기: exports.객체명 = 객체명
- 단일객체 내보내기: module.exports = 객체명

**import**
- ES6에서 새롭게 도입된 키워드
- 필요한 모듈 부분만 선택하여 로드할 수 있기 때문에 require문 보다 성능이 우수하며 메모리 절약
- 복수객체 내보내기: export { 객체명 }
- 단일객체 내보내기: export default

---

## 28. npm에 대해 설명해 주세요. (중요도: 5)

**답변:**
Node Package Manager의 약자로, Node.js에서 사용하는 패키지를 다운로드할 수 있는 프로그램입니다.

---

## 29. package.json과 package-lock.json의 역할에 대해 설명해 주세요. (중요도: 5)

**답변:**
**package.json**
현재 프로젝트에 관한 정보와 패키지 매니저(npm, yarn)를 통해 설치한 모듈들의 의존성을 관리하는 파일입니다.

**package-lock.json**
package.json에 선언된 패키지가 설치될 때 정확한 version과 dependency가 설치되도록 해줍니다.

---

## 30. typescript를 쓰는 이유에 대해 설명해 주세요. (중요도: 5)

**답변:**
타입스크립트란 MS에서 개발하고 관리하는 오픈소스 프로그래밍 언어이며, 자바스크립트의 단점을 해결하기 위해 만들어진 언어입니다.

- Type Error 방지(컴파일 단계에서 오류 포착)
- 명시적인 정적 타입 지정으로 코드 가독성을 높이고 디버깅을 쉽게 할 수 있음
- 코드 자동 완성 및 가이드
- class와 interface의 특징을 지원함으로써 객체지향 프로그래밍 환경을 제공

---

## 31. null, undefined, undeclared, NaN에 대해 설명해 주세요. (중요도: 5)

**답변:**
**null**: 사용자가 null값을 변수에 할당한 경우(빈 값이라는 의미)

**undefined**: 변수를 선언하고 값을 할당하기 전의 값이며, 변수에 값이 할당되어 있지 않은 상태

**undeclared**: 변수가 선언조차 되지 않은 경우

**NaN**: "Not a Number"의 약어이며, 컴퓨터에서 숫자로 나타낼 수 없을 때 나타내는 표시

---

## 32. 자바스크립트 데이터 타입에 대해 설명해 주세요. (중요도: 5)

**답변:**
**원시 타입(primitive data type)**
- boolean
- null
- undefined
- number
- string
- symbol(ES6에서 추가)

**객체/참조 타입(object/reference type)**
- object

---

## 33. mutable과 immutable에 대해 설명해 주세요. (중요도: 5)

**답변:**
**mutable**
- 변경 가능한 변수의 유형
- 참조 타입
- 해당 데이터 주소를 찾아서 값을 변경함
- mutable methods: pop, push, unshift, shift, splice, fill, reverse, sort 등등

**immutable**
- 변경이 불가한 변수의 유형
- 원시 타입
- 해당 데이터 주소와 별개의 새로운 주소에 값이 할당됨
- immutable methods: concat, filter, find, forEach, includes, indexOf, map, join 등등
- (slice, replace, split 등등 문자열 메서드의 경우 전부 immutable methods)

---

## 34. throttle과 debounce에 대해 설명해 주세요. (중요도: 5)

**답변:**
DOM 이벤트를 기반으로 실행하는 JavaScript의 성능을 고려하여 이벤트를 제어 및 제한하는 방법입니다.

**throttle**: 이벤트를 일정 주기마다 처리하여 이벤트를 제어하는 방식

**debounce**: 연속적으로 발생하는 이벤트들을 그룹화하여 하나의 이벤트만 실행되도록 처리하는 방식

---

## 35. iterable, iterator, generator에 대해 설명해 주세요. (중요도: 5)

**답변:**
**이터러블(iterable)**
순회 가능한 객체를 의미합니다.

**이터레이터(iterator)**
반복을 위해 설계된 특정 인터페이스가 있는 객체이며, {value, done}을 반환하고 next() 메서드를 가집니다.

**제너레이터(generator)**
iterator 객체를 반환하며, iterable을 생성하는 함수입니다.
generator를 통해서 iterator를 만들 수 있고 함수 안에서 값을 순회할 수 있습니다.
제너레이터 선언은 함수 선언문에 *(Asterisk)를 붙여 선언합니다.

---

## 36. 자바스크립트 동작 원리에 대해 설명해 주세요. (중요도: 5)

**답변:**
자바스크립트는 싱글 스레드 기반의 언어이며, V8 엔진을 사용합니다. V8 엔진의 경우 크게 메모리 힙(Memory heap)과 콜 스택(Call stack) 두 요소로 구성되어 있습니다.

**Memory heap**
메모리 할당이 이뤄지는 곳입니다.

**Call Stack**
코드가 실행될 때 호출 스택이 쌓이는 곳입니다.

**Web APIs**
콜 스택에서 실행된 비동기 함수는 Web API를 호출하고, Web API는 콜백 함수를 콜백 큐에 밀어 넣습니다.
Web API에는 DOM, Ajax, SetTimeout 등등이 존재합니다.

**Callback Queue**
함수를 저장하는 자료구조로, 선입선출 형식으로 함수를 처리합니다.
TaskQueue라고도 불립니다.

**Event Loop**
이벤트 루프는 콜 스택이 다 비워지면 콜백 큐에 존재하는 함수들을 하나씩 콜 스택에 옮기기는 역할을 합니다.

---

## 37. 실행 컨텍스트의 구성요소에 대해 설명해 주세요. (중요도: 5)

**답변:**
실행 컨텍스트는 다음 3가지 구성요소로 이루어져 있습니다:

**Variable Environment (변수 환경)**
- 현재 컨텍스트 내의 식별자들에 대한 정보 + 외부 환경 정보
- 선언 시점의 LexicalEnvironment의 스냅샷으로, 변경사항은 반영되지 않음

**Lexical Environment (렉시컬 환경)**
- 처음에는 Variable Environment와 같지만 변경 사항이 실시간으로 반영됨
- Environment Record: 현재 컨텍스트와 관련된 코드의 식별자 정보들이 저장
- Outer Environment Reference: 바깥 Lexical Environment를 참조

**This Binding**
- this 식별자가 바라봐야 할 대상 객체

---

## 38. 마이크로태스크 큐와 태스크 큐의 차이점을 설명해 주세요. (중요도: 5)

**답변:**
**마이크로태스크 큐(Microtask Queue)**
- Promise, queueMicrotask, MutationObserver 등이 여기에 들어감
- 우선순위가 높아 태스크 큐보다 먼저 처리됨
- 현재 실행 중인 태스크가 끝나면 마이크로태스크 큐의 모든 작업이 처리됨

**태스크 큐(Task Queue / Callback Queue)**
- setTimeout, setInterval, DOM 이벤트 등이 여기에 들어감
- 마이크로태스크 큐가 비어있을 때만 처리됨
- 한 번에 하나씩만 처리됨

**처리 순서**
1. Call Stack 비어있는지 확인
2. 마이크로태스크 큐의 모든 작업 처리
3. 렌더링 작업 (필요시)
4. 태스크 큐에서 하나의 작업 처리
5. 1번부터 반복

---

## 39. 브라우저 저장소의 차이점에 대해 설명해 주세요. (중요도: 4)

**답변:**
**LocalStorage**
- 반영구적으로 데이터 저장
- 같은 출처의 모든 탭에서 공유
- 용량: 약 5-10MB
- 직접 삭제하거나 브라우저 설정에서 삭제 전까지 유지

**SessionStorage**
- 탭이 닫히면 데이터 삭제
- 같은 출처라도 탭마다 독립적
- 용량: 약 5-10MB
- 세션 종료 시 자동 삭제

**Cookie**
- 서버와 클라이언트 간 데이터 교환에 사용
- HTTP 요청시 자동으로 서버에 전송
- 용량: 4KB로 제한
- 만료 시간 설정 가능
- httpOnly, secure 등 보안 옵션 제공

**IndexedDB**
- 대용량 데이터 저장 가능
- 비동기 API 제공
- 트랜잭션 지원
- 복잡한 데이터 구조 저장 가능

---

## 40. JavaScript에서 스코프(Scope)에 대해 자세히 설명해 주세요. (중요도: 5)

**답변:**
스코프는 변수에 접근할 수 있는 범위를 의미합니다.

**전역 스코프 (Global Scope)**
- 코드의 가장 바깥 영역
- 전역에 선언된 변수는 어디서든 접근 가능
- window 객체의 프로퍼티가 됨 (브라우저 환경)

**함수 스코프 (Function Scope)**
- 함수 내부에서 선언된 변수는 함수 내부에서만 접근 가능
- var로 선언된 변수는 함수 스코프를 가짐

**블록 스코프 (Block Scope)**
- {} 중괄호로 둘러싸인 영역
- let, const로 선언된 변수는 블록 스코프를 가짐

```javascript
// 전역 스코프
var globalVar = 'global';
let globalLet = 'global let';

function outerFunction() {
  // 함수 스코프
  var functionVar = 'function';
  let functionLet = 'function let';
  
  if (true) {
    // 블록 스코프
    var blockVar = 'block var'; // 함수 스코프로 호이스팅
    let blockLet = 'block let'; // 블록 스코프
    const blockConst = 'block const'; // 블록 스코프
  }
  
  console.log(blockVar); // 'block var' - var는 함수 스코프
  console.log(blockLet); // ReferenceError - let은 블록 스코프
}
```

**스코프 체인 (Scope Chain)**
- 내부 함수에서 변수를 찾을 때 현재 스코프부터 상위 스코프로 올라가며 검색
- 가장 가까운 스코프의 변수를 사용 (식별자 결정)

```javascript
var x = 'global';

function outer() {
  var x = 'outer';
  
  function inner() {
    var x = 'inner';
    console.log(x); // 'inner' - 가장 가까운 스코프의 x
  }
  
  inner();
  console.log(x); // 'outer'
}

outer();
console.log(x); // 'global'
```

**렉시컬 스코핑 (Lexical Scoping)**
- 함수를 어디서 호출했는지가 아닌 어디에 선언했는지에 따라 스코프가 결정
- 정적 스코프라고도 함

---

## 41. this 키워드의 동작 방식에 대해 설명해 주세요. (중요도: 5)

**답변:**
this는 함수 호출 방식에 따라 다르게 결정됩니다.

**1. 일반 함수 호출**
- strict mode: undefined
- non-strict mode: 전역 객체 (window, global)

```javascript
function normalFunction() {
  console.log(this); // window (non-strict) / undefined (strict)
}

normalFunction();
```

**2. 메서드 호출**
- 메서드를 호출한 객체가 this

```javascript
const obj = {
  name: 'object',
  getName() {
    return this.name; // obj
  }
};

console.log(obj.getName()); // 'object'

// 메서드를 변수에 할당하면 일반 함수 호출
const getName = obj.getName;
console.log(getName()); // undefined (strict) / '' (non-strict)
```

**3. 생성자 함수 호출**
- 새로 생성되는 객체가 this

```javascript
function Person(name) {
  this.name = name;
  this.getName = function() {
    return this.name;
  };
}

const person = new Person('John');
console.log(person.getName()); // 'John'
```

**4. call, apply, bind 호출**
- 명시적으로 this를 바인딩

```javascript
const obj1 = { name: 'obj1' };
const obj2 = { name: 'obj2' };

function getName() {
  return this.name;
}

console.log(getName.call(obj1)); // 'obj1'
console.log(getName.apply(obj2)); // 'obj2'

const boundGetName = getName.bind(obj1);
console.log(boundGetName()); // 'obj1'
```

**5. 화살표 함수**
- 렉시컬 this: 상위 스코프의 this를 상속

```javascript
const obj = {
  name: 'object',
  
  regularMethod() {
    console.log(this.name); // 'object'
    
    const arrowFunction = () => {
      console.log(this.name); // 'object' - 상위 스코프의 this
    };
    
    function normalFunction() {
      console.log(this.name); // undefined (strict)
    }
    
    arrowFunction();
    normalFunction();
  }
};

obj.regularMethod();
```

---

## 42. 프로토타입(Prototype)과 프로토타입 체인에 대해 설명해 주세요. (중요도: 5)

**답변:**
프로토타입은 JavaScript에서 객체 간 상속을 구현하는 메커니즘입니다.

**프로토타입의 개념**
- 모든 객체는 프로토타입이라는 또 다른 객체를 가리키는 내부 링크를 가짐
- 프로토타입 객체에도 프로토타입이 있어 프로토타입 체인을 형성

```javascript
// 함수 객체는 prototype 프로퍼티를 가짐
function Person(name) {
  this.name = name;
}

// prototype 객체에 메서드 추가
Person.prototype.sayHello = function() {
  console.log(`Hello, I'm ${this.name}`);
};

Person.prototype.age = 0;

const person1 = new Person('Alice');
const person2 = new Person('Bob');

// 프로토타입 메서드 사용
person1.sayHello(); // "Hello, I'm Alice"
person2.sayHello(); // "Hello, I'm Bob"

console.log(person1.age); // 0 (프로토타입에서 상속)
```

**프로토타입 체인**
- 객체의 프로퍼티나 메서드를 찾을 때 현재 객체부터 프로토타입 체인을 따라 올라가며 검색
- 최상위는 Object.prototype

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(`${this.name} makes a sound`);
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

// Dog가 Animal을 상속하도록 프로토타입 체인 설정
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  console.log(`${this.name} barks!`);
};

const myDog = new Dog('Max', 'Golden Retriever');

myDog.speak(); // "Max makes a sound" (Animal.prototype에서 상속)
myDog.bark();  // "Max barks!" (Dog.prototype의 메서드)

// 프로토타입 체인: myDog -> Dog.prototype -> Animal.prototype -> Object.prototype -> null
```

**프로토타입 관련 메서드**
```javascript
// 프로토타입 확인
console.log(myDog instanceof Dog); // true
console.log(myDog instanceof Animal); // true

// 프로토타입 체인 확인
console.log(Object.getPrototypeOf(myDog) === Dog.prototype); // true
console.log(Dog.prototype.isPrototypeOf(myDog)); // true

// 속성 소유 확인
console.log(myDog.hasOwnProperty('name')); // true
console.log(myDog.hasOwnProperty('speak')); // false (프로토타입에 있음)
```

**ES6 클래스와의 관계**
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  
  bark() {
    console.log(`${this.name} barks!`);
  }
}

// 내부적으로는 프로토타입 기반으로 동작
const dog = new Dog('Rex', 'Labrador');
console.log(dog.__proto__ === Dog.prototype); // true
console.log(Dog.prototype.__proto__ === Animal.prototype); // true
```