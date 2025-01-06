//! ===== 1.4.3 클로저의 활용 =====

/**
 ** 아래의 예제에서 counter 변수는 전역 레벨에 선언되어 누구나 수정할 수 있다.
 ** 이는 애플리케이션이 쉽게 망가질 수 있는 여지를 준다.
 */
var counter = 0;

function handleClick() {
  counter++;
}

/**
 ** 위와 같은 문제를 해결하기 위해 리액트는 내부 상태 값을 별도로 관리하는 클로저 내부에서만 접근할 수 있도록 한다.
 ** 아래는 클로저를 활용한 코드이다.
 */
function Counter() {
  var counter = 0;

  return {
    increase: function () {
      counter++;
    },

    decrease: function () {
      counter--;
    },

    counter: function () {
      console.log('counter에 접근!');
      return counter;
    },
  };
}

var c = Counter();

console.log(c.increase()); // 1
console.log(c.increase()); // 2
console.log(c.decrease()); // 1

/**
 ** 이와 같은 코드는 다음과 같은 이점을 가진다.
 ** 1. counter 변수를 사용자가 직접 수정할 수 없다.
 ** 2. counter 변수의 업데이트 함수를 제한하여 무분별한 변경을 막을 수 있다.
 ** 즉, 개발자가 원하는 방향으로 원하는 정보만 노출시킬 수 있다.
 *
 ** 리액트에서는 useState가 바로 이러한 클로저의 원리를 이용하고 있는 대표적인 예시이다.
 */
