const { sumArray, compare, swayGroup, reduceByRocking } = require("../compare_utilities");

test("Sum of int array [1,2,3,4] = 10", () => {
  expect(sumArray([1, 2, 3, 4])).toBe(10);
});

test("5, 5 compares to 0", () => {
  expect(compare(5, 5)).toBe(0);
});

test("[1, 0, 0, 0], [0, 0, 0, 0] compares to 1", () => {
  expect(compare([1, 0, 0, 0], [0, 0, 0, 0])).toBe(1);
});
test("[1, 0, 0, 0], [0, 1, 1, 0] compares to -1", () => {
  expect(compare([1, 0, 0, 0], [0, 1, 1, 0])).toBe(-1);
});
test("[1, 0, 0, 0], [0, 0, 0, 1] compares to 0", () => {
  expect(compare([1, 0, 0, 0], [0, 0, 0, 1])).toBe(0);
});

test("[1, 0, 0, 0] is heavier than [0, 0, 0, 0]", () => {
  expect(swayGroup([1, 0, 0, 0], [0, 0, 0, 0])).toBe("lhs");
});
test("[0, 0, 0, 0] is lighter than [0, 1, 0, 0]", () => {
  expect(swayGroup([0, 0, 0, 0], [0, 1, 0, 0])).toBe("rhs");
});
test("[0, 0, 0, 0] is equal than [0, 0, 0, 0]", () => {
  expect(swayGroup([0, 0, 0, 0], [0, 0, 0, 0])).toBe("equal");
});

// prepare three test groups
const length = 12;
let first4Tuple = new Array(length).fill(0);
first4Tuple[0] = 1;
let second4Tuple = new Array(length).fill(0);
second4Tuple[4] = 1;
let third4Tuple = new Array(length).fill(0);
third4Tuple[8] = -1;

test.failing("Non-Arrays can't be examined", () => {
  reduceByRocking("Not an array of twelve weights");
});

test("The array with 1 in the first 4-tuple should show up: H=[0, 1, 2, 3], L=[4, 5, 6, 7]", () => {
  result = reduceByRocking(first4Tuple.slice(0, 8));
  expect(result.H).toStrictEqual([0, 1, 2, 3]);
  expect(result.L).toStrictEqual([4, 5, 6, 7]);
  expect(result.N).toStrictEqual(undefined);
});
test("The array with 1 in the second 4-tuple should show up:  H=[4, 5, 6, 7], L=[0, 1, 2, 3]", () => {
  result = reduceByRocking(second4Tuple.slice(0, 8));
  expect(result.H).toStrictEqual([4, 5, 6, 7]);
  expect(result.L).toStrictEqual([0, 1, 2, 3]);
  expect(result.N).toStrictEqual(undefined);
});
test("The array with -1 in the third 4-tuple should show up: N=[0, 1, 2, 3, 4, 5, 6, 7]", () => {
  result = reduceByRocking(third4Tuple.slice(0, 8));
  expect(result.H).toStrictEqual(undefined);
  expect(result.L).toStrictEqual(undefined);
  expect(result.N).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7]);
});
test("The array with 1 in the first 2-tuple should show up: H=[0, 1], L=[2, 3]", () => {
  result = reduceByRocking(first4Tuple.slice(0, 4));
  expect(result.H).toStrictEqual([0, 1]);
  expect(result.L).toStrictEqual([2, 3]);
  expect(result.N).toStrictEqual(undefined);
});
test("The array with 1 in the second 2-tuple should show up:  H=[2, 3], L=[0, 1]", () => {
  result = reduceByRocking(second4Tuple.slice(2, 6));
  expect(result.H).toStrictEqual([2, 3]);
  expect(result.L).toStrictEqual([0, 1]);
  expect(result.N).toStrictEqual(undefined);
});
test("The array with -1 in the third 2-tuple should show up: N=[0, 1, 2, 3]", () => {
  result = reduceByRocking(third4Tuple.slice(0, 4));
  expect(result.H).toStrictEqual(undefined);
  expect(result.L).toStrictEqual(undefined);
  expect(result.N).toStrictEqual([0, 1, 2, 3]);
});
