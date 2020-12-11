// Day 10: Adapter Array
// https://adventofcode.com/2020/day/10

const fs = require('fs');
const read = fs.readFileSync("AOC-2020/Day10_input.txt");
const inputs = read.toString().trim().split("\r\n")
                .map(number => parseInt(number))
                .sort((a, b) => a - b);
inputs.unshift(0);

let numOfOnes = 0;
let numOfThrees = 0;

for(let i = 1; i < inputs.length; i++) {
    const diff = inputs[i] - inputs[i - 1];
    if (diff == 1) {
        numOfOnes++;
    } else if (diff == 3) {
        numOfThrees++;
    }
}
console.log("Part1: " + (numOfOnes * (numOfThrees + 1)));

// DP
const table = [];
const maxAdapter = inputs[inputs.length - 1];
table.length = maxAdapter + 1;
table.fill(0);
table[maxAdapter] = 1;
for(let i = inputs.length - 1; i >= 0; i--) {
    const curr = inputs[i];
    const ones = curr < maxAdapter ? table[curr + 1] : 0;
    const twos = curr < maxAdapter - 1 ? table[curr + 2] : 0;
    const threes = curr < maxAdapter - 2 ? table[curr + 3] : 0;
    table[curr] += ones + twos + threes;
}
console.log("Part2: " + table[0]);
