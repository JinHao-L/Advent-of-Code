// Day 12: Rain Risk
// https://adventofcode.com/2020/day/12

const fs = require('fs');
const read = fs.readFileSync("AOC-2020/Day12_input.txt");
const inputs = read.toString().trim().split("\r\n");

// Start by facing east
var ship = [0, 0];
var waypoint = [10, 1];

function move(commandString) {
    const type = commandString.substr(0, 1);
    const dist = parseInt(commandString.substr(1));

    switch (type) {
        case "N":
            waypoint[1] += dist;
            break;
        case "S":
            waypoint[1] -= dist;
            break;
        case "E":
            waypoint[0] += dist;
            break;
        case "W":
            waypoint[0] -= dist;
            break;
        case "L":
            // (10, 4) -> (-4, 10)
            for(let i = 0; i < dist / 90; i++) {
                let temp = waypoint[0];
                waypoint[0] = waypoint[1] * -1;
                waypoint[1] = temp;
            }
            break;
        case "R":
            // (10, 4) -> (4, -10)
            for(let i = 0; i < dist / 90; i++) {
                let temp = waypoint[0];
                waypoint[0] = waypoint[1];
                waypoint[1] = temp * -1;
            }
            break;
        case "F":
            ship[0] += waypoint[0] * dist;
            ship[1] += waypoint[1] * dist;
            break;
        default:
            console.log("ERROR", commandString);
    }
}

inputs.forEach((command, i) => move(command));
const manhattan_dist = Math.abs(ship[0]) + Math.abs(ship[1]);
console.log("Part 2 - Manhattan distance: " + manhattan_dist);
