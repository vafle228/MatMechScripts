const convertToPoland = require("./polandnotation");
const countPolandNotation = require("./polandcounter");

const exp = process.argv[2];

const poland_notation = convertToPoland(exp);
const exp_result = countPolandNotation(poland_notation);


console.log(`Expression result: ${exp_result}`);
console.log(`Poland notation: ${poland_notation}`);
