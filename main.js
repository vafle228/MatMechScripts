const fs = require("fs");
const VizinerHack = require("./VizinerCode/hack");
const VizinerEncode = require("./VizinerCode/encode");
const VizinerDecode = require("./VizinerCode/decode");


function validateData(mode, lang, input) {
    if (!fs.existsSync(input)) return false;

    if (!(["en", "rus"].includes(lang))) return false;

    return ["decode", "encode"].includes(mode);
}

function encodeText(text, key, lang) {
    return new VizinerEncode(key, lang).encodeText(text);
}

function decodeText(text, lang) {
    const keys = new VizinerHack(lang).hackText(text);
    if (keys.length === 0) return "Idk, cannot find key!";

    console.log(`Decode with key '${keys[0]}' ...`);
    return new VizinerDecode(keys[0], lang).encodeText(text);
}

const [, , mode, input, output] = [...process.argv];

let key, lang
if (mode === "encode") [key, lang] = [...process.argv.slice(5)];
else if (mode === "decode") lang = process.argv[5];

if (validateData(mode, lang, input)) {
    const text = fs.readFileSync(input, "utf-8");

    let out_text = new String();
    switch (mode) {
        case "decode": out_text = decodeText(text, lang); break;
        case "encode": out_text = encodeText(text, key, lang); break;
    }
    fs.writeFileSync(output, out_text); console.log("Done!")
}

else { console.log("Something went wrong! Check your args") }
