const convertToPoland = require("./polandnotation");
const countPolandNotation = require("./polandcounter");

const exp = process.argv[2];

const poland_notation = convertToPoland(exp);
const exp_stack = countPolandNotation(poland_notation);


if (exp_stack.length !== 1) {
    console.log("Check your math exp!")
}
else {
    console.log(`Expression result: ${exp_stack.pop()}`);
    console.log(`Poland notation: ${poland_notation}`);
}
