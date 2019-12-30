// Day 7: Amplification Circuit (Intcode - Pause version)
// https://adventofcode.com/2019/day/7

const code = [3, 8, 1001, 8, 10, 8, 105, 1, 0, 0, 21, 38, 55, 64, 89, 114, 195, 276, 357, 438, 99999, 3, 9, 101, 3, 9, 9, 102, 3, 9, 9, 1001, 9, 5, 9, 4, 9, 99, 3, 9, 101, 2, 9, 9, 1002, 9, 3, 9, 101, 5, 9, 9, 4, 9, 99, 3, 9, 101, 3, 9, 9, 4, 9, 99, 3, 9, 1002, 9, 4, 9, 101, 5, 9, 9, 1002, 9, 5, 9, 101, 5, 9, 9, 102, 3, 9, 9, 4, 9, 99, 3, 9, 101, 3, 9, 9, 1002, 9, 4, 9, 101, 5, 9, 9, 102, 5, 9, 9, 1001, 9, 5, 9, 4, 9, 99, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 99, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 99, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 99, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 99, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 99];

const amps = [code];
amps.push(code.slice());
amps.push(code.slice());
amps.push(code.slice());
amps.push(code.slice());

function amplifier(n, settings, temp, pause, once) {
    let code = amps[n];
    let i = pause;
    while(i < code.length) {
        const opcode = code[i] % 100;
        const param1_mode = ((code[i] % 1000) - opcode);
        const param2_mode = ((code[i] % 10000) - opcode - param1_mode);
        const result_mode = ((code[i] % 100000) - opcode - param1_mode - param2_mode);
        var param1, param2, result;

        if(param1_mode/100) {
            param1 = i + 1;
        } else {
            param1 = code[i + 1];
        }

        if (param2_mode / 1000) {
            param2 = i + 2;
        } else {
            param2 = code[i + 2];
        }

        if (result_mode / 10000) {
            result = i + 3;
        } else {
            result = code[i + 3];
        }

        if (opcode == 1) {
            code[result] = code[param1] + code[param2];
            i += 4;
        } else if (opcode == 2) {
            code[result] = code[param1] * code[param2];
            i += 4;
        } else if (opcode == 3) {
            if(once) {
                code[param1] = settings;
                once = 0;
            } else {
                code[param1] = temp;
            }
            // console.log("Getting input: " + code[param1]);
            i += 2;
        } else if (opcode == 4) {
            // console.log("Output: " + code[param1]);
            return [code[param1], i+2];
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
        } else if (opcode == 99) {
            return "BREAK";
        } else {
            console.log("error");
            break;
        }
    }
}

function run(string) {
    let temp = 0;
    let i = 0;
    let prev = 0;
    let pause = [];

    while(i < 5) {
        let setting = parseInt(string.slice(i, i + 1), 10);
        const arr = amplifier(i, setting, temp, 0, 1);
        temp = arr[0];
        pause[i] = arr[1];
        // console.log(temp);
        if (temp == "BREAK") {
            return prev;
        }
        i += 1;
    }

    prev = temp;
    i = 0;

    // Additional Step for Part2 - to include looping
    while(true) {
        // let setting = Math.floor(number/Math.pow(10,4-i));
        // number = number - setting * Math.pow(10, 4-i);
        let setting = parseInt(string.slice(i,i+1), 10);
        const arr = amplifier(i, setting, temp, pause[i], 0);
        
        if (arr == "BREAK") {
            return prev;
        }

        temp = arr[0];
        pause[i] = arr[1];
        // console.log(temp);
        
        if (i == 4) {
            prev = temp;
            // console.log(prev);
            i = 0;
            continue;
        }
        i += 1;
    }

    return temp;
}

function get_permutations(string) {
    let result = [];
    if (string.length === 1) {
        result.push(string);
        return result;
    }

    for (var i = 0; i < string.length; i++) {
        var first = string[i];
        var remaining = string.substring(0, i) + string.substring(i + 1);
        var rest = get_permutations(remaining);
        for(var j = 0; j < rest.length; j++) {
            result.push(first + rest[j]);
        }
    }
    return result;
}

const perms1 = get_permutations("01234");
const perms2 = get_permutations("98765");
let largest = 0;
let string = "";

function get_largest(perms) {
    for (let i = 0; i < perms.length; i++) {
        let val = run(perms[i]);
        console.log(val);
        if (val > largest) {
            largest = val;
            string = perms[i];
        }
    }
}
get_largest(perms2);

console.log('\n');
console.log('Part 2: ');
console.log("Phase Settings: " + string + " -> ");
console.log("Highest Signal: " + largest);