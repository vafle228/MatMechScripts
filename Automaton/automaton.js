class Automaton {
    constructor(automaton, substr) {
        this._current_step = 0;
        this._automaton = automaton;
        this._substr_len = substr.length;
    }

    nextStep(letter) {
        const return_val = this._current_step === this._substr_len;
        this._current_step = this._automaton[this._current_step][letter] || 0;

        return return_val;
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
