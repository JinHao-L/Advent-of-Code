// Day 3: Toboggan Trajectory
// https://adventofcode.com/2020/day/3

const fs = require('fs');
const read = fs.readFileSync("AOC-2020/Day3_input.txt");
const map = read.toString().split("\r\n").map(line => line.split(""));

const testInput = "..##.......\n" +
                  "#...#...#..\n" +
                  ".#....#..#.\n" +
                  "..#.#...#.#\n" +
                  ".#...##..#.\n" +
                  "..#.##.....\n" +
                  ".#.#.#....#\n" +
                  ".#........#\n" +
                  "#.##...#...\n" +
                  "#...##....#\n" +
                  ".#..#...#.#\n"
const testMap = testInput.split("\n").map(line => line.split(""));

function travel(map, slope) {
  let count = 0;
  let c = slope[0];
  for(let r = slope[1]; r < map.length; r+=slope[1], c+=slope[0]) {
    c = c % map[0].length;
    if (map[r][c] == '#') {
      count++;
    }
  }
  return count;
}

console.log("Part1: " + travel(map, [3, 1]));

function travelMultiple(map, slopes){
  let result = 1;
  for (let i = 0; i < slopes.length; i++) {
    result *= travel(map, slopes[i]);
  }
  return result;
}

const slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];

console.log("Part2: " + travelMultiple(map, slopes));
