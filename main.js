const RussianFreq = require("./LanguageFreq/russianfreq");
const EnglishFreq = require("./LanguageFreq/englishfreq");

const VizinerEncode = require("./VizinerCode/encode");
const VizinerDecode = require("./VizinerCode/decode");
const VizinerHack = require("./VizinerCode/hack");

const fs = require("fs");
const text = fs.readFileSync("./test.txt").toString()

const hack = new VizinerHack("rus");
const encoder = new VizinerEncode("привет", "rus");
const decoder = new VizinerDecode("привет", "rus");

hack.hackText(encoder.encodeText(text))



// console.log(encoder.encodeText("Семен лучший!"));
// console.log(decoder.encodeText(encoder.encodeText("Семен лучший!")));
