import type { ColorPropsType, ColorNameType } from '../Types';

const TextColorList: ColorNameType = {
  // emerald
  emeraldw1: 'text-emerald-50',
  emeraldw2: 'text-emerald-200',
  emeraldw3: 'text-emerald-400',
  emeraldw4: 'text-emerald-600',
  emeraldw5: 'text-emerald-800',

  // indigo
  indigow1: 'text-indigo-50',
  indigow2: 'text-indigo-200',
  indigow3: 'text-indigo-400',
  indigow4: 'text-indigo-600',
  indigow5: 'text-indigo-800',

  // yellow
  yelloww1: 'text-yellow-50',
  yelloww2: 'text-yellow-200',
  yelloww3: 'text-yellow-400',
  yelloww4: 'text-yellow-600',
  yelloww5: 'text-yellow-800',

  // slate
  slatew1: 'text-slate-50',
  slatew2: 'text-slate-200',
  slatew3: 'text-slate-400',
  slatew4: 'text-slate-600',
  slatew5: 'text-slate-800',

  // red
  redw1: 'text-red-50',
  redw2: 'text-red-200',
  redw3: 'text-red-400',
  redw4: 'text-red-600',
  redw5: 'text-red-800',

  // orange
  orangew1: 'text-orange-50',
  orangew2: 'text-orange-200',
  orangew3: 'text-orange-400',
  orangew4: 'text-orange-600',
  orangew5: 'text-orange-800',

  // amber
  amberw1: 'text-amber-50',
  amberw2: 'text-amber-200',
  amberw3: 'text-amber-400',
  amberw4: 'text-amber-600',
  amberw5: 'text-amber-800',

  // lime
  limew1: 'text-lime-50',
  limew2: 'text-lime-200',
  limew3: 'text-lime-400',
  limew4: 'text-lime-600',
  limew5: 'text-lime-800',

  // green
  greenw1: 'text-green-50',
  greenw2: 'text-green-200',
  greenw3: 'text-green-400',
  greenw4: 'text-green-600',
  greenw5: 'text-green-800',

  // teal
  tealw1: 'text-teal-50',
  tealw2: 'text-teal-200',
  tealw3: 'text-teal-400',
  tealw4: 'text-teal-600',
  tealw5: 'text-teal-800',

  // cyan
  cyanw1: 'text-cyan-50',
  cyanw2: 'text-cyan-200',
  cyanw3: 'text-cyan-400',
  cyanw4: 'text-cyan-600',
  cyanw5: 'text-cyan-800',

  // sky
  skyw1: 'text-sky-50',
  skyw2: 'text-sky-200',
  skyw3: 'text-sky-400',
  skyw4: 'text-sky-600',
  skyw5: 'text-sky-800',

  // blue
  bluew1: 'text-blue-50',
  bluew2: 'text-blue-200',
  bluew3: 'text-blue-400',
  bluew4: 'text-blue-600',
  bluew5: 'text-blue-800',

  // violet
  violetw1: 'text-violet-50',
  violetw2: 'text-violet-200',
  violetw3: 'text-violet-400',
  violetw4: 'text-violet-600',
  violetw5: 'text-violet-800',

  // fuchsia
  fuchsiaw1: 'text-fuchsia-50',
  fuchsiaw2: 'text-fuchsia-200',
  fuchsiaw3: 'text-fuchsia-400',
  fuchsiaw4: 'text-fuchsia-600',
  fuchsiaw5: 'text-fuchsia-800',

  // pink
  pinkw1: 'text-pink-50',
  pinkw2: 'text-pink-200',
  pinkw3: 'text-pink-400',
  pinkw4: 'text-pink-600',
  pinkw5: 'text-pink-800',

  // rose
  rosew1: 'text-rose-50',
  rosew2: 'text-rose-200',
  rosew3: 'text-rose-400',
  rosew4: 'text-rose-600',
  rosew5: 'text-rose-800',

  // chaeum-blue
  chaeumbluew1: 'text-chaeum-blue-100',
  chaeumbluew2: 'text-chaeum-blue-300',
  chaeumbluew3: 'text-chaeum-blue-500',
  chaeumbluew4: 'text-chaeum-blue-700',
  chaeumbluew5: 'text-chaeum-blue-900',

  // default color
  defaultw3: 'text-chaeum-gray-300',
};

const TextColor = ({ color, weight }: ColorPropsType) => {
  //type narrowing
  const newcolor = typeof color !== 'undefined' ? color : 'default';
  const newweight = typeof weight !== 'undefined' ? weight : 'w3';

  return TextColorList[newcolor + newweight];
};

export { TextColor };
