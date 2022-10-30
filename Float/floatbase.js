const BinaryConverter = require("../Binary/binary");
const BinaryFloat = require("../Binary/binaryfloat");

class FloatBase {
    static offset = 127;
    static power_len = 8;
    static mantisa_len = 23;

    constructor(sign, power, number) {
        this._sign = sign;
        this._initPower(power);
        this._initMantisa(number, power);
    }

    get power() {
        return BinaryConverter.convertToDecimal(this._power)
    }

    add(other) {
        if (abs(this._power - other._power) > 23)
            return this._power > other._power ? this : other;
        if (this._sign !== other._sign) return this.substract(other);

        // Goto biggest power
        // Add one mantisa to other
        // Init new IFloat instance
    }

    substract(other) {}

    toDecimal(hidden_bit) {
        const power = this.power - FloatBase.offset;
        return BinaryConverter.convertToDecimal(
            ...(power >= 0
                ? BinaryFloat.expMultiply([hidden_bit], this._mantisa, power)
                : BinaryFloat.expDivide([hidden_bit], this._mantisa, -power))
        );
    }

    // [Symbol.toPrimitive](hint) {
    //     if (hint === "number") {
    //         const power = this._power - FloatBase._offset;
    //         return power < 0
    //             ? Math.pow(-1, this._sign) * this._mantisa.expDivide(-power)
    //             : Math.pow(-1, this._sign) * this._mantisa.expMultiply(power);
    //     }
    //     return `${this._sign} ${this._power} ${this._mantisa}`;
    // }

    _initMantisa(number, power) {
        const [int, float] = [...BinaryConverter.convertToBin(number)];
        this._mantisa =
            power >= 0
                ? BinaryFloat.expDivide(int, float, power)[1]
                : BinaryFloat.expMultiply(int, float, -power)[1];
        this._mantisa.length = FloatBase.mantisa_len;
    }

    _initPower(power) {
        const actual_power = power + FloatBase.offset;
        this._power = BinaryConverter.convertToBin(actual_power)[0];
        this._power.length = FloatBase.power_len;
    }
}

module.exports = FloatBase;
