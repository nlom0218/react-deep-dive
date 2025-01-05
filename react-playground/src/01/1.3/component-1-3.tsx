//! ===== 1.1.4 리액트에서의 동등 비교 =====

import { memo, useEffect, useMemo, useState } from 'react';

type Props = {
  counter: number;
};

const Component = memo((props: Props) => {
  useEffect(() => {
    console.log('Component has been rendered');
  });

  return <h1>Component: {props.counter}</h1>;
});

//* DeeperComponent의 Props는 객체이며 키는 또다른 객체를 가지고 있다.
type DeeperProps = {
  counter: {
    counter: number;
  };
};

const DeeperComponent = memo((props: DeeperProps) => {
  useEffect(() => {
    console.log('DeeperComponent has been rendered');
  });

  return <h1>DeeperComponent: {props.counter.counter}</h1>;
});

export default function Example() {
  const [, setCounter] = useState(0);

  function handleClick() {
    setCounter((prev) => prev + 1);
  }

  return (
    <div>
      {/* 원시 값인 100을 직접 전달받기 때문에 참조가 변경되지 않기 때문에 리랜더링이 되지 않는다. */}
      <Component counter={100} />
      {/*
        DeeperComponent의 counter의 값은 달라지지 않았음에도 불구하고 버튼을 누를 때 마다 리랜더링이 계속 일어난다.
        이는 DeeperComponent의 Props를 이전 값과 비교하게 될 때 첫번째 깊이의 counter의 값인 { counter: 100 }의 참조가 서로 다르기 때문이다.
        -> 리랜더링이 일어날 때 마다 counter={{ counter: 100 }}는 새로운 객체를 생성
        만약 첫번째 깊이였다면 얕은 비교를 통해 값은 같다고 shallowEqual 함수에서 판단을 한다.(Component 컴포넌트에서 처럼)
      */}
      <DeeperComponent counter={{ counter: 100 }} />
      <button onClick={handleClick}>+</button>
    </div>
  );
}

/**
 ** DeeperComponent의 예시에서 알 수 있는 것은 리액트에서 리랜더링 판단을 shallowEqual메서드를 사용하여 얕은 비교를 통해 한다는 것이다.
 ** props중에 깊이가 깊은(중첩이 있는) 객체가 있다면 유념해야 할 것이다. 값이 바뀌지 않았는데 불필요한 리랜더링이 발생하여 성능에 악영향을 줄 것이기 때문이다.
 ** 이를 해결하기 위한 중요한 개념은 바로 immutability(불변성)이다. immutability(불변성) 유지해야 한다.
 *
 * {@link https://ko.react.dev/learn/tutorial-tic-tac-toe#why-immutability-is-important}
 * {@link https://ko.react.dev/learn/updating-objects-in-state}
 */

/**
 ** DeeperComponent를 해결하기 위한 방법으로는
 ** 1. useMemo 사용: 객체의 참조를 고정
 ** 2. useState 사용: 상태로 관리기 때문에 참조가 변경되지 않음
 */

/** Solution */
export function Solution1() {
  const [, setCounter] = useState(0);

  const counter = useMemo(() => ({ counter: 100 }), []);

  function handleClick() {
    setCounter((prev) => prev + 1);
  }

  return (
    <div>
      <Component counter={100} />
      <DeeperComponent counter={counter} />
      <button onClick={handleClick}>+</button>
    </div>
  );
}

export function Solution2() {
  const [, setCounter] = useState(0);
  const [counter] = useState({ counter: 100 });

  function handleClick() {
    setCounter((prev) => prev + 1);
  }

  return (
    <div>
      <Component counter={100} />
      <DeeperComponent counter={counter} />
      <button onClick={handleClick}>+</button>
    </div>
  );
}

/**
 *! 내부에 있는 객체, 즉 가장 깊은 곳까지 완벽하게 비교 하기 위해 재귀문을 넣었다면 깊이를 정확히 알 수 없기 때문에 성능에 엄청난 악영향을 미칠 것이다.
 */
