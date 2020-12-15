// Day 14: Docking Data
// https://adventofcode.com/2020/day/14

const fs = require('fs');
const read = fs.readFileSync("AOC-2020/Day14_input.txt");
const inputs = read.toString().trim().split("\r\n");

let currentMask = "";
let mem = {};

inputs.forEach((command) => {
    if (command.startsWith("mask = ")) {
        currentMask = command.slice(7);
    } else {
        let memIdx = parseInt(command.slice(command.indexOf("[") + 1 , command.indexOf("]")));
        let values = parseInt(command.slice(command.indexOf("= ") + 2));
        mem[memIdx] = maskValue(currentMask, values);
    }
});

function maskValue(mask, value) {
    let changeAmt = 0;
    let temp = value;

    let multiple = 1;
    for(let i = 0; i < 36; i++) {
        const amt = Math.floor(temp % 2);
        temp = temp / 2;
        if (mask[35 - i] == '0' && amt == 1) {
            changeAmt -= multiple;
        } else if (mask[35 - i] == '1' && amt == 0) {
            changeAmt += multiple;
        }
        multiple = multiple * 2;
    }

    return value + changeAmt;
}

function sumMem(mem) {
    return Object.values(mem).reduce((a,b) => a + b, 0)
}

console.log("Part 1: " + sumMem(mem));
