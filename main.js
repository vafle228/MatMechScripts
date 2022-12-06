const convertToPoland = require("./polandnotation");
const countPolandNotation = require("./polandcounter");

const exp = "(1.5 + 2) * (3 ^ 2 - 4) / 2 + 10 ^ 2";

const poland_notation = convertToPoland(exp);
const exp_result = countPolandNotation(poland_notation);


console.log(`Expression result: ${exp_result}`);
console.log(`Poland notation: ${poland_notation}`);
