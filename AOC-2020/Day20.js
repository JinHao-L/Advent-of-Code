// Day 20: Jurassic Jigsaw
// https://adventofcode.com/2020/day/20


const fs = require('fs');
const read = fs.readFileSync("AOC-2020/Day20_input.txt");
const inputs = read.toString().trim().split("\r\n\r\n");
const nTiles = inputs.length;
const imgLen = Math.sqrt(nTiles);

const jigsaw = inputs.map(t => {
    let [tileNum, img] = t.split(":\r\n");
    tileNum = parseInt(tileNum.substr(tileNum.indexOf(" ")));
    img = img.split("\r\n").map(row => row.split(""));
    return {
        id: tileNum,
        tile: img,
    };
})
const tileLen = jigsaw[0]["tile"].length;

function flip(matrix) {
    let copy = new Array(matrix.length);
    copy.fill(0);
    copy = copy.map(x => new Array(matrix.length));
    for(let i = 0; i < matrix.length; i++) {
        for(let j = i; j < matrix[0].length; j++) {
            copy[i][j] = matrix[j][i];
            copy[j][i] = matrix[i][j];
        }
    }
    return copy;
}

function rotate90(matrix) {
    const flipped = flip(matrix);
    for(let i = 0; i < matrix.length; i++) {
        for(let j = 0; j < matrix.length / 2; j++) {
            const temp = flipped[i][j];
            flipped[i][j] = flipped[i][matrix.length - 1 - j];
            flipped[i][matrix.length - 1 - j] = temp;
        }
    }
    return flipped;
}

function draw(matrix) {
    return matrix.reduce((acc, row) => acc + "\n" + row.reduce((a, curr) => a + curr), "");
}

const puzzle = new Array(imgLen).fill(1).map(x => new Array(imgLen));
const usedId = new Set();
function dfs(row, col) {
    if (row >= imgLen) {
        return true;
    }

    if (col >= imgLen) {
        return dfs(row + 1, col % imgLen);
    }

    for(let i = 0; i < nTiles; i++) {
        if (usedId.has(i)) {
            continue;
        }

        let currTile = jigsaw[i]["tile"];
        for(let t = 0; t < 8; t++) {
            if (t == 4) {
                currTile = flip(currTile);
            }

            let fits = true;
            // check if it fits
            if (row > 0) {
                // check if top fits
                for(let i = 0; i < tileLen; i++) {
                    if (currTile[0][i] != puzzle[row - 1][col]["tile"][tileLen - 1][i]) {
                        fits = false;
                        break;
                    }
                }
            }

            if (fits && col > 0) {
                // check if left fits
                for(let i = 0; i < tileLen; i++) {
                    if (currTile[i][0] != puzzle[row][col - 1]["tile"][i][tileLen - 1]) {
                        fits = false;
                        break;
                    }
                }
            }

            if (fits) {
                puzzle[row][col] = {"id": jigsaw[i]["id"], "tile": currTile};
                usedId.add(i);
                if (dfs(row, col + 1)) {
                    return true;
                } else {
                    puzzle[row][col] = undefined;
                    usedId.delete(i);
                }
            }

            currTile = rotate90(currTile);
        }
    }
    return false;
}

dfs(0, 0);
console.log("Part 1:", (puzzle[0][0]["id"] * puzzle[0][imgLen - 1]["id"] * puzzle[imgLen - 1][0]["id"] * puzzle[imgLen - 1][imgLen - 1]["id"]));


// Part 2
const fullLen = imgLen * (tileLen - 2);
const actualImage = new Array(fullLen).fill(1).map(x => new Array(fullLen));

puzzle.forEach((row, r) => row.forEach((obj, c) => {
    const tile = obj["tile"];
    for(let i = 1; i < tileLen - 1; i++) {
        for(let j = 1; j < tileLen - 1; j++) {
            actualImage[r * (tileLen - 2) + i - 1][c * (tileLen - 2) + j - 1] = tile[i][j];
        }
    }
}));

function isMonsterTail(img, i, j) {
    if (i < 1 || i >= img.length - 1 || j < 0 || j >= img.length - 20) {
        return false;
    }
    const a = i;
    const b = j;

    let isTail = img[i][j] == "#" 
                && img[i + 1][++j] == "#";
    j += 3;
    for (let n = 0; n < 2; n++) {
        isTail = isTail 
            && img[i + 1][j] == '#' 
            && img[i][++j] == '#' 
            && img[i][++j] == '#' 
            && img[i + 1][++j] == '#'
        j += 3;
    }
    isTail = isTail && img[i + 1][j] == '#' && img[i][++j] == '#' && img[i][++j] == '#' && img[i - 1][j] == '#'  && img[i][++j] == '#';
    return isTail;
}

let numMonsters = 0;
let currImage = actualImage;
for(let t = 0; t < 8; t++) {
    if (t == 4) {
        currImage = flip(currImage);
    }
    let count = 0;
    currImage.forEach((x, r) => x.forEach((y, c) => {
        if (isMonsterTail(currImage, r, c)) {
            /** Capture Monsters */
            // console.log("\n", r, c);
            // for(let i = r - 1; i <= r + 1; i++) {
            //     let str = ""
            //     for(let j = c; j < c + 20; j++) {
            //         str += currImage[i][j];
            //     }
            //     console.log(str);
            // }

            count++;
        }
    }));
    if (count > 0) {
        numMonsters = count;
        break; 
    }
    currImage = rotate90(currImage);
}
console.log("Total num of monsters:", numMonsters);
function countHex(img) {
    return img.reduce((acc, row) => acc + row.reduce((acc2, val) => val == '#'? acc2 + 1 : acc2, 0), 0);
}
console.log("Part 2:", countHex(actualImage) - numMonsters * 15);