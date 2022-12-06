const stack = new Array();
const push_characters = ["+", "-", "*", "/", "^"];


function getPriorityLvl(operation) {
    switch (operation) {
        case "^": return 3;
        case "*": case "/": return 2;
        case "+": case "-": return 1;

        default: return 0;
    }
}

function isBiggerPriority(op1, op2) {
    return getPriorityLvl(op1) >= getPriorityLvl(op2)
}

function convertToPoland(exp) {
    let postfix_string = "";
    for (let i = 0; i < exp.length; i++) {
        if (exp[i] === " ") continue;

        if (push_characters.includes(exp[i])) {
            postfix_string += " ";
            while (isBiggerPriority(stack[stack.length - 1], exp[i]))
                postfix_string += stack.pop() + " ";
            stack.push(exp[i]);
        }

        else if (exp[i] === ")") {
            while (stack[stack.length - 1] !== "(")
                postfix_string += " " + stack.pop();
            stack.pop();
        }

        else if (exp[i] === "(") { stack.push(exp[i]); }

        else { postfix_string += exp[i]; }
    }

    while (stack.length !== 0) 
        postfix_string += " " + stack.pop();
    return postfix_string;
}


module.exports = convertToPoland;
