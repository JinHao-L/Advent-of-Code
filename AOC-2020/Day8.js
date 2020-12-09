// Day 8: Handheld Halting
// https://adventofcode.com/2020/day/8

const fs = require('fs');
const read = fs.readFileSync("AOC-2020/Day8_input.txt");
const inputs = read.toString().trim().split("\r\n");

// prep parameters and call correct function
function run(instructions, part) {
  let freq = [];
  freq.length = instructions.length;
  freq.fill(0);

  if (part == 1) {
    return runStopLoop(instructions, freq);
  } else if (part == 2) {
    return runFixLoop(instructions, freq, 0, 0, false);
  }
}

// part1
function runStopLoop(instructions, freq) {
  let count = 0;

  for (let i = 0; i < instructions.length && freq[i] == 0; i++) {
    freq[i]++;

    const instruction = instructions[i].split(" ");
    const operation = value => value + parseInt(instruction[1]);

    switch(instruction[0]) {
      case "acc":
        count = operation(count);
        break;
      case "jmp":
        i = operation(i) - 1;
        break;
      default:
        // skip
    }
  }
  return count;
}

// part2
function runFixLoop(instructions, freq, pointer, count, modified) {
  if (pointer == instructions.length) {
    return count;
  }
  if (freq[pointer] > 0) {
    return undefined;
  }

  freq[pointer]++;
  const instruction = instructions[pointer].split(" ");
  const operation = value => value + parseInt(instruction[1]);

  switch(instruction[0]) {
    case "acc":
      count = operation(count);
      break;

    case "jmp":
      if (!modified) {
        const newInstructions1 = [...instructions];
        newInstructions1[pointer] = newInstructions1[pointer].replace("jmp", "nop");
        const value1 = runFixLoop(newInstructions1, [...freq], pointer + 1, count, true);
        if (value1 != undefined) {
          return value1;
        }
      }

      pointer = operation(pointer) - 1;
      break;

    case "nop":
      if (!modified) {
        const newInstructions2 = [...instructions];
        newInstructions2[pointer] = newInstructions2[pointer].replace("nop", "jmp");
        const value2 = runFixLoop(newInstructions2, [...freq], operation(pointer), count, true);
        if (value2 != undefined) {
          return value2;
        }
      }
      break;

    default:
      // skip
  }
  return runFixLoop(instructions, freq, pointer + 1, count, modified);
}

console.log("Part1: " + run(inputs, 1));
console.log("Part2: " + run(inputs, 2));
