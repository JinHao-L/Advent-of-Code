# Day 2: Rock Paper Scissors
# https://adventofcode.com/2022/day/2

def solvePart1(oppMove, yourMove):
  opp = ord(oppMove) - ord('A') + 1
  you = ord(yourMove) - ord('X') + 1
  if opp == you :
    return you + 3
  if you < opp:
    you += 3
  return you + (6 if you - opp == 1 else 0)

def solvePart2(oppMove, outcome):
  opp = ord(oppMove) - ord('A')
  if (outcome == 'X'):
    return 0 + (opp + 2) % 3 + 1
  elif (outcome == 'Y'):
    return 3 + opp + 1
  else:
    return 6 + (opp + 1) % 3 + 1

with open("AOC-2022/Day2/input.txt") as f:
  raw_input = f.read()
  rounds = [line.split(" ") for line in raw_input.split("\n")]

  # Part 1
  print("Part 1:", sum(solvePart1(opp, you) for opp, you in rounds))

  # Part 2
  print("Part 2:", sum(solvePart2(opp, outcome) for opp, outcome in rounds))
