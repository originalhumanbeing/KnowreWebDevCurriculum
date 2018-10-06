# Quest 06. JavaScript OOP - Design


## Introduction
* 이번 퀘스트에서는 자바스크립트의 객체지향 프로그래밍에 대해 알아볼 예정입니다.

## Topics
* 클래스
  * 프로토타입 기반 객체지향 프로그래밍
* 생성자
  * 멤버 함수
  * 멤버 변수
* 상속

## Resources
* [자바스크립트 완벽 가이드](http://www.yes24.com/24/Goods/8275120?Acode=101), 인사이트
* [자바스크립트 객체지향 프로그래밍](http://www.yes24.com/24/Goods/7276246?Acode=101), 위키북스

## Checklist
* 객체지향 프로그래밍은 무엇일까요?
  * 객체를 기본 단위로 프로그래밍하는 기법을 말한다. 각 객체는 행위(메소드), 성질(변수)를 가지고 있으며, 객체끼리 상속이 가능하여 공통된 행위, 속성을 중복없이 사용할 수 있다.
  * 객체와 클래스는 어떤 역할을 할까요?
    * 객체: 클래스를 실제 인스턴스화한 각각의 결과물. 
    * 클래스: 설계도/틀 역할. 객체에 필요한 메소드, 변수를 그룹핑해 놓은 것. (개발자가 필요한 데이터를 새로 만든다고 생각할 수 있음)
* 자바스크립트의 클래스는 어떻게 정의할까요?
  * 엄밀히 말하면 자바스크립트는 클래스가 없고, 모든 것이 객체다.
    1. 함수 이용하기
      - 함수를 만들고, new 키워드를 이용해서 객체를 찍어낸다.
      ~~~javascript
      function MakeNewBaby(name) {
        this.name = name;
        this.age = 0;
        this.cry = function() {
            console.log('응애응애');
        }
      }
  
      let baby = new MakeNewBaby('응애기');
      ~~~
      - 위의 방법은 객체를 생성할 때마다 메소드를 재생성하므로 비효율적이다, 따라서 생성자의 프로토타입에 추가해버리자.
      ```javascript
      function MakeNewBaby(name) {   
        this.name = name;
        this.age = 0;
      }
      
      MakeNewBaby.prototype.cry = function() {
        console.log('응애응애');
    }
      ```
    2. 객체 리터럴 이용하기
      - 간단하게 리터럴을 만들어 버리자.
      ```javascript
      let obj = {};
      ```
      - 위의 베이비를 만들어보자.
      ```javascript
      let baby = {
        this.name = '응애기';
        this.age = 0;
        this.cry = function() {
                    console.log('응애응애');
            };
        };
      ```
      - 장점: 인스턴스를 생성할 필요가 없다, 이미 생성되어 있어서 바로 사용하면 된다.
    3. 함수를 이용한 싱글튼으로 클래스 생성
      - 위를 짬뽕한 방법이다. 익명함수를 만들고, new 키워드로 객체로 찍어낸다.
      ~~~javascript
      let baby = new function() {
              this.name = "응애기";
              this.age = 0;
              this.cry = function() {
                  console.log('응애응애');
              }
            }
      ~~~
    4. `class` 선언하기
      - ECMA6에 추가되어 클래스 기반 언어처럼 `class` 키워드를 활용하여 클래스 생성이 가능해졌다.
      ~~~
      class Baby{
        constructor(name){
            this.name = name;
            this.age = 0;
            }
            
        cry() {
            console.log('응애응애');
        }
      }
      
      let noah = new Baby('noah'); // noah의 탄생
      ~~~
  * [참고](http://steadypost.net/post/lecture/id/13/)
  * [참고. class 선언](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes)
  * 프로토타입 기반의 객체지향 프로그래밍은 무엇일까요?
    * 클래스가 존재하지 않는 객체지향 프로그래밍의 하나로 프로토타입을 통해서 재사용, 상속 등의 개념을 실현한다.  
  * 클래스 기반의 객체지향 프로그래밍과 어떤 점이 다를까요?
    * 클래스 기반의 객체지향 프로그래밍은 객체를 찍어내기 전에 클래스를 정의해야 하지만 프로토타입 기반의 객체지향 프로그래밍은 클래스가 없어도 객체를 만들 수 있다.
  * 클래스는 어떻게 상속할 수 있을까요?
    1. 부모 클래스의 인스턴스를 자식 클래스에 할당하기
    ```javascript
    function Person() {}
    
    Person.prototype.walk = function(){
      alert ('I am walking!');
    };
    Person.prototype.sayHello = function(){
      alert ('hello');
    };
    
    // define the Student class
    function Student() {
      // Call the parent constructor
      Person.call(this);
    }
    
    // inherit Person
    Student.prototype = new Person();
    
    // correct the constructor pointer because it points to Person
    Student.prototype.constructor = Student;
     
    // replace the sayHello method
    Student.prototype.sayHello = function(){
      alert('hi, I am a student');
    }
    
    // add sayGoodBye method
    Student.prototype.sayGoodBye = function(){
      alert('goodBye');
    }
    
    var student1 = new Student();
    student1.sayHello();
    student1.walk();
    student1.sayGoodBye();
    
    // check inheritance
    alert(student1 instanceof Person); // true 
    alert(student1 instanceof Student); // true
    ```
    2. `extends` 키워드 활용하기
    ```javascript
    class MarineLife{
        constructor(name) {
            this.name = name;
        }
        
        swim() {
            console.log(this.name + ' swims');
        }
    }

    class Whale extends MarineLife{
        constructor(name) {
            super(name); // Child Class가 constructor에 this를 갖고 싶은 경우 super()를 반드시 호출해야함
            this.habitat = 'Okinawa';
        }
    
        callOthers() {
            console.log(this.name + ' calls others');
        }
    }
    ``` 
    * 클래스를 상속하는 설계의 장점과 단점은 무엇일까요?
      * 장점: 재사용 및 확장 용이/ 클래스별로 테스트 용이/ 위와 같은 이유 및 코드 읽기가 비교적 편리하여 유지보수에 용이 
      * 단점: 상속해주는 클래스들에 변화가 필요한 경우, 유지보수 헬이 열릴 것이다 (..?)
  * [참고](https://developer.mozilla.org/ko/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript)

## Quest
* Quest 06 ~ Quest 07 을 통해, 웹 상에서 동작하는 간단한 바탕화면 시스템을 만들 예정입니다.
* 요구사항은 다음과 같습니다:
  * 아이콘은 폴더와 일반 아이콘, 두 가지의 종류가 있습니다.
  * 아이콘들을 드래그를 통해 움직일 수 있어야 합니다.
  * 폴더 아이콘은 더블클릭하면 해당 폴더가 창으로 열리며, 열린 폴더의 창 역시 드래그를 통해 움직일 수 있어야 합니다.
  * 처음에는 세 개의 아이콘이 있으며, 그 중 두 개는 폴더입니다.
* 이번 퀘스트에서는 바탕화면 시스템을 만들기 위한 준비작업을 할 예정입니다.
  * 어떤 클래스들이 필요할지 생각해 보세요.
  * 각 클래스들의 멤버변수와 멤버함수는 어떤 것이 있을지 설계해 보세요.
  * 각 클래스들의 생성자에는 무엇이 들어가야 할지 설계해 보세요.
  * <u>**실제 동작하는 함수를 짤 필요는 없습니다**</u>. 빈 함수로 정의만 해 보세요!
