// Day 19: Monster Messages
// https://adventofcode.com/2020/day/19


const fs = require('fs');
const read = fs.readFileSync("AOC-2020/Day19_input.txt");
const inputs = read.toString().trim().split("\r\n\r\n");

const rules = [];

inputs[0].split("\r\n").forEach(x => {
    const arr = x.split(": ");
    rules[parseInt(arr[0])] = {
        val: arr[1], 
        reg: null
    };
})

const messages = inputs[1].split("\r\n");

function buildRegex(idx) {
    if (rules[idx].reg != null) {
        return rules[idx].reg;
    }

    const rule = rules[idx].val;
    if (rule.match(/"[a-zA-Z]"/)) {
        return rule.slice(1, -1);
    }
    const options = rule.split(" | ").map(r => {
        const x = r.split(" ");
        return x.reduce((acc, curr) => acc + buildRegex(parseInt(curr)), "");
    });

    const reg = "(" + options.reduce((acc, curr) => acc + "|" + curr) + ")";
    rules[idx].reg = reg;
    return reg;
}

const reg = new RegExp('^' + buildRegex(0) + '$', 'g');
console.log("Part 1: " + messages.filter(m => m.match(reg)).length)

// Part 2
const modifiedReg = new RegExp('^(?<r42>(' + rules[42].reg + ")+)(?<r31>("+ rules[31].reg + ')+)$');
const reg42 = new RegExp(rules[42].reg, 'g');
const reg31 = new RegExp(rules[31].reg, 'g');
console.log("Part 2: " + messages
                    .filter(m => {
                        const matches = modifiedReg.exec(m);
                        if (matches) {
                            const count42 = matches.groups.r42.match(reg42).length;
                            const count31 = matches.groups.r31.match(reg31).length;
                            return count42 > count31;
                        }
                        return false;
                    })
                    .length);
