export interface ColorPropsType {
  color?: string;
  weight?: 'w1' | 'w2' | 'w3' | 'w4' | 'w5';
}

export type ColorNameType = {
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
