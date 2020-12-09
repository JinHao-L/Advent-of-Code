// Day 9: Encoding Error
// https://adventofcode.com/2020/day/9

const fs = require('fs');
const read = fs.readFileSync("AOC-2020/Day9_input.txt");
const cypher = read.toString().trim().split("\r\n").map(number => parseInt(number));

const length = 25;

function findInvalidValue(cypher) {
  const combinations = []

  for(let i = 0; i < length; i++) {
    const temp = [];
    for(let j = i + 1; j < length; j++) {
      temp.push(cypher[i] + cypher[j]);
    }
    combinations.push(temp);
  }

  for(let i = length; i < cypher.length; i++) {
    console.log(cypher[i]);
    console.log(combinations);
    let found = false;

    for(let j = 1; j < length; j++) {
      found = found || combinations[j].includes(cypher[i]);
      combinations[length - j].push(cypher[i] + cypher[i - j]);
    }
    const prev = combinations.shift()
    found = found || prev.includes(cypher[i]);
    combinations.push([]);

    if (!found) {
      return cypher[i];
    }
  }

  return undefined;
}

const invalidValue = findInvalidValue(cypher);
console.log("Part1: " + invalidValue);

function findWeakness(cypher, searchVal) {
  const searchWindow = []
  let sum = 0;

  for(let i = 0; i < cypher.length; i++) {
    while (sum > searchVal) {
      sum -= searchWindow.shift();
    }

    if (sum == searchVal) {
      console.log(searchWindow);
      return Math.min(...searchWindow) + Math.max(...searchWindow);
    }

    searchWindow.push(cypher[i]);
    sum += cypher[i];
  }
}

console.log("Part2: " + findWeakness(cypher, invalidValue));
