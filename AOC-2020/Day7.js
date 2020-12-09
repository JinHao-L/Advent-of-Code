// Day 7: Handy Haversacks
// https://adventofcode.com/2020/day/7

const fs = require('fs');
const read = fs.readFileSync("AOC-2020/Day7_input.txt");
const inputs = read.toString().trim().split("\r\n");

// parse input
let bagMap = new Map();

for(let i = 0; i < inputs.length; i++) {
  const temp = inputs[i].slice(0, -1).split(" contain ");

  if (temp[1] == "no other bags") {
    bagMap.set(temp[0], new Map());
    continue;
  }

  const contains = temp[1].split(", ");
  let submap = new Map();

  for(let j = 0; j < contains.length; j++) {
    const input = contains[j];
    const bag = input.substring(input.indexOf(' ') + 1).replace("bags", "bag");
    const amt = parseInt(input.substring(0, input.indexOf(' ')));
    submap.set(bag, amt);
  }
  bagMap.set(temp[0].slice(0, -1), submap);
}

function countContainingBags(query, bagMap) {
  let count = 0;
  for (const [bag, submap] of bagMap.entries()) {
    for (const [containedBag, amount] of submap.entries()) {
      if (containedBag == query) {
        count++;
        bagMap.delete(bag);
        count += countContainingBags(bag, bagMap);
      }
    }
  }
  return count;
}

function countContainedBags(query, bagMap) {
  let count = 1;
  for (const [bag, submap] of bagMap.entries()) {
    if (bag == query) {
      for (const [containedBag, amount] of submap.entries()) {
        count += amount * countContainedBags(containedBag, bagMap);
      }
      break;
    }
  }
  return count;
}

console.log("Part1: " + countContainingBags("shiny gold bag", new Map(bagMap)));
console.log("Part2: " + (countContainedBags("shiny gold bag", new Map(bagMap)) - 1));
