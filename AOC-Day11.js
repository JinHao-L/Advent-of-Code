// Intcode
const main = [3, 8, 1005, 8, 330, 1106, 0, 11, 0, 0, 0, 104, 1, 104, 0, 3, 8, 102, -1, 8, 10, 1001, 10, 1, 10, 4, 10, 108, 0, 8, 10, 4, 10, 1001, 8, 0, 28, 1, 1103, 17, 10, 1006, 0, 99, 1006, 0, 91, 1, 102, 7, 10, 3, 8, 1002, 8, -1, 10, 101, 1, 10, 10, 4, 10, 108, 1, 8, 10, 4, 10, 1002, 8, 1, 64, 3, 8, 102, -1, 8, 10, 1001, 10, 1, 10, 4, 10, 108, 0, 8, 10, 4, 10, 102, 1, 8, 86, 2, 4, 0, 10, 1006, 0, 62, 2, 1106, 13, 10, 3, 8, 1002, 8, -1, 10, 1001, 10, 1, 10, 4, 10, 1008, 8, 0, 10, 4, 10, 101, 0, 8, 120, 1, 1109, 1, 10, 1, 105, 5, 10, 3, 8, 102, -1, 8, 10, 1001, 10, 1, 10, 4, 10, 108, 1, 8, 10, 4, 10, 1002, 8, 1, 149, 1, 108, 7, 10, 1006, 0, 40, 1, 6, 0, 10, 2, 8, 9, 10, 3, 8, 102, -1, 8, 10, 1001, 10, 1, 10, 4, 10, 1008, 8, 1, 10, 4, 10, 1002, 8, 1, 187, 1, 1105, 10, 10, 3, 8, 102, -1, 8, 10, 1001, 10, 1, 10, 4, 10, 1008, 8, 1, 10, 4, 10, 1002, 8, 1, 213, 1006, 0, 65, 1006, 0, 89, 1, 1003, 14, 10, 3, 8, 102, -1, 8, 10, 1001, 10, 1, 10, 4, 10, 108, 0, 8, 10, 4, 10, 102, 1, 8, 244, 2, 1106, 14, 10, 1006, 0, 13, 3, 8, 102, -1, 8, 10, 1001, 10, 1, 10, 4, 10, 108, 0, 8, 10, 4, 10, 1001, 8, 0, 273, 3, 8, 1002, 8, -1, 10, 1001, 10, 1, 10, 4, 10, 108, 1, 8, 10, 4, 10, 1001, 8, 0, 295, 1, 104, 4, 10, 2, 108, 20, 10, 1006, 0, 94, 1006, 0, 9, 101, 1, 9, 9, 1007, 9, 998, 10, 1005, 10, 15, 99, 109, 652, 104, 0, 104, 1, 21102, 937268450196, 1, 1, 21102, 1, 347, 0, 1106, 0, 451, 21101, 387512636308, 0, 1, 21102, 358, 1, 0, 1105, 1, 451, 3, 10, 104, 0, 104, 1, 3, 10, 104, 0, 104, 0, 3, 10, 104, 0, 104, 1, 3, 10, 104, 0, 104, 1, 3, 10, 104, 0, 104, 0, 3, 10, 104, 0, 104, 1, 21101, 0, 97751428099, 1, 21102, 1, 405, 0, 1105, 1, 451, 21102, 1, 179355806811, 1, 21101, 416, 0, 0, 1106, 0, 451, 3, 10, 104, 0, 104, 0, 3, 10, 104, 0, 104, 0, 21102, 1, 868389643008, 1, 21102, 439, 1, 0, 1105, 1, 451, 21102, 1, 709475853160, 1, 21102, 450, 1, 0, 1105, 1, 451, 99, 109, 2, 22102, 1, -1, 1, 21101, 0, 40, 2, 21101, 482, 0, 3, 21102, 1, 472, 0, 1105, 1, 515, 109, -2, 2106, 0, 0, 0, 1, 0, 0, 1, 109, 2, 3, 10, 204, -1, 1001, 477, 478, 493, 4, 0, 1001, 477, 1, 477, 108, 4, 477, 10, 1006, 10, 509, 1101, 0, 0, 477, 109, -2, 2105, 1, 0, 0, 109, 4, 2101, 0, -1, 514, 1207, -3, 0, 10, 1006, 10, 532, 21101, 0, 0, -3, 21202, -3, 1, 1, 22101, 0, -2, 2, 21101, 1, 0, 3, 21101, 0, 551, 0, 1105, 1, 556, 109, -4, 2106, 0, 0, 109, 5, 1207, -3, 1, 10, 1006, 10, 579, 2207, -4, -2, 10, 1006, 10, 579, 22102, 1, -4, -4, 1105, 1, 647, 21201, -4, 0, 1, 21201, -3, -1, 2, 21202, -2, 2, 3, 21101, 0, 598, 0, 1106, 0, 556, 22101, 0, 1, -4, 21102, 1, 1, -1, 2207, -4, -2, 10, 1006, 10, 617, 21101, 0, 0, -1, 22202, -2, -1, -2, 2107, 0, -3, 10, 1006, 10, 639, 22102, 1, -1, 1, 21102, 1, 639, 0, 105, 1, 514, 21202, -2, -1, -2, 22201, -4, -2, -4, 109, -5, 2105, 1, 0];
const test = [3, 100, 104, 1, 104, 0, 3, 100, 104, 0, 104, 0, 3, 100, 104, 1, 104, 0, 3, 100, 104, 1, 104, 0, 3, 100, 104, 0, 104, 1, 3, 100, 104, 1, 104, 0, 3, 100, 104, 1, 104, 0, 99];

