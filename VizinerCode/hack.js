const RussianFreq = require("../LanguageFreq/russianfreq");
const EnglishFreq = require("../LanguageFreq/englishfreq");
const FrequencyCounter = require("../frequencycount");

const key_max_len = 50;

const en_sense = 0.0644;
const rus_sense = 0.0553;

class VizinerHack {
    constructor(language) {
        let [start, end, freq, sense] = [...(function(){
            switch (language) {
                case "en": return ["a", "z", EnglishFreq.initEnglishFreq(), en_sense];
                case "rus": return ["а", "я", RussianFreq.initRussianFreq(), rus_sense];
            }
            return ["а", "я", RussianFreq.initRussianFreq(), rus_sense];
        })()];

        this._sense = sense;
        this._natural_freq = freq;

        this._end = end.charCodeAt(0);
        this._start = start.charCodeAt(0);
        this._alpha_len = this._end - this._start + 1;

        this._freq_counter = new FrequencyCounter(start, end);
    }

    hackText(text) {
        const possible_lens = new Array();
        for (let len = 1; len <= key_max_len; len++) {
            const match_index = this._predictLength(text, len);
            if (match_index >= this._sense) possible_lens.push(len);
            console.log(`Check ${len} len: ${match_index >= this._sense}`);
        }

        const possible_keys = new Array();
        for (let i = 0; i < possible_lens.length; i++) {
            let key = new String(); console.log(`Building ${possible_lens[i]} len key ...`);
            for (let j = 0; j < possible_lens[i]; j++) {
                const offset = this._preidctOffset(
                    this._freq_counter.countFrequency(text, j, possible_lens[i])
                );
                key += String.fromCharCode(this._start + offset);
            }
            possible_keys.push(key); console.log(`Built key '${key}'`)
            
        }
        return possible_keys;
    }

    _preidctOffset(text_freq) {
        let min_shift = Infinity; let shift_len = 0;
        for (let shift = 0; shift < this._alpha_len; shift++) {
            let current_shift = 0;
            
            for (let key in this._natural_freq) {
                const text_key = this._encodeChar(key, shift);
                current_shift += Math.pow(this._natural_freq[key] - text_freq[text_key], 2);
            }

            if (current_shift < min_shift) { [shift_len, min_shift] = [shift, current_shift]; }
        }
        return shift_len;
    }

    _predictLength(text, max_len) {
        const text_fragment = text;
        const key_len_chance = new Array(max_len).fill(0);
        
        for (let key_len = 0; key_len < max_len; key_len++) {
            const cur_freq = new Object();
            
            for (let key in this._natural_freq) cur_freq[key] = 0;
        
            for (let i = key_len; i < text_fragment.length; i += max_len)
                if (this._isAlphabet(text_fragment[i])) cur_freq[text_fragment[i]]++;
            
            let cur_len = 0;
            for (let key in cur_freq) {
                cur_len += cur_freq[key];
                key_len_chance[key_len] += cur_freq[key] * (cur_freq[key] - 1);
            }  
            key_len_chance[key_len] /= (cur_len * (cur_len - 1));
        }
        return key_len_chance.reduce((prev, cur) => prev + cur) / max_len;
    }

    _isAlphabet(char) {
        const char_code = char.charCodeAt(0);
        return (this._start <= char_code) && (char_code <= this._end);
    }

    _encodeChar(char, key) {
        const char_offset = this._charOffset(char, key) % this._alpha_len;

        if (char_offset >= 0)
            return String.fromCharCode(this._start + char_offset);
        return String.fromCharCode(this._end + char_offset + 1);
    }

    _charOffset(char, key) { 
        return char.charCodeAt(0) + key - this._start;
    }
}

module.exports = VizinerHack;
