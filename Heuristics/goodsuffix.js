const IHeuristic = require("./heuristic");

class GoodSuffixHeuristic extends IHeuristic{
    constructor(substring) {
        super();
        this._max_offset = substring.length;
        this._offset_table = this._initOffsetTable(substring);
    }

    _initOffsetTable(substring) {
        const offset_table = new Array(substring.length);

        for (let len = 0; len <= substring.length; len++) {
            const rpr = this._getRPR(substring, len);
            offset_table[len] = substring.length - rpr - len + 1;
        }
            
        return offset_table;
    }

    _getRPR(string, len) {
        for (let k = string.length - len; ; k--) {
            const third_satisfied = this._thirdCondition(string, k, len);
            const second_satisfied = this._secondCondition(string, k, len);

            if (second_satisfied && third_satisfied) return k;
        }
    }
    
    _secondCondition(string, k, len) {
        const m = string.length;
        for (let i = 0; i < len; i++) {
            if (k + i - 1 < 0) continue;
            if (string[k + i - 1] !== string[m - len + i]) return false;
        }
        return true;
    }

    _thirdCondition(string, k, len) {
        const m = string.length;
        return (k > 1 && string[k - 2] !== string[m - len - 1]) || (k <= 1);
    }

    getOffset(char, l) { return this._offset_table[char] ?? this._max_offset; }
}

module.exports = GoodSuffixHeuristic;
