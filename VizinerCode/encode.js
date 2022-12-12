const VizinerBase = require("./vizinerbase");


class VizinerEncode extends VizinerBase {
    charOffset(char, key) { 
        return char.charCodeAt(0) + key.charCodeAt(0) - 2 * this._start;
    }
}


module.exports = VizinerEncode;
