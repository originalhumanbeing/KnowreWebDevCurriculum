# Quest 01. Hello, HTML


## Introduction
* HTML은 HyperText Markup Language의 약자로, 웹 브라우저에 내용을 표시하기 위한 가장 기본적인 언어입니다. 이번 퀘스트를 통해 HTML에 관한 기초적인 사항들을 알아볼 예정입니다.

## Topics
* 브라우저의 역사
  * Mosaic
  * Netscape
  * Internet Explorer
  * Firefox
  * Chrome
  * Safari (for iOS)
  * Edge
* HTML 표준의 역사
  * HTML 4.01
  * XHTML 1.0, XHTML 1.1
  * XHTML 2.0
  * HTML5
    * HTML 5.3
* HTML 문서의 구조
* HTML 문서의 엘리먼트
  * Semantic elements
  * Block-level elements vs Inline elements

## Resources
* [MDN - HTML](https://developer.mozilla.org/ko/docs/Web/HTML)
* [모던 웹 디자인을 위한 HTML5+CSS3 입문](http://www.yes24.com/24/Goods/15683538?Acode=101), 한빛미디어
* [웹 디자인 2.0 고급 CSS](http://www.yes24.com/24/Goods/2808075?Acode=101), 에이콘출판사
* [StatCounter Global Stats](http://gs.statcounter.com/)

## Checklist
* HTML 4.x 이후의 HTML 표준의 변천사는 어떻게 되나요?
  * 1999년 W3C에서는 HTML 4.0을 표준으로 제정하였으나 당시 브라우저 전쟁이 격화되면서 표준의 제정이 큰 의미를 갖지 않았다, 이에 W3C는 HTML을 버전업하는 것을 포기하고 XHTML 1.0을 새로 발표하고 2.0까지 발전시킨다. 이때 Mozila, Opera등 브라우저 업체들은 모여서 WHATWG이라는 워킹 그룹을 만든다, W3C는 XHTML 독자 개발을 중단하고 WHATWG에 합류하여 HTML 4.0과 XHTML을 포괄하는 HTML5을 함께 만든다, 가장 최근 업데이트된 버전으로는 2017년 HTML5.2이 있다. HTML5는 태그의 기본 스타일을 제거하고 최대한 구조에 집중한 형태가 많다 
* MS와 IE는 왜 역사에 오점을 남기게 되었을까요?
  * MS는 넷스케이프에 뒤쳐지지 않기 위해서 윈도우에 IE를 끼워팔기하는 전략을 취했다, 문제는 다른 브라우저 업체들이 기기 및 버전에 상관없이 모두 호환될 수 있도록 맞추어 가고 표준을 만들 때조차 참여하지 않은 데서 생겼다. 독자적인 스펙을 추구하여 개발자들이 작업을 할 때에도 어렵고 사용자도 동일한 경험을 얻지 못하게 되었다
* `<section>`과 `<div>`, `<header>`, `<footer>`, `<article>` 엘리먼트의 차이점은 무엇인가요?
  * div 외 나머지 엘리먼트는 HTML5에 추가된 태그로 시맨틱하게 구조를 만들 수 있다, 모두 블럭 레벨 엘리먼트인데 div는 아무 의미 없는 커다란 박스라고 생각하면 간단하다. 
  * section은 내부 요소들이 related되어 있는 경우 적합하며 article은 서로 연관성이 있으나 그 자체로 독자적으로도 사용할 수 있을 때 사용한다, 실제로 article 태그 안에 있는 컨텐츠 내용은 따로 메일링을 할 때 포함할 수도 있다. 
  * footer와 header는 section의 꼬릿말과 머릿말의 역할을 한다
* 블럭 레벨 엘리먼트와 인라인 엘리먼트의 차이는 무엇일까요?
  * 블럭 레벨 엘리먼트: 독자적인 컨텐츠 영역을 갖는 엘리먼트, 즉 100%의 너비를 갖는다. 따라서 블럭 레벨 엘리먼트는 추가될 때마다 새로운 행에서 시작된다. 또, 블럭 레벨 엘리먼트는 body 안에 있을 수 있고, 다른 블럭 레벨 엘리먼트와 인라인 레벨 엘리먼트를 포함할 수 있다
  * 인라인 엘리먼트: 포함한 요소만큼의 크기를 갖는 엘리먼트로 body 안, 블럭 레벨 엘리먼트 내부에 있을 수 있다. 인라인 엘리먼트는 포함하는 데이터, 다른 인라인 엘리먼트만을 가질 수 있고 블럭 엘리먼트를 포함할 수는 없다. 개행도 하지 않는다
  * 위 두 엘리먼트는 css의 display 속성으로 변경할 수 있다

## Quest
* [이 그림](github.png)은 github의 웹사이트 레이아웃입니다. 이 레이아웃의 정보를 HTML 문서로 표현해 보세요.
* CSS를 전혀 사용하지 않고, 문서의 구조가 어떻게 되어 있는지를 파악하여 구현해 보세요.
  * [CSS Naked Day](http://meiert.com/en/blog/20150319/css-naked-day/)는 매년 4월 9일에 CSS 없는 웹 페이지를 공개하여 내용과 마크업에 집중한 HTML 구조의 중요성을 강조하는 행사입니다.
* 폴더에 있는 `skeleton.html` 파일을 바탕으로 작업해 보시면 됩니다.
