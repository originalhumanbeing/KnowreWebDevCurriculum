# Quest 13. Session and Login


## Introduction
* 이번 퀘스트에서는 로그인 기능이 어떻게 구현되는지를 알아보겠습니다.

## Topics
* Cookie
* Session
* Chrome developer tools > 'Resources' tab

## Resources
* [Express Framework](http://expressjs.com/)
  * [express-session](https://github.com/expressjs/session)
* [자바스크립트 완벽 가이드](http://www.yes24.com/24/Goods/8275120?Acode=101), 인사이트
* [자바스크립트 객체지향 프로그래밍](http://www.yes24.com/24/Goods/7276246?Acode=101), 위키북스

## Checklist
* 쿠키란 무엇일까요?
  * 쿠키는 어떤 식으로 동작하나요?
  * 쿠키는 어떤 식으로 서버와 클라이언트 사이에 정보를 주고받나요?
    * 현재 브라우저에서 사용하는 HTTP 프로토콜은 stateless (클라이언트의 상태를 기억하지 못함)한 특징을 가지고 있다
    * 즉, 서버는 클라이언트/클라이언트의 요청 등을 모두 기억하지 못하므로 일종의 ID카드와 같은 쿠키(key=value 페어를 담은 텍스트 파일)를 발급해준다 
    * 서버에서 필요한 일련의 정보를 작성하여 res를 전달할 때 header에 set-cookie 항목을 통해 해당 cookie를 각 유저의 기기에 전달한다
    * 클라이언트는 이를 도메인명과 함께 저장해두고, 같은 도메인에 req를 전달할 때 저장해둔 cookie를 웹 서버에 함께 보낸다
    * 서버는 cookie 정보를 바탕으로 user를 판별하고 요청 사항을 보다 효율적으로 처리할 수 있다 = 처음부터 클라이언트가 누구인지 물어보고 대답을 받고 등등 이전에 진행했던 과정을 생략할 수 있음
    * 위에서 말한 것처럼 클라이언트의 기기에 저장해놓기 때문에 보안에 취약하다
    * 세션 id를 저장해놓는 용도로 사용되기도 한
* 웹 어플리케이션의 세션이란 무엇일까요?
  * 유저가 어플리케이션과 인터랙션했던 상태를 저장하는 임시 공간을 말한다
  * 세션의 내용은 어디에, 어떤 식으로 저장되나요?
    * 쿠키/ 인메모리/ 서버 DB에 저장할 수 있다. 쿠키에 저장하는 것은 보안이 매우 취약하므로 세션을 사용하는 의미를 퇴색시킨다. 
    세션 id만 쿠키에 저장해두고 req가 있을 때마다 인메모리나 서버 DB에서 해당 id와 매칭되는 상태를 돌려주는 것이 일반적이다. 
    인메모리에 비해 서버 DB는 보안 측면에서 더욱 우수하지만 비교적 느리다는 단점이 있다. 또, 유저가 많을 수록 아무래도 서버 메모리도 많이 차지하게 된다.
  
## Quest
* Quest 12에서 수행했던 메모장에 로그인 기능을 넣고자 합니다.
  * 사용자는 딱 세 명만 존재한다고 가정하고, 아이디와 비밀번호, 사용자의 닉네임은 하드코딩해도 무방합니다.
  * 로그인했을 때 해당 사용자가 이전에 작업했던 탭들과 선택된 탭, 커서 위치 등의 상태가 로딩 되어야 합니다.

## 참고
[쿠키-세션 기본](https://cinabrosite.wordpress.com/2017/01/24/cookie_session/)
[cookie basic](https://computer.howstuffworks.com/cookie1.htm)
[how cookies work](https://stackoverflow.com/questions/1968722/how-cookies-work)
[cookie and session](https://stackoverflow.com/questions/11142882/how-do-cookies-and-sessions-work)
[how does a web session work](https://machinesaredigging.com/2013/10/29/how-does-a-web-session-work/)