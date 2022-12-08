class VizinerEncode {
    constructor(secret_key, language) {
        this._secret_key = secret_key;

        let start, end;
        switch (language) {
            case "rus": [start, end] = ["а", "я"]; break;
            case "en": [start, end] = ["a", "z"]; break;

            default: [start, end] = ["а", "я"]; break;
        }

        this._end = end.charCodeAt(0);
        this._start = start.charCodeAt(0);
        this._alph_len = this._end - this._start;
    }

    encodeText(text) {
        let add_char = ""; let result = "";
        for (let i = 0; i < text.length; i++) {
            add_char = text[i].toLowerCase();
            if (this._isAlphabet(add_char)) {
                const current_key = this._secret_key[i % this._secret_key.length];
                add_char = this._encodeChar(add_char, current_key);
            }
            result += this._isCapital(text[i]) ? add_char.toUpperCase() : add_char
        }
        return result;
    }

    _isAlphabet(char) {
        const char_code = char.charCodeAt(0);
        return (this._start <= char_code) && (char_code <= this._end);
    }

    _isCapital(char) {
        return this._isAlphabet(char.toLowerCase()) && char.toUpperCase() === char
    }

    _encodeChar(char, key) {
        const char_offset = key.charCodeAt(0) + char.charCodeAt(0) - 2 * this._start;

        if (char_offset < 0)
            return String.fromCharCode(this._end + char_offset % this._alph_len);
        return String.fromCharCode(this._start + char_offset % this._alph_len);
    }
}

module.exports = VizinerEncode;
