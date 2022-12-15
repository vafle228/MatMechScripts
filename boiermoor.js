const BadSymbolHeuristic = require("./Heuristics/badsymbol");
const GoodSuffixHeuristic = require("./Heuristics/goodsuffix");

function findSubstring(string, substring) {
    const bad_symbol = new BadSymbolHeuristic(substring);
    const good_suffix = new GoodSuffixHeuristic(substring);

    const entery = new Array();

    for (let i = 0; i < string.length; ) {
        let l = substring.length - 1;
        while (substring[l] === string[i + l]) l--;

        if (l == -1) entery.push(i);
        
        i += Math.max(
            good_suffix.getOffset(substring.length - 1 - l),
            bad_symbol.getOffset(string[i + l], substring.length - 1 - l),
        );
    }

    return entery;
}

module.exports = findSubstring;