// Day 4: Secure Container
// https://adventofcode.com/2019/day/4

function check1(num) {
    // Part1: 
    num = num.toString();
    let double = false;
    let prev = num.slice(0, 1);

    for (let i = 1; i < 6; i++) {
        const current = num.slice(i, i + 1);
        if (prev <= current) {
            if (!double && prev == current) {
                double = true;
            }
        } else {
            return false;
        }
        prev = current;
    }
    return double;
}

function check2(num) {
    // Part2: 
    num = num.toString();
    let double = false;
    let processing = false;
    let prev = num.slice(0,1);

    for(let i = 1; i < 6; i++) {
        const current = num.slice(i,i+1);
        if(prev <= current) {
            if(processing) {
                if(prev == current) {
                    double = false;
                } else if (prev < current) {
                    processing = false;
                }
            } else if (!double && prev == current) {
                double = true;
                processing = true;
            }
        } else {
            return false;
        }
        prev = current;
    }
    return double;
}

// 272091 - 815432 => 277777 - 800000
let i = 277777;
let count1 = 0;
let count2 = 0;
while(i < 800000) {
    if (check1(i)) {
        count1++;
    }
    if (check2(i)) {
        count2++;
    }
    i++;
}

console.log("Part1: " + count1);
console.log("Part2: " + count2);