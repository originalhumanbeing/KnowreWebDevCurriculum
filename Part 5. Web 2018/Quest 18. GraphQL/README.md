# Quest 17. GraphQL


## Introduction
* 이번 퀘스트에서는 차세대 웹 API의 대세로 각광받고 있는 GraphQL에 대해 알아보겠습니다.

## Topics
* REST
* GraphQL
  * Schema
  * Resolver
  * DataLoader

## Resources
* [GraphQL](https://graphql.org/)
* [GraphQL.js](http://graphql.org/graphql-js/)
* [DataLoader](https://github.com/facebook/dataloader)
* [Vue Apollo Client](https://github.com/akryum/vue-apollo)

## Checklist
* REST 기반의 API는 무엇인가요? 어떤 장점과 단점을 가지고 있을까요?
  - Resource(URI, endpoint)/ Verb(HTTP methods)를 중심으로 클라이언트와 서버를 나누어 API를 개발하는 아키텍처. 
  - 장점: Stateless(무상태성)이라는 특징을 갖기 때문에 서버에 부담이 덜 하다, HTTP의 자원을 사용할 수 있다 (cache)
  - 단점: 필요한 응답을 받기 위해 응답마다 다른 URI, endpoint가 존재한다, 많은 API를 만들어야 하는만큼 개발시에도 부담으로 작용한다
  무엇보다 받을 응답 형태가 고정되어 있다, 이에 따라 over/under fetching이 발생하게 된다
  
* GraphQL API는 무엇인가요? REST의 어떤 단점을 보완해 주나요?
  - Resource마다 가지고 있던 Endpoint가 없어지기 때문에 관리가 보다 용이하다, graphql은 주로 하나의 Endpoint만 가지고 있을 가능성이 크다.
  예컨대, `https://www.api.test.com/graphql` 이런 식.
  - Endpoint가 하나고, query안에 원하는 query를 모두 담아서 보낼 수 있다. 필요한 Resource마다 다른 Endpoint에 요청을 매번 보내던 Rest API보다
  http 요청 횟수가 줄어들 수 있다.
  - REST API에서는 클라이언트 사이드에서 받을 response가 고정되어 있다. 그러나 graphql을 사용하면 response로 받을 result를 원하는 대로 선택할 수 있다.
  똑같은 movies query지만 받는 result는 다르다.
      ```graphql
      query {
        movies {
          title
          genre
        }  
      }
      ```
      ```graphql
      query {
        movies {
          title
          reviews {
            author
            body
         }
       }  
      }
      ``` 
  - 위의 특징 덕분에 over/under fetching이 발생하지 않는다
  - 그러나 http의 cache나 file 전송 등을 원한다면(graphql 응답은 json형식) REST API를 활용해야 한다
  
* GraphQL 스키마는 어떤 역할을 하며 어떤 식으로 정의되나요?
  - graphql은 하나의 스펙이기 때문에 결국 구현체를 통해 구현된다, 이때 이를 활용하기 위해서는 데이터 타입에 대한 정의와 이러한 데이터 타입을 어떻게 요청할 것인지 등을
  정의해야 한다. 스키마는 이를 정의하는 역할을 한다.
  - 스키마에서 type, query, mutation을 모두 정의한다. 구현체마다 문법은 차이가 날 수 있으나 대략 아래와 같이 작성한다.
      ```javascript
      type User {
        id: Int!
        name: String
      }
    
      type Query {  
        user(id: Int!): User
      }
      ```
  - 이런 식으로 field와 field의 타입을 설명하는 스칼라 타입을 작성한다, 스칼라 타입에는 Int, Float, String, Boolean, ID 타입이 존재하며
  커스텀 타입을 만들 수도 있다. enum 타입도 지원된다. !(느낌표) 표시를 통해 필수값을 지정할 수 있고, 해당 값을 skip했을 경우, non-nullable 에러가 난다
  - mutation에서 주의해야 할 것은 input type이 따로 존재한다는 것이다. input을 받을 때 해당 타입으로 받고, 반환하는 output으로 재활용할 수 없다
  * node.js 상에서 GraphQL 서버를 실행하고 스키마를 정의하려면 어떻게 해야 하나요?
    - graphql 설치 후, buildSchema로 스키마를 정의하고, 해당 스키마를 통해 요청이 들어오면 실행할 함수를 resolver를 통해 작성한다.
    app에 단일 endpoint를 지정 후, 해당 uri로 리퀘스트가 들어왔을 때 graphql이 처리할 수 있도록 schema, resolver를 연결해준다.
    ```javascript
    // GraphQL schema
    let schema = buildSchema(`
        type Query {
            message: String
        }`);
    // Root resolver
    let root = {
        message: () => 'Hello World!'
    };
    // Create an express server and a GraphQL endpoint
    const app = express();
    app.use('/graphql', express_graphql({ß
        schema: schema,
        rootValue: root,
        graphiql: true
    }));
    ```
  
* GraphQL 리졸버는 어떤 역할을 하며 어떤 식으로 정의되나요?
  - 리졸버는 결국 클라이언트가 데이터를 fetch하기 위해 요청했을 때, 해당 데이터를 어떻게 처리해서 줄 것인지, 이를 구현해놓은 함수라고 할 수 있다.
  위의 코드에서 볼 수 있듯이, 어떤 쿼리나 타입을 인자와 함께 받았을 때, 무엇을 return해줄 것인지 정의한다. return 값은 대게 promise로 반환된다.
  - args: obj, args, context, info 순. positional 인자들이다.
    - obj: 탑 레벨 query의 경우, rootValue가 전달된다. (기본 서버 설정) 다른 경우에는 resolver를 통해 받을 결과를 가지고 있는 객체.
    - args: query와 함께 전달받은 인자들. 예컨대, `author(name: "Ada")`라는 query를 받았다면 name이라는 arg와 그 기본 값인 Ada 
    즉,`{"name": "Ada"}`가 이에 해당한다.
    - context: 특별한 query를 통해서 전체 resolver에 모두 공유되는 객체. auth 정보, dataloader 인스턴스를 포함한 요청 상태를 포함한다.
    - info: query의 실행 상태 등을 포함한다, 일반적으로 사용되는 인자는 아니다.
  * GraphQL 리졸버의 성능 향상을 위한 DataLoader는 무엇이고 어떻게 쓰나요?
    - graphql의 가장 큰 특징 중 하나는 nested query다, 즉 query 안에 또 다른 query가 있을 수 있는데 이는 N+1문제를 일으킨다. 
    - Dataloader는 이벤트 루프가 1회 돌 때 발생하는 모든 load를 하나로 합친 후에 batch loading function을 call하여 N+1문제를 해결해준다.
    - 요청별 캐싱은 해주지 않기 때문에 따로 처리해야 한다.
  
* 클라이언트 상에서 GraphQL 요청을 보내려면 어떻게 해야 할까요?
  * Apollo Client의 장점은 무엇일까요?
  * Apollo Client를 쓰지 않고 Vanilla JavaScript로 GraphQL 요청을 보내려면 어떻게 해야 할까요?

## Quest
* 직전 퀘스트의 메모장의 서버 부분을 GraphQL API로 리팩토링 해 보세요.

## 참고
[graphql vs RESTful API](https://www.holaxprogramming.com/2018/01/20/graphql-vs-restful-api/)  
[graphql 관련 좋은 글](https://medium.com/@FourwingsY/graphql%EC%9D%84-%EC%98%A4%ED%95%B4%ED%95%98%EB%8B%A4-3216f404134)  
[express로 graphql 서버 만들기](https://medium.com/codingthesmartway-com-blog/creating-a-graphql-server-with-node-js-and-express-f6dddc5320e1)  
[graphql vs REST](https://blog.apollographql.com/graphql-vs-rest-5d425123e34b)  
[N+1문제 초간단 개념](https://zetawiki.com/wiki/N%2B1_%EC%BF%BC%EB%A6%AC_%EB%AC%B8%EC%A0%9C)  
[Dataloader 찬양](https://medium.com/@gajus/using-dataloader-to-batch-requests-c345f4b23433)  