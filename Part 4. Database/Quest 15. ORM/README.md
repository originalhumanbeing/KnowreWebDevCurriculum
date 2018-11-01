# Quest 15. ORM


## Introduction
* 이번 퀘스트에서는 ORM을 이용하여 node.js 어플리케이션과 DB를 연동하는 법을 알아보겠습니다.

## Topics
* ORM
  * sequelize
  * 모델간의 관계들( BelongsTo, HasOne, HasMany, BelongsToMany)
* 각종 쿼리
  * `CREATE`, `SELECT`, `UPDATE`, `DELETE`

## Resources
* [sequelize](http://docs.sequelizejs.com/en/latest/)
* [Head First PHP & MySQL](http://www.yes24.com/24/Goods/3831680?Acode=101), 한빛미디어
* [Real MySQL : 개발자와 DBA를 위한](http://www.yes24.com/24/Goods/6960931?Acode=101), 위키북스
* [SQL AntiPatterns : 개발자가 알아야 할 25가지 SQL 함정과 해법](http://www.yes24.com/24/Goods/5269099?Acode=101), 인사이트

## Checklist
* ORM을 사용하는 것은 사용하지 않는 것에 비해 어떤 장단점을 가지고 있나요?
  * 장점
    * SQL을 직접 코드에 삽입할 때보다 가독성이 올라가고 보다 직관적이며 비즈니스 로직에 보다 집중할 수 있게 해준다, 이를 통해 개발자의 생산성 자체도 올라갈 수 있다
    * DBMS에 대한 종속성이 낮아지고, 이식성이 올라간다
    * 재사용 및 유지보수성이 증가한다
  * 단점
    * row Query보다 속도가 약간 느릴 수 있고, 프로젝트의 복잡성이 증가할 수록 ORM 난이도도 올라간다. 잘못 설계했을 경우, 심각한 성능 저하로 이어질 수도 있다.
  * [참고](http://www.incodom.kr/ORM)
* 모델간의 1:1, 1:N, N:M 관계는 각각 무엇이고 어떨 때 사용하나요?
  * 관계: 두 엔티티 간의 연관성을 관계라고 표현함. 이 관계에 참여하는 참여자의 수에 따라 아래와 같이 차수가 나뉜다.
  * 1:1: 말 그대로 1:1의 관계를 맺는 것. 교수당 한과목만 강의할 수 있다는 룰이 있다고 가정할 때에 교수 - 강의의 관계. 한 교수는 하나의 강의만 할 수 있고, 한 강의는 특정 한 교수에 의해서만 강의될 수 있다. 
  * 1:N: 하나의 객체가 여러 개의 객체와 동시에 관계를 맺을 때. 예컨대, 부서 - 사원의 관계. 사원은 한 부서에만 소속되고, 부서는 여러 사원을 포함한다. 
  * N:M: 여러 개의 객체가 다른 여러 개의 객체와 관계를 맺을 때. 예컨대, 쇼핑몰 회원 - 제품의 관계. 회원은 여러 개의 제품을 구매할 수 있고, 제품은 여러 회원에 의해 소비될 수 있다. 

## Quest
* 이제 Quest 12~13의 결과물을 Quest 14의 MySQL 테이블과 연동해 보고자 합니다.
  * Sequelize를 통해 Quest 14에서 설계한 테이블을 모델로 만들어 보세요.
  * 로그인을 지원하는 메모장 어플리케이션을 파일이 아닌 DB기반으로 바꾸어 보세요.
