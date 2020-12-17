// Day 17: Conway Cubes
// https://adventofcode.com/2020/day/17

const test = ".#.\n" +
            "..#\n" +
            "###";

const data = "...#..#.\n" +
            ".....##.\n" +
            "##..##.#\n" +
            "#.#.##..\n" +
            "#..#.###\n" +
            "...##.#.\n" +
            "#..##..#\n" +
            ".#.#..#.";

const starting = data.toString().trim().split("\n").map(row => row.split(""));
const space = [starting];

function run(cycle, space, count) {
    if (cycle == 0) {
        // space.forEach((dim, z) => {
        //     console.log("z =", z);
        //     draw2d(dim);
        // });
        return count;
    }

    const nextSpace = new Array(space.length + 2)
        .fill('.')
        .map(x => new Array(space[0].length + 2)
                .fill('.')
                .map(x => new Array(space[0][0].length + 2)));

    let nextCount = 0;
    for(let z = 0; z < nextSpace.length; z++) {
        for(let x = 0; x < nextSpace[0].length; x++) {
            for(let y = 0; y < nextSpace[0][0].length; y++) {
                const currActive = countNearbyActive(space, x - 1, y - 1, z - 1);
                const currState = z == 0 || x == 0 || y == 0 || z == nextSpace.length - 1 || x == nextSpace[0].length - 1 || y == nextSpace[0][0].length - 1
                        ? '.'
                        : get(space, x - 1, y - 1, z - 1);

                if (currState == '#' && (currActive < 2 || currActive > 3)) {
                    nextSpace[z][x][y] = '.';
                } else if (currState == '.' && currActive == 3) {
                    nextSpace[z][x][y] = '#';
                } else {
                    nextSpace[z][x][y] = currState;
                }
                if (nextSpace[z][x][y] == '#') {
                    nextCount++;
                }
            }
        }
    }
    return run(cycle - 1, nextSpace, nextCount);
}

function countNearbyActive(space, x, y, z) {
    let count = 0;
    for(let i = -1; i <= 1; i++) {
        for(let j = -1; j <= 1; j++) {
            count += get(space, x + i, y + j, z - 1) == '#' ? 1 : 0;
            count += get(space, x + i, y + j, z + 1) == '#' ? 1 : 0;
            count += (i != 0 || j != 0) && get(space, x + i, y + j, z) == '#' ? 1 : 0;
        }
    }
    return count;
}

function get(space, x, y, z) {
    if (z >= 0 && z < space.length
        && x >= 0 && x < space[0].length
        && y >= 0 && y < space[0][0].length) {

        return space[z][x][y];
    }
    return undefined;
}

function draw2d(space, x, y) {
    console.log(space.reduce((acc, row) => acc + "\n" + row.join(""), ""));
}

console.log("Part 1: " + run(6, space, 0));
