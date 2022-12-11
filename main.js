const RussianFreq = require("./LanguageFreq/russianfreq");
const EnglishFreq = require("./LanguageFreq/englishfreq");

const VizinerEncode = require("./VizinerCode/encode");
const VizinerDecode = require("./VizinerCode/decode");

const encoder = new VizinerEncode("FUCK", "rus");
const decoder = new VizinerDecode("FUCK", "rus");

console.log(encoder.encodeText("Семен лучший!"));
console.log(decoder.encodeText(encoder.encodeText("Семен лучший!")));
