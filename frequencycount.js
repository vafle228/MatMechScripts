class FrequencyCounter {
    constructor(start_symb, end_symb) {
        this._end_symb = end_symb.charCodeAt(0);
        this._start_symb = start_symb.charCodeAt(0);
    }

    _isAlphabet(char) {
        const char_code = char.charCodeAt(0)
        return (this._start_symb <= char_code) && (char_code <= this._end_symb)
    }

    countFrequency(text) {
        const frequency = new Object();
        
        let text_len = 0;
        for (let i = 0; i < text.length; i++) {
            if (this._isAlphabet(text[i])) {
                if (frequency[text[i]] === undefined)
                    frequency[text[i]] = 0;
                frequency[text[i]] += 1; text_len += 1;
            }
        }

        for (let i = this._start_symb; i <= this._end_symb; i++) {
            const cur_char = String.fromCharCode(i);
            frequency[cur_char] = frequency[cur_char] / text_len;
        }
        return frequency;
    }
}

module.exports = FrequencyCounter;
