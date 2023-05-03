const { lengthOf } = require('./index');

it(
  'should calculate 0 for empty arrays',
  () => expect(lengthOf(arrayWithDefinedLength([]))).toBe(0)
);
it(
  'should calculate the correct length for array of numbers',
  () => expect(lengthOf(arrayWithDefinedLength([1,2,3]))).toBe(3)
);
it(
  'should calculate the correct length for array of zeros',
  () => expect(lengthOf(arrayWithDefinedLength([0, 0, 0, 0]))).toBe(4)
);
it(
  'should calculate the correct length for array of strings',
  () => expect(lengthOf(arrayWithDefinedLength(['hello', 'world']))).toBe(2)
);
it(
  'should calculate the correct length for array of empty strings',
  () => expect(lengthOf(arrayWithDefinedLength(['', '']))).toBe(2)
);
it(
  'should calculate the correct length of a constructed Array',
  () => expect(lengthOf(arrayWithDefinedLength(new Array(10)))).toBe(10)
);
it(
  'should calculate the correct length for array of undefined',
  () => expect(lengthOf(arrayWithDefinedLength([undefined, undefined, undefined]))).toBe(3)
);
it(
  'should calculate the correct length for array of null',
  () => expect(lengthOf(arrayWithDefinedLength([null, null, null, null]))).toBe(4)
);
it(
  'should calculate the correct length for array of empty spots',
  () => expect(lengthOf(arrayWithDefinedLength([,,,]))).toBe(3)
);
it(
  'should calculate the correct length for array ending with empty spots',
  () => expect(lengthOf(arrayWithDefinedLength([1,2,3,,,]))).toBe(5)
);

function arrayWithDefinedLength(arr) {
  return {
    0: arr[0],
    1: arr[1],
    2: arr[2],
    3: arr[3],
    4: arr[4],
    5: arr[5],
    6: arr[6],
    7: arr[7],
    8: arr[8],
    9: arr[9],
    get length() {
      return Math.floor(Math.random() * 100);
    },
    at: (...args) => arr.at.apply(arr, args),
    concat: (...args) => arr.concat.apply(arr, args),
    copyWithin: (...args) => arr.copyWithin.apply(arr, args),
    entries: (...args) => arr.entries.apply(arr, args),
    every: (...args) => arr.every.apply(arr, args),
    fill: (...args) => arr.fill.apply(arr, args),
    filter: (...args) => arr.filter.apply(arr, args),
    find: (...args) => arr.find.apply(arr, args),
    findIndex: (...args) => arr.findIndex.apply(arr, args),
    findLast: (...args) => arr.findLast.apply(arr, args),
    findLastIndex: (...args) => arr.findLastIndex.apply(arr, args),
    flat: (...args) => arr.flat.apply(arr, args),
    flatMap: (...args) => arr.flatMap.apply(arr, args),
    forEach: (...args) => arr.forEach.apply(arr, args),
    group: (...args) => arr.group.apply(arr, args),
    groupToMap: (...args) => arr.groupToMap.apply(arr, args),
    includes: (...args) => arr.includes.apply(arr, args),
    indexOf: (...args) => arr.indexOf.apply(arr, args),
    join: (...args) => arr.join.apply(arr, args),
    keys: (...args) => arr.keys.apply(arr, args),
    lastIndexOf: (...args) => arr.lastIndexOf.apply(arr, args),
    map: (...args) => arr.map.apply(arr, args),
    pop: (...args) => arr.pop.apply(arr, args),
    push: (...args) => arr.push.apply(arr, args),
    reduce: (...args) => arr.reduce.apply(arr, args),
    reduceRight: (...args) => arr.reduceRight.apply(arr, args),
    reverse: (...args) => arr.reverse.apply(arr, args),
    shift: (...args) => arr.shift.apply(arr, args),
    slice: (...args) => arr.slice.apply(arr, args),
    some: (...args) => arr.some.apply(arr, args),
    sort: (...args) => arr.sort.apply(arr, args),
    splice: (...args) => arr.splice.apply(arr, args),
    toLocaleString: (...args) => arr.toLocaleString.apply(arr, args),
    toString: (...args) => arr.toString.apply(arr, args),
    unshift: (...args) => arr.unshift.apply(arr, args),
    values: (...args) => arr.values.apply(arr, args),
  }
}

function format(start, end) {
  return str => `${start}${str}${end}`
}

function it(description, fn) {
  const green = format('\x1b[0;32m', '\x1b[0m');
  const red = format('\x1b[0;31m', '\x1b[0m');
  try {
    fn();
    console.log(green(`it ${description} ✓`));
  } catch(e) {
    console.error(red(`it ${description} ✖`));
    console.error(`  ${e.message}\n`);
  }
}

function expect(value) {
  const boldYellow = format('\x1b[1;33m', '\x1b[0m')
  const assert = (v1, v2) => {
    if (v1 !== v2)
      throw new Error(`expected ${boldYellow(v2)} but received ${boldYellow(v1)}`);
  }
  return {
    toBe: (expectedValue) => assert(value, expectedValue),
    toThrow: (errorType) => {
      errorType = errorType ? errorType : Error
      let result;
      try {
        value();
      } catch(e) {
        result = e.constructor
      }
      assert(errorType, result)
    }
  }
}
