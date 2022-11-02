const { arrayFill, arrayPreFill } = require("../Utils/utils");

class BinaryFloat {
    static expMultiply(int_part, float_part, power) {
        for (let i = 0; i < power; i++) int_part.push(float_part.shift() || 0);
        return [int_part, float_part];
    }

    static expDivide(int_part, float_part, power) {
        for (let i = 0; i < power; i++) float_part.unshift(int_part.pop() || 0);
        return [int_part, float_part];
    }

    static subBinaryFloats(bin_float1, bin_float2) {
        let [int_part1, float_part1] = [...bin_float1];
        let [int_part2, float_part2] = [...bin_float2];
    }

    static sumBinaryFloats(int_part1, float_part1, int_part2, float_part2) {
        const summary = BinaryFloat._sumBinNumbers(
            int_part1.concat(float_part1),
            int_part2.concat(float_part2)
        );
        const offset = Math.max(float_part1.length, float_part2.length);
        return BinaryFloat.expDivide(summary, [], offset);
    }

    static _sumBinNumbers(arr1, arr2) {
        if (arr1.length > arr2.length)
            arr2 = arrayPreFill(arr1.length, arr2);

        if (arr1.length < arr2.length)
            arr1 = arrayPreFill(arr2.length, arr1);

        let additional = 0;
        const result = new Array(arr1.length);
        for (let i = arr1.length - 1; i >= 0; i--) {
            result[i] = (arr1[i] + arr2[i] + additional) % 2;
            additional = Math.floor((arr1[i] + arr2[i] + additional) / 2);
        }
        result.unshift(additional); return result;
    }
}

module.exports = BinaryFloat;
