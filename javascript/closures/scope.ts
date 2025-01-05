//! ===== 1.4.2 변수의 우효 범위, 스코프 =====

/**
 ** 전역 스코프: 전역 레벨에 선언하는 것
 */

//* var 선언으로 인해 window 객체의 속성이 된다. const 선언은 전역 변수로 선언되더라도 블록 스코프를 갖는다.
var global = 'global scope';

function hello() {
  console.log(global);
}

console.log(global); // global scope
hello(); // global scope
console.log(global === window.global); // true

/**
 ** 함수 스코프
 ** 자바스크립트는 기본적으로 함수 레벨 스코프를 따른다. 때문에 {} 블록이 스코프 범위를 결정하지 않는다.
 */

//* {} 내에 변수를 선언할지라도 이는 밖에서도 접근이 가능하다.
if (true) {
  var myName = 'HD';
}

console.log(myName); // HD
console.log(myName === window.myName); // true

//* 함수내에 선언한 변수는 밖에서 접근이 불가능하다.
function hello2() {
  var local = 'local variable';
  console.log(local); // local variable
}

hello();
console.log(local); // Uncaught ReferenceError: local is not defined

/**
 ** 스코프가 중첩되어 있을 때, 가장 가까운 스코프에서 변수가 존재하는지를 우선적으로 확인한다.
 ** 그러다가 전역까지 왔을 때에도 못 찾는다면 에러를 발생시킨다.
 */

var x = 10;

function foo() {
  var x = 100;
  console.log(x); // 100

  function bar() {
    var x = 1000;
    console.log(x); // 10000
  }
}

console.log(x); // 10
foo();
