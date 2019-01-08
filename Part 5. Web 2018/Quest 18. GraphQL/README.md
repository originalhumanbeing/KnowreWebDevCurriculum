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
  - Resource
  -
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
  - 스키마에는 type, query, mutation이 모두 정의된다
  - 이는 Resource나 요청 형식을 설명describe해주는 역할을 한다
  * node.js 상에서 GraphQL 서버를 실행하고 스키마를 정의하려면 어떻게 해야 하나요?
* GraphQL 리졸버는 어떤 역할을 하며 어떤 식으로 정의되나요?
  * GraphQL 리졸버의 성능 향상을 위한 DataLoader는 무엇이고 어떻게 쓰나요?
* 클라이언트 상에서 GraphQL 요청을 보내려면 어떻게 해야 할까요?
  * Apollo Client의 장점은 무엇일까요?
  * Apollo Client를 쓰지 않고 Vanilla JavaScript로 GraphQL 요청을 보내려면 어떻게 해야 할까요?

## Quest
* 직전 퀘스트의 메모장의 서버 부분을 GraphQL API로 리팩토링 해 보세요.
