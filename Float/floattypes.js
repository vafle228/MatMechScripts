const FloatBase = require("./floatbase");

const { POWER_LEN, MANTISA_LEN } = require("../Utils/constants");

class NormalFloat extends FloatBase {
    constructor(sign, power, mantisa) {
        if (power.length > POWER_LEN)
            return new InfinityFloat(sign);
        super(sign, power, mantisa);
    }
    toDecimal() { return super.toDecimal(1); }

    add(other) {
        switch(other.constructor) {
            case NanFloat:
            case InfinityFloat: return other.toDecimal();

            case NormalFloat: return super.add(1, other, 1);
            case SubNormalFloat: return super.add(1, other, 0);

            default: return [other._sign, other._power, other._mantisa];
        }
    }

    substract(other) {
        switch(other.constructor) {
            case NanFloat:
            case InfinityFloat: return -1 * other.toDecimal();

            case NormalFloat: return super.substract(1, other, 1);
            case SubNormalFloat: return super.substract(1, other, 0);

            default: return [other._sign, other._power, other._mantisa];
        }
    }
}

class SubNormalFloat extends FloatBase {
    constructor(sign, power, mantisa) {
        if (power.length > POWER_LEN)
            return new ZeroFloat();
        super(sign, power, mantisa);
    }
    toDecimal() { return super.toDecimal(0); }

    add(other) {
        switch(other.constructor) {
            case NanFloat:
            case InfinityFloat: return other.toDecimal();

            case NormalFloat: return super.add(0, other, 1);
            case SubNormalFloat: return super.add(0, other, 0);

            default: return [other._sign, other._power, other._mantisa];
        }
    }

    substract(other) {
        switch(other.constructor) {
            case NanFloat:
            case InfinityFloat: return -1 * other.toDecimal();

            case NormalFloat: return super.substract(0, other, 1);
            case SubNormalFloat: return super.substract(0, other, 0);

            default: return [other._sign, other._power, other._mantisa];
        }
    }
}

class ZeroFloat extends FloatBase {
    constructor() {
        const power = new Array(POWER_LEN).fill(0);
        const mantisa = new Array(MANTISA_LEN).fill(0);

        super(0, power, mantisa);
    }

    toDecimal() { return 0.0; }

    add(other) {
        switch (other.constructor) {
            case NanFloat:
            case ZeroFloat:
            case InfinityFloat: return other.toDecimal();
            
            default: return [other._sign, other._power, other._mantisa];
        }
    }

    substract(other) {
        switch (other.constructor) {
            case NanFloat:
            case ZeroFloat:
            case InfinityFloat: return -1 * other.toDecimal();
            
            default: return [(other._sign + 1) % 2, other._power, other._mantisa];
        }
    }
}

class InfinityFloat extends FloatBase {
    constructor(sign) {
        const power = new Array(POWER_LEN).fill(1);
        const mantisa = new Array(MANTISA_LEN).fill(0);

        super(sign, power, mantisa);
    }

    toDecimal() { return Math.pow(-1, this._sign) * Infinity; }

    add(other) {
        switch (other.constructor) {
            case NanFloat: return NaN;
            
            case NormalFloat:
            case SubNormalFloat:
            case ZeroFloat: return this.toDecimal();

            default: return this._sign !== other._sign ? NaN : this.toDecimal();
        }
    }

    substract(other) {
        switch (other.constructor) {
            case NanFloat: return NaN;
            
            case NormalFloat:
            case SubNormalFloat:
            case ZeroFloat: return this.toDecimal();

            default: return this._sign === other._sign ? NaN : this.toDecimal();
        }
    }
}

class NanFloat extends FloatBase {
    constructor() {
        const power = new Array(POWER_LEN).fill(1);
        const mantisa = new Array(MANTISA_LEN).fill(1);

        super(0, power, mantisa);
    }

    toDecimal() { return NaN; }

    add(other) { return NaN; }

    substract(other) { return NaN; }
}

module.exports = {
    NormalFloat,
    SubNormalFloat,
    ZeroFloat,
    InfinityFloat,
    NanFloat,
}