// Day 6: Universal Orbit Map (Relations)
// https://adventofcode.com/2019/day/6

const fs = require('fs');
const read = fs.readFileSync("AOC-2019/Day6.txt");
const input = read.toString().split("\r\n");
const input1 = "COM)BA, BA)CA, CA)DA, DA)EA, EA)FA, BA)GA, GA)HA, DA)IA, EA)JA, JA)KA, KA)LA, KA)YOU, IA)SAN".split(', ');

const data = input;

const centres = [];
const orbitted = [];

for(let i = 0; i < data.length; i++) {
    const [obj, orbiter] = data[i].split(")");
    if (centres[obj] == undefined) {
        centres[obj] = [orbiter];
    } else {
        centres[obj].push(orbiter);
    }
}

function copy(arr) {
    var copy = [];
    for(let i = 0; i<arr.length; i++) {
        copy[i] = arr[i];
    }
    return copy;
}

let count = 0;
var finalYOU, finalSAN;
function countOrbits(obj, yourlevels, santalevels) {
    yourlevels = copy(yourlevels);
    santalevels = copy(santalevels);
    yourlevels.push(obj);
    santalevels.push(obj);
    orbitted.push(obj);
    if(centres[obj] != undefined) {
        count += centres[obj].length*orbitted.length;
        for (let i = 0; i < centres[obj].length; i++) {
            if (centres[obj][i] == 'YOU') {
                finalYOU = yourlevels;
                console.log('\n');
                console.log('YOU : ' + yourlevels);
            } else if (centres[obj][i] == 'SAN') {
                finalSAN = santalevels;
                console.log('\n');
                console.log('SAN : ' + santalevels);
            }
            countOrbits(centres[obj][i], yourlevels, santalevels);
        }
    }
    orbitted.pop(obj);
    return count;
}

function compare(arr1, arr2) {
    for(let i = 0; i < Math.min(arr1.length, arr2.length); i++) {
        if(arr1[i] == arr2[i]) {
        } else {
            return arr1.length - i + arr2.length - i;
        }
    }
    return Math.abs(arr1.length - arr2.length);
}

var ret = countOrbits('COM', [], []);
console.log('\n');
console.log("Part1: " + ret);
console.log("Part2: " + compare(finalYOU, finalSAN));
