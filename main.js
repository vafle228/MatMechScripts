const fs = require("fs");
const AutomatonConstructor = require("./Automaton/automatonconstructor");

function validateData(input, substring, count) {
    return !isNaN(count) && fs.existsSync(input) && fs.existsSync(substring);
}

let count_time = false;
let substr_count = Infinity;
let print_automaton = false;

let i = 1, is_still_flags = true;
while (is_still_flags){
    switch (process.argv[++i]){
        case "-t": count_time = true; break;
        case "-a": print_automaton = true; break;
        case "-n": substr_count = +process.argv[++i]; break;
        
        default: is_still_flags = false;
    };
}

const [str_file, substr_file] = [...process.argv.slice(i)];

if (validateData(str_file, substr_file, substr_count)) {
    const string = fs.readFileSync(str_file, "utf-8");
    const sub_string = fs.readFileSync(substr_file, "utf-8");

    const automaton = AutomatonConstructor.constructAutomaton(sub_string);

    const start_time = new Date().getTime();

    let count = 0;
    for (let i = 0; i < string.length; i++) {
        if (count === substr_count) break;
        if (automaton.nextStep(string[i])) { console.log(i - sub_string.length); count++; }
    }

    const end_time = new Date().getTime();
    if (count_time) console.log(`Execute Time: ${end_time - start_time}ms`);

    if (print_automaton) console.log(`Automaton:\n${automaton.toString()}`);
}

else { console.log("Something went wrong! Check your args"); }
