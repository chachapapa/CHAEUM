import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  Streak,
  Modal,
  ImageFile,
  StreakInfoType,
  Drawer,
  MyActivity,
  RivalActivity,
  User,
} from '../../components/Types';

// 1. initial state type 생성
export type State = {
  // nickname: string;
  myProfileImageUrl : string;
  initialStudyStreak: Streak;
  initialSportsStreak: Streak;
  initialMyStreak: Streak;
  tabNumber: number;

  // 게시글 작성시 헤더 컨트롤 state
  articleWriteStep: number;

  // 게시글 업로드를 위한 컨텐츠 state
  activityId : number;
  articleContent: string;
  imageList: ImageFile[];

  // Drawer Control State
  drawerState: Drawer;

  // Modal Control State
  modalState: Modal;

  //친구 닉네임 목록 관리
  friendNicknameList: string[];

  //검색창 관리
  isSearchBarOpened: boolean;

  // Streak Info. state
  myStreakInfo: StreakInfoType[][] | null;

  // 내 정보
  myActivityInfo: MyActivity;

  // 내 활동 태그
  myActivityTagList: string[];

  // 내 활동 누적시간
  myAccumulateTime: number;

  // 라이벌 목록
  rivalInfoList: RivalActivity[];

  // 활동 시작 동기부여 문구
  startMentList: string[];

  // 활동 시작 동기부여 문구
  activeMentList: string[];

  // 프로필 / 배경사진
  profileImage : ImageFile[];
  backgroundImage : ImageFile[];
 };
// 1-1. initial state 객체 생성
const initialState: State = {
  // nickname: '',
  myProfileImageUrl: '',
  initialStudyStreak: { categoryMain: '공부', categoryMiddle: '기타' },
  initialSportsStreak: { categoryMain: '운동', categoryMiddle: '기타' },
  initialMyStreak: { categoryMain: '기타', categoryMiddle: '기타' },
  tabNumber: 0,
  articleWriteStep: 0,
  activityId : 0,
  articleContent: '',
  imageList: [],
  drawerState: { isDrawerOpen: false, drawerType: '' },
  modalState: { isModalOpen: false, modalType: '', mainCategory: '' },
  friendNicknameList: [],
  isSearchBarOpened: false,
  myStreakInfo: null,
  myActivityInfo: {
    activityId: 0,
    streakId: 0,
    categoryId: 0,
    date: '',
  },
  rivalInfoList: [],
  startMentList: ['동기 부여 멘트를 불러오는 중입니다.'],
  activeMentList: ['동기 부여 멘트를 생성중입니다.'],
  myAccumulateTime: 0,
  myActivityTagList: [],
  profileImage : [],
  backgroundImage:[],
};

// 2. slice 생성 : createSlice

const Slice = createSlice({
  name: 'stateSetter',
  initialState,
  reducers: {
    // reducer의 각각은 action의 역할을 함. state의 변화를 구현. immer.js를 내장하고 있어 return이 필요없다.
    // setMyNickname: (state, action: PayloadAction<string>) => {
    //   state.nickname = action.payload;
    // },

    setMyProfileImageUrl : (state, action: PayloadAction<string>) => {
      state.myProfileImageUrl = action.payload;
    },

    setInitialStudyStreak: (state, action: PayloadAction<Streak>) => {
      state.initialStudyStreak = action.payload;
    },

    setInitialSportsStreak: (state, action: PayloadAction<Streak>) => {
      state.initialSportsStreak = action.payload;
    },

    setInitialMyStreak: (state, action: PayloadAction<Streak>) => {
      state.initialMyStreak = action.payload;
    },

    setCurrentTab: (state, action: PayloadAction<number>) => {
      state.tabNumber = action.payload;
    },

    setArticleWriteStep: (state, action: PayloadAction<number>) => {
      state.articleWriteStep = action.payload;
    },
    setActivityId : (state, action : PayloadAction<number>) => {
      state.activityId = action.payload;
    },

    setArticleContent: (state, action: PayloadAction<string>) => {
      state.articleContent = action.payload;
    },

    setImageList: (state, action: PayloadAction<ImageFile[]>) => {
      state.imageList = action.payload;
    },

    deleteImageList : (state, action: PayloadAction<string>) => {
      state.imageList = state.imageList.filter(image => image.url !== action.payload);
    },
    openDrawer: (state, action: PayloadAction<Drawer>) => {
      state.drawerState = action.payload;
    },

    closeDrawer: state => {
      state.drawerState.isDrawerOpen = false;
    },
    openModal: (state, action: PayloadAction<Modal>) => {
      state.modalState = action.payload;
    },

    closeModal: state => {
      state.modalState.isModalOpen = false;
    },

    setFriendNicknameList: (state, action: PayloadAction<string[]>) => {
      state.friendNicknameList = state.friendNicknameList.concat(action.payload);
    },

    deleteFriendNicknameList : (state, action: PayloadAction<string>) => {
      const index = state.friendNicknameList.indexOf(action.payload);
      state.friendNicknameList = state.friendNicknameList.splice(index,1);
    },

    setIsSearchBarOpened: state => {
      state.isSearchBarOpened = !state.isSearchBarOpened;
    },


    setMyStreakInfo: (state, action: PayloadAction<StreakInfoType[][]>) => {
      state.myStreakInfo = action.payload;
    },

    // 내 활동 정보
    setMyActivityInfo: (state, action: PayloadAction<MyActivity>) => {
      state.myActivityInfo = action.payload;
    },

    // 내 누적시간 정보
    setMyAccumalteTime: (state, action: PayloadAction<number>) => {
      state.myAccumulateTime = action.payload;
    },

    // 내 활동 태그 정보
    setMyActivityTagList: (state, action: PayloadAction<string[]>) => {
      state.myActivityTagList = action.payload;
    },

    // 라이벌 목록 정보 갱신
    setRivalInfoList: (state, action: PayloadAction<RivalActivity[]>) => {
      state.rivalInfoList = action.payload;
    },

    // 시작 동기부여 멘트
    setStartMentList: (state, action: PayloadAction<string[]>) => {
      state.startMentList = action.payload;
    },

    // 활동중 동기부여 멘트
    setActiveMentList: (state, action: PayloadAction<string[]>) => {
      state.activeMentList = action.payload;
    },

    // 프로필 / 배경 사진 
    setProfileImage : (state, action: PayloadAction<ImageFile[]>) => {
      state.profileImage = action.payload;
    },

    setBackgroundImage : (state, action: PayloadAction<ImageFile[]>) => {
      state.backgroundImage = action.payload;
    },

    deleteProfileImage :(state) => {
      state.profileImage = [];
    },
    deleteBackgroundImage :(state) => {
      state.profileImage = [];
    },
  },
});

// 3. export

// 3-1. export actions
export const {
  setCurrentTab,
  // setMyNickname,
  setMyProfileImageUrl,
  setInitialStudyStreak,
  setInitialSportsStreak,
  setInitialMyStreak,
  setArticleWriteStep,
  setActivityId,
  setArticleContent,
  setImageList,
  deleteImageList,
  openDrawer,
  closeDrawer,
  openModal,
  closeModal,
  setFriendNicknameList,
  deleteFriendNicknameList,
  setIsSearchBarOpened,
  setMyStreakInfo,
  setMyActivityInfo,
  setMyAccumalteTime,
  setMyActivityTagList,
  setRivalInfoList,
  setStartMentList,
  setActiveMentList,
  setBackgroundImage,
  setProfileImage,
  deleteBackgroundImage,
  deleteProfileImage
} = Slice.actions;
// 3-2. export default slice.reducer
export default Slice.reducer;
