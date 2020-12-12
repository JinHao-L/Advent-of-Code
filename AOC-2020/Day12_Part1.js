// Day 12: Rain Risk
// https://adventofcode.com/2020/day/12

const fs = require('fs');
const read = fs.readFileSync("AOC-2020/Day12_input.txt");
const inputs = read.toString().trim().split("\r\n");

// Start by facing east
var angle = 90;
var north = 0;
var east = 0;

function move(commandString) {
    const type = commandString.substr(0, 1);
    const dist = parseInt(commandString.substr(1));

    switch (type) {
        case "N":
            north += dist;
            break;
        case "S":
            north -= dist;
            break;
        case "E":
            east += dist;
            break;
        case "W":
            east -= dist;
            break;
        case "L":
            angle -= dist;
            break;
        case "R":
            angle += dist;
            break;
        case "F":
            let temp = (angle % 360 + 360) % 360;
            const c_north = dist * Math.round(Math.cos(temp * Math.PI / 180));
            const c_east = dist * Math.round(Math.sin(temp * Math.PI / 180));
            north += c_north;
            east += c_east;
            break;
        default:
            console.log("ERROR", commandString);
    }
}

inputs.forEach((command, i) => move(command));
console.log(north, east);
console.log("Part 1 - Manhattan distance: " + (Math.abs(north) + Math.abs(east)))
