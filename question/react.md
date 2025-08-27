# React 면접 질문

## 1. DOM에 대해 설명해 주세요. (중요도: 5)

**답변:**
DOM이란 Document Object Model의 약자로, HTML 문서를 구조화하여 나타낸 것을 의미합니다.
또한 프로그래밍 언어가 DOM 구조에 접근할 수 있는 방법을 제공하여 문서 구조, 스타일, 내용들을 변경할 수 있게 도와주는 인터페이스 역할을 합니다.

---

## 2. Virtual DOM에 대해 설명해 주세요. (중요도: 5)

**답변:**
Virtual DOM이란 메모리 상에 있는 가상의 DOM으로, 변경된 부분만 업데이트하여 빠른 웹 렌더링을 가능하게 하는 기법입니다. 브라우저 렌더링의 리소스 소모를 줄일 수 있습니다.

---

## 3. 클래스형 컴포넌트와 함수형 컴포넌트의 차이를 설명해 주세요. (중요도: 5)

**답변:**
**클래스형 컴포넌트**
- 생명주기 API 사용 가능
- state 기능 및 메모리 자원을 함수형 컴포넌트보다 더 많이 사용
- 임의 메서드 정의 가능

**함수형 컴포넌트**
- state와 생명주기 API 사용 불가능 → Hooks를 통해 해결 가능
- 메모리 자원을 클래스형 컴포넌트보다 덜 사용
- 컴포넌트 선언이 편함

---

## 4. React의 장점과 단점을 설명해 주세요. (중요도: 5)

**답변:**
**React의 장점**
- Virtual DOM을 사용함으로써 성능이 뛰어남
- 컴포넌트의 가독성이 매우 높고 간단하여 쉬운 유지보수가 가능하며 재사용성이 뛰어남
- 활발한 커뮤니티와 라이브러리 생태계
- 다양한 UI를 개발할 수 있음
- 다른 프레임워크나 라이브러리와 혼용 가능

**React의 단점**
- 지원하지 않는 브라우저가 존재 (IE8 이하)
- 애플리케이션의 규모가 커질수록 상태 관리가 복잡해짐
- View 이외에 기능들은 직접 구현하거나 라이브러리를 사용해야 함

---

## 5. JSX에 대해 설명해 주세요. (중요도: 5)

**답변:**
JSX란 JavaScript를 확장한 문법으로, 유효한 자바스크립트 객체가 HTML element 내부에 들어갈 수 있도록 해줍니다.

---

## 6. 브라우저는 JSX 파일을 읽을 수 있나요? (중요도: 5)

**답변:**
브라우저는 JSX 파일을 읽을 수 없습니다.
JSX 파일을 읽기 위해서는 Babel과 같은 JSX Transformer에 의해 일반적인 자바스크립트 형태의 코드로 변환되어야 합니다.

---

## 7. 재조정(Reconciliation) 개념에 대해서 설명해 주세요. (중요도: 5)

**답변:**
재조정(Reconciliation)은 새로운 Virtual DOM과 기존 DOM을 비교하여 차이를 찾아내고 변경된 부분을 실제 DOM에 적용하는 과정을 의미합니다.

---

## 8. state와 props의 차이를 설명해 주세요. (중요도: 5)

**답변:**
**state**
- 컴포넌트 내부에서 관리되는 값
- 값이 변할 수 있으며, 변할 경우 re-rendering이 발생함

**props**
- 부모 컴포넌트로부터 전달받는 값
- 읽기 전용이므로 props를 받아온 컴포넌트에서 props를 직접 수정할 수 없음

---

## 9. 자식 컴포넌트에서 props를 변경할 수 있나요? (중요도: 5)

**답변:**
props는 읽기 전용이기 때문에 직접 변경할 수 없습니다.
하지만 부모 컴포넌트에서 setState 함수를 자식 컴포넌트에 props로 전달하면 자식 컴포넌트에서 해당 함수를 호출함으로써 props를 변경할 수 있습니다.

---

## 10. React Hooks에 대해 설명해 주세요. (중요도: 5)

**답변:**
React Hooks는 React 16.8에서 도입된 기능으로, 함수형 컴포넌트에서도 state와 생명주기 메서드를 사용할 수 있게 해주는 기능입니다.

**주요 Hooks**
- **useState**: 함수형 컴포넌트에서 상태를 관리
- **useEffect**: 함수형 컴포넌트에서 생명주기 메서드를 대체
- **useContext**: Context API를 함수형 컴포넌트에서 사용
- **useReducer**: useState의 대체 함수로 복잡한 상태 로직을 관리
- **useCallback**: 함수를 메모이제이션하여 불필요한 렌더링을 방지
- **useMemo**: 값을 메모이제이션하여 연산 최적화
- **useRef**: DOM 요소나 변수를 참조

