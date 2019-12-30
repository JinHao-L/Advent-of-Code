// Intcode
const north = 1;
const south = 2;
const west = 3;
const east = 4;
let oxygen_X = 0;
let oxygen_Y = 0;

function Intcode(input, pos) {
    const code = [3, 1033, 1008, 1033, 1, 1032, 1005, 1032, 31, 1008, 1033, 2, 1032, 1005, 1032, 58, 1008, 1033, 3, 1032, 1005, 1032, 81, 1008, 1033, 4, 1032, 1005, 1032, 104, 99, 101, 0, 1034, 1039, 102, 1, 1036, 1041, 1001, 1035, -1, 1040, 1008, 1038, 0, 1043, 102, -1, 1043, 1032, 1, 1037, 1032, 1042, 1106, 0, 124, 1002, 1034, 1, 1039, 101, 0, 1036, 1041, 1001, 1035, 1, 1040, 1008, 1038, 0, 1043, 1, 1037, 1038, 1042, 1105, 1, 124, 1001, 1034, -1, 1039, 1008, 1036, 0, 1041, 1002, 1035, 1, 1040, 102, 1, 1038, 1043, 1001, 1037, 0, 1042, 1106, 0, 124, 1001, 1034, 1, 1039, 1008, 1036, 0, 1041, 1001, 1035, 0, 1040, 1001, 1038, 0, 1043, 1001, 1037, 0, 1042, 1006, 1039, 217, 1006, 1040, 217, 1008, 1039, 40, 1032, 1005, 1032, 217, 1008, 1040, 40, 1032, 1005, 1032, 217, 1008, 1039, 1, 1032, 1006, 1032, 165, 1008, 1040, 39, 1032, 1006, 1032, 165, 1102, 2, 1, 1044, 1105, 1, 224, 2, 1041, 1043, 1032, 1006, 1032, 179, 1101, 0, 1, 1044, 1105, 1, 224, 1, 1041, 1043, 1032, 1006, 1032, 217, 1, 1042, 1043, 1032, 1001, 1032, -1, 1032, 1002, 1032, 39, 1032, 1, 1032, 1039, 1032, 101, -1, 1032, 1032, 101, 252, 1032, 211, 1007, 0, 45, 1044, 1106, 0, 224, 1101, 0, 0, 1044, 1105, 1, 224, 1006, 1044, 247, 102, 1, 1039, 1034, 102, 1, 1040, 1035, 102, 1, 1041, 1036, 1001, 1043, 0, 1038, 1002, 1042, 1, 1037, 4, 1044, 1106, 0, 0, 12, 89, 14, 22, 56, 12, 54, 34, 71, 12, 40, 31, 83, 2, 95, 25, 4, 70, 18, 59, 32, 11, 19, 23, 67, 17, 25, 18, 72, 14, 60, 9, 85, 6, 84, 89, 2, 14, 10, 44, 85, 34, 63, 11, 23, 79, 6, 56, 4, 88, 69, 20, 2, 88, 87, 31, 56, 16, 68, 29, 84, 43, 58, 6, 14, 98, 73, 3, 35, 79, 24, 89, 43, 59, 12, 78, 86, 13, 10, 61, 37, 46, 44, 61, 25, 12, 71, 36, 65, 79, 31, 5, 71, 13, 99, 90, 87, 35, 40, 98, 3, 80, 69, 97, 31, 37, 93, 37, 78, 34, 48, 32, 51, 41, 75, 50, 16, 25, 10, 92, 88, 28, 50, 7, 95, 11, 15, 99, 10, 61, 56, 25, 14, 99, 23, 23, 90, 73, 66, 94, 23, 60, 34, 26, 73, 44, 38, 71, 41, 42, 79, 10, 25, 69, 43, 39, 92, 19, 35, 95, 23, 60, 8, 75, 38, 55, 82, 40, 44, 29, 84, 82, 33, 36, 63, 93, 10, 7, 50, 41, 22, 76, 79, 59, 42, 61, 40, 72, 4, 51, 5, 83, 99, 22, 79, 33, 6, 53, 62, 30, 77, 37, 22, 94, 84, 43, 19, 60, 52, 44, 82, 99, 23, 47, 29, 68, 57, 38, 66, 40, 55, 17, 15, 78, 86, 10, 54, 25, 52, 39, 62, 35, 11, 19, 15, 75, 12, 20, 63, 67, 98, 35, 70, 17, 95, 66, 24, 37, 56, 10, 75, 3, 95, 35, 41, 62, 8, 3, 60, 72, 5, 98, 61, 27, 42, 63, 16, 55, 29, 6, 54, 48, 40, 7, 66, 92, 31, 48, 16, 41, 87, 86, 6, 16, 24, 53, 85, 17, 4, 12, 20, 89, 74, 5, 84, 67, 27, 37, 67, 30, 29, 27, 92, 46, 40, 14, 77, 95, 50, 17, 31, 38, 44, 83, 12, 39, 12, 98, 96, 20, 7, 69, 82, 7, 12, 75, 49, 85, 59, 17, 44, 98, 58, 28, 94, 34, 81, 49, 48, 66, 51, 43, 5, 96, 52, 22, 81, 36, 83, 94, 32, 28, 94, 27, 97, 18, 99, 32, 49, 53, 31, 16, 61, 57, 18, 87, 22, 93, 18, 21, 25, 77, 33, 78, 41, 34, 69, 5, 28, 15, 87, 38, 98, 38, 41, 83, 10, 61, 90, 21, 92, 35, 93, 51, 35, 92, 23, 50, 23, 5, 51, 97, 60, 36, 69, 4, 62, 20, 39, 88, 11, 48, 56, 9, 92, 8, 85, 78, 62, 24, 62, 82, 15, 16, 30, 81, 34, 9, 98, 94, 8, 16, 85, 22, 75, 40, 62, 78, 25, 70, 16, 47, 28, 93, 32, 21, 62, 53, 94, 62, 14, 75, 19, 69, 8, 47, 9, 39, 90, 35, 10, 86, 50, 15, 84, 42, 72, 19, 24, 5, 77, 79, 3, 93, 66, 6, 89, 16, 11, 55, 32, 37, 38, 28, 50, 78, 21, 29, 35, 13, 95, 71, 3, 14, 12, 96, 23, 75, 33, 97, 26, 41, 96, 88, 68, 22, 39, 18, 4, 7, 46, 91, 8, 55, 39, 37, 28, 47, 79, 38, 73, 11, 72, 8, 28, 76, 70, 69, 27, 84, 37, 84, 79, 81, 34, 71, 97, 43, 94, 74, 13, 58, 14, 64, 20, 53, 22, 67, 86, 39, 46, 28, 50, 34, 62, 54, 8, 41, 24, 68, 57, 80, 94, 32, 79, 18, 61, 15, 90, 23, 6, 67, 92, 18, 18, 83, 36, 46, 44, 31, 76, 39, 2, 77, 23, 93, 10, 67, 37, 25, 46, 19, 87, 21, 2, 92, 92, 92, 68, 27, 13, 38, 42, 85, 13, 46, 39, 61, 96, 9, 53, 29, 44, 81, 84, 91, 11, 79, 75, 5, 13, 88, 84, 19, 1, 18, 38, 86, 42, 6, 85, 63, 40, 93, 3, 33, 83, 41, 82, 51, 79, 37, 85, 1, 53, 40, 39, 74, 33, 54, 29, 23, 49, 21, 31, 43, 29, 98, 32, 70, 59, 10, 24, 21, 74, 89, 20, 96, 78, 21, 25, 9, 99, 52, 8, 39, 64, 25, 29, 95, 37, 49, 94, 35, 1, 85, 48, 5, 97, 23, 64, 41, 98, 14, 76, 97, 55, 56, 11, 23, 81, 42, 98, 43, 46, 37, 22, 99, 1, 98, 91, 58, 20, 23, 94, 53, 63, 23, 59, 8, 32, 94, 37, 70, 24, 33, 69, 79, 77, 35, 32, 52, 79, 17, 62, 31, 30, 70, 61, 20, 2, 54, 17, 46, 36, 75, 58, 61, 33, 71, 10, 50, 10, 53, 10, 79, 30, 79, 41, 91, 80, 52, 20, 54, 65, 84, 24, 85, 9, 69, 11, 54, 12, 83, 86, 54, 27, 68, 9, 86, 0, 0, 21, 21, 1, 10, 1, 0, 0, 0, 0, 0, 0];
    
    let i = 0;
    let relative_base = 0;
    let param1, param2, result;
    let temp = false;
    while(i < code.length) {
        const opcode = code[i] % 100;
        const param1_mode = ((code[i] % 1000) - opcode);
        const param2_mode = ((code[i] % 10000) - opcode - param1_mode);
        const result_mode = ((code[i] % 100000) - opcode - param1_mode - param2_mode);

        // Mode 0 : Position Mode
        // Mode 1 : Immediate Mode
        // Mode 2 : Relative Mode

        if(param1_mode/100 == 1) {
            param1 = i + 1;
        } else if (param1_mode / 100 == 2) {
            param1 = code[i + 1] + relative_base;
            // console.log("rel mode: " + param1);
        } else if (param1_mode / 100 == 0) {
            param1 = code[i + 1];
        } else {
            return "Param1 error";
        }

        if (param2_mode / 1000 == 1) {
            param2 = i + 2;
        } else if (param2_mode / 1000 == 2) {
            param2 = code[i + 2] + relative_base;
        } else if (param2_mode / 1000 == 0) {
            param2 = code[i + 2];
        } else {
            return "Param2 error";
        }

        if (result_mode / 10000 == 1) {
            result = i + 3;
        } else if (result_mode / 10000 == 2) {
            result = code[i + 3] + relative_base;
        } else if (result_mode / 10000 == 0) {
            result = code[i + 3];
        } else {
            return "result error";
        }

        if (opcode == 1) {
            code[result] = code[param1] + code[param2];
            i += 4;
        } else if (opcode == 2) {
            code[result] = code[param1] * code[param2];
            i += 4;
        } else if (opcode == 3) {
            // Input Value:
            if (input.length < 1) {
                return "Next";
            } else {
                code[param1] = input.shift();
                temp = code[param1];
            }
            // console.log("Input: " + code[param1]);
            i += 2;
        } else if (opcode == 4) {
            let status = code[param1];
            // console.log("Output: " + code[param1]);
            switch (temp) {
                case north:
                    pos[1]--;
                    break;
                case south:
                    pos[1]++;
                    break;
                case west:
                    pos[0]--;
                    break;
                case east:
                    pos[0]++;
                    break;
                default:
                    console.log("Movement Error");
            }
            temp = false;
            if (status == 0) {
                return "Blocked";
            } else if (status == 2) {
                return "End";
            } else {
                i += 2;
            }
        } else if (opcode == 5) {
            if (code[param1] != 0) {
                i = code[param2];
            } else {
                i += 3;
            }
        } else if (opcode == 6) {
            if (code[param1] == 0) {
                i = code[param2];
            } else {
                i += 3;
            }
        } else if (opcode == 7) {
            if (code[param1] < code[param2]) {
                code[result] = 1;
            } else {
                code[result] = 0;
            }
            i += 4;
        } else if (opcode == 8) {
            if (code[param1] == code[param2]) {
                code[result] = 1;
            } else {
                code[result] = 0;
            }
            i += 4;
        } else if (opcode == 9) {
            relative_base += code[param1];
            // console.log("Base Changed: " + relative_base);
            i += 2;
        } else if (opcode == 99) {
            console.log("-END-");
            break;
        } else {
            console.log("Invalid opcode: " + code[i]);
            break;
        }
    }
}

