// Day 2: Password Philosophy
// https://adventofcode.com/2020/day/2

const fs = require('fs');
const read = fs.readFileSync("AOC-2020/Day2_input.txt");
const lines = read.toString().split("\r\n").map(line => line.split(" "));

const test = [["1-3", "a:", "abcde"],
              ["1-3", "b:", "cdefg"],
              ["2-9", "c:", "ccccccccc"]];

function solvePart1(passwords){
  let numValids = 0;
  for(let i = 0; i < passwords.length; i++) {
    if (passwords[i][0].length == 0) {
      continue;
    }
    // domain
    const domain = passwords[i][0].split("-");
    domain[0] = parseInt(domain[0]);
    domain[1] = parseInt(domain[1]);

    // char
    const char = passwords[i][1][0];

    // solve
    let count = 0;
    const password = passwords[i][2];
    for(let j = 0; j < password.length; j++) {
      if (password[j] == char) {
        count++;
        if (count > domain[1]) {
          break;
        }
      }
    }
    if (count >= domain[0] && count <= domain[1]) {
      numValids++;
    }
  }
  return numValids;
}

console.log("Part1: " + solvePart1(lines));

function solvePart2(passwords){
  let numValids = 0;
  for(let i = 0; i < passwords.length; i++) {
    if (passwords[i][0].length == 0) {
      continue;
    }
    // index
    const index = passwords[i][0].split("-");
    index[0] = parseInt(index[0]) - 1;
    index[1] = parseInt(index[1]) - 1;

    // char
    const char = passwords[i][1][0];

    // solve
    let count = 0;
    const password = passwords[i][2];
    const isInFirstIndex = password[index[0]] == char;
    const isInSecondIndex = password[index[1]] == char;
    if (isInFirstIndex + isInSecondIndex == 1) {
      numValids++;
    }
  }
  return numValids;
}

console.log("Part2: " + solvePart2(lines));
