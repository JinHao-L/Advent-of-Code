// Day 10: Adapter Array
// https://adventofcode.com/2020/day/10

const fs = require('fs');
const read = fs.readFileSync("AOC-2020/Day10_input.txt");
const inputs = read.toString().trim().split("\r\n")
                .map(number => parseInt(number))
                .sort((a, b) => a - b);
inputs.unshift(0);

function stringifyPath(adapters) {
    let output = "";
    for(let i = 1; i < adapters.length; i++) {
        output += (adapters[i] - adapters[i - 1]);
    }
    return output + "3";
}

function part1(longestPath) {
    const numOfOnes = longestPath.split("1").length - 1;
    const numOfThrees = longestPath.split("3").length - 1;
    return numOfOnes * numOfThrees;
}

function part2(longestPath) {
    const arr = longestPath.split(/3+/);
    let nVariations = 1;
    for (let i = 0; i < arr.length; i++) {
        nVariations *= countVariations(arr[i].length);
    }
    return nVariations;
}

const mem = [];
function countVariations(nOnes) {
    if (nOnes == 0) {
        return 1;
    } else if (nOnes < 0) {
        return 0;
    } else if (mem[nOnes] != undefined) {
        return mem[nOnes];
    } else {
        const val = countVariations(nOnes - 1) + countVariations(nOnes - 2) + countVariations(nOnes - 3);
        mem[nOnes] = val;
        return val;
    }
}

const longestPath = stringifyPath(inputs);
console.log(longestPath);
console.log("Part1: " + part1(longestPath));
console.log("Part2: " + part2(longestPath));
