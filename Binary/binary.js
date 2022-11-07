class BinaryConverter {
    static convertToBin(number) {
        const int_part = Math.floor(number);
        const float_part = number - int_part;

        return [
            BinaryConverter._convertIntToBin(int_part),
            BinaryConverter._convertFloatToBin(float_part),
        ];
    }

    static convertToDecimal(int_part, float_part = Array()) {
        return (
            BinaryConverter._convertBinToInt(int_part) +
            BinaryConverter._convertBinToFloat(float_part)
        );
    }

    static _convertBinToInt(int_part) {
        let result = 0;
        for (let i = 0; i < int_part.length; i++)
            result += int_part[i] * Math.pow(2, int_part.length - i - 1);
        return result;
    }

    static _convertBinToFloat(float_part) {
        let result = 0;
        for (let i = 0; i < float_part.length; i++)
            result += float_part[i] * Math.pow(2, -(i + 1));
        return result;
    }

    static _convertIntToBin(integer) {
        const bin_int = Array();

        while (integer !== 0) {
            bin_int.unshift(integer % 2);
            integer = Math.floor(integer / 2);
        }
        return bin_int;
    }

    static _convertFloatToBin(float) {
        const bin_float = Array();

        while (float !== 0) {
            bin_float.push(Math.floor(float * 2));
            float = float * 2 - Math.floor(float * 2);
        }
        return bin_float;
    }
}

module.exports = BinaryConverter;
