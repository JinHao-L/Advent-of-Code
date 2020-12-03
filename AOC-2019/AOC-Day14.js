// Day 14: Space Stoichiometry
// https://adventofcode.com/2019/day/14

const fs = require('fs');
const read = fs.readFileSync("AOC-2019/Day14.txt");
let data = read.toString().split("\r\n").map(recipe => recipe.split(" => "));

let original_ptr = undefined;
let recipes = [];
let excess = [];

for(let i = 0; i < data.length; i++) {
    let ingredients = data[i][0].split(", ");
    let temp = data[i][1].split(" ");
    let output = temp[1];
    let num_output = parseInt(temp[0], 10);
    let inputs = [];
    for (const elements of ingredients) {
        let temp1 = elements.split(" ");
        let num = parseInt(temp1[0], 10);
        let name = temp1[1];
        inputs.push([num, name]);
    }
    if (output == 'FUEL') {
        original_ptr = recipes[recipes.push([num_output, output], inputs) - 1];
    } else {
        recipes.push([[num_output, output], inputs]);
    }
}

let fuel_ptr = undefined;
function copy_and_multiply(arr, multiplier) {
    fuel_ptr = [];
    for (let i = 0; i < original_ptr.length; i++) {
        const num = original_ptr[i][0] * multiplier;
        const name = original_ptr[i][1];
        fuel_ptr.push([num, name]);
    }
    return fuel_ptr;
}

function next() {
    while(fuel_ptr.length > 1) {
        let item = fuel_ptr.shift();

        if (item[1] == 'ORE') {
            add(fuel_ptr, item);
        } else {
            let temp = search(item[1]);
            let output_number = temp[0];
            let ingred_list = temp[1];

            let multiplier = Math.ceil(item[0] / output_number);
            if (item[0] < output_number * multiplier) {
                add(excess, [output_number * multiplier - item[0], item[1]]);
            }
            for (let index = 0; index < ingred_list.length; index++) {
                const ingred = ingred_list[index];
                let num = ingred[0] * multiplier;
                let name = ingred[1];

                // check excess stock
                const checker = check_excess(name, num);
                if (checker != undefined) {
                    if(checker >= num) {
                        continue;
                    } else {
                        num -= checker;
                    }
                }

                add(fuel_ptr, [num, name]);
            }
        }
    }

    // console.log('\n');
    // console.log(" Ans: " + fuel_ptr[0][0] + " " + fuel_ptr[0][1]);
    return fuel_ptr[0][0];
}

function search(item_name) {
    for (let index = 0; index < recipes.length; index++) {
        const element = recipes[index];
        if (element[0][1] == item_name) {
            return [element[0][0], element[1]];
        }
    }
}

function add(target, arr) {
    for (let i = 0; i < target.length; i++) {
        if (target[i][1] == arr[1]) {
            target[i][0] += arr[0];
            return;
        }
    }
    target.push(arr);
}

function check_excess(name, number) {
    for (let index = 0; index < excess.length; index++) {
        const ex_name = excess[index][1];
        if (ex_name == name) {
            const ex_amt = excess[index][0];
            if (ex_amt <= number) {
                excess.splice(index, 1);
            } else {
                excess[index][0] -= number;
            }
            return ex_amt;
        }
    }
    return undefined;
}

excess = [];
copy_and_multiply(original_ptr, 1);
const part1 = next();
console.log(1 + " fuels requires " + part1 + " ores");
console.log("Part 1: " + part1);

const startpt = Math.floor(1000000000000 / part1);
console.log('\n');
console.log("Starting pt: " + startpt);

function loop(multiplier, step, prev) {
    excess = [];
    copy_and_multiply(original_ptr, multiplier);
    const min_ores = next();
    console.log(multiplier + " fuels requires " + min_ores + " ores");

    if (min_ores > 1000000000000) {
        if (step == 1) {
            console.log('\n');
            console.log(multiplier - 1 + " fuels requires " + prev + " ores");
            return multiplier - 1;
        } else {
            console.log('Step change');
            return loop(multiplier - step, step / 10, min_ores);
        }
    } else {
        return loop(multiplier + step, step, min_ores);
    }
}

console.log("Part 2: " + loop(startpt, Math.pow(10, startpt.toString().length - 1), "NULL"));
