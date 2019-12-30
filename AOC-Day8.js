// Day 8: Space Image Format
// https://adventofcode.com/2019/day/8

const fs = require('fs');
const input = fs.readFileSync("Day8.txt");
const data = input.toString().split("");

function get_layers(arr, width, height) {
    const result = [];
    const len = width * height;
    let j = -1;
    for (let i = 0; i < arr.length; i++) {
        if (i % len == 0) {
            j++;
            result[j] = [];
            result[j][i%len] = arr[i];
        } else {
            result[j][i % len] = arr[i];
        }
    }
    return result;
}
const layers = get_layers(data, 25, 6);

function check(lyr) {
    let fewest_zero = [150, 0, 0];
    for(let i = 0; i < lyr.length; i++) {
        let zeros = 0;
        let ones = 0;
        let twos = 0;
        for(let j = 0; j < lyr[i].length; j++) {
            if (lyr[i][j] == 0) {
                zeros++;
            } else if (lyr[i][j] == 1) {
                ones++;
            } else if (lyr[i][j] == 2) {
                twos++;
            }
        }
        if(fewest_zero[0] > zeros) {
            fewest_zero = [zeros, ones, twos];
        }
    }
    console.log("Layer: " + fewest_zero);
    return fewest_zero[1] * fewest_zero[2];
}

console.log("Part 1: " + check(layers));
console.log('\n');

function overlap(lyr) {
    let picture = [];
    for(let i = 0; i < lyr[0].length; i++) {
        let result = 2;
        for(let j = 0; j < lyr.length; j++) {
            if(lyr[j][i] == 1 || lyr[j][i] == 0) {
                result = lyr[j][i];
                break;
            };
        }
        picture[i] = result;
    }
    return picture;
}
const pic = overlap(layers);

function print(picture, width, height) {
    for(let h = 0; h < height; h++) {
        let row = "";
        for(let w = 0; w < width; w++) {
            const pixel = picture[width*h + w]
            row = row + pixel;
        }
        console.log(row);
    }
}

function clarity(img, width, height) {
    for (let h = 0; h < height; h++) {
        for (let w = 0; w < width; w++) {
            if (img[width * h + w] == 0) {
                img[width * h + w] = '.';
            } else {
                img[width * h + w] = '#';
            }
        }
    }
    return img;
}

console.log("Part2: ");
print(clarity(pic, 25, 6), 25, 6);