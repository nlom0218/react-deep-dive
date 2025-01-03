//! ===== 1.1.4 리액트에서의 동등 비교 =====

/**
 ** 리액트에서는 objectIs를 기반으로 동등 비교를 하는 shallowEqual이라는 함수를 만들어 사용
 ** 이 함수는 두 객체를 비교하여 얕은 동등성을 확인하여 의존성 비교 등 리액트의 동등 비교가 필요한 다양한 곳에서 사용
 ** 얕은 비교는 객체의 최상위 키와 해당 값이 동일한지만 확인
 */

import is from './objectIs';

//* 객체에 특정 프로퍼티가 있는지 확인하는 메서드
const hasOwnProperty = Object.prototype.hasOwnProperty;

function shallowEqual(objA: any, objB: any): boolean {
  if (is(objA, objB)) {
    return true;
  }

  //* 그 다음 비교를 위해 objA, objB는 object 타입이어야 한다.
  //* 단, null은 원시타입이지만 typeof로 검사였을 때 object이기 때문에 조건을 추가한다.
  //* 즉, objA, objB가 모두 객체가 아니거나, null인 경우 비교를 중단하고 false를 반환
  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  //* 길이 다르면 더 비교할 것도 없이 바로 false를 반환
  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i++) {
    const currentKey = keysA[i];

    if (
      //* 1. objB에 currentKey가 없거나
      !hasOwnProperty.call(objB, currentKey) ||
      //* 2. 각 키의 값이 다르다면
      !is(objA[currentKey], objB[currentKey])
    ) {
      //* 3. false를 반환
      return false;
    }
  }

  return true;
}

export default shallowEqual;

/**
 * is와 shallowEqual의 차이는 비교의 깊이이다.
 * is의 경우 참조값이 다른 객체인 경우 false를 반환한다.
 * shallowEqual의 경우는 첫 번째 깊이에 존재하는 값까지 비교하여 결과를 반환한다.
 */

is({ name: 'hi' }, { name: 'hi' }); // 참조값이 다르므로 false
shallowEqual({ name: 'hi' }, { name: 'hi' }); // 참조값이 달라고 첫 번째 깊이까지 비교하기 때문에 true
