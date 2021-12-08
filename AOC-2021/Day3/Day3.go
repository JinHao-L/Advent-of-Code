package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

func main() {
	raw_dat, err := ioutil.ReadFile("AOC-2021/Day3/input.txt")
	if err != nil {
		panic(err)
	}

	lines := strings.Split(string(raw_dat), "\n")

	var mat [][]string;
	for _, row := range lines {
		mat = append(mat, strings.Split(row, ""))
	}
	
	gamma, epsilon := getResult(mat)

	fmt.Printf("Gamma: %v\n", gamma)
	fmt.Printf("Epsilon: %v\n", epsilon)
	fmt.Printf("Part 1: %v\n", gamma * epsilon)

	o2_idx := getResult2(mat, "most_common")
	co2_idx := getResult2(mat, "least_common")

	o2, _ := strconv.ParseInt(lines[o2_idx], 2, 64)
	co2, _ := strconv.ParseInt(lines[co2_idx], 2, 64)

	fmt.Printf("O2: %v\n", o2)
	fmt.Printf("CO2: %v\n", co2)
	fmt.Printf("Part 2: %v\n", o2 * co2)
}

func getResult(mat [][]string) (gamma int, epsilon int) {
	n := len(mat)
	m := len(mat[0])

	for c := 0; c < m; c++ {
		gamma = gamma << 1
		epsilon = epsilon << 1

		val := 0;
		for r := 0; r < n; r++ {
			if mat[r][c] == "1" {
				val += 1;
			}
		}

		if val >= n / 2 {
			gamma += 1
		} else {
			epsilon += 1
		}
	}

	return
}

func getResult2(mat [][] string, target string) int {
	n := len(mat)
	m := len(mat[0])
	valids := make(map[int]bool)
	for i := 0; i < n; i++ {
		valids[i] = true;
	}

	for c := 0; c < m; c++ {
		zeros := make(map[int]bool)
		ones := make(map[int]bool)
		if (len(valids) == 1) {
			break;
		}

    for r := range valids {
			switch mat[r][c] {
				case "0":
					zeros[r] = true
				case "1":
					ones[r] = true
			}
    }

		if (target == "most_common") {
			if (len(ones) >= len(zeros)) {
				valids = ones
			} else {
				valids = zeros
			}
		} else {
			if (len(zeros) <= len(ones)) {
				valids = zeros
			} else {
				valids = ones
			}
		}
		
	}

	res := -1
	for r := range valids {
		if (res == -1) {
			res = r
		}

		if target == "least_common" && mat[r][m - 1] == "0" {
			res = r
		} else if target == "most_common" && mat[r][m - 1] == "1" {
			res = r
		}
	}

	return res
}
