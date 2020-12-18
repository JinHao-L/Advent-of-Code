// Day 18: Operation Order
// https://adventofcode.com/2020/day/18


const fs = require('fs');
const read = fs.readFileSync("AOC-2020/Day18_input.txt");
const expressions = read.toString().trim().split("\r\n");

const test1 = "2 * 3 + (4 * 5)";
const test2 = "5 + (8 * 3 + 9 + 3 * 4 * 3)"
const test3 = "5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))"
const test4 = "((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2"

// Part 1
function calculate(bae) {
    if (!isNaN(bae)) {
        return parseInt(bae);
    }

    bae = bae.trim();
    let i = bae.length - 2;
    let right;
    if (bae.endsWith(")")) {
        let stackCount = 1;
        while(stackCount > 0 && i >= 0) {
            if (bae.charAt(i) == ")") {
                stackCount++; ;
            } else if (bae.charAt(i) == "(") {
                stackCount--;
            }
            i--;
        }
        // remove outer brackets
        right = bae.substring(i + 2, bae.length - 1);
    } else {
        right = bae.substring(i + 1);
    }

    const opr = bae.substring(i - 2, i).trim();
    const left = bae.substring(0, i - 2);
    // console.log("[", left, "]", opr, "[", right, "]");
    switch (opr) {
        case "+":
            return calculate(left) + calculate(right);
        case "*":
            return calculate(left) * calculate(right);
        case "":
            return calculate(right);
        default:
            break;
    }
    return undefined;
}

// console.log(calculate(test1));
// console.log(calculate(test2));
// console.log(calculate(test3));
// console.log(calculate(test4));

const sum = expressions.reduce((acc, curr) => acc + calculate(curr), 0);
console.log("Part 1:", sum);

// Part 2
// add brackets for each + operation
function addBrackets(bae, start) {
    if (!bae.includes(" + ", start)) {
        return bae;
    }

    start = bae.indexOf(" + ", start);
    let left = start - 1;
    if (bae.charAt(left) == ")") {
        left--;
        let stackCount = -1;
        while(stackCount != 0 && left >= 0) {
            if (bae.charAt(left) == ")") {
                stackCount--; ;
            } else if (bae.charAt(left) == "(") {
                stackCount++;
            }
            left--;
        }
        left++;
    }

    let right = start + 3;
    if (bae.charAt(right) == "(") {
        right++;
        let stackCount = 1;
        while(stackCount != 0 && right < bae.length) {
            if (bae.charAt(right) == ")") {
                stackCount--; ;
            } else if (bae.charAt(right) == "(") {
                stackCount++;
            }
            right++;
        }
    } else {
        right++;
    }

    const newBae = bae.substring(0, left) + "(" + bae.substring(left, right) + ")" + bae.substring(right);
    return addBrackets(newBae, start + 3);
}

// console.log(calculate(addBrackets(test1)));
// console.log(calculate(addBrackets(test2)));
// console.log(calculate(addBrackets(test3)));
// console.log(calculate(addBrackets(test4)));

const newSum = expressions.reduce((acc, curr) => acc + calculate(addBrackets(curr)), 0);
console.log("Part 2:", newSum);