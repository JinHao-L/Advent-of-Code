# Day 3: Rucksack Reorganization
# https://adventofcode.com/2022/day/3

def getPriority(item):
  priority = ord(item)
  return priority - ord('a') + 1 if priority > ord('Z') else priority - ord('A') + 27

with open("AOC-2022/Day3/input.txt") as f:
  raw_input = f.read()
  rucksacks = [line for line in raw_input.split("\n")]

  # Part 1
  print("Part 1:", sum(sum(getPriority(x) for x in set(line[:len(line) // 2]).intersection(set(line[len(line) // 2:]))) for line in rucksacks))

  # Part 2
  print("Part 2:", sum(sum(getPriority(x) for x in set(rucksacks[i]).intersection(set(rucksacks[i + 1])).intersection(set(rucksacks[i + 2]))) for i in range(0, len(rucksacks), 3)))
