function check(num) {
    num.toString();
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
let i = 277777;
let count = 0;
while(i < 800000) {
    if (check(i.toString())) {
        count++;
    }
    i++;
}
console.log(count);