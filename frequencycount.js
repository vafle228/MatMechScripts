class FrequencyCounter {
    constructor(start_symb, end_symb) {
        this._end_symb = end_symb.charCodeAt(0);
        this._start_symb = start_symb.charCodeAt(0);
    }

    countFrequency(text, start = 0, offset = 1) {
        const frequency = this._initFrequency();
        
        let text_len = 0;
        for (let i = start; i < text.length; i += offset) {
            if (this._isAlphabet(text[i]))
                frequency[text[i]] += 1; text_len += 1;
        }

        for (let i = this._start_symb; i <= this._end_symb; i++) {
            const cur_char = String.fromCharCode(i);
            frequency[cur_char] = frequency[cur_char] / text_len;
        }
        return frequency;
    }

    _isAlphabet(char) {
        const char_code = char.charCodeAt(0)
        return (this._start_symb <= char_code) && (char_code <= this._end_symb)
    }

    _initFrequency() {
        const frequency_obj = new Object();
        for (let a = this._start_symb; a <= this._end_symb; a++)
            frequency_obj[String.fromCharCode(a)] = 0;
        return frequency_obj;
    }
}

module.exports = FrequencyCounter;
