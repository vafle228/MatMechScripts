const BadSymbolHeuristic = require("./Heuristics/badsymbol");
const GoodSuffixHeuristic = require("./Heuristics/goodsuffix");

const findSubstring = require("./boiermoor");

// console.table(new BadSymbolHeuristic("abacdb")._offset_table)

console.log(findSubstring("bcdbcabcdbcabcabcabcabcabcbc", "bcdbcabcabc"))