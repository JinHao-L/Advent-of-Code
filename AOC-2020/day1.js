// Day 1: Report Repair
// https://adventofcode.com/2020/day/1

const fs = require('fs');
const read = fs.readFileSync("AOC-2020/Day1_input.txt");
const inputArray = read.toString().split("\r\n");

const testArray = [1721, 979, 366, 299, 675, 1456];
const SUM = 2020;

function solvePart1(arr){
  const map = {};
  for(let i = 0; i < arr.length; i++) {
    const value = arr[i];
    if (map[value] === undefined) {
      map[SUM - value] = value;
    } else {
      return value * map[value];
    }
  }
}

console.log("Part1: " + solvePart1(inputArray));

function solvePart2(arr){
  for(let i = 0; i < arr.length - 1; i++) {
    const map = {};
    const sum = SUM - arr[i];

    for(let j = i; j < arr.length; j++) {
      const value = arr[j];
      if (map[value] === undefined) {
        map[sum - value] = value;
      } else {
        return value * map[value] * arr[i];
      }
    }
  }
}

console.log("Part2: " + solvePart2(inputArray));
