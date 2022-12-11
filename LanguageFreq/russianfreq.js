const fs = require("fs");
const FrequencyCounter = require("../frequencycount");


class RussianFreq {
    static freq = new Object();

    static initRussianFreq() {
        console.info("Start processing 'Russian Texts' ...");
        const freq_files = ["1.txt", "2.txt", "3.txt", "4.txt"];

        let freq_text = ""
        for (let i = 0; i < freq_files.length; i++) {
            console.info(`Reading ${i + 1} book`);
            freq_text += fs.readFileSync("./RussianTexts/" + freq_files[i], "utf-8");
        }

        console.info("Calculating frequency ...");
        this.freq = new FrequencyCounter("а", "я").countFrequency(freq_text);
        console.info("Done!"); 

        return this.freq;
    }
}


module.exports = RussianFreq;
