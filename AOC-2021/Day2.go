package main

import (
	"fmt"
	"io/ioutil"
	"strings"
	"strconv"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

type Command struct {
	types string
	val int
}

func main() {
	raw_dat, err := ioutil.ReadFile("AOC-2021/Day2_input.txt")
	check(err)

	lines := strings.Split(string(raw_dat), "\n")

	var commands []Command;
	for _, str := range lines {
		cmds := strings.Split(str, " ")
		val, _ := strconv.Atoi(cmds[1])
		commands = append(commands, Command{cmds[0], val})
	}
	
	dist, depth := trackLocation(commands)

	fmt.Println("Part 1: " + strconv.Itoa(dist * depth))

	dist, depth = trackLocationWithAim(commands)

	fmt.Println("Part 2: " + strconv.Itoa(dist * depth))
}

func trackLocation(commands []Command) (dist int, depth int) {
	dist, depth = 0, 0
	for _, cmd := range commands {
		switch cmd.types {
		case "forward":
			dist += cmd.val
		case "down":
			depth += cmd.val
		case "up":
			depth -= cmd.val
		}
	}
	return
}

func trackLocationWithAim(commands []Command) (dist int, depth int) {
	dist, depth = 0, 0
	aim := 0
	for _, cmd := range commands {
		switch cmd.types {
		case "forward":
			dist += cmd.val
			depth += aim * cmd.val
		case "down":
			aim += cmd.val
		case "up":
			aim -= cmd.val
		}
	}
	return
}

