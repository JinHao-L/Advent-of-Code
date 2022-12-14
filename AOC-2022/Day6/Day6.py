# Day 6: Tuning Trouble
# https://adventofcode.com/2022/day/6

def solve(seq, sz):
  for i in range(sz, len(seq)):
    if (len(set(seq[i-sz:i])) == sz):
      return i
  return -1

with open("AOC-2022/Day6/input.txt") as f:
  seq = f.read()

  # Part 1
  print("Part 1:", solve(seq, 4))

  # # Part 2
  print("Part 2:", solve(seq, 14))
