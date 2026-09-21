export const profile = {
  name: '이주언',
  title: '모바일 앱 개발자',
  email: 'jueon.dev@gmail.com',
  phone: '010-4600-0945',
  summary:
    '기숙사 세탁 예약 앱 Washer를 3개월+ 운영하며 가입자 200+명, 일 평균 사용자 40명을 유지하고 있습니다. 매년 신입생 약 70명이 새로 유입되는 구조라, 사용자가 계속 바뀌어도 흔들리지 않는 예약 및 상태 동기화 로직을 가장 먼저 다듬었습니다. 반복은 자동화하고, 경험은 자산으로 남깁니다.',
  links: [
    { label: 'GitHub', href: 'https://github.com/aiden30015' },
    { label: 'Velog', href: 'https://velog.io/@aiden30015/posts' },
  ],
}

export const stats = [
  { value: 200, suffix: '+', label: 'Washer 가입자' },
  { value: 40, suffix: '명', label: '일 평균 사용자' },
  { value: 10, suffix: '회+', label: '무인 배포' },
  { value: 139, suffix: '건', label: 'GOMS 테스트' },
]

export const skills = [
  { group: 'Mobile', items: ['Flutter', 'Dart', 'Kotlin', 'Android'] },
  { group: 'Web', items: ['React'] },
  {
    group: 'Flutter 스택',
    items: ['Riverpod', 'Dio', 'Retrofit', 'Freezed', 'json_serializable', 'go_router', 'build_runner'],
  },
  {
    group: 'Infra / 배포',
    items: ['GitHub Actions', 'Fastlane', 'Firebase Crashlytics', 'FCM'],
  },
]

