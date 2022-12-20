const stack = new Array();
const count_characters = ["+", "-", "*", "/", "^"];


function countExp(a, b, operation) {
    switch (operation) {
        case "+": return b + a;
        case "-": return b - a;
        case "*": return b * a;
        case "/": return b / a;
        case "^": return Math.pow(b, a);

        default: return 0;
    }
}

function countPolandNotation(notation) {
    const exp = notation.split(" ");
    for (let i = 0; i < exp.length; i++) {
        if (count_characters.includes(exp[i])) {
            const [a, b] = [+stack.pop(), +stack.pop()];
            stack.push(countExp(a, b, exp[i]));
        }
        else { stack.push(exp[i]); }
    }
    return stack;
}

module.exports = countPolandNotation;
