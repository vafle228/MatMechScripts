const BadSymbolHeuristic = require("./Heuristics/badsymbol");
const GoodSuffixHeuristic = require("./Heuristics/goodsuffix");

function findSubstring(string, substring) {
    const bad_symbol = new BadSymbolHeuristic(substring);
    const good_suffix = new GoodSuffixHeuristic(substring);

    return function(start) {
        for (let i = start; i < string.length; ) {
            let l = substring.length - 1;
            while (l >= 0 && substring[l] === string[i + l]) l--;
    
            if (l == -1) return i;
            
            const real_l = substring.length - 1 - l;
            i += Math.max(good_suffix.getOffset(real_l), bad_symbol.getOffset(string[i + l], real_l));
        }
    }
}

module.exports = findSubstring;