const RussianFreq = require("./LanguageFreq/russianfreq");
const EnglishFreq = require("./LanguageFreq/englishfreq");

const VizinerEncode = require("./VizinerCode/encode");

const encoder = new VizinerEncode("семен", "rus");

console.log(encoder.encodeText("Привет Семен".toLocaleLowerCase()))

// EnglishFreq.initEnglishFreq();
// RussianFreq.initRussianFreq();

// console.table(RussianFreq.freq)