---

## 11. React의 생명주기 메서드에 대해 설명해 주세요. (중요도: 5)

**답변:**
React 생명주기는 컴포넌트가 생성되고 소멸되기까지의 과정을 의미합니다.

**생명주기 단계**
1. **Mounting (마운팅)**: 컴포넌트가 생성되어 DOM에 삽입되는 과정
   - constructor()
   - componentDidMount()

2. **Updating (업데이트)**: 컴포넌트가 업데이트되는 과정
   - componentDidUpdate()

3. **Unmounting (언마운팅)**: 컴포넌트가 DOM에서 제거되는 과정
   - componentWillUnmount()

---

## 12. useEffect와 useLayoutEffect의 차이를 설명해 주세요. (중요도: 5)

**답변:**
**useEffect**
- 비동기적으로 실행됩니다.
- DOM 업데이트가 완료된 후 실행됩니다.
- 대부분의 사이드 이펙트에 사용됩니다.

**useLayoutEffect**
- 동기적으로 실행됩니다.
- DOM 업데이트 전에 실행됩니다.
- DOM 측정이나 스타일 변경과 같이 DOM 조작이 필요한 경우에 사용됩니다.

---

## 13. state를 변경할 때 불변성을 유지해야 하는 이유와 setState 함수를 사용하는 이유를 설명해 주세요. (중요도: 5)

**답변:**
React는 state나 props의 변화를 감지할 때 얕은 비교(shallow compare)를 수행합니다.
만약 state를 직접 변경한다면 React는 변화를 감지하지 못해 re-rendering이 일어나지 않습니다.

따라서 setState 함수를 사용하여 새로운 객체를 생성하고 불변성을 유지해야 React가 변화를 감지하고 적절히 re-rendering할 수 있습니다.

---

## 14. React에서 렌더링 성능을 최적화하는 방법들을 설명해 주세요. (중요도: 5)

**답변:**
1. **React.memo**: 함수형 컴포넌트의 props가 변경되지 않았을 때 re-rendering을 방지
2. **useMemo**: 복잡한 계산의 결과를 메모이제이션하여 불필요한 계산을 방지
3. **useCallback**: 함수를 메모이제이션하여 자식 컴포넌트의 불필요한 re-rendering을 방지
4. **코드 스플리팅**: React.lazy()와 Suspense를 사용하여 필요한 시점에 컴포넌트를 로드
5. **Virtual DOM 최적화**: key props를 적절히 사용하여 리스트 렌더링 최적화
6. **불변성 유지**: 객체와 배열을 직접 변경하지 않고 새로운 객체를 생성

---

## 15. Props Drilling이 무엇이며, 해결 방법에는 어떤 것들이 있나요? (중요도: 5)

**답변:**
**Props Drilling**
Props Drilling은 상위 컴포넌트에서 하위 컴포넌트로 props를 여러 레벨에 걸쳐 전달하는 현상을 의미합니다.
중간 단계의 컴포넌트들이 해당 props를 사용하지 않음에도 불구하고 단순히 전달만을 위해 props를 받아야 하는 문제가 발생합니다.

**해결 방법**
1. **Context API**: React에서 제공하는 전역 상태 관리 도구
2. **상태 관리 라이브러리**: Redux, Zustand, Recoil 등의 라이브러리 활용
3. **컴포넌트 구조 개선**: 컴포넌트 계층 구조를 재설계하여 props 전달 경로를 단순화
4. **Compound Component 패턴**: 관련된 컴포넌트들을 하나의 그룹으로 묶어서 관리

---

## 16. React에서 전역 상태 관리를 하는 방법들에 대해 설명해 주세요. (중요도: 5)

**답변:**
1. **Context API**
   - React에서 기본 제공하는 전역 상태 관리 도구
   - useContext Hook과 함께 사용
   - 간단한 전역 상태에 적합

2. **Redux**
   - 가장 널리 사용되는 상태 관리 라이브러리
   - 단방향 데이터 플로우와 예측 가능한 상태 업데이트
   - 복잡한 애플리케이션에 적합

3. **Zustand**
   - 가볍고 간단한 상태 관리 라이브러리
   - 보일러플레이트 코드가 적음
   - TypeScript 지원이 우수함

4. **Recoil**
   - Facebook에서 개발한 상태 관리 라이브러리
   - Atom과 Selector 개념을 사용
   - 컴포넌트 레벨에서의 세밀한 상태 관리 가능

5. **Jotai**
   - Atomic 접근 방식의 상태 관리
   - Bottom-up 방식으로 상태를 구성
   - 작은 상태 단위로 관리

