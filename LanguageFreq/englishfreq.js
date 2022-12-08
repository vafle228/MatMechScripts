const fs = require("fs");
const FrequencyCounter = require("../frequencycount");


class EnglishFreq {
    static freq = new Object();

    static initEnglishFreq() {
        console.info("Start processing 'English Texts' ...");
        const freq_files = ["1.txt", "2.txt", "3.txt"];

        let freq_text = ""
        for (let i = 0; i < freq_files.length; i++) {
            console.info(`Reading ${i + 1} book`);
            freq_text += fs.readFileSync("./EnglishTexts/" + freq_files[i], "utf-8");
        }

        console.info("Calculating frequency ...");
        this.freq = new FrequencyCounter("a", "z").countFrequency(freq_text);
        console.info("Done!"); 
    }
}

module.exports = EnglishFreq;
