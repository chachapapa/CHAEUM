import type { ColorPropsType, WaveColorPropsType } from '../Types';

type ColorNameType = {
  [key in string]: string;
};

const ColorNameList: ColorNameType = {
  // emerald
  emeraldw0: 'bg-emerald-50',
  emeraldw1: 'bg-emerald-200',
  emeraldw2: 'bg-emerald-300',
  emeraldw3: 'bg-emerald-400',
  emeraldw4: 'bg-emerald-600',
  emeraldw5: 'bg-emerald-700',

  // indigo
  indigow0: 'bg-indigo-50',
  indigow1: 'bg-indigo-200',
  indigow2: 'bg-indigo-300',
  indigow3: 'bg-indigo-400',
  indigow4: 'bg-indigo-600',
  indigow5: 'bg-indigo-700',

  // yellow
  yelloww0: 'bg-yellow-50',
  yelloww1: 'bg-yellow-200',
  yelloww2: 'bg-yellow-300',
  yelloww3: 'bg-yellow-400',
  yelloww4: 'bg-yellow-600',
  yelloww5: 'bg-yellow-700',

  // slate
  slatew0: 'bg-slate-50',
  slatew1: 'bg-slate-200',
  slatew2: 'bg-slate-300',
  slatew3: 'bg-slate-400',
  slatew4: 'bg-slate-600',
  slatew5: 'bg-slate-700',

  // red
  redw0: 'bg-red-50',
  redw1: 'bg-red-200',
  redw2: 'bg-red-300',
  redw3: 'bg-red-400',
  redw4: 'bg-red-600',
  redw5: 'bg-red-700',

  // orange
  orangew0: 'bg-orange-50',
  orangew1: 'bg-orange-200',
  orangew2: 'bg-orange-300',
  orangew3: 'bg-orange-400',
  orangew4: 'bg-orange-600',
  orangew5: 'bg-orange-700',

  // amber
  amberw0: 'bg-amber-50',
  amberw1: 'bg-amber-200',
  amberw2: 'bg-amber-300',
  amberw3: 'bg-amber-400',
  amberw4: 'bg-amber-600',
  amberw5: 'bg-amber-700',

  // lime
  limew0: 'bg-lime-50',
  limew1: 'bg-lime-200',
  limew2: 'bg-lime-300',
  limew3: 'bg-lime-400',
  limew4: 'bg-lime-600',
  limew5: 'bg-lime-700',

  // green
  greenw0: 'bg-green-50',
  greenw1: 'bg-green-200',
  greenw2: 'bg-green-300',
  greenw3: 'bg-green-400',
  greenw4: 'bg-green-600',
  greenw5: 'bg-green-700',

  // teal
  tealw0: 'bg-teal-50',
  tealw1: 'bg-teal-200',
  tealw2: 'bg-teal-300',
  tealw3: 'bg-teal-400',
  tealw4: 'bg-teal-600',
  tealw5: 'bg-teal-700',

  // cyan
  cyanw0: 'bg-cyan-50',
  cyanw1: 'bg-cyan-200',
  cyanw2: 'bg-cyan-300',
  cyanw3: 'bg-cyan-400',
  cyanw4: 'bg-cyan-600',
  cyanw5: 'bg-cyan-700',

  // sky
  skyw0: 'bg-sky-50',
  skyw1: 'bg-sky-200',
  skyw2: 'bg-sky-300',
  skyw3: 'bg-sky-400',
  skyw4: 'bg-sky-600',
  skyw5: 'bg-sky-700',

  // blue
  bluew0: 'bg-blue-50',
  bluew1: 'bg-blue-200',
  bluew2: 'bg-blue-300',
  bluew3: 'bg-blue-400',
  bluew4: 'bg-blue-600',
  bluew5: 'bg-blue-700',

  // violet
  violetw0: 'bg-violet-50',
  violetw1: 'bg-violet-200',
  violetw2: 'bg-violet-300',
  violetw3: 'bg-violet-400',
  violetw4: 'bg-violet-600',
  violetw5: 'bg-violet-700',

  // purple
  purplew0: 'bg-purple-50',
  purplew1: 'bg-purple-200',
  purplew2: 'bg-purple-300',
  purplew3: 'bg-purple-400',
  purplew4: 'bg-purple-600',
  purplew5: 'bg-purple-700',

  // fuchsia
  fuchsiaw0: 'bg-fuchsia-50',
  fuchsiaw1: 'bg-fuchsia-200',
  fuchsiaw2: 'bg-fuchsia-300',
  fuchsiaw3: 'bg-fuchsia-400',
  fuchsiaw4: 'bg-fuchsia-600',
  fuchsiaw5: 'bg-fuchsia-700',

  // pink'
  pinkw0: 'bg-pink-50',
  pinkw1: 'bg-pink-200',
  pinkw2: 'bg-pink-300',
  pinkw3: 'bg-pink-400',
  pinkw4: 'bg-pink-600',
  pinkw5: 'bg-pink-700',

  // rose
  rosew0: 'bg-rose-50',
  rosew1: 'bg-rose-200',
  rosew2: 'bg-rose-300',
  rosew3: 'bg-rose-400',
  rosew4: 'bg-rose-600',
  rosew5: 'bg-rose-700',

  // chaeum-blue
  chaeumbluew0: 'bg-chaeum-blue-100',
  chaeumbluew1: 'bg-chaeum-blue-100',
  chaeumbluew2: 'bg-chaeum-blue-300',
  chaeumbluew3: 'bg-chaeum-blue-500',
  chaeumbluew4: 'bg-chaeum-blue-700',
  chaeumbluew5: 'bg-chaeum-blue-900',

  // default color
  defaultw3: 'bg-chaeum-gray-300',

  // deactive color
  deactivew1: 'bg-stone-100',
  deactivew2: 'bg-stone-200',
  deactivew3: 'bg-stone-400',
  deactivew4: 'bg-stone-600',
  deactivew5: 'bg-stone-800',
};

const StreakColor = ({ color, weight }: ColorPropsType) => {
  //type narrowing
  const newcolor = typeof color !== 'undefined' ? color : 'default';
  const newweight = typeof weight !== 'undefined' ? weight : 'w3';

  return ColorNameList[newcolor + newweight];
};

const WaveBottomColor = ({
  color,
  weight0,
  weight2,
  weight3,
  weight4,
}: WaveColorPropsType) => {
  //type narrowing
  const newcolor = typeof color !== 'undefined' ? color : 'default';
  const newweight = weight0? 'w0' : weight2 ? 'w2' : weight3 ? 'w3' : 'w4';

  return ColorNameList[newcolor + newweight];
};

export { StreakColor, WaveBottomColor };
