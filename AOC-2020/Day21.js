// Day 21: Allergen Assessment
// https://adventofcode.com/2020/day/21

const fs = require('fs');
const read = fs.readFileSync("AOC-2020/Day21_input.txt");
const inputs = read.toString().trim().split("\r\n");

const ingredientsTracker = {};
const candidates = {};
inputs.forEach(x => {
    const temp = x.substring(0, x.length - 1).split(" (contains ");
    const ingredients = temp[0].split(" ");
    const allergens = temp[1].split(", ");
    
    ingredients.forEach(i => {
        if (ingredientsTracker[i]) {
            ingredientsTracker[i] = ingredientsTracker[i] + 1;
        } else {
            ingredientsTracker[i] = 1;
        }
    })

    allergens.forEach(a => {
        if (candidates[a]) {
            // get intersection
            const updatedSet = new Set();
            ingredients.forEach(i => {
                if(candidates[a].has(i)) {
                    updatedSet.add(i);
                }
            })
            candidates[a] = updatedSet;
        } else { 
            candidates[a] = new Set(ingredients);
        }
    });
});

const numAllergens = Object.keys(candidates).length;
const confirmedMapping = new Map();
while(confirmedMapping.size < numAllergens) {
    for (const [allergen, set] of Object.entries(candidates)) {
        if (set.size == 1) {
            confirmedMapping.set(set.values().next().value, allergen);
        } else {
            for(const item of set) {
                if (confirmedMapping.has(item)) {
                    set.delete(item);
                }
            }
        }
    }
}

confirmedMapping.forEach((allergen, ingredient) => {
    delete ingredientsTracker[allergen];
})
let part1Count = 0;
for(const val of Object.values(ingredientsTracker)) {
    part1Count += val;
}
console.log("Part 1:", part1Count);

const sorted = [...confirmedMapping.entries()].sort((a, b) => a[1].localeCompare(b[1]));
// console.log(sorted);
console.log("Part 2:", sorted.reduce((acc, curr) => acc + "," + curr[0], "").slice(1));