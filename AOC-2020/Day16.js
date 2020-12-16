// Day 16: Ticket Translation
// https://adventofcode.com/2020/day/16

const fs = require('fs');
const read = fs.readFileSync("AOC-2020/Day16_input.txt");
const inputs = read.toString().trim().split("\r\n\r\n");

const constraint = inputs[0].split("\n").map(rule => {
    const m = rule.match(/([\w ]+): (\d+)-(\d+) or (\d+)-(\d+)/);
    const fn = val => (val >= parseInt(m[2]) && val <= parseInt(m[3]))
                        || (val >= parseInt(m[4]) && val <= parseInt(m[5]));
    return {field: m[1], check: fn};
})
const my_ticket = inputs[1].split("\n")[1].split(",").map(val => parseInt(val));

let error_rate = 0;
const nearby_tickets = inputs[2].split("\n").slice(1)
    .map(ticket => ticket.split(",").map(val => parseInt(val)))
    .filter(ticket => ticket.every(v => {
        const valid = constraint.some(c => c["check"](v));
        if (!valid) {
            error_rate += v;
        }
        return valid;
    }));

console.log("Part 1: " + error_rate);

const baseSet = new Set();
for (const c of constraint) {
    baseSet.add(c["field"]);
}

const considerations = new Array(constraint.length).fill()
    .map((placeholder, idx) => [idx, new Set(baseSet)]);

nearby_tickets.forEach((ticket, i) => {
    ticket.forEach((value, idx) => {
        for (const c of constraint) {
            if (considerations[idx][1].has(c["field"]) && !c["check"](value)) {
                considerations[idx][1].delete(c["field"]);
            }
        }
    });
});

const finalised_fields = [];
considerations.sort((s1, s2) => s1[1].size - s2[1].size)
    .forEach((item, i) => {
        const idx = item[0];
        const field = item[1].values().next().value;
        finalised_fields[idx] = field;

        // clean up
        for(let n = i + 1; n < considerations.length; n++) {
            considerations[n][1].delete(field);
        }
    });
// console.log(finalised_fields);
// console.log(my_ticket);
const depature_multiply = finalised_fields.reduce((acc, field, idx) => {
    if (field.startsWith("departure")) {
        console.log(field, my_ticket[idx]);
        acc = acc * my_ticket[idx];
    }
    return acc;
}, 1)

console.log("Part 2: " + depature_multiply);
