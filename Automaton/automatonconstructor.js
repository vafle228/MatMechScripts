const Automaton = require("./automaton");

class AutomatonConstructor {
    static constructAutomaton(substr) {
        const automaton = new Array(substr.length + 1);
        const alphabet = AutomatonConstructor._initAlphabet(substr);

        automaton[0] = alphabet;
        for (let i = 1; i <= substr.length; i++) automaton[i] = new Object();

        for (let i = 0; i < substr.length; i++) {
            const previous_step = automaton[i][substr[i]];
            automaton[i][substr[i]] = i + 1;

            for (let letter in alphabet)
                automaton[i + 1][letter] = automaton[previous_step][letter];
        }
        return new Automaton(automaton, substr);
    }

    static _initAlphabet(string) {
        const alphabet = new Object();
        for (let i = 0; i < string.length; i++) alphabet[string[i]] = 0;
        return alphabet;
    }
}

module.exports = AutomatonConstructor;
