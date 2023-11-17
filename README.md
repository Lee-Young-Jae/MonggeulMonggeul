# MonggeulMonggeul

서비스 링크: [https://moim.monggeul.online/](https://moim.monggeul.online/)

## 📌 소개

"몽글몽글"은 모임을 즐겁고 편하게 유지할 수 있도록 도와주는 웹 어플리케이션입니다. 다양한 기능과 편의성을 제공하여 모임 구성원들이 쉽게 소통하고, 일정을 관리하며, 투표를 진행할 수 있습니다.

## 📃 기술 스택

- Frontend: Next.js, TypeScript, React, react-query
- Backend: Node.js, Express.js
- Database: MySQL
- DevOps: AWS(Route 53, EC2), Nginx

## 📃 기능 목록

- [x] 카카오톡 소셜 로그인

- [x] 모임 `Group`

  - [x] 모임 생성
  - [x] 모임 가입
  - [x] 모임 탈퇴

- [x] 투표 `Vote`

  - [x] 투표 생성
  - [x] 투표 참여
  - [x] 투표 결과 확인

- [x] 약속관리 `appointment`

  - [x] 약속잡기 생성
  - [x] 약속잡기 삭제
  - [x] 약속잡기 참여

- [x] 채팅 `Chat`
  - [x] 채팅방 참여
  - [x] 채팅방 나가기

## 📃 기능 상세

### 카카오톡 소셜 로그인

카카오톡 소셜 로그인을 통해 간편하게 로그인할 수 있습니다.

### 모임 `Group`

모임을 생성하고, 모임에 가입하고, 모임에서 탈퇴할 수 있습니다.

### 투표 `Vote`

투표를 생성하고, 투표에 참여하고, 투표 결과를 확인할 수 있습니다.

### 약속관리 `appointment`

약속잡기를 생성하고, 약속잡기에 참여하고, 약속잡기를 삭제할 수 있습니다.
유저의 참여 시간을 토대로 최적의 약속시간을 순위별로 보여줍니다.

### 채팅 `Chat`

채팅방을 생성하고, 채팅방에 참여하고, 채팅방에서 나갈 수 있습니다.

### 모임 초대 `Invite`

만료기간과 횟수 제한이 있는 초대링크를 생성하여 모임에 초대할 수 있습니다.

모임 구성원들과 채팅하고, 일정을 공유하며, 투표를 만들어 진행합니다.
모임의 활동을 즐기고 편리하게 관리합니다.

## 🚗 Program Preview

**1. 랜딩페이지**

<img src="https://github.com/Lee-Young-Jae/MonggeulMonggeul/assets/78532129/aeac49a1-d217-442e-bfb5-9ddd3e3a04e0"  width="400" />

`카카오 소셜 로그인 기능을 통해 손쉽게 서비스 이용이 가능합니다.`

**2. 그룹 홈 / 그룹 메뉴**

<img src="https://github.com/Lee-Young-Jae/MonggeulMonggeul/assets/78532129/85983ba9-37e2-4b2b-bda1-a49f14c6f3b2"  width="400" />
<img src="https://github.com/Lee-Young-Jae/MonggeulMonggeul/assets/78532129/55e8a666-34e4-4e17-99a5-2bac07d40b69"  width="400" />

`메뉴 버튼 토글 시 네이티브 앱과 같은 애니메이션을 적용하였습니다.`

**3. 투표 페이지**

<img src="https://github.com/Lee-Young-Jae/MonggeulMonggeul/assets/78532129/bdf572b0-1f83-4e08-b01e-8dbc0926fd7a"  width="400" />
<img src="https://github.com/Lee-Young-Jae/MonggeulMonggeul/assets/78532129/71926794-b2e1-4519-a3f7-c329dba816b8"  width="400" />
<img src="https://github.com/Lee-Young-Jae/MonggeulMonggeul/assets/78532129/a6cf304d-e2fa-4b3c-a978-9de2879cbe99"  width="400" />

`투표를 생성하고 모임 내 다른 유저와 같이 투표가 가능합니다.`

**3. 약속 관리 페이지**

<img src="https://github.com/Lee-Young-Jae/MonggeulMonggeul/assets/78532129/1edfd159-e87b-4c94-afeb-5e7c22c6c81c"  width="400" />
<img src="https://github.com/Lee-Young-Jae/MonggeulMonggeul/assets/78532129/0d1e7b50-a740-47f0-a1df-27fc18cd4dda"  width="400" />

`약속을 생성하고 최적의 약속 시간을 찾습니다.`

**4. 모임 채팅**

<img src="https://github.com/Lee-Young-Jae/MonggeulMonggeul/assets/78532129/a2af637b-da92-4632-bade-ccce47622dbb"  width="400" />

`모임 내 프라이빗한 채팅 기능을 제공합니다.`

**5. 그룹 초대 페이지**

<img src="https://github.com/Lee-Young-Jae/MonggeulMonggeul/assets/78532129/0657186c-99a2-4810-b677-44f9b08cc605"  width="400" />

`유효기한이 있는 초대 링크를 생성하고 다른 유저를 모임에 초대할 수 있습니다.`

