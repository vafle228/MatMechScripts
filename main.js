function substringFindWrapper(hash_object, string, sub_string) {
    let str_hash, i = 0;
    const substr_hash = hash_object.hash(sub_string);

    return function () {
        for (i; i <= string.length - sub_string.length; i++) {
            str_hash = str_hash
                ? hash_object.recurent_hash(
                      str_hash,
                      string.substr(i - 1, sub_string.length),
                      string.substr(i, sub_string.length)
                  )
                : hash_object.hash(string.substr(i, sub_string.length));

            if (str_hash == substr_hash) {
                for (let j = 0; j < sub_string.length; j++) {
                    if (string[j + i] !== sub_string[j]) break;
                    if (j + 1 === sub_string.length) return i++;
                }
                collisions++;
            }
        }
    };
}

const fs = require("fs");

const SumHash = require("./HashFunctions/sumhash");
const SquareSumHash = require("./HashFunctions/squaresumhash");
const RubyKarpHash = require("./HashFunctions/rubykarphash");
const BruteForceHash = require("./HashFunctions/bruteforcehash");

let count_time = false;
let substr_count = Infinity;
let print_collisions = false;

let i = 1, is_still_flags = true;
while (is_still_flags){
    switch (process.argv[++i]){
        case "-t": count_time = true; break;
        case "-c": print_collisions = true; break;
        case "-n": substr_count = +process.argv[++i]; break;
        
        default: is_still_flags = false;
    };
}

const [hash_code, str_file, substr_file] = [...process.argv.slice(i)];

let collisions = 0;
let start_time = new Date().getTime();

const string = fs.readFileSync(str_file, "utf-8");
const sub_string = fs.readFileSync(substr_file, "utf-8");

const hash_object = {
    h1: SumHash,
    h2: SquareSumHash,
    h3: RubyKarpHash,
}[hash_code] || BruteForceHash;

const substr_finder = substringFindWrapper(hash_object, string, sub_string);

while (substr_count > 0){
    let result = substr_finder();

    if (result === undefined) break;

    console.log(result); substr_count--;
}

let end_time = new Date().getTime();
if (count_time) console.log(`Execute Time: ${end_time - start_time}ms`);

if (print_collisions) console.log(`Collisions: ${collisions}`);
