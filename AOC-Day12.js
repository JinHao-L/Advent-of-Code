let positions = [];
let velocities = [];

const data = [
    [16, -8, 13],
    [4, 10, 10], 
    [17, -5, 6], 
    [13, -3, 0]
];

const test1 = [
    [-1, 0, 2], 
    [2, -10, -7], 
    [4, -8, 8], 
    [3, 5, -1]
];

const test2 = [
    [-8, -10, 0], 
    [5, 5, 10], 
    [2, -7, 3], 
    [9, -8, -3]
]

const to_run = data;

function step() {
    // Gravity
    for(let planet1 = 0; planet1 < 3; planet1++) {
        for(let planet2 = planet1 + 1; planet2 < 4; planet2++) {
            for(let axis = 0; axis < 3; axis++) {
                if (positions[planet1][axis] < positions[planet2][axis]) {
                    velocities[planet1][axis]++;
                    velocities[planet2][axis]--;
                } else if (positions[planet1][axis] > positions[planet2][axis]) {
                    velocities[planet1][axis]--;
                    velocities[planet2][axis]++;
                } else {}
            }
        }
    }

    // Apply velocity
    for (let planet = 0; planet < 4; planet++) {
        for (let axis = 0; axis < 3; axis++) {
            positions[planet][axis] += velocities[planet][axis];
        }
    }
}

// function get_energy() {
//     let Total_energy = 0;
//     for (let planet = 0; planet < 4; planet++) {
//         let KE = 0;
//         let PE = 0;
//         for (let axis = 0; axis < 3; axis++) {
//             PE += Math.abs(positions[planet][axis]);
//             KE += Math.abs(velocities[planet][axis]);
//         }
//         Total_energy += KE * PE;
//     }
//     console.log("SUM: " + Total_energy);
// }

function loop(axis) {
    console.log("   axis: " + axis);
    let time_steps = 0;

    //Setup
    positions = [];
    velocities = [];

    for (let i = 0; i < to_run.length; i++) {
        positions[i] = [];
        velocities[i] = [];
        for (let j = 0; j < to_run[0].length; j++) {
            positions[i].push(to_run[i][j]);
            velocities[i].push(0);
        }
    }

    let steps = 0;

    //Checker functions
    function is_stationary(arr, axis) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][axis] != 0) {
                return false;
            }
        }
        return true;
    }

    function is_correct_positions(arr, axis) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][axis] != to_run[i][axis]) {
                return false;
            }
        }
        return true;
    }

    // Check velocities, Get period
    while (true) {
        for (let i = 0; i < substeps; i++) {
            step();
        }
        time_steps += substeps;

        // console.log("Time: " + time_steps);

        if (is_stationary(velocities, axis)) {
            steps = time_steps;
            break;
        }
    }
    console.log("   Steps: " + steps);

    // Check pos
    while (true) {
        if (is_correct_positions(positions, axis)) {
            console.log(" -- Breaking -- ");
            console.log("Current Period: " + time_steps);
            console.log('\n');
            return time_steps;
        }

        for (let i = 0; i < steps; i++) {
            step();
        }

        time_steps += steps;
        // console.log("Time: " + time_steps);
    }
}
function gcd(a, b) {
    return a % b == 0 ?
        b :
        gcd(b, a % b);
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

let x = loop(0);
let y = loop(1);
let z = loop(2);
let ans = lcm(x, lcm(y, z));
console.log("Answer: " + ans);

// console.log("POS: ");
// console.log(positions);

// console.log("Velocity: ");
// console.log(velocities);

