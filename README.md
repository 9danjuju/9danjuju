# ⚽ 구단주주총회

## 🖥️ 프로젝트 소개

온라인 게임인 `FC ONLINE`의 API를 활용하여 게임 내 사용자의 전적을 확인하고 유저들과 소통할 수 있는 전적 & 커뮤니티 <br/>

- 게임 내 전적을 그래프를 통해 수치화 하여 보여줄 수 있으며, 기존 다른 FC Online의 전적 검색 사이트와는 다르게 커뮤니티의 기능을 추가한 프로젝트 입니다.<br/>

## 🔗 배포 링크

[구단 주주 총회 배포 링크](https://9danjuju-rust.vercel.app/)
<br/>

## 👨‍👩‍👧‍👦 팀 소개

|                           🧡권다정                            |                        💛신한별                         |                                   💚이기성                                    |                     💙이석원                     |                    💜정지형                    |
| :-----------------------------------------------------------: | :-----------------------------------------------------: | :---------------------------------------------------------------------------: | :----------------------------------------------: | :--------------------------------------------: |
|         [@kwondajung](https://github.com/kwondajung)          |      [@star1024cd](https://github.com/star1024cd)       |                 [@Leekee0905](https://github.com/Leekee0905)                  |    [@seokwon27](https://github.com/seokwon27)    | [@stopbrother](https://github.com/stopbrother) |
| 커뮤니티 댓글 CRUD <br/> ZUSTAND로 로그인 정보 전역 상태 관리 | 플레이 정보를 바탕으로 한 평점 페이지 및 상세 모달 구현 | 로그인/회원가입<br/> 유저 검색<br/> 전적 검색 카테고리 내 데이터 활용(그래프) | 마이페이지 구현(닉네임 변경 및 작성 게시글 확인) | TOAST UI EDITOR를 활용한 커뮤니티 게시판 CRUD  |

<br/>

## 🕰️ 개발 기간

**총 개발 기간** : 24.10.10 ~ 24.10.16</br>
**프로젝트 기획** : 24.10.10 ~ 24.10.10 </br>
**프로젝트 기본 세팅** : 24.10.11~24.10.11 </br>
**기능 구현 완료** : 24.10.11 ~ 24.10.15 </br>
**추가 구현 완료** : 24.10.15 ~ 24.10.16</br>
<br/>

## 📊 기술적 의사 결정

|      요구사항       |     선택지      |                                     사용 근거                                     |
| :-----------------: | :-------------: | :-------------------------------------------------------------------------------: |
| 전역상태 라이브러리 |     zustand     |      과도한 props 사용을 방지하고 가벼운 전역 state 관리를 위해 zustand 사용      |
| 서버상태 라이브러리 | tanstack-query  |      서버상태 관리를 쉽게 해주고 복잡한 비동기 로직을 단순화 하기 위해 사용       |
|    백엔드 서비스    |    Supabase     | 로그인 및 회원가입 서비스를 도와주는 백엔드 서비스와 게시물 관리를 위해 DB를 사용 |
|    글 작성 Tool     | TOAST UI Editor |             글 작성 시 편의성을 극대화 하기 위해 TOAST UI Editor 사용             |
|      UI 통일성      |     Shadcn      |     전적 검색 시 Accordion이나 버튼, input등의 UI의 통일성/편의성을 위해 사용     |

<br/>

## 📂 폴더 구조

<details>
<summary>폴더구조</summary>
<br/>
📦9danjuju <br/>
 ┣ 📂public<br/>
 ┃ ┗ 📂img<br/>
 ┃ ┃ ┣ 📜anonPlayerImage.png<br/>
 ┃ ┃ ┣ 📜favicon.png<br/>
 ┃ ┃ ┣ 📜field_img.jpg<br/>
 ┃ ┃ ┗ 📜homeBackgroundImage.jpg<br/>
 ┣ 📂src<br/>
 ┃ ┣ 📂app<br/>
 ┃ ┃ ┣ 📂api<br/>
 ┃ ┃ ┃ ┣ 📂@modal<br/>
 ┃ ┃ ┃ ┃ ┗ 📂(...)detail<br/>
 ┃ ┃ ┃ ┃ ┃ ┗ 📂[nickname]<br/>
 ┃ ┃ ┃ ┣ 📂matchDetail<br/>
 ┃ ┃ ┃ ┃ ┗ 📜route.ts<br/>
 ┃ ┃ ┃ ┣ 📂matchId<br/>
 ┃ ┃ ┃ ┃ ┗ 📜route.ts<br/>
 ┃ ┃ ┃ ┣ 📂playerdata<br/>
 ┃ ┃ ┃ ┃ ┗ 📂detail<br/>
 ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts<br/>
 ┃ ┃ ┃ ┣ 📂playerposition<br/>
 ┃ ┃ ┃ ┃ ┗ 📂detail<br/>
 ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts<br/>
 ┃ ┃ ┃ ┣ 📂user<br/>
 ┃ ┃ ┃ ┃ ┗ 📂detail<br/>
 ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts<br/>
 ┃ ┃ ┃ ┗ 📂usermatch<br/>
 ┃ ┃ ┃ ┃ ┗ 📂detail<br/>
 ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts<br/>
 ┃ ┃ ┣ 📂community<br/>
 ┃ ┃ ┃ ┣ 📂write<br/>
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx<br/>
 ┃ ┃ ┃ ┣ 📂[id]<br/>
 ┃ ┃ ┃ ┃ ┣ 📂modify<br/>
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx<br/>
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx<br/>
 ┃ ┃ ┃ ┣ 📜loading.tsx<br/>
 ┃ ┃ ┃ ┗ 📜page.tsx<br/>
 ┃ ┃ ┣ 📂detail<br/>
 ┃ ┃ ┃ ┗ 📂[nickname]<br/>
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx<br/>
 ┃ ┃ ┣ 📂fonts<br/>
 ┃ ┃ ┃ ┣ 📜NEXON-Football-Gothic-B.otf<br/>
 ┃ ┃ ┃ ┗ 📜NEXON-Football-Gothic-L.otf<br/>
 ┃ ┃ ┣ 📂login<br/>
 ┃ ┃ ┃ ┣ 📜loading.tsx<br/>
 ┃ ┃ ┃ ┗ 📜page.tsx<br/>
 ┃ ┃ ┣ 📂modal<br/>
 ┃ ┃ ┣ 📂mypage<br/>
 ┃ ┃ ┃ ┣ 📜loading.tsx<br/>
 ┃ ┃ ┃ ┗ 📜page.tsx<br/>
 ┃ ┃ ┣ 📂signup<br/>
 ┃ ┃ ┃ ┣ 📜loading.tsx<br/>
 ┃ ┃ ┃ ┗ 📜page.tsx<br/>
 ┃ ┃ ┣ 📜error.tsx<br/>
 ┃ ┃ ┣ 📜globals.css<br/>
 ┃ ┃ ┣ 📜layout.tsx<br/>
 ┃ ┃ ┗ 📜page.tsx<br/>
 ┃ ┣ 📂components<br/>
 ┃ ┃ ┣ 📂auth<br/>
 ┃ ┃ ┃ ┗ 📜AuthForm.tsx<br/>
 ┃ ┃ ┣ 📂comments<br/>
 ┃ ┃ ┃ ┗ 📜Comment.tsx<br/>
 ┃ ┃ ┣ 📂community<br/>
 ┃ ┃ ┃ ┣ 📜CommunityActionButton.tsx<br/>
 ┃ ┃ ┃ ┣ 📜CommunityList.tsx<br/>
 ┃ ┃ ┃ ┣ 📜HomeCommunityList.tsx<br/>
 ┃ ┃ ┃ ┗ 📜PostEditor.tsx<br/>
 ┃ ┃ ┣ 📂detail<br/>
 ┃ ┃ ┃ ┣ 📜DetailGraph.tsx<br/>
 ┃ ┃ ┃ ┣ 📜MatchAccordion.tsx<br/>
 ┃ ┃ ┃ ┣ 📜MatchContainer.tsx<br/>
 ┃ ┃ ┃ ┣ 📜MatchDetailContents.tsx<br/>
 ┃ ┃ ┃ ┣ 📜MatchRateDetail.tsx<br/>
 ┃ ┃ ┃ ┣ 📜PlayerImage.tsx<br/>
 ┃ ┃ ┃ ┗ 📜UserInfoBox.tsx<br/>
 ┃ ┃ ┣ 📂Field<br/>
 ┃ ┃ ┃ ┗ 📜Field.tsx<br/>
 ┃ ┃ ┣ 📂layout<br/>
 ┃ ┃ ┃ ┗ 📜Header.tsx<br/>
 ┃ ┃ ┣ 📂mypage<br/>
 ┃ ┃ ┃ ┣ 📜MyInfo.tsx<br/>
 ┃ ┃ ┃ ┣ 📜MyPostsList.tsx<br/>
 ┃ ┃ ┃ ┣ 📜Nickname.tsx<br/>
 ┃ ┃ ┃ ┣ 📜Post.tsx<br/>
 ┃ ┃ ┃ ┣ 📜PostsTable.tsx<br/>
 ┃ ┃ ┃ ┗ 📜Selected.tsx<br/>
 ┃ ┃ ┣ 📂ui<br/>
 ┃ ┃ ┃ ┣ 📜accordion.tsx<br/>
 ┃ ┃ ┃ ┣ 📜button.tsx<br/>
 ┃ ┃ ┃ ┗ 📜input.tsx<br/>
 ┃ ┃ ┣ 📜LoadingSpinner.tsx<br/>
 ┃ ┃ ┗ 📜SearchBar.tsx<br/>
 ┃ ┣ 📂hooks<br/>
 ┃ ┃ ┣ 📜useGetMatchIdQuery.ts<br/>
 ┃ ┃ ┣ 📜useGetPlayersNameQuery.ts<br/>
 ┃ ┃ ┣ 📜useGetPositionQuery.ts<br/>
 ┃ ┃ ┗ 📜useMatchDetailDataQuery.ts<br/>
 ┃ ┣ 📂lib<br/>
 ┃ ┃ ┗ 📜utils.ts<br/>
 ┃ ┣ 📂provider<br/>
 ┃ ┃ ┗ 📜QueryProvider.tsx<br/>
 ┃ ┣ 📂types<br/>
 ┃ ┃ ┣ 📂detail<br/>
 ┃ ┃ ┣ 📜matchType.ts<br/>
 ┃ ┃ ┣ 📜maxDivisionType.ts<br/>
 ┃ ┃ ┗ 📜userInfoType.ts<br/>
 ┃ ┣ 📂utils<br/>
 ┃ ┃ ┣ 📂detail<br/>
 ┃ ┃ ┃ ┗ 📜datailApi.ts<br/>
 ┃ ┃ ┣ 📂mypage<br/>
 ┃ ┃ ┃ ┣ 📜api.ts<br/>
 ┃ ┃ ┃ ┗ 📜type.ts<br/>
 ┃ ┃ ┣ 📂services<br/>
 ┃ ┃ ┃ ┣ 📜matchDetailDataConverter.ts<br/>
 ┃ ┃ ┃ ┗ 📜utcTimeToKstConverter.ts<br/>
 ┃ ┃ ┣ 📂supabase<br/>
 ┃ ┃ ┃ ┣ 📜client.ts<br/>
 ┃ ┃ ┃ ┣ 📜middleware.ts<br/>
 ┃ ┃ ┃ ┗ 📜server.ts<br/>
 ┃ ┃ ┣ 📜client-action.ts<br/>
 ┃ ┃ ┗ 📜server-action.ts<br/>
 ┃ ┣ 📜middleware.ts<br/>
 ┃ ┗ 📜userStore.ts<br/>
 ┣ 📜.env.local<br/>
 ┣ 📜.eslintrc.json<br/>
 ┣ 📜.gitignore<br/>
 ┣ 📜.prettierrc<br/>
 ┣ 📜components.json<br/>
 ┣ 📜database.types.ts<br/>
 ┣ 📜next-env.d.ts<br/>
 ┣ 📜next.config.mjs<br/>
 ┣ 📜package.json<br/>
 ┣ 📜postcss.config.mjs<br/>
 ┣ 📜pull_request_template.md<br/>
 ┣ 📜README.md<br/>
 ┣ 📜tailwind.config.ts<br/>
 ┣ 📜tsconfig.json<br/>
 ┗ 📜yarn.lock<br/>
</details>
<br/>

## 🧩 주요 기능

![image](https://github.com/user-attachments/assets/34bb810b-84c1-4603-b8f3-a3cd4d79c2d8)

### 1. 회원 가입 및 로그인

#### `SUPABASE`를 사용하여 회원가입과 로그인을 구현 후<br/>`ZUSTAND`를 사용해 로그인 여부를 전역상태로 관리합니다.

#### 1-1. 회원가입

![image](https://github.com/user-attachments/assets/b944bd20-524f-467c-8539-d26a94012c69)

#### 1-2. 로그인

![image](https://github.com/user-attachments/assets/44e1fbc4-8f88-49cc-b9a3-bfe7256bd01a)
![image](https://github.com/user-attachments/assets/04a64746-1eb8-4b26-a621-2a538423d622)

- 로그인 시 헤더에서 유저 정보 확인
  <br/>

### 2. 검색

![search](https://github.com/user-attachments/assets/cb70a027-bd36-448b-8623-5160a53106fa)

- 닉네임 검색으로 전적을 검색할 수 있습니다.
  <br/>

### 3. 전적 확인

![image](https://github.com/user-attachments/assets/5f86f0b7-1a79-43ad-8d6a-c5ba611fa9ad)
![more](https://github.com/user-attachments/assets/48c39ba5-b7f6-4eef-bed9-ab7de817da28)

#### 3-1-1. 유저 정보

![image](https://github.com/user-attachments/assets/0ed691b4-b171-41ec-b65c-78390f03a1a1)

- 검색한 유저의 정보와 전적을 확인할 수 있습니다.

#### 3-2-1. 매치 타입

![image](https://github.com/user-attachments/assets/8464fd00-e7fb-40dd-8e49-89f5f53f3514)
![image](https://github.com/user-attachments/assets/e7277ff4-5936-4b82-acd8-5bc8e39d9821)

- 매치 타입에 맞는 전적을 확인할 수 있습니다.

#### 3-3-1. 평점

![image](https://github.com/user-attachments/assets/1678db60-36f9-40c4-bc28-682863fe03d2)
![image](https://github.com/user-attachments/assets/5536f471-ec0a-4678-9489-dc5d887cfb15)

- 특정 매치에 따른 선수 정보가 화면에 랜더링 되며, 클릭 시 모달로 선수 정보를 확인할 수 있습니다.

![open](https://github.com/user-attachments/assets/351cf381-ce8c-42ca-8d8b-e6cde13dc800)

#### 3-3-2. 슈팅

![image](https://github.com/user-attachments/assets/597a7a33-8b03-4d4f-b678-c0969bd44ad2)

- 특정 매치의 슈팅 정보를 그래프로 확인할 수 있습니다.

#### 3-3-3. 패스

![image](https://github.com/user-attachments/assets/c0779f50-4985-4fb4-be42-c59d747e7972)

- 특정 매치의 패스 정보를 그래프로 확인할 수 있습니다.

#### 3-3-4. 수비

![image](https://github.com/user-attachments/assets/0062c7cf-aee3-4713-a62c-5845955ff053)

- 특정 매치의 수비 정보를 그래프로 확인할 수 있습니다.

<br/>

### 4. 커뮤니티

#### 4-1. 게시글 확인

![image](https://github.com/user-attachments/assets/33c93b0a-feb6-4734-a908-7eb2defbf161)

- 게시글 목록을 확인할 수 있습니다. </br>

![muhan345](https://github.com/user-attachments/assets/0792975a-d90a-42a3-8775-4fbc7d494225)

- 무한 스크롤을 통해 페이지 이동 없이 전체 게시물을 확인할 수 있습니다. </br>

![image](https://github.com/user-attachments/assets/731b6a70-128b-4a4e-8132-581f65c64285)

- 상세 게시물을 확인할 수 있습니다.</br>

#### 4-2. 게시글 CRUD

![image](https://github.com/user-attachments/assets/8fa8425b-f64b-4110-ac38-2c055352bb07)
`TOAST UI EDITOR`를 사용하여 글쓰기를 할 수 있습니다.</br>

![image](https://github.com/user-attachments/assets/03e6de8a-65e4-4c16-b491-117b265272ec)
![image](https://github.com/user-attachments/assets/0976c398-35c9-4062-b54b-2612ac75d9ac)
![image](https://github.com/user-attachments/assets/e917e755-fdf2-4d8c-b761-b57c5622f2e3)

- 게시글을 수정 할 수 있습니다.</br>

<br/>

### 5. 댓글

![image](https://github.com/user-attachments/assets/64dc8da3-0d12-4c2e-a367-b06e6922855b)

- 댓글을 작성할 수 있습니다.

![image](https://github.com/user-attachments/assets/e3340a4e-fe28-45e9-9cab-1d320f4356cb)
![image](https://github.com/user-attachments/assets/b515f368-5249-4abe-a478-effeb079c6c4)

- 댓글을 수정/삭제할 수 있습니다.

<br/>

### 6. 마이페이지

![image](https://github.com/user-attachments/assets/8452f459-991b-403e-9706-df2c0d050047)

- 가입 시 입력한 닉네임이 `NEXON OPEN API`서버에 존재할 경우 해당 유저의 정보를 받아옵니다.
- 로그인 후 작성한 게시물을 확인할 수 있습니다.
  <br/>

## 🚨 트러블 슈팅

### 1. 랜더링 오류

#### 1-1. 더보기 버튼 클릭 시 로딩 UI가 보이며 페이지가 깜빡 거리는 현상이 발생

- 기존 : `loading.tsx`를 통해 loading 상태일 때 loading UI를 보여줘야 함

#### 1-2. 해결 방법

![image](https://github.com/user-attachments/assets/e70cd3f9-c9b3-41fa-9e97-3212d8866549)
**해결** : 한 페이지에서 관리하던 `loading.tsx`를 `Suspense`를 통해 로딩 UI를 보여줘야 하는 곳을 세분화,
전적 검색페이지는 예외로 `useInfiniteQuery`의 `isLoading`을 통해 로딩 UI를 넣어주어 매치타입이 변할 때만 로딩 UI가 보이도록 수정

### 2. TOAST UI Editor 오류

#### 2-1. PostEditor 최상단에 "use client"를 선언하고 Write 페이지로 이동할 시 `ReferenceError: navigator is not defined` 에러가 발생

**기존** : TOAST UI Editor Form이 나타나야 한다.

- app/community/write/page.tsx - CommunityWritepage (서버 컴포넌트)
  components/community/PostEditor.tsx - (클라이언트 컴포넌트)
  CommunityWritePage 컴포넌트안에 PostEditor 컴포넌트가 있고 PostEditor에서
  Toast ui Editor 라이브러리를 사용하려고 하는 구조이다.

#### 2-2. 해결 방법

![image](https://github.com/user-attachments/assets/0b14853b-1486-40b7-9ab7-70f5c6a1cdf6)
**해결** : dynamic 함수를 사용해서 컴포넌트를 ssr에서 제외 시켜 서버사이드에서 빌드를 무시하게 하였다. `const PostEditor = dynamic(() => import('@/components/community/PostEditor'), { ssr: false });`

<br/>

# 자체 평가 의견

|  이름  | 점수 | 피드백                                                                                                                                                                                                                                               |
| :----: | :--: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 권다정 | 8/10 | 팀프로젝트 하면서 CRUD를 온전히 맡아본 적이 없었는데 이번에 맡을 수 있어서 좋았고, 제가 두려워했던 것 중 하나인 zustand도 직접 사용해볼 수 있어서 대체적으로 만족스럽습니다.                                                                         |
| 신한별 | 7/10 | 좀 더 깔끔한 코드를 작성하고 싶었는데 그러지 못했고, 아직 Next.js에 대한 이해도가 부족해서 장점을 활용하지 못한 것 같아 아쉽습니다! <br/> (ex. 모달을 parallel routes & Intercepting Routes로 구현). 하지만 생각했던 것들은 구현해서 만족스럽습니다. |
| 이기성 | 8/10 | Next.js의 렌더링 기법을 더 다양하게 사용해보고 싶었는데 그러지 못해서 아쉬운 점이 살짝 남았습니다.                                                                                                                                                   |
| 이석원 | 7/10 | 구상했던 기능들을 모두 구현했다는 점에서 많이 만족스럽지만, 서벅액션과 라우팅 핸들러에 대한 이해와 경험이 부족해서 아쉬움이 남는 것 같습니다.                                                                                                        |
| 정지형 | 5/10 | "일단" 기능이 되긴 하기에 50점을 주었고, 코드 간결화가 안되어 있으며 API 함수도 제대로 관리하지 못하고 있습니다.                                                                                                                                     |

<br/>

# 🧪 Technologies & Tools

### 📋 Languages

![javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

### 📚 Frameworks, Platforms and Libraries

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)

### 💾 Databases

![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

### 🎨 Design

![figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

### ☁️ Hosting/SaaS

![vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

### 💻 IDEs/Editors

![vscode](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)

### 🕓 Version Control

![git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)

### 💬 Social

![slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)

### 🥅 Other

![notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)
![prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
