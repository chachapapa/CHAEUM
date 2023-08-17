import type { ColorPropsType, WaveColorPropsType } from '../Types';

type ColorNameType = {
  [key in string]: string;
};

const ColorNameList: ColorNameType = {
  // emerald
  emeraldw0: 'fill-emerald-50',
  emeraldw1: 'fill-emerald-200',
  emeraldw2: 'fill-emerald-300',
  emeraldw3: 'fill-emerald-400',
  emeraldw4: 'fill-emerald-600',
  emeraldw5: 'fill-emerald-700',

  // indigo
  indigow0: 'fill-indigo-50',
  indigow1: 'fill-indigo-200',
  indigow2: 'fill-indigo-300',
  indigow3: 'fill-indigo-400',
  indigow4: 'fill-indigo-600',
  indigow5: 'fill-indigo-700',

  // yellow
  yelloww0: 'fill-yellow-50',
  yelloww1: 'fill-yellow-200',
  yelloww2: 'fill-yellow-300',
  yelloww3: 'fill-yellow-400',
  yelloww4: 'fill-yellow-600',
  yelloww5: 'fill-yellow-700',

  // slate
  slatew0: 'fill-slate-50',
  slatew1: 'fill-slate-200',
  slatew2: 'fill-slate-300',
  slatew3: 'fill-slate-400',
  slatew4: 'fill-slate-600',
  slatew5: 'fill-slate-700',

  // red
  redw0: 'fill-red-50',
  redw1: 'fill-red-200',
  redw2: 'fill-red-300',
  redw3: 'fill-red-400',
  redw4: 'fill-red-600',
  redw5: 'fill-red-700',

  // orange
  orangew0: 'fill-orange-50',
  orangew1: 'fill-orange-200',
  orangew2: 'fill-orange-300',
  orangew3: 'fill-orange-400',
  orangew4: 'fill-orange-600',
  orangew5: 'fill-orange-700',

  // amber
  amberw0: 'fill-amber-50',
  amberw1: 'fill-amber-200',
  amberw2: 'fill-amber-300',
  amberw3: 'fill-amber-400',
  amberw4: 'fill-amber-600',
  amberw5: 'fill-amber-700',

  // lime
  limew0: 'fill-lime-50',
  limew1: 'fill-lime-200',
  limew2: 'fill-lime-300',
  limew3: 'fill-lime-400',
  limew4: 'fill-lime-600',
  limew5: 'fill-lime-700',

  // green
  greenw0: 'fill-green-50',
  greenw1: 'fill-green-200',
  greenw2: 'fill-green-300',
  greenw3: 'fill-green-400',
  greenw4: 'fill-green-600',
  greenw5: 'fill-green-700',

  // teal
  tealw0: 'fill-teal-50',
  tealw1: 'fill-teal-200',
  tealw2: 'fill-teal-300',
  tealw3: 'fill-teal-400',
  tealw4: 'fill-teal-600',
  tealw5: 'fill-teal-700',

  // cyan
  cyanw0: 'fill-cyan-50',
  cyanw1: 'fill-cyan-200',
  cyanw2: 'fill-cyan-300',
  cyanw3: 'fill-cyan-400',
  cyanw4: 'fill-cyan-600',
  cyanw5: 'fill-cyan-700',

  // sky
  skyw0: 'fill-sky-50',
  skyw1: 'fill-sky-200',
  skyw2: 'fill-sky-300',
  skyw3: 'fill-sky-400',
  skyw4: 'fill-sky-600',
  skyw5: 'fill-sky-700',

  // blue
  bluew0: 'fill-blue-50',
  bluew1: 'fill-blue-200',
  bluew2: 'fill-blue-300',
  bluew3: 'fill-blue-400',
  bluew4: 'fill-blue-600',
  bluew5: 'fill-blue-700',

  // violet
  violetw0: 'fill-violet-50',
  violetw1: 'fill-violet-200',
  violetw2: 'fill-violet-300',
  violetw3: 'fill-violet-400',
  violetw4: 'fill-violet-600',
  violetw5: 'fill-violet-700',

  // purple
  purplew0: 'fill-purple-50',
  purplew1: 'fill-purple-200',
  purplew2: 'fill-purple-300',
  purplew3: 'fill-purple-400',
  purplew4: 'fill-purple-600',
  purplew5: 'fill-purple-700',

  // fuchsia
  fuchsiaw0: 'fill-fuchsia-50',
  fuchsiaw1: 'fill-fuchsia-200',
  fuchsiaw2: 'fill-fuchsia-300',
  fuchsiaw3: 'fill-fuchsia-400',
  fuchsiaw4: 'fill-fuchsia-600',
  fuchsiaw5: 'fill-fuchsia-700',

  // pink'
  pinkw0: 'fill-pink-50',
  pinkw1: 'fill-pink-200',
  pinkw2: 'fill-pink-300',
  pinkw3: 'fill-pink-400',
  pinkw4: 'fill-pink-600',
  pinkw5: 'fill-pink-700',

  // rose
  rosew0: 'fill-rose-50',
  rosew1: 'fill-rose-200',
  rosew2: 'fill-rose-300',
  rosew3: 'fill-rose-400',
  rosew4: 'fill-rose-600',
  rosew5: 'fill-rose-700',

  // chaeum-blue
  chaeumbluew0: 'fill-chaeum-blue-100',
  chaeumbluew1: 'fill-chaeum-blue-100',
  chaeumbluew2: 'fill-chaeum-blue-300',
  chaeumbluew3: 'fill-chaeum-blue-500',
  chaeumbluew4: 'fill-chaeum-blue-700',
  chaeumbluew5: 'fill-chaeum-blue-900',

  // default color
  defaultw3: 'fill-chaeum-gray-300',

  // deactive color
  deactivew1: 'fill-stone-100',
  deactivew2: 'fill-stone-200',
  deactivew3: 'fill-stone-400',
  deactivew4: 'fill-stone-600',
  deactivew5: 'fill-stone-800',
};



const IconColor = ({
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

export { IconColor };
