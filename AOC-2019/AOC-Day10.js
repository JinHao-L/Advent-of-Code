// Day 10: Monitoring Station
// https://adventofcode.com/2019/day/10

const input = "#.#.###.#.#....#..##.#.........#..#..#..#.#..#.....#.##.##.##.##.##..#...#...##.#...#.#####...###.#.#.#..#####.###.#.#.####.#####.#.#.#.##.#.##...####.#.##.##....###..#.#..#..#..###...##....#.#...##.#.#...####.....#.#######..##.##.#..#.###.#..###.#.#..##.....###.#.#.##.#......#####..###..##.#.##..###.##.###..###..#.###...#.#...#..#.##.#.#..#.#....###.#.#..##.#.##.##.#####..###...#.###.###...##..#..##.##.#.##..####.#.###.###.....####.##..#######....#.##....###.#..#..##.#.####.....###..##.#.#..#..#...#.####..######..#####.##...#.#....#....#.#.#####.##.#.#####..##.#...#..##..##.#.##.##.####..##.##..####..#..####.########.#..#.##.#.######....##...#.##.##.####......#.##.##";
const test1 = "......#.#.#..#.#......#######..#.#.###...#..#.......#....#.##..#....#..##.#..#####...#..#..#....####";
const test2 = ".#..##.###...#########.############..##..#.######.########.#.###.#######.####.#.#####.##.#.##.###.##..#####..#.##############################.####....###.#.#.####.######################.##.###..####....######..##.###########.##.####...##..#.#####..#.######.#####...#.##########...#.##########.#######.####.#.###.###.#.##....##.##.###..#####.#.#.###########.####.#.#.#####.####.######.##.####.##.#..##";

const temp = input.split("");
const data = [];
const visibility = [];
let height = 26;
let width = 26;

for(let i = 0; i < height; i++) {
    data[i] = [];
    visibility[i] = [];
    for(let j = 0; j < width; j++) {
        data[i][j] = temp[i*width + j];
        visibility[i][j] = 0;
    }
}

function checklist() {
    // To check all diagonals. Note: 0 is not a valid input for coprime check
    function is_coprime(x, y) {
        function gcd(a, b) {
            return a % b == 0 ?
                b :
                gcd(b, a % b);
        }

        function lcm(a, b) {
            return (a * b) / gcd(a, b);
        }
        return x * y == lcm(x, y);
    }

    const list = [];
    for(let i = 1; i < height; i++) {
        for(let j = 1; j < width; j++) {
            if (is_coprime(i, j)) {
                list.push([i, j]);
                // include negative x-axis portion
                list.push([i, -j]);
            }
        }
    }
    // console.log(list);
    return list;
}
const coprimes = checklist();

function run(data, y_max, x_max, laserY, laserX) {
    function within_range(y, x) {
        return x >= 0 && y < y_max && x < x_max;
    }
    let laserified = [];
    for (let y = 0; y < y_max; y++) {
        for (let x = 0; x < x_max; x++) {
            // check horizontal (to the right)
            if (data[y][x] == "#") {
                for (let x_run = x + 1; x_run < x_max; x_run++) {
                    if(data[y][x_run] == "#") {
                        visibility[y][x_run] += 1;
                        visibility[y][x] += 1;
                        if (y == laserY && x_run == laserX) {
                            laserified.push([y, x]);
                        }
                        if (y == laserY && x == laserX) {
                            laserified.push([y, x_run]);
                        }
                        break;
                    }
                }

                // check vertical
                for (let y_run = y + 1; y_run < y_max; y_run++) {
                    if (data[y_run][x] == "#") {
                        visibility[y_run][x] += 1;
                        visibility[y][x] += 1;
                        if (y_run == laserY && x == laserX) {
                            laserified.push([y, x]);
                        }
                        if (y == laserY && x == laserX) {
                            laserified.push([y_run, x]);
                        }
                        break;
                    }
                }

                // check diagonals
                for (let i = 0; i < coprimes.length; i++) {
                    let y_chk = y + coprimes[i][0];
                    let x_chk = x + coprimes[i][1];
                    while (within_range(y_chk, x_chk)) {
                        if (data[y_chk][x_chk] == "#") {
                            visibility[y_chk][x_chk] += 1;
                            visibility[y][x] += 1;
                            if (y_chk == laserY && x_chk == laserX) {
                                laserified.push([y, x]);
                            }
                            if (y == laserY && x == laserX) {
                                laserified.push([y_chk, x_chk]);
                            }
                            break;
                        } else {
                            // expand the line of search
                            y_chk += coprimes[i][0];
                            x_chk += coprimes[i][1];
                        }
                    }
                }
            }
            // console.log("Completed: (" + x + "," + y +") : " + visibility[y][x]);
        }
    }
    // console.log(laserified);
    return laserified;
}
const laserY = 17;
const laserX = 13;
const laser_target = run(data, height, width, laserY, laserX);

function find_max(arr) {
    let max = 0;
    let max_coor = [];
    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < arr[0].length; j++) {
            if (max < arr[i][j]) {
                max = arr[i][j];
                max_coor = [i, j];
            }
        }
    }
    // console.log(max_coor);
    return max;
}

console.log("Part 1: " + find_max(visibility));


function get_angle(coors) {
    const angles = [];
    for(let i = 0; i < coors.length; i++) {
        const deltaY = coors[i][0] - laserY;
        const deltaX = coors[i][1] - laserX;
        if (deltaY == 0) {
            angles[i] = deltaX > 0
                            ? Math.PI / 2
                            : 3 / 2 * Math.PI;
            continue;
        } else if (deltaX == 0) {
            angles[i] = deltaY < 0
                            ? 0
                            : Math.PI
        }
        const val = Math.abs(deltaX) / Math.abs(deltaY);
        if (deltaX > 0) {
            if (deltaY < 0) {
                angles[i] = Math.atan(val);
            } else if (deltaY > 0) {
                angles[i] = Math.PI - Math.atan(val);
            }
        } else if (deltaX < 0) {   
            if (deltaY < 0) {
                angles[i] = 2 * Math.PI - Math.atan(val);
            } else if (deltaY > 0) {
                angles[i] = Math.PI + Math.atan(val);
            }
        }
    }
    return angles;
}

const angles = get_angle(laser_target);

// Sort arr1 and arr2 accordingly to arr1 values
function quicksort(arr1, arr2) {
    function swap(A, i, j) {
        let temp = A[i];
        A[i] = A[j];
        A[j] = temp;
    }
    for(let i = 0; i < arr1.length; i++) {
        for(let j = i - 1; j >= 0; j--) {
            if(arr1[j] > arr1[j+1]) {
                swap(arr1, j, j + 1);
                swap(arr2, j, j + 1);
            }
        }
    }
}
quicksort(angles, laser_target);
// console.log(angles);

console.log("Part 2: " + (laser_target[199][1]*100 + laser_target[199][0]));