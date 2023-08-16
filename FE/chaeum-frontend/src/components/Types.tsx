type User = {
  nickName: string;
  profileImage: string;
  introduction? : string;
  gender? : string;
  mbti? : string;
  age? : number;
  weight? : string;
  height? : string;
};

type Activity = {
  id: number;
  streakId: number;
  streak: Streak;
  category: string;
  color: ColorVariation;
  startTime: string;
  endTime: string;
};

type Comment = {
  user: User;
  activityId: number;
  content: string;
  replyId?: number;
};

type Article = {
  id: number;
  user: User;
  date: string;
  dateTime: string;
  activityInfo: Activity;
  likeCount: number;
  commentCount: number;
  content: string;
  imageList: string[];
  encourageMessageList: Comment[];
  commentList: Comment[];
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
  | 'fuchsia'
  | 'pink'
  | 'rose'
  | 'chaeum-blue';

type Story = {
  activityId: number;
  id: number;
  nickname: string;
  title: string;
  profileImg: string;
  color: ColorVariation;
  tag: string[];
  time: number;
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
};

export interface StreakInfoType {
  streakId: number;
  streakName: string;
  streakColor: string;
  streakActive: boolean;
  streakDeleted: boolean;
  categoryId: number;
  continueDays: number;
  tagList: string[];
  activeHistoryList: string[][]; // 2023-08-10 10:00:10
}

export type StreakBlankType = {
  streakColor: string;
  activeHistoryList: string[][]; // 2023-08-10 10:00:10
};
