//! ===== 1.1.4 리액트에서의 동등 비교 =====

/**
 ** 리액트에서 동등 비교는 ==, ===가 아니라 Object.is다.
 ** 아래의 함수들은 리액트에서 실제로 값을 비교할 때 사용하는 코드다.
 */

function is(x: any, y: any) {
  return (
    //* 1-1. x와 y가 같으면서
    (x === y &&
      //* 1-2. x가 0이 아니거나 만약 0이더라고 각각 Infinity로 계산을 하여도 같다면 true
      (x !== 0 || 1 / x === 1 / y)) ||
    //* 2. 혹은 x, y가 NaN이라면 true
    //* 자바스크립트에서 NaN은 자기자신과 같지 않음
    //* Object.js에서는 NaN를 ===와 다르게 같은 값으로 취급
    (x !== x && y !== y)
  );
}

const objectIs: (x: any, y: any) => boolean =
  //* 브라우저나 Node.js 환경에 따라 Object.is가 없는 경우를 대비한 검증
  typeof Object.is === 'function' ? Object.is : is;

export default objectIs;
