const FloatBase = require("./floatbase");
const { POWER_LEN, MANTISA_LEN } = require("../Utils/constants");

class Zero extends FloatBase {
    constructor(sign) {
        super(
            sign,
            new Array(POWER_LEN).fill(0),
            new Array(MANTISA_LEN).fill(0)
        );
    }
}

class Inf extends FloatBase {
    constructor(sign) {
        super(
            sign,
            new Array(POWER_LEN).fill(1),
            new Array(MANTISA_LEN).fill(0)
        );
    }

    toDecimal() {
        return Math.pow(-1, this._sign) * Infinity;
    }
}

class Nan extends FloatBase {
    constructor(mantisa) {
        super(0, new Array(POWER_LEN).fill(1), mantisa);
    }

    toDecimal() {
        return NaN;
    }
}

module.exports = {
    Zero,
    Inf,
    Nan,
};
