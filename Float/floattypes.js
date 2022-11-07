const FloatBase = require("./floatbase");

const { POWER_LEN, MANTISA_LEN } = require("../Utils/constants");

class NormalFloat extends FloatBase {
    toDecimal() { return super.toDecimal(1); }
}

class SubNormalFloat extends FloatBase {
    toDecimal() { return super.toDecimal(0); }
}

class ZeroFloat extends FloatBase {
    constructor() {
        const power = new Array(POWER_LEN).fill(0);
        const mantisa = new Array(MANTISA_LEN).fill(0)

        super(0, power, mantisa);
    }

    toDecimal() { return 0.0; }
}

class InfinityFloat extends FloatBase {
    constructor(sign) {
        const power = new Array(POWER_LEN).fill(1);
        const mantisa = new Array(MANTISA_LEN).fill(0)

        super(sign, power, mantisa);
    }

    toDecimal() { return Math.pow(-1, this._sign) * Infinity; }
}

class NanFloat extends FloatBase {
    constructor() {
        const power = new Array(POWER_LEN).fill(1);
        const mantisa = new Array(MANTISA_LEN).fill(1)

        super(0, power, mantisa);
    }

    toDecimal() { return NaN; }
}

module.exports = {
    NormalFloat,
    SubNormalFloat,
    ZeroFloat,
    InfinityFloat,
    NanFloat,
}