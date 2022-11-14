const Automaton = require("./automaton");

class AutomatonConstructor {
    static constructAutomaton(substr) {
        const automaton = new Array();
        const alphabet = AutomatonConstructor._initAlphabet(substr);

        for (let i = 0; i < substr.length; i++) automaton[i] = alphabet;

        for (let i = 0; i < automaton.length; i++) {
            const previous_step = automaton[i][substr[i]];
            automaton[i][substr[i]] = j + 1;

            for (let letter in alphabet)
                automaton[i + 1][letter] = automaton[previous_step][letter];
        }
        return new Automaton(automaton, substr);
    }

    static _initAlphabet(string) {
        const alphabet = new Object();
        for (let i = 0; i < string; i++) alphabet[string[i]] = 0;
        return alphabet;
    }
}

module.exports = AutomatonConstructor;