function create_path(routes, depth) {
    if (depth == 450) {
        return;
    }
    // console.log(routes);
    console.log("   Depth: " + depth);
    const len = routes.length;
    const index_to_remove = [];
    for(let i = 0; i < len; i++) {
        // console.log(routes[i]);
        let loc = [cX, cY];
        const curr_route = routes[i];
        const last_move = curr_route[curr_route.length - 1];
        let opp_dir = 0;
        const copied = [];

        // to remove reverse direction of last move
        let directions = [north, south, west, east];
        switch (last_move) {
            case north:
                opp_dir = south;
                break;
            case south:
                opp_dir = north;
                break;
            case west:
                opp_dir = east;
                break;
            case east:
                opp_dir = west;
                break;
            default:
                console.log("direction error");
                break; 
        }
        directions = directions.filter(dirn => dirn != opp_dir);
        for(let j = 0; j < directions.length; j++) {
            copied[j] = curr_route.slice();
            copied[j].push(directions[j]);
        }

        const status = Intcode(routes[i], loc);
        console.log(status);
        switch (status) {
            case "Next":
                plot(loc[0], loc[1], ".");
                routes[i] = copied[0];
                routes.push(copied[1]);
                routes.push(copied[2]);
                break;
            case "Blocked":
                index_to_remove.push(i);
                plot(loc[0], loc[1], "#");
                continue;
                break;
            case "End":
                plot(loc[0], loc[1], "O");
                oxygen_X = loc[0];
                oxygen_Y = loc[1];
                console.log('\n');
                console.log("Depth: " + depth);
                console.error("Oxygen system found");
                // return;
                continue;
                break;
            default:
                console.log("Error code: " + status);
                break;
        }
    }

    // remove blocked paths
    for (let i = index_to_remove.length - 1; i >= 0; i--) {
        routes.splice(index_to_remove[i], 1);
    }
    console.log('\n');
    return create_path(routes, depth + 1);
}

