const RussianFreq = require("./LanguageFreq/russianfreq");
const EnglishFreq = require("./LanguageFreq/englishfreq");

const VizinerEncode = require("./VizinerCode/encode");

const encoder = new VizinerEncode("Семен", "rus");

console.log(encoder.encodeText("Привет Семен"))

// EnglishFreq.initEnglishFreq();
// RussianFreq.initRussianFreq();

// console.table(RussianFreq.freq)