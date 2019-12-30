// Day 16: Flawed Frequency Transmission
// https://adventofcode.com/2019/day/16

const input = "59768092839927758565191298625215106371890118051426250855924764194411528004718709886402903435569627982485301921649240820059827161024631612290005106304724846680415690183371469037418126383450370741078684974598662642956794012825271487329243583117537873565332166744128845006806878717955946534158837370451935919790469815143341599820016469368684893122766857261426799636559525003877090579845725676481276977781270627558901433501565337409716858949203430181103278194428546385063911239478804717744977998841434061688000383456176494210691861957243370245170223862304663932874454624234226361642678259020094801774825694423060700312504286475305674864442250709029812379";
const test0 = "12345678";
const test1 = "80871224585914546619083218645595";
const test2 = "19617804207202209144916044189917";
const test3 = "69317163492948606335995924319873";

const data = input.split("");
// let enhanced_data = [];
// for (let i = 0; i < 10000; i++) {
//     enhanced_data = enhanced_data.concat(data);
// }
// console.log(enhanced_data);

const pattern_mem = [];
const base_pattern = [0, 1, 0, -1];

function run(input, phase) {
    if (phase == 0) {
        console.log("Input signal: " + stringify(input));
    } else if (phase >= 100) {
        console.log("After " + phase + " phase: " + stringify(input));
        return input;
    } else {
        console.log("After " + phase + " phase: " + stringify(input));
    }
    
    let output = [];
    const len = input.length;
    for(let i = 0; i < len; i++) {
        if (pattern_mem[i] == undefined) {
            pattern_create(i);
        }
        let pattern = pattern_mem[i].slice();
        output[i] = 0;

        for(let j = 0; j < len; j++) {
            const multiplier = pattern.shift();
            output[i] += input[j] * multiplier;
            pattern.push(multiplier);
        }
        output[i] = Math.abs(output[i]) % 10;
    }
    // console.log(stringify(output));
    return run(output, phase + 1);
}

function pattern_create(repeat_no) {
    let new_pat = [];
    for(let i = 0; i < base_pattern.length; i++) {
        for(let j = 0; j <= repeat_no; j++) {
            new_pat.push(base_pattern[i]);
        }
    }
    new_pat.push(new_pat.shift());
    pattern_mem[repeat_no] = new_pat;
}

function stringify(arr) {
    let res = "";
    for(let i = 0; i < arr.length; i++) {
        res += arr[i];
    }
    return res;
}

console.log('\n');
console.log("Part 1: " + stringify(run(data, 0).slice(0,8)));
