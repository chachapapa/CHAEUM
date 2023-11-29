# 🌊CHAEUM : Fill Your Life





## 📅 프로젝트 개요

🫧 **개발 기간** : 2023.07.04 ~ 2023.08.18 (총 7주)

🫧 **팀원 소개**
|||||||
| :----------------------------------------: | :----------------------------------------: | :-----------------------------------------: | :----------------------------------------: | :----------------------------------------: | :----------------------------------------: |
| 👑 강준영 | 권소희 | 김선우 | 김의년 | 정민영 | 정재웅 |
| 프론트(팀장) | 프론트 | 백엔드 | 백엔드, CI/CD | 백엔드 | 프론트 |

💰 **기획 배경**

    🫧 주제 선정
      - SNS를 통한 일상 공유 문화의 보편화
        => 타인의 게시글, 피드를 보며 스스로 동기부여를 얻는 경우가 많아짐.
      - 열품타와 같은 동기부여 어플리케이션 활성화
        => 타인과 함께 공부하며 자신을 통제하고 습관을 형성하려고 함.

    👩🏻 타겟 사용자
        자신의 다양한 활동에 대한 현황을 공유하며 습관을 만들고
        SNS에 이를 공유하고 싶은 20·30세대

    📑 기획 의도
      - Fill your life
      - 활동 타이머를 통해 실시간 현황을 공유하며 습관을 형성
      - 활동에 대한 게시글을 게시하여 소통

    ✨ 사용자 가치
      - 자기계발을 위한 습관 형성.
      - SNS를 통한 사회적 소통 기능.

💰 **핵심 기능**

- 성취감을 느낄 수 있는 타이머 기반 스트릭 채우기.
- 타이머 기록을 바탕으로 SNS 게시글 공유.

## ⚙️ 기술 스택

**💻 FRONTEND**

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">

**💻 BACKEND**

<img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
<img src="https://img.shields.io/badge/springsecurity-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white">
<img src="https://img.shields.io/badge/JPA-000000?style=for-the-badge&logo=JPA&logoColor=white">
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JWT&logoColor=white">

**🌐 CI/CD**

<img src="https://img.shields.io/badge/jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white">
<img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white">
<img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
<img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=for-the-badge&logo=AmazonEC2&logoColor=white">
<img src="https://img.shields.io/badge/Open SSL-721412?style=for-the-badge&logo=OpenSSL&logoColor=white">

**🗄 DB**

<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">

## 📂 파일 구조

**Front-end**

```
chaeum-front
  ├── public
  │	  └── icon
  └── src
      ├── assets
      ├── components
      │   ├── active
      │   │   └── result
      │   ├── chat
      │   ├── common
      │   ├── feed
      │   │   └── write
      │   ├── main
      │   │   └── styles
      │   ├── profile
      │   │   └── screen
      │   ├── signup
      │   ├── styles
      │   └── theme
      ├── features
      │   └── states
      ├── hooks
      ├── stories
      │   └── assets
      └── views
```

**Back-end**

```
chaeum-backend
  ├── config
  │   ├── jwt
  │   └── oauth
  ├── controller
  ├── dto
  ├── domain
  ├── repository
  ├── service
  └── util

```

## ⚙️ 협업 툴 및 환경

**협업 툴**

<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/jira-0052CC?style=for-the-badge&logo=jira&logoColor=white">
<img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">
<img src="https://img.shields.io/badge/mattermost-0058CC?style=for-the-badge&logo=mattermost&logoColor=white">

**🌐 협업 환경**

**- Gitlab**
```
  - Git flow 전략에 맞게 개발을 진행
  - Git Commit Convention, Git Merge Convention
  - 코드의 버전을 관리
  - 이슈 발행, 해결을 위한 토론 => 이거 했나?
  - Merge Request시, 팀원이 코드 리뷰를 진행
```
**- JIRA**
```
  - 매주 목표량을 설정하여 Sprint진행
  - 업무의 할당량을 정하여 Story Point를 설정, In-Progress -> Done 순으로 작업
```

**- 회의**
```
  - 아침 스크럼 : 전날 목표 달성량과 당일 할 업무 브리핑
  - 저녁 스크림 : 오늘 해결 달성량과 미해결된 목표 공유
    - 금요일 저녁 스크럼은 주간 스크럼으로 진행
    - 주간 스크럼은 KPT 및 해당 주 회고
  - 소통으로 팀원들의 개발 속도 확인 가능함
```

**- Notion**
```
  - 회의가 있을 때마다 회의록을 기록하여 보관
  - 회의가 길어지지 않도록 다음날 제시할 안건을 미리 기록
  - 기술 확보 시, 다른 팀원들도 추후 따라할 수 있도록 보기 쉽게 작업
  - 컨벤션 정리
  - 간트 차트 관리
  - 기능명세서 등 모두가 공유해야 하는 문서 관리
```

## 😊 서비스 화면

