const BadSymbolHeuristic = require("./Heuristics/badsymbol");
const GoodSuffixHeuristic = require("./Heuristics/goodsuffix");

function findSubstring(string, substring) {
    const bad_symbol = new BadSymbolHeuristic(substring);
    const good_suffix = new GoodSuffixHeuristic(substring);

    let i = 0;
    return function() {
        for (; i < string.length; ) {
            let l = substring.length - 1;
            while (l >= 0 && substring[l] === string[i + l]) l--;
    
            if (l == -1) { let off = good_suffix.getOffset(substring.length); return (i += off, i - off); }
            
            const real_l = substring.length - 1 - l;
            i += Math.max(good_suffix.getOffset(real_l), bad_symbol.getOffset(string[i + l], real_l));
        }
    }
}

module.exports = findSubstring;