// Day 13: Shuttle Search
// https://adventofcode.com/2020/day/13

const data = "1000495\n19,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,521,x,x,x,x,x,x,x,23,x,x,x,x,x,x,x,x,17,x,x,x,x,x,x,x,x,x,x,x,29,x,523,x,x,x,x,x,37,x,x,x,x,x,x,13";
const inputs = data.toString().trim().split("\n");

const curr_time = parseInt(inputs[0]);
const buses = inputs[1].split(",").filter(bus => bus !== 'x').map(bus => parseInt(bus));

let nearestBus = 0;
let minWaitTime = 999999999;
buses.forEach((bus) => {
    if (minWaitTime > bus - curr_time % bus) {
        minWaitTime = bus - curr_time % bus;
        nearestBus = bus;
    }
});

console.log("Part 1: " + (nearestBus * minWaitTime));

const buses2 = inputs[1].split(",").map(bus => bus !== 'x' ? parseInt(bus) : bus);

let timestamp = 0;
let product = 1;

buses2.forEach((bus, d) => {
    if (bus !== 'x') {
        while((timestamp + d) % bus != 0) {
            timestamp += product;
        }
        product *= bus;
        console.log(timestamp);
    }
});

console.log("Part2: " + timestamp);
