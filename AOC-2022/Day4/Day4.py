# Day 4: Camp Cleanup
# https://adventofcode.com/2022/day/4
import re

with open("AOC-2022/Day4/input.txt") as f:
  raw_input = f.read()
  ranges = [[int(x) for x in re.split("[-,]", line)] for line in raw_input.split("\n")]

  # Part 1
  print("Part 1:", sum((a <= x and b >= y) or (a >= x and b <= y) for a, b, x, y in ranges))

  # # Part 2
  print("Part 2:", sum(not (b < x or y < a) for a, b, x, y in ranges))
