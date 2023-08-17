type User = {
  nickname: string;
  profileImageUrl: string;
  introduce? : string;
  gender? : string;
  mbti? : string;
  age? : number;
  weight? : string;
  height? : string;
};

type Activity = {
  streakId: number;
  streakName : string;
  streakColor : ColorVariation;
  tagList : string[];
  categoryId: number;
  date : string;
  startTime: string;
  endTime: string;
  elapsedTime : string;
};

type MyActivity = {
  activityId: number;
  streakId: number;
  categoryId: number;
  date: string;
};

type RivalActivity = {
  accumulateTime: number;
  active: boolean;
  categoryId: number;
  categoryMain: string;
  categoryMiddle: string;
  nickname: string;
  ongoingTime: number;
  profileImageUrl: string;
  streakId: number;
};

type Comment = {
  profileUrl: string;
  nickname : string;
  activityId?: number;
  content: string;
  replyId?: number;
  rereplyId? : number;
  replyTime? : string;
  replies? : string[];
  cheer? : boolean;
};

type Article = {
  postId : number;
  activityId : number;
  profileUrl : string;
  nickname : string;
  postContent : string;
  postTime : string;
  commentList : Comment[];
  encourageMessageList : Comment[];
  tagList : string[];
  imageList : string[];
  friend : boolean;
  streakColor: ColorVariation;
  likeCount : number;
  commentCount : number;
};

type ImageFile = {
  id: string;
  file: File;
  url: string;
};

type ColorForSelection = {
  color: string;
  hoverColor: string;
};

type ColorVariation =
  | 'emerald'
  | 'indigo'
  | 'yellow'
  | 'slate'
  | 'red'
  | 'orange'
  | 'amber'
  | 'lime'
  | 'green'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose'
  | 'chaeumblue'
  | 'deactive'

type Story = {
  friendName : string;
  activeStartTime : string;
  streakName : string;
  streakId : number;
  activityId : number;
  profileUrl : string;
  streakColor : ColorVariation;
  tagList : string[];
};

type Streak = {
  categoryMain: string;
  categoryMiddle: string;
  streakName?: string;
  streakColor?: string;
  streakTag?: string[];
};

type Modal = {
  isModalOpen: boolean;
  modalType: 'create' | 'modify' | '';
  mainCategory: '운동' | '공부' | '기타' | '';
  streakInfo?: StreakInfoType;
};

type Drawer = {
  isDrawerOpen: boolean;
  drawerType: string;
  streakId?: number;
};

export interface ColorPropsType {
  color?: string;
  weight?: 'w1' | 'w2' | 'w3' | 'w4' | 'w5';
}

export interface WaveColorPropsType {
  color?: string;
  weight0?: 'w0';
  weight2?: 'w2';
  weight3?: 'w3';
  weight4?: 'w4';
}

type ColorNameType = {
  [key in string]: string;
};

export interface RivalPropsType {
  name: string;
  tag: string;
  profile?: string;
}

export type {
  User,
  Activity,
  Comment,
  Article,
  ColorForSelection,
  ColorNameType,
  ColorVariation,
  Story,
  Streak,
  Modal,
  ImageFile,
  Drawer,
  RivalActivity,
  MyActivity,
};

export interface StreakInfoType {
  streakId: number;
  streakName: string;
  streakColor: ColorVariation;
  streakActive: boolean;
  streakDeleted: boolean;
  categoryId: number;
  continueDays?: number;
  tagList: string[];
  activeHistoryList: string[][]; // 2023-08-10 10:00:10
}

export type StreakBlankType = {
  streakColor: string;
  activeHistoryList: string[][]; // 2023-08-10 10:00:10
};
