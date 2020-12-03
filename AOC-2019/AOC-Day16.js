// Day 16: Flawed Frequency Transmission
// https://adventofcode.com/2019/day/16

const input = "59768092839927758565191298625215106371890118051426250855924764194411528004718709886402903435569627982485301921649240820059827161024631612290005106304724846680415690183371469037418126383450370741078684974598662642956794012825271487329243583117537873565332166744128845006806878717955946534158837370451935919790469815143341599820016469368684893122766857261426799636559525003877090579845725676481276977781270627558901433501565337409716858949203430181103278194428546385063911239478804717744977998841434061688000383456176494210691861957243370245170223862304663932874454624234226361642678259020094801774825694423060700312504286475305674864442250709029812379";
const test0 = "12345678";
const test1 = "03036732577212944063491565474664";
const test2 = "02935109699940807407585447034323";
const test3 = "03081770884921959731165446850517";

let msg_offset, multiplier, msg_start, extended_len;

function setup(main, part) {
    const data = main.split("");
    const len = data.length;

    if (part == "Part1") {
        msg_offset = 0;
        multiplier = 1;
    } else if (part == "Part2") {
        msg_offset = parseInt(main.slice(0, 7), 10);
        multiplier = 10000;
    }
    extended_len = multiplier * len;

    msg_start = [];
    const diff = multiplier - Math.floor(msg_offset / len);
    msg_start = data.slice(msg_offset % len);
    for (let i = 0; i < diff - 1; i++) {
        msg_start = msg_start.concat(data);
    }
}

function run(input, phase, iter) {
    if (phase == 0) {
        console.log("Input signal: " + stringify(input));
    } else if (phase >= iter) {
        console.log("After " + phase + " phase: " + stringify(input));
        console.log('\n');
        return stringify(input);
    } else { 
        console.log("After " + phase + " phase: " + stringify(input));
    }
    
    let output = [];
    const len = input.length;

    if (msg_offset > extended_len / 2) {
        // op = 'JUST ADD';
        output[0] = input.reduce((a, b) => a + parseInt(b, 10), 0);
        let temp = output[0];
        output[0] = Math.abs(output[0] % 10);

        for (let line = 1; line < len; line++) {
            output[line] = temp - input[line - 1];
            temp = output[line];
            output[line] = Math.abs(output[line] % 10);
        }
    } else {
        for (let line = 0; line < len; line++) {
            const times = line + 1 + msg_offset;
            output[line] = 0;
            let op = 'ADD';
            let count = times;
            for (let j = line; j < len; j++) {
                count--;
                if (j >= len) {
                    break;
                } else {
                    if (op == 'ADD') {
                        // console.log("   ADD: " + j);
                        output[line] += parseInt(input[j], 10);
                    } else if (op == 'MINUS') {
                        // console.log("   MINUS: " + j);
                        output[line] -= parseInt(input[j], 10);
                    } else {
                        return error;
                    }
                }
                if (count <= 0) {
                    if (op == 'ADD') {
                        op = 'MINUS';
                    } else {
                        op = 'ADD';
                    }
                    j += times;
                    count = times;
                }
            }

            output[line] = Math.abs(output[line] % 10);
        }
    }
    return run(output, phase + 1, iter);
}

function stringify(arr) {
    let res = "";
    for(let i = 0; i < 8; i++) {
        res += arr[i];
    }
    return res;
}

setup(input, 'Part1');
console.log("Part 1: " + run(msg_start, 0, 100));

console.log('\n');

setup(input, 'Part2');
console.log("Part 2: " + run(msg_start, 0, 100));