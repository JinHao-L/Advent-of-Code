// Day 22: Crab Combat
// https://adventofcode.com/2020/day/22

const fs = require('fs');
const read = fs.readFileSync("AOC-2020/Day22_input.txt");
const players = read.toString().trim().split("\r\n\r\n");

let player1 = players[0].slice(players[0].indexOf(":\r\n") + 3).split("\r\n").map(x => parseInt(x));
let player2 = players[1].slice(players[1].indexOf(":\r\n") + 3).split("\r\n").map(x => parseInt(x));

function countScore(deck) {
    let score = 0;
    for(let i = 0; i < deck.length; i++) {
        score += deck[i] * (deck.length - i);
    }
    return score;
}

// Part 1
function playCombat(player1, player2) {
    let deck1 = [...player1];
    let deck2 = [...player2];
    while (deck1.length != 0 && deck2.length != 0) {
        const c1 = deck1.shift();
        const c2 = deck2.shift();
        if (c1 > c2) {
            deck1.push(c1);
            deck1.push(c2);
        } else {
            deck2.push(c2);
            deck2.push(c1);
        }
    }

    const score1 = countScore(deck1);
    const score2 = countScore(deck2);
    console.log("P1's score -", score1, "\nP2's score -", score2);
    return Math.max(score1, score2);
}

console.log("Part 1:", playCombat(player1, player2), "\n");

// Part 2
let gameCount = 0;
let p1WinCount = 0;
let p2WinCount = 0;
function playRecursiveCombat(player1, player2) {
    let tracker = new Set();
    gameCount++;
    const currGame = gameCount;
    let deck1 = player1;
    let deck2 = player2;

    while (deck1.length != 0 && deck2.length != 0) {
        if (tracker.has(deck1 + "|" + deck2)) {
            p1WinCount++;
            // console.log("Game", currGame, "Player 1 won");
            return [countScore(deck1), 1]
        }
        tracker.add(deck1 + "|" + deck2);

        deck1 = [...deck1];
        deck2 = [...deck2];

        const c1 = deck1.shift();
        const c2 = deck2.shift();
        let winner;
        if (deck1.length >= c1 && deck2.length >= c2) {
            
            winner = playRecursiveCombat(deck1.slice(0, c1), deck2.slice(0, c2))[1];
        } else {
            winner = c1 > c2 ? 1 : 2;
        }

        if (winner == 1) {
            deck1.push(c1);
            deck1.push(c2);
        } else {
            deck2.push(c2);
            deck2.push(c1);
        }
    }

    const score1 = countScore(deck1);
    const score2 = countScore(deck2);
    if (score1 > score2) {
        p1WinCount++;
        // console.log("Game", currGame, "Player 1 won");
        return [score1, 1];
    } else {
        p2WinCount++;
        // console.log("Game", currGame, "Player 2 won");
        return [score2, 2];
    }
}

const part2GameResult = playRecursiveCombat(player1, player2);
console.log("Recursive Combat Games played:", gameCount);
console.log("Player 1 win rate:", p1WinCount * 1.0 / gameCount);
console.log("Player 2 win rate:", p2WinCount * 1.0 / gameCount);
console.log("Ultimate winner: Player", part2GameResult[1]);
console.log("Part 2:", part2GameResult[0]);