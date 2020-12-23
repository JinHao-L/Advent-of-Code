// Day 23: Crab Cups
// https://adventofcode.com/2020/day/23

const test_input = "389125467";
const puzzle_input = "398254716";

const cups = puzzle_input.split("").map(x => parseInt(x));
const next = [];

function preProcessing(next) {
    for(let i = 0; i < cups.length - 1; i++) {
        next[cups[i]] = cups[i + 1];
    }
    next[cups[cups.length - 1]] = cups[0];
}

function move(next, current) {
    const next3 = next[current];
    const next2 = next[next3];
    const next1 = next[next2];
    next[current] = next[next1];

    let destination = current - 1 < 1 ? next.length - 1 : current - 1;
    while (destination == next3 || destination == next2 || destination == next1) {
        destination = destination - 1 < 1 ? next.length - 1 : destination - 1
    }

    next[next1] = next[destination];
    next[destination] = next3;
    return next[current];
}

function getLabels(next) {
    let current = next[1];
    let labels = [];
    while (current != 1) {
        labels.push(current);
        current = next[current];
    }
    return labels;
}

preProcessing(next);
let curr = cups[0];
for(let i = 0; i < 100; i++) {
    curr = move(next, curr);
}


console.log("Part 1:", getLabels(next).join(""));

// Part 2

// setup linked list
for(let i = 1; i <= 1000000; i++) {
    next[i] = i + 1;
}
next[1000000] = cups[0];

// use the input data
for(let i = 0; i < cups.length - 1; i++) {
    next[cups[i]] = cups[i + 1];
}
next[cups[cups.length - 1]] = cups.length + 1;

// run 10m moves
curr = cups[0];
for(let i = 0; i < 10000000; i++) {
    curr = move(next, curr);
}
console.log("Part 2:", next[1] * next[next[1]]);