const VizinerBase = require("./vizinerbase");


class VizinerEncode extends VizinerBase {
    charOffset(char, key) { 
        return key.charCodeAt(0) + char.charCodeAt(0) - 2 * this._start;
    }
}

module.exports = VizinerEncode;