let cX = 21;
let cY = 21;

let map = [];

function read(arr, i, j) {
    if (arr[i] != undefined) {
        return arr[i][j]
    } else {
        return undefined;
    }
}

function write(arr, i, j, val) {
    if (arr[i] == undefined) {
        arr[i] = [];
    }
    arr[i][j] = val;
}

let max_X = cX;
let min_X = cX;
let max_Y = cY;
let min_Y = cY;

function plot(x, y, sym) {
    if (x > max_X) {
        max_X = x;
    }
    if (x < min_X) {
        min_X = x;
    }
    if (y > max_Y) {
        max_Y = y;
    }
    if (y < min_Y) {
        min_Y = y;
    }
    write(map, y, x, sym)
}

function draw(arr) {
    for (let i = 0; i <= max_Y; i++) {
        let ln = "";
        for (let j = 0; j <= max_X; j++) {
            const val = read(arr, i, j);
            if (val == undefined) {
                ln += "X";
            } else {
                ln += val;
            }
        }
        console.log(ln);
    }
}

create_path([[north], [south], [west], [east]], 1, [cX, cY]);

console.log(max_X);
console.log(min_X);
console.log(max_Y);
console.log(min_Y);

console.log("midX: " + (max_X - min_Y)/2);
console.log("midY: " + (max_Y - min_Y)/2);

// draw(map);

let oxygen_arr = [];
oxygen_arr.push([oxygen_X, oxygen_Y]);

function spread(currX, currY) {
    for(let i = -1; i <= 1; i++) {
        for(let j = -1; j <= 1; j++) {
            const val = Math.abs(i + j);
            if (val == 1 && map[currY + i][currX + j] == '.') {
                map[currY + i][currX + j] = 'O';
                oxygen_arr.push([currX + j, currY + i]);
            }
        }
    }
}

function next_time(time) {
    console.log('\n');
    console.log("   Time: " + time);
        console.log(oxygen_arr);
        draw(map);

    if (is_not_done(map)) {
        const len = oxygen_arr.length;
        for (let i = 0; i < len; i++) {
            const oxygen = oxygen_arr.shift();
            spread(oxygen[0], oxygen[1]);
        }
    } else {
        console.log("Done in: " + time + " min!");
        return time;
    }
    
    return next_time(time + 1);
}

function is_not_done(arr) {
    for (let i = 0; i < max_Y; i++) {
        for (let j = 0; j < max_X; j++) {
            const val = read(arr, i, j);
            if (val == ".") {
                return true;
            }
        }
    }
    return false;
}

next_time(0);