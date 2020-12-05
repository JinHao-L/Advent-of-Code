// Day 5: Binary Boarding
// https://adventofcode.com/2020/day/5

// learning the c++ language

#include <iostream> // for cout and cin
#include <fstream> // for read and write file
#include <string>
#include <cmath>
using namespace std;

void partition(char direction, int pos[]) {
  if (direction == 'F') {
    // row - lower half
    pos[1] = (pos[0] + pos[1]) / 2;
  } else if (direction == 'B') {
    // row - upper half
    pos[0] = round((pos[0] + pos[1]) / 2.0);
  } else if (direction == 'L') {
    // col - lower half
    pos[3] = (pos[2] + pos[3]) / 2;
  } else {
    // col - upper half
    pos[2] = round((pos[2] + pos[3]) / 2.0);
  }
  return;
}

int getID(string location) {
  int pos[4] = { 0, 127, 0, 7 };
  for (string::size_type i = 0; i < location.size(); i++) {
    partition(location[i], pos);
  }
  return pos[0] * 8 + pos[2];
}

int main() {
  ifstream inputFile ("Day5_input.txt");
  string location;

  int maxId = 0;

  int seats[1024] = { 0 };

  if (inputFile.is_open()) {
    while (getline(inputFile, location)) {
      int id = getID(location);
      seats[id] = 1;
      maxId = max(maxId, id);
    }
    inputFile.close();
  } else {
    cout << "Unable to open inputFile";
  }

  cout << "Part 1: " << maxId << "\n";

  for (int i = 1; i < 1023; i++) {
    if (seats[i] == 0 && seats[i - 1] == 1 && seats[i + 1] == 1) {
      cout << "Part 2: " << i << "\n";
    }
  }

  return 1;
}
