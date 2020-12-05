// Day 4: Passport Processing
// https://adventofcode.com/2020/day/4

const fs = require('fs');
const read = fs.readFileSync("AOC-2020/Day4_input.txt");
const inputs = read.toString().split("\r\n\r\n");

const fields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

function checkValidPart1(passport) {
  for (let j = 0; j < fields.length; j++) {
    if (!passport.includes(fields[j] + ":")) {
      return false;
    }
  }
  return true;
}

let patterns = [/byr:(19[2-8][0-9]|199[0-9]|20[01][0-9]|2020)\s/,
                  /iyr:(201[0-9]|2020)\s/,
                  /eyr:(202[0-9]|2030)\s/,
                  /hgt:((1[5-8][0-9]|19[0-3])cm|(59|6[0-9]|7[0-6])in)\s/,
                  /hcl:#[a-f0-9]{6}\s/,
                  /ecl:(amb|blu|brn|gry|grn|hzl|oth)\s/,
                  /pid:[0-9]{9}\s/];

function checkValidPart2(passport) {
  for (let i = 0; i < patterns.length; i++) {
    if (!patterns[i].test(passport + " ")) {
      // console.log(i + " " + passport + "\n");
      return false;
    }
  }
  return true;
}

function checkNumOfValid(passports, type) {
  let valids = 0;

  for (let i = 0; i < passports.length; i++) {
    if ((type == 1 && checkValidPart1(passports[i])) ||
        (type == 2 && checkValidPart2(passports[i]))) {
      valids++;
    }
  }
  return valids;
}

console.log("Part1: " + checkNumOfValid(inputs, 1));
console.log("Part2: " + checkNumOfValid(inputs, 2));
