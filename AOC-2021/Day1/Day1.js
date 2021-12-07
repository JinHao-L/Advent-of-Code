// Day 1: Sonar Sweep
// https://adventofcode.com/2021/day/1

const fs = require("fs");
const file = fs.readFileSync("AOC-2021/Day1/input.txt");
const inputArray = file.toString().split("\n").map((val) => parseInt(val));

const testArray = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

function solvePart1(arr) {
  let count = 0;
  for(let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) count++;
  }
  return count;
}

console.log("Part 1: " + solvePart1(inputArray));

function solvePart2(arr) {
  let prevSum = 0;
  for(let i = 0; i < 3; i++) {
    prevSum += arr[i];
  }

  let count = 0;
  for(let i = 3; i < arr.length; i++) {
    const newSum = prevSum + arr[i] - arr[i - 3];
    if (newSum > prevSum) count++;
    prevSum = newSum;
  }
  return count;
}

console.log("Part 2: " + solvePart2(inputArray));
