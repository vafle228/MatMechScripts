function logWithBase(base){
    return (number) => Math.log(number) / Math.log(base);
}

function countFrequency(string){
    frequency = new Map();
    for(symbol of string){
        if(!frequency.has(symbol))
            frequency.set(symbol, 0);
        frequency.set(symbol, frequency.get(symbol) + 1);
    }
    frequency.forEach((value, key, map) => {
        map.set(key, value / string.length);
    });
    return frequency;
}

function countEntropy(frequency, log_base){
    let [result, log] = [0, logWithBase(log_base)];
    for([key, value] of frequency)
        result += value * log(value);
    return -result;
}


const fs = require("fs");
let [base, path] = [+process.argv[3], process.argv[2]];
let data_string = fs.readFileSync(path, "utf8");

let freq = countFrequency(data_string);
let entropy = countEntropy(freq, base || freq.size) || 0

for([key, value] of frequency){
    console.log(`Symbol ${key} | P ${value.toFixed(2)} | Entropy ${entropy.toFixed(2)}`);
}
