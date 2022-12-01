import java.io.File;
import java.io.FileNotFoundException;
import java.util.*;

// Day 4: Giant Squid
// https://adventofcode.com/2021/day/4

class Day4 {
  public static void main(String[] args) {

    try {
      File f = new File("AOC-2021/Day4/input.txt");
      Scanner myReader = new Scanner(f);
      String[] draws = myReader.nextLine().split(",");
      Queue<List<Set<String>>> boards = new LinkedList<>();

      while(myReader.hasNextLine()) {
        myReader.nextLine();
        List<Set<String>> currBoard = new ArrayList<>();
        for(int i = 0; i < 10; i++) {
          currBoard.add(new HashSet<String>());
        }
        for(int i = 0; i < 5; i++) {
          String[] row = myReader.nextLine().strip().split("\\s+");
          for(int j = 0; j < 5; j++) {
            currBoard.get(i).add(row[j]);
            currBoard.get(5 + j).add(row[j]);
          }
        }
        boards.add(currBoard);
      }

      // solve(boards, draws);
      solve2(boards, draws);

      myReader.close();
    } catch (FileNotFoundException e) {
      System.out.println("An error occurred.");
      e.printStackTrace();
    }
  }

  private static void solve(Queue<List<Set<String>>> boards, String[] draws) {
    for(String num : draws) {
      for(List<Set<String>> b : boards) {
        for(Set<String> r : b) {
          if (r.remove(num) && r.size() == 0) {
            System.out.println(score(b, Integer.parseInt(num)));
            return;
          } 
        }
      }
    }
  }

  private static void solve2(Queue<List<Set<String>>> boards, String[] draws) {
    for(String num : draws) {
      int count = boards.size();
      for(int k = 0; k < count; k++) {
        List<Set<String>> b = boards.poll();
        boolean hasWon = false;
        for(Set<String> r : b) {
          if (r.remove(num) && r.size() == 0) {
            if (boards.isEmpty()) {
              System.out.println(score(b, Integer.parseInt(num)));
              return;
            }
            hasWon = true;
            break;
          }
        }
        if (!hasWon) {
          boards.offer(b);
        }
      }
    }
  }

  private static int score(List<Set<String>> board, int currDraw) {
    int res = 0;
    for(int i = 0; i < 5; i++) {
      for(String n : board.get(i)) 
        res += Integer.parseInt(n);
    }
    return res * currDraw;
  }
}