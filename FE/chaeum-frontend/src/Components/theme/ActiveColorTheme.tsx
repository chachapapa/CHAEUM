import type { ColorPropsType, ColorNameType } from '../TypeInterface';

const TextColorList: ColorNameType = {
  // emerald
  emeraldw1: 'active:text-emerald-50',
  emeraldw2: 'active:text-emerald-200',
  emeraldw3: 'active:text-emerald-400',
  emeraldw4: 'active:text-emerald-600',
  emeraldw5: 'active:text-emerald-800',

  // indigo
  indigow1: 'active:text-indigo-50',
  indigow2: 'active:text-indigo-200',
  indigow3: 'active:text-indigo-400',
  indigow4: 'active:text-indigo-600',
  indigow5: 'active:text-indigo-800',

  // yellow
  yelloww1: 'active:text-yellow-50',
  yelloww2: 'active:text-yellow-200',
  yelloww3: 'active:text-yellow-400',
  yelloww4: 'active:text-yellow-600',
  yelloww5: 'active:text-yellow-800',

  // slate
  slatew1: 'active:text-slate-50',
  slatew2: 'active:text-slate-200',
  slatew3: 'active:text-slate-400',
  slatew4: 'active:text-slate-600',
  slatew5: 'active:text-slate-800',

  // red
  redw1: 'active:text-red-50',
  redw2: 'active:text-red-200',
  redw3: 'active:text-red-400',
  redw4: 'active:text-red-600',
  redw5: 'active:text-red-800',

  // orange
  orangew1: 'active:text-orange-50',
  orangew2: 'active:text-orange-200',
  orangew3: 'active:text-orange-400',
  orangew4: 'active:text-orange-600',
  orangew5: 'active:text-orange-800',

  // amber
  amberw1: 'active:text-amber-50',
  amberw2: 'active:text-amber-200',
  amberw3: 'active:text-amber-400',
  amberw4: 'active:text-amber-600',
  amberw5: 'active:text-amber-800',

  // lime
  limew1: 'active:text-lime-50',
  limew2: 'active:text-lime-200',
  limew3: 'active:text-lime-400',
  limew4: 'active:text-lime-600',
  limew5: 'active:text-lime-800',

  // green
  greenw1: 'active:text-green-50',
  greenw2: 'active:text-green-200',
  greenw3: 'active:text-green-400',
  greenw4: 'active:text-green-600',
  greenw5: 'active:text-green-800',

  // teal
  tealw1: 'active:text-teal-50',
  tealw2: 'active:text-teal-200',
  tealw3: 'active:text-teal-400',
  tealw4: 'active:text-teal-600',
  tealw5: 'active:text-teal-800',

  // cyan
  cyanw1: 'active:text-cyan-50',
  cyanw2: 'active:text-cyan-200',
  cyanw3: 'active:text-cyan-400',
  cyanw4: 'active:text-cyan-600',
  cyanw5: 'active:text-cyan-800',

  // sky
  skyw1: 'active:text-sky-50',
  skyw2: 'active:text-sky-200',
  skyw3: 'active:text-sky-400',
  skyw4: 'active:text-sky-600',
  skyw5: 'active:text-sky-800',

  // blue
  bluew1: 'active:text-blue-50',
  bluew2: 'active:text-blue-200',
  bluew3: 'active:text-blue-400',
  bluew4: 'active:text-blue-600',
  bluew5: 'active:text-blue-800',

  // violet
  violetw1: 'active:text-violet-50',
  violetw2: 'active:text-violet-200',
  violetw3: 'active:text-violet-400',
  violetw4: 'active:text-violet-600',
  violetw5: 'active:text-violet-800',

  // fuchsia
  fuchsiaw1: 'active:text-fuchsia-50',
  fuchsiaw2: 'active:text-fuchsia-200',
  fuchsiaw3: 'active:text-fuchsia-400',
  fuchsiaw4: 'active:text-fuchsia-600',
  fuchsiaw5: 'active:text-fuchsia-800',

  // pink
  pinkw1: 'active:text-pink-50',
  pinkw2: 'active:text-pink-200',
  pinkw3: 'active:text-pink-400',
  pinkw4: 'active:text-pink-600',
  pinkw5: 'active:text-pink-800',

  // rose
  rosew1: 'active:text-rose-50',
  rosew2: 'active:text-rose-200',
  rosew3: 'active:text-rose-400',
  rosew4: 'active:text-rose-600',
  rosew5: 'active:text-rose-800',

  // chaeum-blue
  chaeumbluew1: 'active:text-chaeum-blue-100',
  chaeumbluew2: 'active:text-chaeum-blue-300',
  chaeumbluew3: 'active:text-chaeum-blue-500',
  chaeumbluew4: 'active:text-chaeum-blue-700',
  chaeumbluew5: 'active:text-chaeum-blue-900',

  // default color
  defaultw3: 'active:text-chaeum-gray-300',
};

export const ActiveColor = ({ color, weight }: ColorPropsType) => {
  //type narrowing
  const newcolor = typeof color !== 'undefined' ? color : 'default';
  const newweight = typeof weight !== 'undefined' ? weight : 'w5';

  return TextColorList[newcolor + newweight];
};
