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
const space = [[starting]];

function run(cycle, space, count) {
    if (cycle == 0) {
        // for(let l = 0; l < space.length; l++) {
        //     for(let k = 0; k < space[0].length; k++) {
        //         console.log("w =", l, "; z =", k);
        //         draw2d(space[l][k]);
        //     }
        // }
        return count;
    }

    const nextSpace = new Array(space.length + 2)
        .fill('.')
        .map(x => new Array(space[0].length + 2)
                .fill('.')
                .map(x => new Array(space[0][0].length + 2)
                        .fill('.')
                        .map(x => new Array(space[0][0].length + 2))));

    let nextCount = 0;

    for(let w = 0; w < nextSpace.length; w++) {
        for(let z = 0; z < nextSpace[0].length; z++) {
            for(let x = 0; x < nextSpace[0][0].length; x++) {
                for(let y = 0; y < nextSpace[0][0][0].length; y++) {
                    const currActive = countNearbyActive(space, x - 1, y - 1, z - 1, w - 1);
                    const currState = w == 0 || z == 0 || x == 0 || y == 0
                                || w == nextSpace.length - 1 || z == nextSpace[0].length - 1
                                || x == nextSpace[0][0].length - 1 || y == nextSpace[0][0][0].length - 1
                            ? '.'
                            : get(space, x - 1, y - 1, z - 1, w - 1);

                    if (currState == '#' && (currActive < 2 || currActive > 3)) {
                        nextSpace[w][z][x][y] = '.';
                    } else if (currState == '.' && currActive == 3) {
                        nextSpace[w][z][x][y] = '#';
                    } else {
                        nextSpace[w][z][x][y] = currState;
                    }
                    if (nextSpace[w][z][x][y] == '#') {
                        nextCount++;
                    }
                }
            }
        }
    }
    return run(cycle - 1, nextSpace, nextCount);
}

function countNearbyActive(space, x, y, z, w) {
    let count = 0;
    for(let i = -1; i <= 1; i++) {
        for(let j = -1; j <= 1; j++) {
            for(let k = -1; k <= 1; k++) {
                count += get(space, x + i, y + j, z + k, w + 1) == '#' ? 1 : 0;
                count += get(space, x + i, y + j, z + k, w - 1) == '#' ? 1 : 0;
                count += (i != 0 || j != 0 || k != 0) && get(space, x + i, y + j, z + k, w) == '#' ? 1 : 0;
            }
        }
    }
    return count;
}

function get(space, x, y, z, w) {
    if (w >= 0 && w < space.length
        && z >= 0 && z < space[0].length
        && x >= 0 && x < space[0][0].length
        && y >= 0 && y < space[0][0][0].length) {

        return space[w][z][x][y];
    }
    return undefined;
}

function draw2d(space, x, y) {
    console.log(space.reduce((acc, row) => acc + "\n" + row.join(""), ""));
}

console.log("Part 2: " + run(6, space, 0));
