// x = 0; y = 1; z = 2;
let positions = [];
let velocities = [];

// const data = [
//     [16, -8, 13],
//     [4, 10, 10], 
//     [17, -5, 6], 
//     [13, -3, 0]
// ];

const data = [
    [-1, 0, 2], 
    [2, -10, -7], 
    [4, -8, 8], 
    [3, 5, -1]
];

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

let substeps = 1;

function loop(axis) {
    //Setup
    positions = [];
    velocities = [];
    // Io;
    positions.push(data[0]);
    velocities.push([0, 0, 0]);

    // Europa;
    // positions.push([4, 10, 10]);
    positions.push(data[1]);
    velocities.push([0, 0, 0]);

    // Ganymede;
    // positions.push([17, -5, 6]);
    positions.push(data[2]);
    velocities.push([0, 0, 0]);

    // Callisto;
    // positions.push([13, -3, 0]);
    positions.push(data[3]);
    velocities.push([0, 0, 0]);

    let time_steps = 0;
    let steps = 0;

    function is_stationary(arr, axis) {
        // for (let i = 0; i < arr[0].length; i++) {
            for (let j = 0; j < arr.length; j++) {
                if (arr[j][axis] != 0) {
                    return false;
                }
            }
        // }
        // console.log(arr);
        return true;
    }

    function is_correct_positions(arr, axis) {
        for (let i = 0; i < arr.length; i++) {
            // for (let j = 0; j < arr[0].length; j++) {
                if (arr[i][axis] != data[i][axis]) {
                    return false;
                }
            // }
        }
        return true;
    }

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
    console.log(" Steps: " + steps);


    while (true) {
        for (let i = 0; i < steps; i++) {
            step();
        }

        time_steps += steps;

        // console.log("Time: " + time_steps);

        if (is_correct_positions(positions, axis)) {
            console.log("Breaking");
            console.log("Prev: " + time_steps);
            console.log("Before: " + substeps);
            substeps = lcm(time_steps, substeps);
            console.log("Acc: " + substeps);
            console.log("\n");
            return substeps;
        }
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

const x = loop(0);
const y = loop(1);
const z = loop(2);
console.log(z);

// console.log(lcm(z, lcm(x, y)));

// console.log("POS: ");
// console.log(positions);

// console.log("Velocity: ");
// console.log(velocities);