export const projects = [
  {
    name: 'Washer',
    tagline: '학교 기숙사 세탁기/건조기 관리 플랫폼',
    period: '2025.11 – 2026.6 (배포 완료 · 서비스 운영 중)',
    team: '11명 (앱 4 · 서버 4 · 웹 2 · 디자인 1) - 앱 파트',
    role: '예약 도메인 설계 · 앱 안정화 · 크래시 대응 · 구조 개편 · 배포 자동화',
    links: ['App Store', 'Google Play'],
    description:
      '기숙사 세탁실 명찰제에서 생기던 명찰 분실과 종료 시간 확인 불가를 해결한 앱입니다. 예약, 고장 신고, 알림, 현황과 히스토리 조회를 제공합니다. 가입자 200+명, 일 평균 사용자 40명이 사용합니다.',
    stack: [
      'Riverpod', 'Dio', 'Retrofit', 'Freezed', 'build_runner',
      'json_serializable', 'FCM', 'Firebase Crashlytics', 'go_router', 'flutter_screenutil',
    ],
    contributions: [
      {
        title: '예약 생성·취소 흐름 설계',
        body: '사전 조회와 재확인으로 중복 예약 요청을 앱 단에서 걸러내고, single-flight로 연타를 병합, 10초 폴링과 만료 타이머로 자동 동기화했습니다.',
      },
      {
        title: '배포 후 관측 체계 구축',
        body: '사용자 제보에 의존하던 상태에서 실사용자 크래시를 자동 수집하도록 바꾸고, 리포트를 원인 단위로 묶어 핫픽스했습니다.',
      },
      {
        title: '스토어 배포 자동화',
        body: 'GitHub Actions와 Fastlane으로 main 머지 한 번에 Android와 iOS를 제출, 버전과 릴리스 노트 게이트로 10회 이상 무인 배포했습니다. 수동 20~30분 → 최대 15분(빠르면 10분 미만).',
      },
      {
        title: 'core에 쌓이던 코드를 feature 단위로 분리',
        body: 'feature마다 data와 presentation을 나눠 화면이 repository를 직접 참조하지 않게 정리하고, 핵심 도메인 테스트 32건으로 검증했습니다.',
      },
    ],
    cases: [
      {
        title: '실제 기기 상태와 최대 10분까지 어긋나던 세탁기 현황',
        cause:
          '서버가 SmartThings를 10분 간격으로 폴링해 내려주는 단방향 구조라 앱 화면과 실제 기기 상태에 최대 10분의 시차가 있었습니다. 클라이언트가 서버 상태 하나만 진실로 신뢰한 것이 핵심이었고, 조회 주기를 줄여도 시차는 사라지지 않았습니다.',
        solution:
          '클라이언트가 서버와 SmartThings API를 병렬 조회한 뒤 병합·캐싱하는 단일 상태 조회 메소드로 통합했습니다. 상태 판정 기준은 서버로 일원화하고, 실제 운전 상태와 완료 시각만 SmartThings에서 받아 UI가 실제 기기 상태를 따르게 했습니다.',
        lesson: "값이 이상해 보일 때 '출처와 갱신 주기는 어디인가'부터 확인합니다.",
      },
      {
        title: '예약에 성공해도 에러 메시지가 뜨던 문제',
        cause:
          '예약 다이얼로그를 닫은 뒤 늦게 도착한 응답을 읽는 순간, 이미 dispose된 위젯의 ref로 에러 메시지를 읽으려 해 예외가 났습니다. 같은 패턴이 호출부 4곳에 중복돼 있었습니다.',
        solution:
          'await 이전에 messenger, navigator, container를 한 곳에서 캡처하는 runDialogAction 단일 실행기로 호출부 4곳을 일원화했습니다. 에러 응답 시 Bad state 발생률을 100%에서 0%로 없앴습니다.',
        lesson: "같은 버그가 흩어져 있으면 개별 수정은 재발합니다. '이 로직이 다른 곳에도 숨어 있지 않은가'를 먼저 확인합니다.",
      },
    ],
  },
  {
    name: 'GOMS',
    tagline: 'QR 기반 학교 외출제 관리 앱',
    period: '2026.2 ~ 2026.6 (배포 완료 · 서비스 운영 중)',
    team: '7명 (PM 1 · 디자인 1 · 서버 1 · iOS 2 · Android 2) - Android 앱 주 개발',
    role: '카카오 SDK 지도 및 QR 구현 · R8 keep 룰 · single-flight 재발급 · 테스트 139건',
    links: ['GitHub', 'Google Play'],
    description:
      '학생회가 수기로 적던 외출 명단 관리를 QR 인증으로 대체한 교내 외출 관리 앱입니다. 기존 안드로이드 네이티브 앱을 이어받을 인원이 없어 Flutter로 다시 만들면서 인증과 라우팅, 상태관리 구조를 새로 설계했습니다.',
    stack: [
      'Riverpod', 'Dio', 'Retrofit', 'Freezed', 'build_runner',
      'json_serializable', 'mobile_scanner', 'go_router', 'flutter_screenutil',
    ],
    contributions: [
      {
        title: '릴리즈 전용 크래시 규명',
        body: 'R8 축소가 JNI로만 참조되는 카카오맵 SDK 클래스를 제거한 것을 찾아내고, keep 룰을 release 빌드 타입에 명시했습니다.',
      },
      {
        title: '토큰 재발급 경쟁 해소',
        body: '동시 요청이 각자 재발급해 강제 로그아웃되던 것을 single-flight로 통합하고, 낡은 role claim은 실행 시 재발급으로 보정했습니다.',
      },
      {
        title: '화면 생명주기 기준 정리',
        body: '카메라 제어를 화면 생성이 아닌 가시성 기준으로 옮기고, 중복 노출되던 다이얼로그 흐름을 한 곳으로 합쳤습니다.',
      },
      {
        title: '머지 게이트 복구',
        body: '무력화돼 있던 flutter analyze 게이트를 되살리고, 네트워크 호출을 전부 깨뜨리던 CI의 .env 키 불일치를 수정했습니다.',
      },
    ],
    cases: [
      {
        title: '스토어 배포 빌드에서만 앱이 꺼지던 지도 화면',
        cause:
          '디버그·실기기 테스트에서는 정상이었지만 릴리즈 빌드에서는 지도 화면 진입 시 앱이 종료됐습니다. R8은 Java 정적 참조 그래프만 보고 미사용 코드를 판단하는데, 네이티브가 이름 문자열로 조회하는 JNI 참조는 잡히지 않아 카카오맵 SDK 내부 클래스가 제거된 것이 원인이었습니다.',
        solution:
          '카카오 SDK를 축소 대상에서 제외하는 keep 룰을 proguard-rules.pro에 작성하고 release 빌드 타입에 연결했습니다. 갤럭시 S25 릴리즈 빌드에서 지도 렌더까지 직접 확인했습니다.',
        lesson: '네이티브 SDK를 붙일 때 리플렉션이나 JNI로 이름을 조회하는지부터 확인하고, 배포 전 릴리즈 빌드로 핵심 화면을 직접 밟아봅니다.',
      },
      {
        title: '재진입 시 카메라가 검은 화면으로 멈추던 QR 스캔 화면',
        cause:
          '에러 화면에서 뒤로 나와 스캔 화면으로 돌아오면 Navigator가 기존 State를 재사용해 initState가 호출되지 않았고, 카메라를 다시 시작하는 코드가 실행되지 않았습니다. 카메라 시작·정지를 화면 생성 시점에 매달아 둔 것이 핵심이었습니다.',
        solution:
          '스캔 화면으로 돌아온 시점에 컨트롤러를 다시 켜도록 하고, 복귀 경로를 context.go에서 pop으로 바꿔 스캔 화면이 스택에 남게 했습니다. 제어 기준을 화면 생성에서 가시성으로 옮겨 두 경로를 같게 만들었습니다.',
        lesson: "initState/dispose에 무언가를 붙일 때 '이 State가 재사용될 수 있는가'부터 확인합니다.",
      },
    ],
  },
]

export const oss = [
  {
    name: 'Flutter 성능 회귀 CI 파이프라인',
    kind: 'GitHub',
    date: '2026. 9',
    body: '앱 성능이 나빠지는 걸 배포 후에야 알게 되는 문제를 CI에서 잡으려고 만들었습니다. 유사 도구 Frame Guard를 먼저 조사해 프레임 캡처는 Flutter 공식 integration_test로 대체하고, 커밋 축 장기 추세와 대시보드를 핵심 기능으로 잡았습니다. CI 러너 변동성에 의한 오탐은 상대변화, 통계적 유의성, 최소 유의 차 3중 게이트로 걸렀습니다.',
  },
  {
    name: 'thousands_separator_formatter',
    kind: 'pub.dev',
    date: '2026. 8',
    body: 'Flutter 이슈 #188152(TextField 천 단위 구분자 내장 제안)를 해결하려 했지만, 범용성이 낮은 기능은 프레임워크가 아닌 외부 패키지로 두는 것이 가이드라인이었습니다. 커서 위치 유지, 한글 IME 조합 보호를 지원하는 TextInputFormatter를 직접 구현해 pub.dev에 배포했고, 현재 136회 다운로드됐습니다.',
  },
]

export const awards = [
  { name: '4개교 연합 해커톤 (우수상)', org: '과학기술정보통신부', date: '2025.11' },
  { name: '정보처리산업기사', org: '한국산업인력공단', date: '2025.12' },
  { name: '정보기기운용기능사', org: '한국산업인력공단', date: '2026.7' },
]
