// Day 11: Seating System
// https://adventofcode.com/2020/day/11

const fs = require('fs');
const read = fs.readFileSync("AOC-2020/Day11_input.txt");
const layout = read.toString().trim().split("\r\n")
                .map(row => row.split(""));

function simulateOnce(map) {
    const prev = map.map(inner => inner.slice());
    let updated = false;

    for(let i = 0; i < map.length; i++) {
        for(let j = 0; j < map[i].length; j++) {
            if (prev[i][j] == ".") {
                continue;
            }

            let count = countOccupied(prev, i, j);
            if (count == 0 && prev[i][j] == "L") {
                map[i][j] = "#";
                updated = true;
            } else if (count >= 5 && prev[i][j] == "#") {
                map[i][j] = "L";
                updated = true;
            }
        }
    }
    return updated;
}

function countOccupied(map, r, c) {
    let count = 0;
    let multiplier = 1;
    const direction = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

    for(let i = 0; i < 8; i++) {
        const newR = r + direction[i][0] * multiplier;
        const newC = c + direction[i][1] * multiplier;

        if (newR >= 0 && newR < map.length && newC >= 0 && newC < map[0].length) {
            if (map[newR][newC] == '.') {
                i--;
                multiplier++;
                continue;
            } else if (map[newR][newC] == '#') {
                count++;
            }
        }
        multiplier = 1;
    }
    return count;
}


function run(seats) {
    while (simulateOnce(seats)) {}

    return seats.map((row) => row.filter(x => x === '#').length).reduce((acc, curr) => acc + curr);
}

console.log("Part2: " + run(layout));
