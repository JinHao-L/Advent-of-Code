# Day 6: Custom Customs
# https://adventofcode.com/2020/day/6

f = open("AOC-2020/Day6_input.txt", "r")
groups = f.read().rstrip().split("\n\n")

sum = 0
for group in groups :
    answered = set()
    for c in group.replace('\n', '') :
        if c not in answered :
            answered.add(c)
            sum = sum + 1

print("Part 1: " + str(sum))

sum = 0
for group in groups :
    group = group.split('\n')
    base = group[0]
    for c in base :
        allAnswered = True;
        for i in range(1, len(group)) :
            allAnswered = allAnswered and c in group[i]
        sum = sum + int(allAnswered)

print("Part 2: " + str(sum))