---

## 17. React에서 key prop의 역할과 중요성에 대해 설명해 주세요. (중요도: 5)

**답변:**
**key prop의 역할**
key prop은 React가 Virtual DOM을 비교할 때 각 요소를 식별하는 데 사용되는 고유한 식별자입니다.

**중요성**
1. **효율적인 재조정**: React가 어떤 요소가 변경, 추가, 제거되었는지 빠르게 판단할 수 있음
2. **성능 최적화**: 불필요한 DOM 조작을 줄여 렌더링 성능을 향상
3. **상태 보존**: 올바른 key를 사용하면 컴포넌트의 상태가 의도치 않게 초기화되는 것을 방지

**key 사용 시 주의사항**
- 배열의 index를 key로 사용하는 것은 권장하지 않음 (항목의 순서가 변경될 수 있기 때문)
- key는 형제 요소들 간에 고유해야 함
- key는 안정적이고 예측 가능하며 고유한 값이어야 함

---

## 18. React에서 에러 처리 방법들에 대해 설명해 주세요. (중요도: 5)

**답변:**
1. **Error Boundary**
   - 클래스 컴포넌트에서 사용할 수 있는 에러 처리 방법
   - componentDidCatch()와 static getDerivedStateFromError() 메서드 사용
   - 자식 컴포넌트에서 발생하는 JavaScript 에러를 포착하고 UI 대체

2. **try-catch 문**
   - 이벤트 핸들러 내에서 발생하는 에러 처리
   - 비동기 함수에서의 에러 처리

3. **React Error Boundary 라이브러리**
   - react-error-boundary와 같은 라이브러리 활용
   - 함수형 컴포넌트에서도 Error Boundary 기능을 사용 가능

4. **전역 에러 처리**
   - window.onerror 또는 window.addEventListener('error')를 사용
   - 예상치 못한 에러들을 포착하여 로깅

**에러 처리 모범 사례**
- 사용자에게 친화적인 에러 메시지 표시
- 에러 로깅 및 모니터링 시스템 구축
- 부분적 실패를 허용하는 설계 (Graceful degradation)

---

## 19. React의 함수형 컴포넌트에서 생명주기를 구현하는 방법을 설명해 주세요. (중요도: 5)

**답변:**
React Hooks를 사용하여 함수형 컴포넌트에서 클래스형 컴포넌트의 생명주기 메서드를 구현할 수 있습니다.

**useEffect를 활용한 생명주기 구현**

**1. componentDidMount**
```javascript
useEffect(() => {
  // 컴포넌트가 마운트된 후 실행
  console.log('Component mounted');
  
  // API 호출, 이벤트 리스너 등록 등
  fetchData();
}, []); // 빈 배열로 한 번만 실행
```

**2. componentDidUpdate**
```javascript
// 특정 props나 state 변경 시
useEffect(() => {
  console.log('userId changed');
  fetchUserData(userId);
}, [userId]);

// 모든 업데이트 시 (권장하지 않음)
useEffect(() => {
  console.log('Component updated');
});
```

**3. componentWillUnmount**
```javascript
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Timer running');
  }, 1000);
  
  // cleanup 함수 (컴포넌트 언마운트 시 실행)
  return () => {
    clearInterval(timer);
    console.log('Component will unmount');
  };
}, []);
```

**4. 조건부 실행**
```javascript
// 이전 값과 비교하여 실행
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

// 사용법
const prevCount = usePrevious(count);
useEffect(() => {
  if (prevCount !== undefined && prevCount !== count) {
    console.log(`Count changed from ${prevCount} to ${count}`);
  }
}, [count, prevCount]);
```

**5. 복합 생명주기 패턴**
```javascript
function MyComponent({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Mount + userId 변경 시
  useEffect(() => {
    if (!userId) return;
    
    setLoading(true);
    
    const controller = new AbortController();
    
    fetchUser(userId, { signal: controller.signal })
      .then(setUser)
      .finally(() => setLoading(false));
    
    // Cleanup (언마운트 또는 userId 변경 시)
    return () => {
      controller.abort();
    };
  }, [userId]);
  
  // 렌더링
  if (loading) return <Loading />;
  if (!user) return <div>No user found</div>;
  return <UserProfile user={user} />;
}
```

**클래스형 vs 함수형 생명주기 비교**

| 클래스형 | 함수형 (Hooks) |
|---------|----------------|
| `constructor()` | `useState()` |
| `componentDidMount()` | `useEffect(fn, [])` |
| `componentDidUpdate()` | `useEffect(fn, [deps])` |
| `componentWillUnmount()` | `useEffect(() => fn, [])` |
| `shouldComponentUpdate()` | `React.memo()` |
| `getSnapshotBeforeUpdate()` | 해당 없음 |
| `componentDidCatch()` | Error Boundary 필요 |

