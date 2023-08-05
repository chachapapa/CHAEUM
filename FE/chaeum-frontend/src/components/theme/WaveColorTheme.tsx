import type { ColorPropsType, ColorNameType } from '../Types';

const WaveColorList: ColorNameType = {
  // emerald
  emeraldw1: 'fill-emerald-50',
  emeraldw2: 'fill-emerald-200',
  emeraldw3: 'fill-emerald-400',
  emeraldw4: 'fill-emerald-600',
  emeraldw5: 'fill-emerald-800',

  // indigo
  indigow1: 'fill-indigo-50',
  indigow2: 'fill-indigo-200',
  indigow3: 'fill-indigo-400',
  indigow4: 'fill-indigo-600',
  indigow5: 'fill-indigo-800',

  // yellow
  yelloww1: 'fill-yellow-50',
  yelloww2: 'fill-yellow-200',
  yelloww3: 'fill-yellow-400',
  yelloww4: 'fill-yellow-600',
  yelloww5: 'fill-yellow-800',

  // slate
  slatew1: 'fill-slate-50',
  slatew2: 'fill-slate-200',
  slatew3: 'fill-slate-400',
  slatew4: 'fill-slate-600',
  slatew5: 'fill-slate-800',

  // red
  redw1: 'fill-red-50',
  redw2: 'fill-red-200',
  redw3: 'fill-red-400',
  redw4: 'fill-red-600',
  redw5: 'fill-red-800',

  // orange
  orangew1: 'fill-orange-50',
  orangew2: 'fill-orange-200',
  orangew3: 'fill-orange-400',
  orangew4: 'fill-orange-600',
  orangew5: 'fill-orange-800',

  // amber
  amberw1: 'fill-amber-50',
  amberw2: 'fill-amber-200',
  amberw3: 'fill-amber-400',
  amberw4: 'fill-amber-600',
  amberw5: 'fill-amber-800',

  // lime
  limew1: 'fill-lime-50',
  limew2: 'fill-lime-200',
  limew3: 'fill-lime-400',
  limew4: 'fill-lime-600',
  limew5: 'fill-lime-800',

  // green
  greenw1: 'fill-green-50',
  greenw2: 'fill-green-200',
  greenw3: 'fill-green-400',
  greenw4: 'fill-green-600',
  greenw5: 'fill-green-800',

  // teal
  tealw1: 'fill-teal-50',
  tealw2: 'fill-teal-200',
  tealw3: 'fill-teal-400',
  tealw4: 'fill-teal-600',
  tealw5: 'fill-teal-800',

  // cyan
  cyanw1: 'fill-cyan-50',
  cyanw2: 'fill-cyan-200',
  cyanw3: 'fill-cyan-400',
  cyanw4: 'fill-cyan-600',
  cyanw5: 'fill-cyan-800',

  // sky
  skyw1: 'fill-sky-50',
  skyw2: 'fill-sky-200',
  skyw3: 'fill-sky-400',
  skyw4: 'fill-sky-600',
  skyw5: 'fill-sky-800',

  // blue
  bluew1: 'fill-blue-50',
  bluew2: 'fill-blue-200',
  bluew3: 'fill-blue-400',
  bluew4: 'fill-blue-600',
  bluew5: 'fill-blue-800',

  // violet
  violetw1: 'fill-violet-50',
  violetw2: 'fill-violet-200',
  violetw3: 'fill-violet-400',
  violetw4: 'fill-violet-600',
  violetw5: 'fill-violet-800',

  // fuchsia
  fuchsiaw1: 'fill-fuchsia-50',
  fuchsiaw2: 'fill-fuchsia-200',
  fuchsiaw3: 'fill-fuchsia-400',
  fuchsiaw4: 'fill-fuchsia-600',
  fuchsiaw5: 'fill-fuchsia-800',

  // pink
  pinkw1: 'fill-pink-50',
  pinkw2: 'fill-pink-200',
  pinkw3: 'fill-pink-400',
  pinkw4: 'fill-pink-600',
  pinkw5: 'fill-pink-800',

  // rose
  rosew1: 'fill-rose-50',
  rosew2: 'fill-rose-200',
  rosew3: 'fill-rose-400',
  rosew4: 'fill-rose-600',
  rosew5: 'fill-rose-800',

  // chaeum-blue
  chaeumbluew1: 'fill-chaeum-blue-100',
  chaeumbluew2: 'fill-chaeum-blue-300',
  chaeumbluew3: 'fill-chaeum-blue-500',
  chaeumbluew4: 'fill-chaeum-blue-700',
  chaeumbluew5: 'fill-chaeum-blue-900',

  // default color
  defaultw3: 'fill-chaeum-gray-300',
};

const WaveColor = ({ color, weight }: ColorPropsType) => {
  //type narrowing
  const newcolor = typeof color !== 'undefined' ? color : 'default';
  const newweight = typeof weight !== 'undefined' ? weight : 'w3';

  return WaveColorList[newcolor + newweight];
};

export { WaveColor };
