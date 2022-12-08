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
    }

    encodeText(text) {
        let result = "";
        for (let i = 0; i < text.length; i++) {
            if (this._isAlphabet(text[i])) {
                const current_key = this._secret_key[i % this._secret_key.length]
                result += this._encodeChar(text[i], current_key);
            }
        }
        return result;
    }

    _isAlphabet(char) {
        const char_code = char.charCodeAt(0)
        return (this._start <= char_code) && (char_code <= this._end)
    }

    _encodeChar(char, key) {
        const key_code = key.charCodeAt(0);
        const char_code = char.charCodeAt(0);
        
        if (key_code + char_code > this._end)
            return String.fromCharCode(key_code + char_code - this._start);
        return String.fromCharCode(key_code + char_code);
    }
}

module.exports = VizinerEncode;
