const lengthOf = (arr) => {
  return arr // example: [3,,"f",,]
    .map(_ => 1) // make every element a 1, example: [1,,1,,]
    .toString() // convert the array to a string, example: "1,,1,"
    // The next step is mandatory to distinuish between single-element and empty arrays
    .replace(/^(.)/, ',$1') // prepend the string with ","; example: ",1,,1,"
    .split(',') // make an array again ['','1','','1','']
    .reduce(y => ++y, -1) // count (starting with -1, because of prepending): 4
}

module.exports = { lengthOf };
