const { NormalFloat, SubNormalFloat } = require("./floattypes");
const { ZeroFloat, InfinityFloat, NanFloat } = require("./floattypes");

const BinaryConverter = require("../Binary/binary");
const BinaryFloat = require("../Binary/binaryfloat");

const { arrayFill, arrayPreFill, binaryLog } = require("../Utils/utils");

const { POWER_OFFSET, POWER_LEN, MANTISA_LEN } = require("../Utils/constants");
const { NORMAL_DOWN, NORMAL_UP, SUBNORMAL_DOWN, SUBNORMAL_UP } = require("../Utils/constants");

class Float {
    constructor(number) {
        number = number instanceof Array 
            ? number : Float._checkRange(number);

        switch ((isNaN(number) && !(number instanceof Array)) || number) {
            case 0: this._float = new ZeroFloat(); break;
            case true: this._float = new NanFloat(); break;
            case Infinity: this._float = new InfinityFloat(0); break;
            case -Infinity: this._float = new InfinityFloat(1); break;

            default: this._float = Float._initNumber(number); break;
        }
    }

    toDecimal() { return this._float.toDecimal(); }

    add(other) { return new Float(this._float.add(other._float)); }

    static _checkRange(number) {
        const num = Math.abs(number);

        const in_normal_range = NORMAL_DOWN <= num && num <= NORMAL_UP;
        const in_subnormal_range = SUBNORMAL_DOWN <= num && num <= SUBNORMAL_UP;
        
        return in_normal_range || in_subnormal_range ? number : Infinity * number;
    }

    static _initNumber(number) {
        const [sign, power, mantisa] = number instanceof Array 
            ? [...number] : [...this._convertNumber(number)];
        
        if (power.includes(1))
            return new NormalFloat(sign, power, mantisa);
        return new SubNormalFloat(sign, power, mantisa);
    }

    static _convertNumber(number) {
        const sign = number > 0 ? 0 : 1;
        const num_mantisa = Math.abs(number);
        const power = Math.max(-POWER_OFFSET, Math.floor(binaryLog(num_mantisa)));

        return [sign, this._initPower(power), this._initMantisa(num_mantisa, power)];
    }

    static _initMantisa(number, power) {
        const [int, float] = [...BinaryConverter.convertToBin(number)];
        const [, mantisa] = [...(power >= 0
            ? BinaryFloat.expDivide(int, float, power)
            : BinaryFloat.expMultiply(int, float, -power))];
        
        if (mantisa.length <= MANTISA_LEN)
            return arrayFill(MANTISA_LEN, mantisa);
        return BinaryFloat.roundBinNumber(mantisa, MANTISA_LEN);
    }

    static _initPower(power) {
        const actual_power = power + POWER_OFFSET;
        const [int,] = [...BinaryConverter.convertToBin(actual_power)];
        return arrayPreFill(POWER_LEN, int);
    }
}

module.exports = Float;
