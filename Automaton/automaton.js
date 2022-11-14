class Automaton {
    constructor(automaton, substr) {
        this._buffer = "";
        this._substr = substr;
        this._automaton = automaton;
    }

    nextStep(letter) {
        if (this._buffer + letter === this._substr) return 1;

        const letter_to_go = this._automaton[letter] || 0;
        this._buffer = this._substr.substring(0, letter_to_go + 1);

        return 0;
    }
}

module.exports = Automaton;