| <span style="font-size:20px;">스트릭 활성화</span>      | <span style="font-size:20px;">스트릭 생성</span>      | <span style="font-size:20px;">스트릭 생성 완료</span>      |
| --------------------------------------------------- | ------------------------------------------------------ | --------------------------------------------------- |
| <img src='./exec/image/streak-able.gif' height="600">  | <img src='./exec/image/streak-create.gif'  height="600">  | <img src='./exec/image/streak-create-complete.gif'  height="600">  |
|- 비활성화 중이었던 스트릭을 활성화 가능|- 새로운 카테고리 별 스트릭 생성||

| <span style="font-size:20px;">스트릭 수정</span>      | <span style="font-size:20px;">스트릭 삭제</span>      | <span style="font-size:20px;">스트릭 비활성화</span>      |
| --------------------------------------------------- | ------------------------------------------------------ | --------------------------------------------------- |
| <img src='./exec/image/streak-modify.gif'  height="600"> | <img src='./exec/image/streak-delete.gif'  height="600">  | <img src='./exec/image/streak-disable.gif'  height="600">   |
|- 활성화 되어있던 스트릭을 비활성화 할 수 있음 |- 삭제를 원하는 스트릭 삭제 가능| - 진행하지 못하는 스트릭 비활성화 가능|

| <span style="font-size:20px;">활동 시작</span>      | <span style="font-size:20px;">활동 중</span>      | <span style="font-size:20px;">활동 종료</span> |
| --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- |
| <img src='./exec/image/활동 시작.gif' height="600">  | <img src='./exec/image/채움 중 + 라이벌 보여주기.gif' height="600">  | <img src='./exec/image/활동 종료 및 라이벌 목록과 응원글 목록.gif' height="600">  |
| - 라이벌들의 현황또한 확인 가능 | - 현재 본인이 얼마나 진행 했는지 확인 가능 <br/> - 본인을 응원한 사람의 응원글 확인 가능 <br/> - 본인의 활동에 대한 동기부여 멘트 확인 가능 | - 활동 시 생성되었던 라이벌의 목록 확인 가능<br> - 활동 종료 후, 본인이 받은 응원글의 목록 확인 가능 |


| <span style="font-size:20px;">피드</span>      | <span style="font-size:20px;">게시글 상세</span>      | <span style="font-size:20px;">마이페이지</span>      |
| --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- |
| <img src='./exec/image/chaeum-feed.gif' height="600">  | <img src='./exec/image/feed-detail.gif' height="600">  | <img src='./exec/image/chaeum-mypage.gif' height="600">  |
|- 다른 사람들이 작성한 피드를 확인 할 수 있음| - 다른 사람이 작성한 피드를 상세히 볼 수 있음 | - 마이페이지에서 다른 피드 페이지로 넘어갈 수 있음 |

**[활동]**

- 활동 시작을 통해서 채움을 할 수 있음
- 활동 중에는 나와 친구한 사람들이 보내주는 응원들이 보임

**[라이벌 보여주기]**

- 나와 같은 활동을 하는 사람들이 보임
- 장,단기 목표를 주기위해서 라이벌과 시간 차이가 작은 사람 부터 큰 사람까지 보여줌

**[스트릭 꾸미기]**

- 스트릭 이름, 스트릭 태그, 스트릭 분류, 스트릭 색상들을 설정할 수 있음
- 스트릭 삭제를 통해서 스트릭의 정보를 사용안할 수 있음
- 스트릭 비활성화를 통해서 스트릭을 사용안할 수 있음 => 삭제와 다른 점은 스트릭 정보는 사용함

**[게시글 작성]**

- 활동 종료 후, 자신이 한 활동에 대해서 게시글을 작성 가능
- 해당 게시글에는 활동 시간 등 활동에 관한 것들이 반드시 들어감
- 게시글의 댓글은 활동할 때 받은 응원과 공유가 됨


## 🎨프로토타입

**[색상 지정]**

<img src='./exec/image/프로토타입.png' width=50%> 
<br>

**[회원 가입/로그인]** 

<img src='./exec/image/회원가입.png' width=50%> 
<br>

**[메인 페이지]** 

<img src='./exec/image/메인페이지.png' width=50%> 
<br>

**[액티브]**

<img src='./exec/image/액티브.png' width=50%> 
<br>

**[결과]**

<img src='./exec/image/결과.png' width=50%> 
<br>

**[피드]**

<img src='./exec/image/피드.png' width=50%> 
<br>

**[알림]**

<img src='./exec/image/알림.png' width=50%> 
<br>

**[마이페이지]**

<img src='./exec/image/마이페이지.png' width=50%> 
<br>

## 📂 아키텍쳐

<img src='./exec/image/아키텍쳐.png' width=50%> 
<br>

### 컨벤션

<a href='./exec/Convention'>해당 링크를 통해서 자세히 확인 가능</a>
<br>

### API DOCS

<img src='./exec/image/API_DOCS.png' width=50%> 
<br>

## 🗂️ ERD

<img src='./exec/image/erd.png' width=50%> 
<br>

### 포팅메뉴얼

<a href='./exec'>포팅메뉴얼에서 확인 가능</a>

