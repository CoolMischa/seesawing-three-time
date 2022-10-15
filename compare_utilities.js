/**
 * This JavaScript contains a few functions to support seesawing or rocking of
 * groups represented by arrays of integers.
 */

/**
 * Sum all elements of array
 * @param {*} array
 * @returns sum
 */
function sumArray(array) {
  let sum = 0;
  array.forEach((element) => {
    sum += element;
  });
  return sum;
}

/**
 * Compares rhs and lhs by its weights
 * @param {*} lhs
 * @param {*} rhs
 * @returns -1 if lhs is heavier than rhs, 0 if equal weight, 1 else
 */
function compare(lhs, rhs) {
  if (lhs instanceof Array && rhs instanceof Array) {
    const weightLhs = sumArray(lhs);
    const weightRhs = sumArray(rhs);
    return weightLhs - weightRhs;
  }
  return lhs - rhs;
}

function swayGroup(lhs, rhs) {
  result = compare(lhs, rhs);
  if (result > 0) {
    return "lhs";
  } else if (result < 0) {
    return "rhs";
  }
  return "equal";
}

function reduceByRocking(group) {
  if (!(group instanceof Array)) {
    throw new TypeError("Can't reduce non-array.");
  }

  const halfLength = group.length / 2;
  const lhs = group.slice(0, halfLength);
  const rhs = group.slice(halfLength);
  let idx = new Array(halfLength);

  let result = {};
  swayResult = swayGroup(lhs, rhs);
  switch (swayResult) {
    case "lhs":
      for (let i = 0; i < halfLength; i++) {
        idx[i] = i;
      }
      result.H = Array.from(idx);
      for (let i = 0; i < halfLength; i++) {
        idx[i] = i + halfLength;
      }
      result.L = Array.from(idx);
      break;
    case "rhs":
      for (let i = 0; i < halfLength; i++) {
        idx[i] = i;
      }
      result.L = Array.from(idx);
      for (let i = 0; i < halfLength; i++) {
        idx[i] = i + halfLength;
      }
      result.H = Array.from(idx);
      break;
      break;
    default:
      idx = new Array(group.length);
      for (let i = 0; i < group.length; i++) {
        idx[i] = i;
      }
      result.N = Array.from(idx);
      break;
  }
  return result;
}

module.exports = {
  sumArray,
  compare,
  swayGroup,
  reduceByRocking,
};
