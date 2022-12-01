# Day 1: Calorie Counting
# https://adventofcode.com/2022/day/1

with open("AOC-2022/Day1/input.txt") as f:
  raw_input = f.read()
  carries = [sum(int(x) for x in line.strip().split("\n")) for line in raw_input.split("\n\n")]

  # Part 1
  print("Part 1:", max(carries))

  # Part 2
  print("Part 2:", sum(sorted(carries)[-3:]))
