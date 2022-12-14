# Day 7: No Space Left On Device
# https://adventofcode.com/2022/day/7

class Directory:
  def __init__(self, name):
    self.name = name
    self.size = 0
    self.files = {}
    self.directory = {}

  def updateSize(self):
    self.size = 0
    for i in self.files:
      self.size += self.files[i]

    for i in self.directory:
      self.size += self.directory[i].size
  
  def findDirectory(self):
    dirs = []
    if self.size <= 100000:
      dirs.append(self)
    for d in self.directory:
      dirs += self.directory[d].findDirectory()
    return dirs

  def findSmallestSize(self, targetSize):
    minChildDir = min(self.directory[d].findSmallestSize(targetSize) for d in self.directory) if len(self.directory) else 70000000

    if (self.size < targetSize):
      return minChildDir

    return min(self.size, minChildDir)

def mapDirectory(curr, commands):
  if (len(commands) == 0):
    return

  cmd = commands[0]
  if (cmd.startswith('cd')):
    name = cmd.split(" ", 2)[1]
    curr = curr.parent if name == '..' else curr.directory[name]
  else:
    for item in cmd.split("\n")[1:]:
      a, b = item.split(" ")
      if (a == 'dir'):
        curr.directory[b] = Directory(b)
        curr.directory[b].parent = curr
      else:
        curr.files[b] = int(a)
  mapDirectory(curr, commands[1:])
  curr.updateSize()
  return

with open("AOC-2022/Day7/input.txt") as f:
  commands = f.read().split("\n$ ")[1:]

  root = Directory('root')
  mapDirectory(root, commands)

  # Part 1
  print("Part 1:", sum(d.size for d in root.findDirectory()))

  # Part 2
  print("Part 2:", root.findSmallestSize(30000000 - 70000000 + root.size))
