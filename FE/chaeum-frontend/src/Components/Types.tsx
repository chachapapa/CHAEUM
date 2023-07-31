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

export type {User, Activity, Comment, Article, ColorForSelection}; 