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
        const addressArr = maskAddress(currentMask, memIdx);
        addressArr.forEach((address) => {
            mem[address] = values;
        });

    }
});

function maskAddress(mask, value) {
    let changeAmt = 0;
    let temp = value;

    let variations = [];
    let multiple = 1;
    for(let i = 0; i < 36; i++) {
        const amt = Math.floor(temp % 2);
        temp = temp / 2;
        if (mask[35 - i] == '1' && amt == 0) {
            changeAmt += multiple;
        } else if (mask[35 - i] == 'X') {
            if (amt == 1) {
                changeAmt -= multiple;
            }
            variations.push(multiple);
        }
        multiple = multiple * 2;
    }

    const baseValue = value + changeAmt;
    const resultAddress = [];
    getAllMaskedAddress(variations, baseValue, resultAddress);
    return resultAddress;
}

function getAllMaskedAddress(variations, baseValue, result) {
    if (variations.length == 0) {
        return result.push(baseValue);
    }

    variations = variations.slice();
    const val = variations.pop();
    getAllMaskedAddress(variations, baseValue, result);
    getAllMaskedAddress(variations, baseValue + val, result);
}


function sumMem(mem) {
    return Object.values(mem).reduce((a,b) => a + b, 0)
}

console.log(mem);

console.log("Part 2: " + sumMem(mem));
