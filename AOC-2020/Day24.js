// Day 24: Lobby Layout
// https://adventofcode.com/2020/day/24

const fs = require('fs');
const read = fs.readFileSync("AOC-2020/Day24_input.txt");
const input = read.toString().trim().split("\r\n");

const identifiers = input.map(instr => instr.match(/e|se|sw|w|nw|ne/g));
let blackTiles = new Set();

function getPosition(identifier) {
    // reference position
    let posX = 0;
    let posY = 0;
    identifier.forEach(dirn => {
        switch (dirn) {
            case "e":
                posX++;
                break;
            case "se":
                posX += posY % 2 == 0 ? 1 : 0;
                posY++;
                break;
            case "sw":
                posX -= posY % 2 == 0 ? 0 : 1;
                posY++;
                break;
            case "w":
                posX--;
                break;
            case "nw":
                posX -= posY % 2 == 0 ? 0 : 1;
                posY--;
                break;
            case "ne":
                posX += posY % 2 == 0 ? 1 : 0;
                posY--;
                break;
            default:
                break;
        }
    });
    return posX + "," + posY;
}

identifiers.forEach(i => {
    const pos = getPosition(i);
    if (blackTiles.has(pos)) {
        blackTiles.delete(pos);
    } else {
        blackTiles.add(pos);
    }
})

console.log("Part 1:", blackTiles.size);

function getAdjacents(i, j) {
    const arr = [];
    // e
    arr.push((i + 1) + "," + j);
    
    // w
    arr.push((i - 1) + "," +  j);

    const isEven = j % 2 == 0;
    // se
    arr.push((i + isEven) + "," + (j + 1));
    // sw
    arr.push((i - 1 + isEven) + "," + (j + 1));
    // nw
    arr.push((i - 1 + isEven) + "," + (j - 1));
    // ne
    arr.push((i + isEven) + "," + (j - 1));

    return arr;
}

function nextDay(prevBlackTiles) {
    const currBlackTiles = new Set();
    prevBlackTiles.forEach(position => {
        let [posX, posY] = position.split(",").map(x => parseInt(x));
        const adjacents = getAdjacents(posX, posY);

        let adjBlacks = 0;
        adjacents.forEach(p => {
            if (prevBlackTiles.has(p)) {
                adjBlacks++;
            } else {
                const whiteAdj = getAdjacents(...p.split(",").map(x => parseInt(x)));
                let adjBlacksWhite = 0;
                for (let i = 0; i < whiteAdj.length && adjBlacksWhite <= 2; i++) {
                    if (prevBlackTiles.has(whiteAdj[i])) {
                        adjBlacksWhite++;
                    }
                }

                if (adjBlacksWhite == 2) {
                    currBlackTiles.add(p);
                }
            }
        })

        if (adjBlacks > 0 && adjBlacks <= 2) {
            currBlackTiles.add(position);
        }
    })

    return currBlackTiles;
}

for(let i = 0; i < 100; i++) {
    blackTiles = nextDay(blackTiles);
    console.log("Day", i + 1, ":", blackTiles.size);
}

console.log("Part 2:", blackTiles.size);