const wall = [];
for(let i = 0; i < 200; i++) {
    wall[i] = [];
    for (let j = 0; j < 150; j++) {
        wall[i][j] = 'X';
    }
}


// let mem = [];
// let panel_count = 0;

// function read(arr, i, j) {
//     if (arr[i] != undefined) {
//         return arr[i][j]
//     } else {
//         return undefined;
//     }
// }

// function write(arr, i, j, val) {
//     if (arr[i] == undefined) {
//         arr[i] = [];
//     }
//     arr[i][j] = val;
// }

function Intcode(code, posY, posX, dir) {
    if (posY < 0 || posX < 0) {
        return "Error" + posY + posX;
    }
    let i = 0;
    let relative_base = 0;
    let param1, param2, result;
    let dir_change = 0;
    let count = 0;
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
            return "Result error";
        }

        if (opcode == 1) {
            code[result] = code[param1] + code[param2];
            i += 4;
        } else if (opcode == 2) {
            code[result] = code[param1] * code[param2];
            i += 4;
        } else if (opcode == 3) {
            // Input Value: 
            // if (read(mem, posY, posX) == undefined) {
            //     // '.'
            //     code[param1] = 0;
            //     // panel_count += 1;
            // } else if (read(mem, posY, posX) == '.') {
            //     code[param1] = 0;
            // } else if (read(mem, posY, posX) == '#') {
            //     code[param1] = 1;
            // }
            if (wall[posY][posX] == 'X') {
                code[param1] = 0;
                count += 1;
            } else if (wall[posY][posX] == '.') {
                code[param1] = 0;
            } else if (wall[posY][posX] == '#') {
                code[param1] = 1;
            } else {
                return "ERROR";
            }
            console.log("Input: " + code[param1]);
            i += 2;
        } else if (opcode == 4) {
            console.log("Output: " + code[param1]);
            if (dir_change) {
                if(code[param1]) {
                    if (dir == '<') {
                        dir = '^';
                        posY --;
                    } else if (dir == '^') {
                        dir = '>';
                        posX ++;
                    } else if (dir == '>') {
                        dir = 'v';
                        posY ++;
                    } else if (dir == 'v') {
                        dir = '<';
                        posX --;
                    } else {
                        return 'Invalid direction';
                    }
                } else {
                    if (dir == '<') {
                        dir = 'v';
                        posY++;
                    } else if (dir == '^') {
                        dir = '<';
                        posX--;
                    } else if (dir == '>') {
                        dir = '^';
                        posY--;
                    } else if (dir == 'v') {
                        dir = '>';
                        posX++;
                    } else {
                        return 'Invalid direction';
                    }
                }
                dir_change = 0;
            } else {
                // if (read(mem, posY, posX) == undefined) {
                //     panel_count++;
                // }
                
                // if (code[param1]) {
                //     write(mem, posY, posX, '#');
                // } else {
                //     write(mem, posY, posX, '.');
                // }
                if (code[param1]) {
                    wall[posY][posX] = '#';
                } else {
                    wall[posY][posX] = '.';
                }
                dir_change = 1;
            }
            i += 2;
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
            console.log("Y: " + posY + "; X: " + posX + "; Dirn: " + dir);
            console.log("Count: " + count);
            break;
        } else {
            console.log("Invalid opcode: " + code[i]);
            break;
        }
    }
}
wall[50][75] = '#';
Intcode(main, 50, 75, '^');
function draw(arr) {
    for(let i = 0; i < arr.length; i++) {
        let line =  "";
        for (let j = 0; j <arr[0].length; j++) {
            if (arr[i][j] == 'X') {
                arr[i][j] = '.';
            }
            line = line + arr[i][j]
        }
        console.log(line);
    }
}
draw(wall);