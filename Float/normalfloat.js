const FloatBase = require("./floatbase");
const { binaryLog } = require("../Utils/utils");

class NormalFloat extends FloatBase {
    constructor(number) {
        const sign = number > 0 ? 0 : 1;
        const mantisa = Math.abs(number);
        const power = Math.floor(binaryLog(mantisa));
        
        super(sign, power, mantisa);
    }

    toDecimal() {
        return super.toDecimal(1)
    }
}

module.exports = NormalFloat;
