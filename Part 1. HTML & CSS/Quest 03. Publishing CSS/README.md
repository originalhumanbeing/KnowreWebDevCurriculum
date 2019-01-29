# Quest 03. Publishing CSS


## Introduction
* 이번 퀘스트에서는 CSS를 이용해 실제 웹 페이지를 모사해 퍼블리싱하는 것에 도전해볼 예정입니다.

## Topics
* 퍼블리싱을 위해 몇 가지 중요한 속성들
  * `font-*`
   - font-style: 이탤릭체 등 글꼴 스타일  
   - font-weight: 글자 두께  
   - font-size: 글자 크기
   - font-family: 글꼴
   - font-variant: 글꼴 변형 (소문자 -> 대문자). 잘 사용 안 함
   - line-height: 줄 높이 설정
  * `text-*`
   - text-decoration: none. 밑줄, 취소선 등 스타일을 제거할 수 있다. 
  * `box-sizing`
   - content-box: 기본 속성. 해당 box의 넓이는 순수하게 content 영역만을 포함한다. `width: 300px; border: 1px solid;`라고 하면 콘텐츠 영역의 너비가 300px이 되고, 양쪽에 border가 1px씩 더해져, 총 302px의 너비를 갖는다.
   - padding-box: box의 넓이를 콘텐츠 영역+안쪽 여백인 패딩까지 포함하여 계산한다. 
   - border-box: box의 넓이를 콘텐츠 영역+안쪽 여백인 패딩+테두리인 보더까지 포험하여 계산한다. 가장 많이 사용한다.
  * `:hover`/`:active`

## Resources
* [MDN - CSS](https://developer.mozilla.org/ko/docs/Web/CSS)
* [모던 웹 디자인을 위한 HTML5+CSS3 입문](http://www.yes24.com/24/Goods/15683538?Acode=101), 한빛미디어
* [웹 디자인 2.0 고급 CSS](http://www.yes24.com/24/Goods/2808075?Acode=101), 에이콘출판사
* [Centering in CSS: A Complete Guide](https://css-tricks.com/centering-css-complete-guide/)
* [A complete guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## Checklist
* CSS 퍼블리싱을 할 때, class와 selector들은 어떤 식으로 정리하는 것이 좋을까요?
  * 동일한 태그여도(selector) 다른 스타일을 적용되는 경우에는 class를 사용하는 것이 보다 합리적이다

## Quest
* Quest 01에서 만들었던 HTML을 바탕으로, [이 그림](github.png)의 레이아웃과 CSS를 최대한 비슷하게 흉내내 보세요. 꼭 완벽히 정확할 필요는 없으나 align 등의 속성은 일치해야 합니다.
* **주의사항: 되도록이면 원래 페이지의 CSS를 참고하지 말고 아무것도 없는 백지에서 시작해 보도록 노력해 보세요!**
* 등장하는 아이콘은 GitHub에서 만든 [Octicons](https://octicons.github.com/) 그림 파일입니다. 해당 폰트 파일은 링크를 참조하여 쓰시면 됩니다.
