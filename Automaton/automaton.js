class Automaton {
    constructor(automaton, substr) {
        this._buffer = "";
        this._substr = substr;
        this._automaton = automaton;
    }

    nextStep(letter) {
        if (this._buffer + letter === this._substr) return 1;

        const step = this._buffer.length
        const letter_to_go = this._automaton[step][letter] || 0;
        this._buffer = this._substr.substring(0, letter_to_go);

        return 0;
    }

    toString() {
        let automaton_table = "";
        for (let i = 0; i < this._automaton.length; i++) {
            automaton_table += `${i} | `;
            for (let letter in this._automaton[i])
                automaton_table += `${letter}: ${this._automaton[i][letter]} | `;
            automaton_table += "\n";
        }
        return automaton_table;
    }
}

module.exports = Automaton;
