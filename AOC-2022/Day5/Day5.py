# Day 5: Supply Stacks
# https://adventofcode.com/2022/day/5

def getInput():
  with open("AOC-2022/Day5/input.txt") as f:
    seg1, seg2 = f.read().split("\n\n")
    
    seg1 = seg1.split('\n')[:-1][::-1]
    sz = (len(seg1[0]) + 1) // 4
    stacks = [[] for i in range(0, sz)]
    for row in seg1:
      for i in range(0, sz):
        if (row[i * 4 + 1] != ' ') :
          stacks[i].append(row[i * 4 + 1])

    moves = [[int(x) for x in line.split(" ")[1::2]] for line in seg2.split("\n")]
    return stacks, moves

stacks, moves = getInput()

# Part 1
for num, fr, to in moves:
  amt = min(len(stacks[fr - 1]), num)
  stacks[to - 1] += stacks[fr - 1][(-1 * amt):][::-1]
  stacks[fr - 1] = stacks[fr - 1][:(-1 * amt)]
print("Part 1:", "".join(ls[-1] for ls in stacks))

stacks, moves = getInput()
# Part 2
for num, fr, to in moves:
  amt = min(len(stacks[fr - 1]), num)
  stacks[to - 1] += stacks[fr - 1][(-1 * amt):]
  stacks[fr - 1] = stacks[fr - 1][:(-1 * amt)]
print("Part 2:", "".join(ls[-1] for ls in stacks))
