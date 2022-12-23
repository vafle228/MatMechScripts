const fs = require("fs");
const findSubstring = require("./boiermoor");

function validateData(input, substring, count) {
    return !isNaN(count) && fs.existsSync(input) && fs.existsSync(substring);
}

let count_time = false;
let substr_count = Infinity;

let i = 1, is_still_flags = true;
while (is_still_flags){
    switch (process.argv[++i]){
        case "-t": count_time = true; break;
        case "-n": substr_count = +process.argv[++i]; break;
        
        default: is_still_flags = false;
    };
}

const [str_file, substr_file] = [...process.argv.slice(i)];

if (validateData(str_file, substr_file, substr_count)) {
    const string = fs.readFileSync(str_file, "utf-8");
    const substring = fs.readFileSync(substr_file, "utf-8");
    
    const boiermoor = findSubstring(string, substring);
    
    const start_time = new Date().getTime();

    let result = 0;
    while (substr_count > 0) {
        result = boiermoor();

        if (result === undefined) break;

        console.log(result); substr_count--;
    }

    const end_time = new Date().getTime();
    if (count_time) console.log(`Execute Time: ${end_time - start_time}ms`);
}

else { console.log("Something went wrong! Check your args"); }
