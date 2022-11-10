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

    get power() { return BinaryConverter.convertToDecimal(this._power); }

    add(this_bit, other, other_bit) {
        const power_delta = Math.abs(this.power - other.power);
        if (power_delta > MANTISA_LEN)
            return this.power > other.power
                ? [this._sign, this._power, this._mantisa]
                : [other._sign, other._power, other._mantisa];
        
        if (this._sign !== other._sign) 
            return this.substract(this_bit, other, other_bit);

        const first_bigger = Math.max(this.power, other.power) === this.power;
        
        const bigger_power = first_bigger ? this._power : other._power;
        const [res_int, res_float] = [...BinaryFloat.sumBinaryFloats(
            ...FloatBase._getBinaryFloat([this_bit], this._mantisa, first_bigger ? 0 : -power_delta), 
            ...FloatBase._getBinaryFloat([other_bit], other._mantisa, first_bigger ? -power_delta : 0)
        )];
        return FloatBase._normalizeResult(this._sign, bigger_power, res_int, res_float);
    }

    substract(this_bit, other, other_bit) {
        const power_delta = Math.abs(this.power - other.power);
        if (power_delta > MANTISA_LEN)
            return this.power > other.power
                ? [this._sign, this._power, this._mantisa]
                : [(other._sign + 1) % 2, other._power, other._mantisa];  // unary minus
        
        if (this._sign !== other._sign)
            return this.add(this_bit, other.unaryMinus(), other_bit);
        
        const first_bigger = Math.max(this.power, other.power) === this.power;
        const bigger_power = first_bigger ? this._power : other._power;
        
        const [int1, float1, int2, float2] = [
            ...FloatBase._getBinaryFloat([this_bit], this._mantisa, first_bigger ? 0 : -power_delta), 
            ...FloatBase._getBinaryFloat([other_bit], other._mantisa, first_bigger ? -power_delta : 0)];

        const [res_int, res_float] = [...(first_bigger
            ? BinaryFloat.subBinaryFloats(int1, float1, int2, float2)
            : BinaryFloat.subBinaryFloats(int2, float2, int1, float1))];
        return FloatBase._normalizeResult(res_int, res_float, bigger_power)      
    }

    toDecimal(this_bit) {
        const power = this.power - POWER_OFFSET;
        return BinaryConverter.convertToDecimal(
            ...FloatBase._getBinaryFloat([this_bit], this._mantisa, power)
        ) * Math.pow(-1, this._sign);
    }

    unaryMinus() { return Object.assign({_sign: (this._sign + 1) % 2}, this); }

    isEqual(other) {
        const compare_func = (el1, el2) => el1 === el2;
        
        const power_equal = BinaryFloat.compareBinNumbers(this._power, other._power, compare_func);
        const mantisa_equal = BinaryFloat.compareBinNumbers(this._mantisa, other._mantisa, compare_func);

        return power_equal && mantisa_equal;
    }

    isLess(other) {
        const break_func = (el1, el2) => el1 > el2;
        const compare_func = (el1, el2) => el1 < el2;
        
        const power_less = BinaryFloat.compareBinNumbers(
            this._power, other._power, break_func, compare_func);
        
        const mantisa_less = !BinaryFloat.compareBinNumbers(
            this._mantisa, other._mantisa, compare_func);

        return power_less && mantisa_less && !this.isEqual(other);
    }

    static _normalizeResult(sign, power, int_part, float_part) {
        const offset = int_part.concat(float_part).indexOf(1) - int_part.length + 1;
        
        const [, float] = [...FloatBase._getBinaryFloat(int_part, float_part, offset)]
        const [new_power, ] = [...(offset <= 0
            ? BinaryFloat.sumBinaryFloats(power, [], ...BinaryConverter.convertToBin(-offset))
            : BinaryFloat.subBinaryFloats(power, [], ...BinaryConverter.convertToBin(-offset)))];
        return [sign, new_power, BinaryFloat.roundBinNumber(float, MANTISA_LEN)];
    }

    static _getBinaryFloat(int_part, float_part, offset) {
        return offset >= 0
            ? BinaryFloat.expMultiply(int_part.slice(), float_part.slice(), offset)
            : BinaryFloat.expDivide(int_part.slice(), float_part.slice(), -offset);
    }
}

module.exports = FloatBase;
