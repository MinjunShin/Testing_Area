# Lexical Scope and Dynamic Scope

Date: August 5, 2021
Tags: Computer Science

우리가 접하는 대부분의 언어(C, C++, Java, JavaScript) 들은 Lexial Scope 를 사용한다.

Lexial Scope는 Static Scope라고도 불린다.

이와 반대의 방식으로 Dynamic Scope 가 있고, Perl, Bash shell, APL 등 오래된 언어들이 사용하는 방식이다.

- `**Lexial Scope**`는 `**변수나 함수가 정의된 곳의 context**`를 사용하며
- `**Dynamic Scope**`는 `**변수나 함수가 불려진 곳의 context**`를 사용한다.

## Dynamic Scope의 예시

---

자바스크립트에서 아래와 같은 코드를 실행해보면 실제와는 다르게 나오겠지만, 동적 스코핑을 적용한다고 가정하면 결과값은 다음과 같이 나온다.

```jsx
// JavaScript with Dynamic Scope
function foo() {
  console.log(x);
}

function bar() {
  var x = 15;
  foo();
}

var x = 10;
foo(); // 10
bar(); // 15
```

1. 처음 `foo()` 를 호출했을 때는 x 값을 전역변수 `var x = 10` 으로부터 읽어왔다.
2. 동적 스코프를 적용했기 때문에, 원래대로라면 `bar()` 의 출력값도 10이 되어야 하겠지만 내부에 선언된 `var x = 15` 의 값을 읽어옴으로서 결과값이 15가 되었다.

## 언어에 따른 lexial scoped의 차이

---

### Block Scope

C계열의 언어들은 모든 블록이 자신의 스코프를 가진다.

```jsx
// C
void main() {
  int x = 1;
  printf("%d", x); // 1
  if(1) {
    int x = 2;
    printf("%d", x); // 2
  }
  printf("%d", x); // 1
}
```

if 블록 자체가 자신만의 스코프를 가지고 있으므로, 해당 블록 내에서 `x` 값을 불러올 때는 해당 블록 내의 변수를 사용하여 값을 가져온다. (`x = 2`)

if 블록을 지나고 나면, 다시 main 함수의 스코프에 선언된 `x = 1` 값을 가져와서 출력하는 것이다.

### Function Scope

자바스크립트는 function 스코프를 사용한다. function 만이 자신만의 스코프를 가지는 것이다.

```jsx
// JavaScript
function foo() { // foo 
  var x = 1;
  console.log(x); // 1
  if(true) {
    var x = 2;
    console.log(x); // 2
  }
  console.log(x); // 2
}
 
foo();
```

이와 같은 이유로 Javascript에서 새로운 scope 생성을 위해서는 필요한 곳에 function을 추가하면 된다.

```jsx
// JavaScript
function foo() {
  var x = 1;
  if (true) {
    (function () {
      var x = 2;
      console.log(x); // 2
    })();
  }
  console.log(x); // 1
}
 
foo();
```

위와 같이 한번만 실행될 코드에 대한 문법을 Immediately-Invoked Function Expression(IIFE) 라고 한다.

let keyword 또한 ES6에서 추가된 문법인데, var keyword가 function 스코프이기 때문에 가지는 문제를 어느 정도 해결하였다.

**좀 더 복잡한 예제로 알아보자.**

```jsx
var make = '전역스코프'

function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

Car.prototype.newfunc1 = function () {
    return x => {
     console.log(`이 차량은 ${this.make}에서 제작하였습니다.`)
    }
}

Car.prototype.newfunc2 = function () {
    return function() {
     console.log(`이 차량은 ${this.make}에서 제작하였습니다.`)
    }
}

Car.prototype.newfunc3 = function () {
     console.log(`이 차량은 ${this.make}에서 제작하였습니다.`)
}

Car.prototype.newfunc4 = x => {
     console.log(`이 차량은 ${this.make}에서 제작하였습니다.`)
}

const car1 = new Car('Eagle', 'Talon TSi', 1993);

car1.newfunc1()() // 이 차량은 Eagle에서 제작하였습니다.
car1.newfunc2()() // 이 차량은 전역스코프에서 제작하였습니다.
car1.newfunc3() // 이 차량은 Eagle에서 제작하였습니다.
car1.newfunc4() // 이 차량은 전역스코프에서 제작하였습니다.
```

화살표 함수로 선언한 `newfunc1` 은 정상적으로 `car1`의 `make`를 출력하는데,

일반적인 함수 표현식으로 선언한 `newfunc2` 는 `car1`의 `make` 값을 읽어오지 못한다.

화살표 함수로 선언하면 `lexial scope`로 인식되기 때문에, 외부함수의 값을 참조한다.

화살표 함수는 자신의 `this`를 갖지 않기 때문이다.

함수 표현식으로 선언하면 `dynamic scope`로 인식하여  외부함수의 값을 참조하지 못한다.

간단히 생각하여 `newfunc3`와 `newfunc4` 의 차이점을 알아보면 되겠다.

 

**var keyword**

- Function Scope
- Hoisting
- 중복선언 가능

**let keyword**

- Block Scope
- NO Hoisting
- 중복선언 불가 (에러 발생)

## 참조

해당 문헌에 대해 가장 잘 설명해 놓은 페이지였다.

[https://bestalign.github.io/dev/lexical-scope-and-dynamic-scope/](https://bestalign.github.io/dev/lexical-scope-and-dynamic-scope/)