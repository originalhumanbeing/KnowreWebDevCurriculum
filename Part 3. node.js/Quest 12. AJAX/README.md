# Quest 12. AJAX


## Introduction
* 이번 퀘스트에서는 드디어 서버와 클라이언트로 구성된 어플리케이션을 만들어 보겠습니다.

## Topics
* expressJS
* `setTimeout()`
* AJAX, `XMLHttpRequest`, `fetch()`
  * AJAX: 비동기 자바스크립트와 XML. 클라이언트가 서버와 통신하기 위해 `XMLHttpRequest` 객체를 사용하는 것을 말함.
  비동기성이 가장 큰 특징이며, 덕분에 새로고침없이도 서버에 요청을 보내고 데이터를 받아서 변경 부분을 반영할 수 있다. 
  * [AJAX 시작하기](https://developer.mozilla.org/ko/docs/Web/Guide/AJAX/Getting_Started)
  
## Resources
* [Express Framework](http://expressjs.com/)
* [자바스크립트 완벽 가이드](http://www.yes24.com/24/Goods/8275120?Acode=101), 인사이트
* [자바스크립트 객체지향 프로그래밍](http://www.yes24.com/24/Goods/7276246?Acode=101), 위키북스
* [HTTP Node.js Manual & Documentation](https://nodejs.org/api/http.html)

## Checklist
* 어떠한 자바스크립트 코드가 HTTP 응답이나 사용자의 이벤트등에 종속되어 언제 실행되어야 할 지 알기 어려울 때엔 어떻게 해야 할까요?
  * 비동기 처리하여 실행 타이밍을 알기 어렵거나 처리하는 데 시간이 오래 걸리는 코드를 기다리는 대신, 그 다음 코드를 먼저 실행한다.
  * [비동기 처리 방식과 콜백](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/) 
  
* 브라우저의 `XMLHttpRequest` 객체는 무엇이고 어떻게 동작하나요?
  * Object heavily used to interact with server in AJAX programming. It can retrieve data from web server without having to do a full page refresh.
  So it allows the user to do whatevery they were doing, thus whole lot better UX.
  ```
  // create new instance
  var xmlHttpReq = new XMLHttpRequest();
  // open req
  xmlHttpReq.open('GET', www.example.com, true);
  // set req header
  xmlHttpReq.setRequestHeader('Content-Type', 'text/html');
  // send req
  xmlHttpReq.send();
  ``` 
  
* `fetch` API는 무엇이고 어떻게 동작하나요?
  * `fetch`는 `XMLHttpRequest` 객체처럼 AJAX 통신을 하기 위해 사용되는 객체이며,
   `XMLHttpRequest` 객체의 문제점 (직접적으로 상태 관리 불가/ 하나의 객체로 입출력 관리 등을 한 번에 해야 하는 점 등)을 개선하기 위해 등장함
  * url을 인자로 받으며, response 객체를 return함 
  * [이고잉님의 친절한 fetch 사용법](https://opentutorials.org/course/3281/20562)
  * 자바스크립트의 Promise는 어떤 객체이고 어떤 일을 하나요?
    * 위에서 봐온 여러 객체처럼 비동기 처리를 지원하는 객체이다. 정확히는 비동기 처리의 최종 결과를 알려주기 위한 객체.
    * 4가지 상태로 구분됨.
      * pending: 대기 상태. 즉, resolve 혹은 reject 전. `new Promise()`를 하여 Promise를 생성했을 때의 상태.
      * fulfilled: 성공. Promise 생성 후에 콜백함수에는 resolve, reject가 인자로 전달되는데 이중 resolve 메소드를 실행했을 때를 말한다. resolve를 실행해야 promise로 반환된 값에 접근 가능하다.
      * rejected: 실패. reject 메소드를 실행했을 때. 
      * settled: 성공 혹은 실패 여부와는 상관없이 무엇이든 결론이 난 상태.
    * 체이닝을 통해 콜백지옥에서 구원받을 수 있다.
  * 자바스크립트의 `async`와 `await` 키워드는 어떤 역할을 하며 그 정체는 무엇일까요?
    * 마찬가지로 비동기 처리를 하는 키워드. 단, 코드의 표현이 동기처럼 완전히 바뀔 수 있다. 추가 변수 선언, Promise에서도 발생했던 nesting 이슈 등이 보다 완화되었다.
    * `async`를 통해 Promise 객체를 반환하고 `await`를 `async`가 쓰인 함수 내에서 사용하여 반환된 값을 활용한다. 즉, `await`는 top `async`를 벗어나서 사용될 수 없다.
    * `async`가 Promise 객체를 만들고 resolve하는 역할까지 하기 때문에 해당 부분을 줄일 수 있고, resolve로 받은 값을 아래 예시처럼 변수(data)에 담을 필요도 없다.
        ```javascript
        // Promise 시절
        const makeRequest = () => {
            getJSON()
            .then(data => {
                console.log(data);
                return "done";
            })
        }
    
        makeRequest();
        ```
        ```javascript
        // async/await 사용 후
        const makeRequest = async () => {
            console.log(await getJSON());
            return "done";
        }
    
        makeRequest();
        ```

## Quest
* 자바스크립트를 이용하여 간단한 웹브라우저 기반의 텍스트 파일 메모장을 만들어 보겠습니다.
  * 먼저 연습으로 Quest 11의 GET/POST 요청을 AJAX를 통해 처리하는 것을 시도해 보세요!
    * 화면에 출력되는 대신 콘솔에 결과가 나오면 됩니다.
  * 새 파일, 로드, 저장, 수정 등의 기능이 있어야 합니다.
  * 탭을 통해 여러 개의 파일을 동시에 편집할 수 있어야 합니다.
  * 이 메모장의 메모들은 서버의 파일시스템에 그대로 저장되어야 합니다.
* `skeleton` 디렉토리에서 작업을 하시되, 작업을 시작하기 전에 해당 디렉토리에서 `npm install` 명령을 날리시면 자동으로 express가 설치됩니다.

##참고
[array 정렬](http://dudmy.net/javascript/2015/11/16/javascript-sort/)  
[array element 제거](https://love2dev.com/blog/javascript-remove-from-array/)  
[fetch 예제](https://googlechrome.github.io/samples/fetch-api/fetch-post.html)  
[bodyParser API](https://www.npmjs.com/package/body-parser#bodyparserjsonoptions)  
[client-server 데이터형 맞추기](http://lazydev.tistory.com/54)  