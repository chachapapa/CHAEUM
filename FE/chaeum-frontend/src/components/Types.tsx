type User = {
  nickName: string;
  profileImage: string;
};

type Activity = {
  category: string;
  color: string;
  time: number;
};

type Comment = {
  user: User;
  content: string;
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

type ColorForSelection = {
  color: string;
  hoverColor: string;
};

export interface ColorPropsType {
  color?: string;
  weight?: 'w1' | 'w2' | 'w3' | 'w4' | 'w5';
}

export interface WaveColorPropsType {
  color? : string;
  weight1? : 'w1';
  weight2? : 'w2';
  weight3? : 'w3';
  weight4? : 'w4';
  weight5? : 'w5';
}

type ColorNameType = {
  [key in string]: string;
};

export interface StreakInfoType {
  info?: { date: string; activetime: number }[];
  color?: string;
}

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
};
