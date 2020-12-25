// Day 25: Combo Breaker
// https://adventofcode.com/2020/day/25

const card_pkey = 17115212;
const door_pkey = 3667832;

function loop(value, subject, count) {
    while (count > 0) {
        value *= subject;
        value %= 20201227;
        count--;
    }
    return value;
}

function getLoopSz(subject, target) {
    let loop_sz = 0;
    let value = 1;
    while(value != target) {
        value = loop(value, subject, 1);
        loop_sz++;
    }
    return loop_sz;
}
const card_loop_sz = getLoopSz(7 , card_pkey);
const door_loop_sz = getLoopSz(7 , door_pkey);
// console.log(card_loop_sz, door_loop_sz);

const key1 = loop(1, door_pkey, card_loop_sz);
// const key2 = loop(1, card_pkey, door_loop_sz);
console.log("Encryption key: ", key1);

// Merry Christmas 2020 :D