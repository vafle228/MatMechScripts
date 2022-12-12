const VizinerBase = require("./vizinerbase");


class VizinerDecode extends VizinerBase {
    charOffset(char, key) {
        return char.charCodeAt(0) - key.charCodeAt(0);
    }
}

module.exports = VizinerDecode;
