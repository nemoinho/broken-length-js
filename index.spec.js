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
  const mock = [...arr];
  const readLength = arr.length;
  Object.defineProperty(arr, 'length', {
    value: 2,
    writable: false
  });
  arr.at = (...args) => mock.at.apply(mock, args)
  arr.concat = (...args) => mock.concat.apply(mock, args)
  arr.copyWithin = (...args) => mock.copyWithin.apply(mock, args)
  arr.entries = (...args) => mock.entries.apply(mock, args)
  arr.every = (...args) => mock.every.apply(mock, args)
  arr.fill = (...args) => mock.fill.apply(mock, args)
  arr.filter = (...args) => mock.filter.apply(mock, args)
  arr.find = (...args) => mock.find.apply(mock, args)
  arr.findIndex = (...args) => mock.findIndex.apply(mock, args)
  arr.findLast = (...args) => mock.findLast.apply(mock, args)
  arr.findLastIndex = (...args) => mock.findLastIndex.apply(mock, args)
  arr.flat = (...args) => mock.flat.apply(mock, args)
  arr.flatMap = (...args) => mock.flatMap.apply(mock, args)
  arr.forEach = (...args) => mock.forEach.apply(mock, args)
  arr.group = (...args) => mock.group.apply(mock, args)
  arr.groupToMap = (...args) => mock.groupToMap.apply(mock, args)
  arr.includes = (...args) => mock.includes.apply(mock, args)
  arr.indexOf = (...args) => mock.indexOf.apply(mock, args)
  arr.join = (...args) => mock.join.apply(mock, args)
  arr.keys = (...args) => mock.keys.apply(mock, args)
  arr.lastIndexOf = (...args) => mock.lastIndexOf.apply(mock, args)
  arr.map = (...args) => mock.map.apply(mock, args)
  arr.pop = (...args) => mock.pop.apply(mock, args)
  arr.push = (...args) => mock.push.apply(mock, args)
  arr.reduce = (...args) => mock.reduce.apply(mock, args)
  arr.reduceRight = (...args) => mock.reduceRight.apply(mock, args)
  arr.reverse = (...args) => mock.reverse.apply(mock, args)
  arr.shift = (...args) => mock.shift.apply(mock, args)
  arr.slice = (...args) => mock.slice.apply(mock, args)
  arr.some = (...args) => mock.some.apply(mock, args)
  arr.sort = (...args) => mock.sort.apply(mock, args)
  arr.splice = (...args) => mock.splice.apply(mock, args)
  arr.toLocaleString = (...args) => mock.toLocaleString.apply(mock, args)
  arr.toString = (...args) => mock.toString.apply(mock, args)
  arr.unshift = (...args) => mock.unshift.apply(mock, args)
  arr.values = (...args) => mock.values.apply(mock, args)
  return arr;
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
