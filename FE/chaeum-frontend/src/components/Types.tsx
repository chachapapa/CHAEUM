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
  id: number;
  nickname: string;
  title: string;
  img: string;
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
};

export interface ColorPropsType {
  color?: string;
  weight?: 'w1' | 'w2' | 'w3' | 'w4' | 'w5';
}

export interface WaveColorPropsType {
  color?: string;
  weight2?: 'w2';
  weight3?: 'w3';
  weight4?: 'w4';
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
  ColorVariation,
  Story,
  Streak,
  Modal,
};

export interface StreakInfoType {
  info?: { date: string; activetime: number }[];
  color?: string;
  isDeactive?: boolean;
}

export interface StreakCardProps extends StreakInfoType {
  title: string;
  tags: string[];
  className?: string;
}

export interface StreakCardInfoType extends StreakCardProps {
  category: string;
}
