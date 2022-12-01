import java.io.File;
import java.io.FileNotFoundException;
import java.util.*;

// Day 5: Hydrothermal Venture
// https://adventofcode.com/2021/day/5

class Day5 {
  public static void main(String[] args) {

    try {
      File f = new File("AOC-2021/Day5/input.txt");
      Scanner myReader = new Scanner(f);
      List<int[]> lines = new ArrayList<>();

      while(myReader.hasNextLine()) {
        lines.add(Arrays.stream(myReader.nextLine().split(",| -> ")).mapToInt(Integer::parseInt).toArray());
      }
      System.out.println(solve(lines));

      myReader.close();
    } catch (FileNotFoundException e) {
      System.out.println("An error occurred.");
      e.printStackTrace();
    }
  }

  private static int solve(List<int[]> lines) {
    Map<Integer, Map<Integer, Integer>> ocean = new HashMap<>();
    int overlaps = 0;

    for(int[] num : lines) {
      if (num[0] == num[2]) {
        int start = Math.min(num[1], num[3]);
        int end = Math.max(num[1], num[3]);
        for(int i = start; i <= end; i++) {
          ocean.putIfAbsent(num[0], new HashMap<Integer, Integer>());
          int count = ocean.get(num[0]).merge(i, 1, Integer::sum);
          if (count == 2) overlaps++;
        }
      } else if (num[1] == num[3]) {
        int start = Math.min(num[0], num[2]);
        int end = Math.max(num[0], num[2]);
        for(int i = start; i <= end; i++) {
          ocean.putIfAbsent(i, new HashMap<Integer, Integer>());
          int count = ocean.get(i).merge(num[1], 1, Integer::sum);
          if (count == 2) overlaps++;
        }
      } else {
        int i = num[0], j = num[1];
        boolean ended = false;
        for(; !ended; i += num[0] < num[2] ? 1 : -1) {
          ocean.putIfAbsent(i, new HashMap<Integer, Integer>());
          int count = ocean.get(i).merge(j, 1, Integer::sum);
          if (count == 2) overlaps++;

          ended = i == num[2] && j == num[3];
          j += num[1] < num[3] ? 1 : -1;
        }
      }
    }

    return overlaps;
  }
}