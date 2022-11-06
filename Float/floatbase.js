const BinaryConverter = require("../Binary/binary");
const BinaryFloat = require("../Binary/binaryfloat");

const { arrayFill, arrayPreFill } = require("../Utils/utils");

const { POWER_OFFSET, POWER_LEN, MANTISA_LEN } = require("../Utils/constants");

class FloatBase {
    constructor(sign, power, mantisa) {
        this._sign = sign;
        this._power = arrayPreFill(POWER_LEN, power)
        this._mantisa = arrayFill(MANTISA_LEN, mantisa)
    }

    get power() {
        return BinaryConverter.convertToDecimal(this._power);
    }

    add(other) {
        if (abs(this._power - other._power) > MANTISA_LEN)
            return this._power > other._power ? this : other;
        if (this._sign !== other._sign) return this.substract(other);

        // Goto biggest power
        // Add one mantisa to other
        // Init new FloatBase instance
    }

    substract(other) {}

    toDecimal(init_bit) {
        const power = this.power - POWER_OFFSET;
        const [int, float] = [...(power >= 0
            ? BinaryFloat.expMultiply([init_bit], this._mantisa.slice(), power)
            : BinaryFloat.expDivide([init_bit], this._mantisa.slice(), -power))];
        return BinaryConverter.convertToDecimal(int, float);
    }
}

module.exports = FloatBase;