---

## 20. React에서 렌더링이 멈추는 이유와 해결 방법을 설명해 주세요. (중요도: 4)

**답변:**
React에서 렌더링이 중단되거나 느려지는 주요 원인과 해결 방법입니다.

**렌더링이 멈추는 주요 원인**

**1. JavaScript 실행으로 인한 차단**
```javascript
// 문제 코드: 긴 동기 작업
function heavyCalculation() {
  for (let i = 0; i < 1000000000; i++) {
    // 무거운 계산
  }
  return result;
}

function MyComponent() {
  const [result, setResult] = useState(null);
  
  const handleClick = () => {
    // UI가 멈춤
    const data = heavyCalculation();
    setResult(data);
  };
  
  return <button onClick={handleClick}>Calculate</button>;
}
```

**해결 방법: 비동기 처리**
```javascript
// 해결: Web Worker 사용
function MyComponent() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleClick = async () => {
    setLoading(true);
    
    // Web Worker에서 실행
    const worker = new Worker('/heavy-calculation-worker.js');
    worker.postMessage({ data: inputData });
    
    worker.onmessage = (e) => {
      setResult(e.data);
      setLoading(false);
      worker.terminate();
    };
  };
  
  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? 'Calculating...' : 'Calculate'}
    </button>
  );
}

// 또는 setTimeout으로 분할
function heavyCalculationAsync(data, callback) {
  const chunkSize = 1000;
  let index = 0;
  
  function processChunk() {
    const endIndex = Math.min(index + chunkSize, data.length);
    
    for (let i = index; i < endIndex; i++) {
      // 작업 처리
    }
    
    index = endIndex;
    
    if (index < data.length) {
      setTimeout(processChunk, 0); // 다음 프레임에서 계속
    } else {
      callback(result);
    }
  }
  
  processChunk();
}
```

**2. 무한 렌더링 루프**
```javascript
// 문제 코드
function MyComponent() {
  const [count, setCount] = useState(0);
  
  // 의존성 배열 누락으로 무한 루프
  useEffect(() => {
    setCount(count + 1);
  }); // 의존성 배열 없음
  
  return <div>{count}</div>;
}
```

**해결 방법**
```javascript
// 올바른 의존성 설정
useEffect(() => {
  setCount(prev => prev + 1);
}, []); // 한 번만 실행

// 또는 적절한 조건 설정
useEffect(() => {
  if (someCondition) {
    setCount(count + 1);
  }
}, [count, someCondition]);
```

**3. 과도한 리렌더링**
```javascript
// 문제: 매번 새 객체/함수 생성
function Parent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      {/* 매번 새 함수 생성 */}
      <Child onClick={() => console.log('clicked')} />
      {/* 매번 새 객체 생성 */}
      <Child config={{ theme: 'dark' }} />
    </div>
  );
}
```

**해결 방법: 메모이제이션**
```javascript
// useCallback과 useMemo 사용
function Parent() {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);
  
  const config = useMemo(() => ({
    theme: 'dark'
  }), []);
  
  return (
    <div>
      <Child onClick={handleClick} />
      <Child config={config} />
    </div>
  );
}

// React.memo로 자식 컴포넌트 최적화
const Child = React.memo(function Child({ onClick, config }) {
  return <button onClick={onClick}>Button</button>;
});
```

**4. 큰 리스트 렌더링**
```javascript
// 문제: 큰 리스트 한번에 렌더링
function BigList({ items }) {
  return (
    <div>
      {items.map(item => (
        <ComplexItem key={item.id} item={item} />
      ))}
    </div>
  );
}
```

**해결 방법: 가상화**
```javascript
// React Window 사용
import { FixedSizeList } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <ComplexItem item={items[index]} />
    </div>
  );
  
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
    >
      {Row}
    </FixedSizeList>
  );
}
```

**성능 모니터링 도구**

1. **React DevTools Profiler**
2. **브라우저 Performance 탭**
3. **React 18의 Concurrent Features**

```javascript
// React 18 Concurrent Features
import { startTransition } from 'react';

function MyComponent() {
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);
  
  const handleChange = (e) => {
    setInput(e.target.value);
    
    // 긴급하지 않은 업데이트를 낮은 우선순위로
    startTransition(() => {
      setList(generateLargeList(e.target.value));
    });
  };
  
  return (
    <div>
      <input value={input} onChange={handleChange} />
      <List items={list} />
    </div>
  );
}
```