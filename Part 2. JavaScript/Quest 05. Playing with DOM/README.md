# Quest 05. Playing with DOM


## Introduction
* 이번 퀘스트에서는 자바스크립트를 통해 브라우저의 실제 DOM 노드를 조작하는 법에 대하여 알아볼 예정입니다.

## Topics
* DOM API
  * `document` 객체
  * `document.getElementById()`, `document.querySelector()`, `document.querySelectorAll()` 함수들
  * 기타 DOM 조작을 위한 함수와 속성들
* Closure

## Resources
* [자바스크립트 완벽 가이드](http://www.yes24.com/24/Goods/8275120?Acode=101), 인사이트
* [자바스크립트 객체지향 프로그래밍](http://www.yes24.com/24/Goods/7276246?Acode=101), 위키북스

## Checklist
* 자바스크립트를 통해 DOM 객체에 CSS Class를 주거나 없애려면 어떻게 해야 하나요?
  * `className`을 활용하여 없을 경우에는 class를 추가하고 있는 경우에는 class를 수정할 수 있음
  * 또는 `classList` + `add`, `remove` 메소드를 활용하여 생성 및 삭제할 수 있음 
  * IE9나 그 이전의 옛날 브라우저들에서는 어떻게 해야 하나요?
    * `className`을 사용하거나 `setAttribute(attribute, attributeValue)`, `removeAttribute(attribute)`를 활용함
  * [참고](https://poiemaweb.com/js-dom)
* 자바스크립트의 변수가 유효한 범위는 어떻게 결정되나요?
  * 자바스크립트 변수의 범위는 크게 전역 스코프와 지역 스코프로 나뉨
    * 전역 스코프: 함수 바깥, 중괄호 바깥에서 변수가 선언되었을 경우, 전역 스코프에서 유효한 전역 변수가 됨
    * 지역 스코프: 함수 내부, 중괄호 내부에서 변수가 선언되었을 경우, 지역 스코프에서 유효한 지역 변수가 됨
      * 지역 스코프는 다시 함수 스코프, 블록 스코프로 나뉨
        * 함수 스코프: 함수 내부에서 선언된 변수는 함수 내부에서만 접근 가능함
        * 블록 스코프: {} 내부에서 선언된 변수는 해당 {} 내부에서만 접근 가능
    * [참고](https://medium.com/@khwsc1/%EB%B2%88%EC%97%AD-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%8A%A4%EC%BD%94%ED%94%84%EC%99%80-%ED%81%B4%EB%A1%9C%EC%A0%80-javascript-scope-and-closures-8d402c976d19)
  * `var`과 `let`으로 변수를 정의하는 방법들은 어떻게 다르게 동작하나요?
    * `var`: 함수 스코프를 따름. 블럭 스코프 내에서 선언 없이 사용됐다고 해도 호이스팅이 되면서 에러 뿜지 않음. 
    * `let`: 블록 스코프를 따름.

## Quest
* Skeleton 디렉토리에 주어진 HTML을 조작하는 스크립트를 완성해 보세요.
  * 첫째 줄에 있는 사각형의 박스들을 클릭할 때마다 배경색이 노란색↔흰색으로 토글되어야 합니다.
  * 둘째 줄에 있는 사각형의 박스들을 클릭할 때마다 `enabled`라는 이름의 CSS Class가 클릭된 DOM 노드에 추가되거나 제거되어야 합니다.
* 구현에는 여러 가지 방법이 있으나, 다른 곳은 건드리지 않고 TODO 부분만 고치는 방향으로 하시는 것을 권장해 드립니다.
