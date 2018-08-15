# Quest 00. Hello, git


## Introduction
* git은 2018년 현재 개발 생태계에서 가장 각광받고 있는 버전 관리 시스템입니다. 이번 퀘스트를 통해 git의 기초적인 사용법을 알아볼 예정입니다.

## Topics
* git
  * `git clone`
  * `git add` 
  * `git commit` 
  * `git push`
  * `git pull`
  * `git branch`
  * `git stash`
* GitHub
  * git을 보다 편리하게 활용할 수 있도록 하는 플랫폼으로 commit history 파악, pull request, fork 등을 커맨드 라인 외에서 할 수 있음

## Resources
* [git, 분산 버전 관리 시스템](http://www.yes24.com/24/goods/3676100?scode=032&OzSrank=1), 인사이트
* [GitHub 사용 설명서](http://www.yes24.com/24/Goods/17638082?Acode=101), 교학사
* https://try.github.io
* http://pcottle.github.io/learnGitBranching

## Checklist
* 버전 관리 시스템은 왜 필요한가요?
  * 팀 혹은 개인이 작업을 하면서 모든 작업 내역을 남길 수 있어서 언제든 commit한 history로 돌아갈 수 있다
  * history를 review할 때 확인할 수 있는 사항은 아래와 같다
    * 무엇이 변경됐는지 
    * 누가 변경했는지
    * 언제 변경됐는지
    * 왜 변경해야 했는지
  * 위와 같은 이유로 commit history를 보고 프로젝트 및 다른 멤버가 하고 있는 작업에 대해 이해가 용이하고, branch를 활용하면 작업 내용이 섞이지 않아서 협업에 좋다

* git 외의 버전관리 시스템에는 무엇이 있나요? git은 그 시스템과 어떤 점이 다르며, 어떤 장점을 가지고 있나요?
  * 가장 유명한 것으로는 CVS와 CVS를 발전시킨 SVN이 있다
    * CVS는 git의 작업 단위 개념이 파일 단위이기 때문에 파일을 통째로 저장하는 개념이고, 유니코드로 파일명 저장, 파일의 이동 등이 불가능하다
    * SVN은 앞서 말한 CVS의 단점을 해결하였으나 클라이언트-서버 모델을 따른다, 즉 원본을 보관하고 있는 서버에 문제가 생기면 복구하기가 어렵다
  * git이 위 두 버전관리 시스템과 가장 다른 것은 __분산__ 버전 관리 시스템이라는 것이다
    * 개별 로컬 환경에 원본을 클론한 이후에 작업을 하기 때문에 리모트 레포에 문제가 생겼다고 해도 로컬에 가지고 있는 원본을 올리면 (SVN 식으로 말하자면) 서버가 복구된 것과 같은 효과를 가진다

* git의 `clone`/`add`/`commit`/`push`/`pull`/`branch`/`stash` 명령은 무엇이며 어떨 때 이용하나요? 그리고 어떻게 사용하나요?
  * `git clone`: remote repo를 local에 복사함 
    * `git clone {remote repo url}`
  * `git add`: 작업한 내용을 working area에서 git이 모니터링하고 있는 staging area로 이동함 
    * 변경한 작업 단위가 포함된 특정 파일만: `git add {file}`
    * 전부 add: `git add .` 
  * `git commit`: 작업한 내용을 staging area에서 .git directory로 이동함 
    * 메시지와 함께 커밋시: `git commit -m {msg}` 
    * 전부 커밋: `git commit -a`
  * `git push`: remote repo에 작업 내용을 업로딩함 
    * `git push -u {remote branch}`
  * `git pull`: remote repo의 변경 내용을 local로 가져옴
    * `git pull {remote branch}`
  * `git branch`: master branch 외에도 feature에 따라 branch를 만들어서 master branch를 production branch로 사용할 수 있음. branch를 확인하고 만드는 명령어
    * branch 확인: `git branch`
    * 새 branch 생성: `git branch {branch name}`
    * branch 이동: `git branch checkout {branch}`
    * branch 삭제: `git branch -d {branch}`
  * `git stash`: local에서 작업한 내용을 모두 저장하고 head commit으로 돌아감, 로컬에서 작업 중이다가 remote 내용을 다시 pull받아야 하는 상황에서 사용할 수 있음
    * stash 만들때: `git stash push`
    * stash list 확인시: `git stash list`
    * stash 적용할 때 (그러나 list를 확인하고 `git stash {number}를 선택해도 자동으로 apply가 되고 list에서 해당 stash는 drop된다`): `git stash apply`
    * stash 삭제시: `git stash drop`

## Quest
* github에 가입한 뒤, [이 커리큘럼의 github 저장소](https://github.com/KnowRe/WebDevCurriculum)의 우상단의 Fork 버튼을 눌러 자신의 저장소에 복사해 둡니다.
* [GitHub Desktop](https://desktop.github.com/)을 다운받아 설치합니다.
* Windows의 경우 같이 설치된 git shell을, MacOSX의 경우 터미널을 실행시켜 커맨드라인에 들어간 뒤, 명령어를 이용하여 복사한 저장소를 clone합니다.
  * 앞으로의 git 작업은 되도록 커맨드라인을 통해 하는 것을 권장합니다.
* 이 문서가 있는 폴더 바로 밑에 있는 sandbox 폴더에 파일을 추가한 후 커밋해 보기도 하고, 파일을 삭제해 보기도 하고, 수정해 보기도 하면서 각각의 단계에서 커밋했을 때 어떤 것들이 저장되는지를 확인합니다.
* `clone`/`add`/`commit`/`push`/`pull`/`branch`/`stash` 명령을 충분히 익혔다고 생각되면, 자신의 저장소에 이력을 push합니다.
