# Quest 02. Hello, CSS


## Introduction
* CSS는 Cascading StyleSheet의 약자입니다. 웹브라우저에 표시되는 HTML 문서의 스타일을 지정하는 (거의) 유일하지만 다루기 쉽지 않은 언어입니다. 이번 퀘스트를 통해 CSS의 기초적인 레이아웃 작성법을 알아볼 예정입니다.

## Topics
* CSS 기초 문법
* CSS를 HTML에 적용하는 세 가지 방법
  * Inline Style
  * `<style>`
  * `<link rel="stylesheet" href="...">`
* 레이아웃을 위해 몇 가지 중요한 속성들
  * `position`
  * `left`/`top`
  * `display`
  * `width`/`height`
  * `display: flex;`
  * `display: grid;`
  * CSS Box Model
* 브라우저별 Developer tools

## Resources
* [MDN - CSS](https://developer.mozilla.org/ko/docs/Web/CSS)
* [모던 웹 디자인을 위한 HTML5+CSS3 입문](http://www.yes24.com/24/Goods/15683538?Acode=101), 한빛미디어
* [웹 디자인 2.0 고급 CSS](http://www.yes24.com/24/Goods/2808075?Acode=101), 에이콘출판사
* [Centering in CSS: A Complete Guide](https://css-tricks.com/centering-css-complete-guide/)
* [A complete guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* [그리드 레이아웃과 다른 레이아웃 방법과의 관계](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Grid_Layout/%EA%B7%B8%EB%A6%AC%EB%93%9C_%EB%A0%88%EC%9D%B4%EC%95%84%EC%9B%83%EA%B3%BC_%EB%8B%A4%EB%A5%B8_%EB%A0%88%EC%9D%B4%EC%95%84%EC%9B%83_%EB%B0%A9%EB%B2%95%EA%B3%BC%EC%9D%98_%EA%B4%80%EA%B3%84)

## Checklist
* CSS를 HTML에 적용하는 세 가지 방법의 장단점은 무엇인가요?
  * Inline: HTML 태그에 직접 스타일을 작성하는 것으로 쉽고 빠르다는 장점이 있다, 하지만 속성과 값만 작성 가능하고, 재사용이 불가능하다는 한계가 있다. 
  * Style 태그 사용: style 태그 안에 원하는 스타일을 기재하여 간편하게 적용할 수 있다, 그러나 Inline과 마찬가지로 재사용은 불가능하다.
  * link 방식: style 파일을 따로 만들고 파일 자체를 링크로 걸어 사용할 때 가장 큰 장점은 재사용이 가능하다는 것이다. 또, HTML 문서가 스타일과 명확히 구분되어 복잡하지 않다는 것도 장점이다. 
* 여러 개의 CSS 규칙이 한 개의 대상에 적용될 때, 어떤 규칙이 우선순위를 가지게 되나요?
  * !important > inline style attr > id > class, 다른 attr > tag 순으로 우선순위 적용
  * class나 다른 attr 같은 경우, 갯수가 많을수록 우선순위가 올라감
  * 동일한 조건일 경우, 후에 기술된 것이 우선순위를 가짐
  * !important, inline style attr 방식은 우선순위가 높지만 사용은 지양할 것
* 어떤 박스가 `position: absolute;`인 속성을 갖는다면, 그 위치의 기준점은 어디가 되나요?
  * static이 아닌 다른 position을 갖는 상위 태그가 기준점이 되며, 그런 태그가 존재하지 않을 경우에는 html body가 기준점이 됨
* 가로나 세로로 여러 개의 박스가 공간을 채우되, 그 중 한 개의 박스만 가변적인 크기를 가지고 나머지 박스는 고정된 크기를 갖게 하려면 어떻게 해야 할까요?
  * float + negative margin + padding: 지정한 요소에 고정하려고 하는 요소의 넓이만큼 negative margin과 padding값을 준다, padding값을 콘텐츠 크기에 포함시키기 위해서 box-sizing은 border-box로 지정한다.
  * float + calc: 가변해야 하는 요소의 넓이를 calc함수를 이용해서 지정한다, (100% - 고정하려고 하는 요소의 넓이)
  * margin + position: absolute: 가변해야 하는 요소의 position은 absolute로 지정하고, margin값은 고정할 요소의 넓이만큼 준다.  
  * display: table 이용: 가변해야 하는 요소, 고정해야 하는 요소를 감싸는 wrapper를 만들어서 display: table로 지정한다, 가변해야 하는 요소는 display: table-cell로 지정한다, 고정해야 하는 요소는 필요한 만큼 넓이값을 지정한다.
  * flexbox 활용: 고정해야 할 요소를 flex-basis를 활용해서 크기를 고정해놓는다 (width값을 지정해도 무방하다), 그리고 flex-shrink, flex-grow를 0으로 지정한다. 반대로 가변해야 할 요소는 flex-grow, flex-shrink를 1로 지정한다.
  * [참고 사이트] (https://www.arealme.com/which-12-archetype-are-you/ko/)
* `float` 속성은 왜 좋지 않을까요?
  * float를 사용하면 뜨게 되므로 높이 잡기가 용이하지 않다, 또한 clear를 사용해야 하는 등 추가적인 처리도 필요하다.
* Flexbox(Flexible box)와 CSS Grid의 차이와 장단점은 무엇일까요?
  * flexbox는 말 그대로 유연한 것이 최대 장점이어서 변경이 쉽고, 배치하려고 하는 요소나 부모 요소의 크기를 정확히 몰라도 배치, 크기 조절, 정렬 등이 가능하다. 주로 소규모 애플리케이션/웹사이트에 적용하기가 적당하다.
  * grid는 flexbox와 달리 2차원 정렬이 가능하다, 즉 column과 row를 동시에 정렬할 수 있다. 
## Quest
* 아래의 그림들은 모두 전체적으로 창의 크기에 꽉 차야 하며, 창의 크기가 일정 크기 이상일 경우 전체 창 크기가 어떻게 바뀌되더라도 그림에 맞게 각 박스의 크기가 조절되어야 합니다.
* **주의사항**
  * HTML 파일은 수정하면 안됩니다.
  * `float` 속성과 `calc()`함수를 사용하지 않고 해 보세요!
* [이 그림](layout1.png)을 Flexbox를 쓰지 않고 구현해 보세요. `skeletons/layout1.html` 파일에 링크된 `skeletons/layout1.css` 파일을 수정하면 됩니다.
* [이 그림](layout2.png)을 Flexbox를 쓰지 않고 구현해 보세요. `skeletons/layout2.html` 파일에 링크된 `skeletons/layout2.css` 파일을 수정하면 됩니다.
* [이 그림](layout3.png)을 Flexbox를 쓰지 않고 구현해 보세요. `skeletons/layout3.html` 파일에 링크된 `skeletons/layout3.css` 파일을 수정하면 됩니다.
* 위의 세 번째 그림을 Flexbox를 써서 구현해 보세요. `skeletons/layout4.html` 파일에 링크된 `skeletons/layout4.css` 파일을 수정하면 됩니다.
* 위의 세 번째 그림을 CSS Grid를 써서 구현해 보세요. `skeletons/layout5.html` 파일에 링크된 `skeletons/layout5.css` 파일을 수정하면 됩니다.
