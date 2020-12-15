// Day 15: Rambunctious Recitation
// https://adventofcode.com/2020/day/15

const data = "15,5,1,4,7,0";
const inputs = data.toString().trim().split(",")

function solve(n) {
    const len = inputs.length;

    let prev = 0;
    const mem = new Array(n);

    inputs.forEach((item, i) => {
        mem[item] = i + 1;
        prev = item;
    });

    for(let i = inputs.length; i < n; i++) {
        const next = mem[prev] === undefined ? 0 : i - mem[prev];
        mem[prev] = i;
        prev = next;
    }
    return prev;
}

console.log("Part1: " + solve(2020));
console.log("Part2: " + solve(30000000));
