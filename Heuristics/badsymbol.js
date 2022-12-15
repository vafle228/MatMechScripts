const IHeuristic = require("./heuristic");

class BadSymbolHeuristic extends IHeuristic {
    constructor(substring) {
        super();
        this._max_offset = substring.length
        this._offset_table = this._initOffsetTable(substring);
    }
    
    _initOffsetTable(substring) {
        const offset_table = new Object();

        for (let i = 0; i < substring.length; i++)
            offset_table[substring[i]] = substring.length - i - 1;
        return offset_table;
    }

    getOffset(char, l) { 
        if (this._offset_table[char] === undefined)
            return Math.max(this._max_offset - l, 1);
        return Math.max(this._offset_table[char] - l, 1);
    }
}

module.exports = BadSymbolHeuristic;
