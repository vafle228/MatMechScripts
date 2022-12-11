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
        this._alpha_len = this._end - this._start;
    }

    hackText(text) {
        let min_shift = Infinity;
        // const text_freq = FrequencyCounter.countFrequency(text);

        const possible_lens = new Array();
        for (let len = 1; len <= key_max_len; len++) {
            const match_index = this._predictLength(text, len);
            if (match_index >= this._sense) possible_lens.push(len);
        }
        console.table(possible_lens)

        // for (let key_len = 1; key_len <= key_max_len; key_len++) {
        //     let cracked_key = new String(); cracked_key.length = key_len;
            
        //     for (let key_index = 0; key_index < key_len; key_index++) {
        //         for (let sym_shift = 0; sym_shift < this._alpha_len; sym_shift++) {
        //             let current_diff = 0;
        //             for (let freq_index = 0; freq_index < this._alpha_len; freq_index++) {
        //                 const natural_val = this._natural_freq[freq_index];
        //                 const text_val = text_freq[String.fromCharCode()]
        //             }
        //         }
        //     }
        // }
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

        let avarage = 0;
        for (let i = 0; i < max_len; i++)
            avarage += key_len_chance[i];
        return avarage / max_len;
    }

    _isAlphabet(char) {
        const char_code = char.charCodeAt(0);
        return (this._start <= char_code) && (char_code <= this._end);
    }
}


module.exports = VizinerHack;