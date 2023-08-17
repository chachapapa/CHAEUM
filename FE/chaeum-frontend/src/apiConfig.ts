const API_BASE_URL = 'http://i9a810.p.ssafy.io:8080/api'; // 여기에 기본 baseURL을 설정합니다.

export const API_ROUTES = {
  // token
  ACCESS_TOKEN_URL: '/token', // 새로운 엑세스 토큰 요청(POST)

  // user
  CHECK_SIGNUP_URL: '/user/me', // 유저 정보 요청(GET), 유저 정보 초기 설정(PATCH), 내가 친구 신청 중인지 상태(GET)
  CHECK_DUPLICATION_URL: '/user/duplication-check', // 닉네임 중복 체크(POST)
  USER_MYPAGE_URL: '/user/mypage-info', // 마이페이지 회원정보 수정(PATCH), 유저 마이페이지 정보 요청(GET)
  USER_SEARCH_URL: '/user/nickname-search', // 닉네임 검색(GET)
  FRIEND_DELETE_URL: '/user', // 친구 연결 끊기(PATCH)
  FRIEND_REQUEST_URL: '/user/add', // 친구 신청 요청(POST)
  FRIEND_ACCEPT_URL: '/user/accept', // 친구 신청 수락(POST)
  FRIEND_REJECT_URL: '/user/reject', // 친구 신청 거절(PATCH)
  FRIEND_CANCEL_URL: '/user/cancel', // 친구 신청 취소 (PATCH)
  FRIEND_SEARCH_URL: '/user/friend-nickname-search', // 마이페이지 친구 닉네임 검색(GET)
  FRIEND_LIST_URL: '/user/list', // 닉네임에 해당하는 사람 친구 목록(GET), 나한테 친구 신청을 넣은 사람 목록(GET)
  FRIEND_BOOL_URL: '/user?nickname=', // 본인과 친구인지 확인(GET)

  // streak
  STREAK_LIST_URL: '/streak', // 스트릭 생성(POST), 스트릭 목록(GET)
  STREAK_CATEGORY_URL: '/streak/category', // 스트릭 중분류 가져오기(GET)
  STREAK_DEACTIVE_URL: '/streak/deactivation', // 스트릭 비활성화(PATCH)
  STREAK_DELETE_URL: '/streak/deletion', // 스트릭 삭제(PATCH)
  STREAK_MODIFY_URL: '/streak/modification', // 스트릭 수정(PATCH)
  RIVAL_LIST_URL: '/streak/rival-list', // 라이벌 목록(PATCH)
  RIVAL_UPDATE_URL: '/streak/rival-update', // 라이벌 활동정보 갱신(PATCH)

  // sns
  ARTICLE_LIST_URL: '/sns', // 게시글 목록(GET)
  ARTICLE_WRITE_URL: '/sns/create', // 게시글 작성(POST), 게시글 삭제(PATCH)
  ARTICLE_DELETE_URL: '/sns/delete', // 게시글 삭제(PATCH)
  ARTICLE_LIKE_URL: 'sns/like-post', // post 좋아요(PATCH)
  ARTICLE_DISLIKE_URL: '/sns/like-post/cancel', // post 좋아요 취소(PATCH)
  COMMENT_REGIST_URL: '/sns/comment', // 게시글 댓글 작성(POST), 게시글 댓글 삭제(POST)
  STORY_LIST_URL: '/sns/active', // 스토리 목록(GET)
  ENCOURAGE_WRITE_URL: '/sns/cheering', // 응원글 작성(POST)
  ACTIVITY_LIKE_URL: '/sns/like-activity', // active 좋아요(PATCH)
  ACTIVITY_DISLIKE_URL: '/sns/like-activity/cancel', // active 좋아요 취소(PATCH)
  POST_LIST_URL: '/sns/mypage', // 마이페이지 게시글 목록(GET)

  // activity
  ACTIVITY_UPDATE_URL: '/activity', // 활동 내역 생성(GET), 활동 종료(PATCH)
  ACTIVITY_ENCOURAGE_URL: '/activity/message/cheering', // 활동 중 응원글 목록(GET)
  MENT_START_URL: '/activity/message/starting', // 활동 시작 시 받는 멘트 목록(GET)
  MENT_ACTIVE_URL: '/activity/message/doing', // 활동 중 받는 멘트 목록(GET)
  NOPOST_LIST_URL: '/activity/list', // 게시글 작성이 되지 않은 활동글 목록(GET)
};

export const getApiUrl = (route: string): string => {
  return API_BASE_URL + route;
};
