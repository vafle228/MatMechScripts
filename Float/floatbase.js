const BinaryConverter = require("../Binary/binary");
const BinaryFloat = require("../Binary/binaryfloat");

const { arrayFill, arrayPreFill } = require("../Utils/utils");

const { POWER_OFFSET, POWER_LEN, MANTISA_LEN } = require("../Utils/constants");

class FloatBase {
    constructor(sign, power, mantisa) {
        this._sign = sign;
        this._power = arrayPreFill(POWER_LEN, power);
        this._mantisa = arrayFill(MANTISA_LEN, mantisa);
    }

    get power() {
        return BinaryConverter.convertToDecimal(this._power);
    }

    add(this_bit, other, other_bit) {
        const power_delta = Math.abs(this.power - other.power);

        if (power_delta > MANTISA_LEN)
            return this.power > other.power ? this : other;
        if (this._sign !== other._sign) return this.substract(other);

        const first_bigger = Math.max(this.power, other.power) === this.power;

        const [int1, float1] = [...BinaryFloat.expDivide(
            [this_bit], this._mantisa, first_bigger ? 0 : power_delta)];
        
        const [int2, float2] = [...BinaryFloat.expDivide(
            [other_bit], other._mantisa, first_bigger ? power_delta : 0)];
        
        const [res_int, res_float] = [...BinaryFloat.sumBinaryFloats(int1, float1, int2, float2)];

        return FloatBase._updateFloatValue(this._sign, this._power, res_int, res_float);
    }

    substract(other) {}

    toDecimal(this_bit) {
        const power = this.power - POWER_OFFSET;
        const [int, float] = [...(power >= 0
            ? BinaryFloat.expMultiply([this_bit], this._mantisa.slice(), power)
            : BinaryFloat.expDivide([this_bit], this._mantisa.slice(), -power))];
        return BinaryConverter.convertToDecimal(int, float);
    }

    static _updateFloatValue(sign, power, int_part, float_part) {
        const [int, float] = BinaryFloat.expDivide(int_part, float_part, 1);
        const [new_power, ] = [...BinaryFloat.sumBinaryFloats(power, [], int, [])];

        return [sign, new_power, BinaryFloat.roundBinNumber(float, MANTISA_LEN)];
    }
}

module.exports = FloatBase;
