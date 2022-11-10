const { arrayPreFill, arrayFill } = require("../Utils/utils");

class BinaryFloat {
    static expMultiply(int_part, float_part, power) {
        for (let i = 0; i < power; i++) 
            int_part.push(float_part.shift() || 0);
        return [int_part, float_part];
    }

    static expDivide(int_part, float_part, power) {
        for (let i = 0; i < power; i++) 
            float_part.unshift(int_part.pop() || 0);
        return [int_part, float_part];
    }

    static subBinaryFloats(int_part1, float_part1, int_part2, float_part2) {
        const offset = Math.max(float_part1.length, float_part2.length);
        const summary = BinaryFloat._subBinNumbers(
            int_part1.concat(arrayFill(offset, float_part1)),
            int_part2.concat(arrayFill(offset, float_part2))
        );
        return BinaryFloat.expDivide(summary, [], offset);
    }

    static sumBinaryFloats(int_part1, float_part1, int_part2, float_part2) {
        const offset = Math.max(float_part1.length, float_part2.length);
        const summary = BinaryFloat._sumBinNumbers(
            int_part1.concat(arrayFill(offset, float_part1)),
            int_part2.concat(arrayFill(offset, float_part2))
        );
        return BinaryFloat.expDivide(summary, [], offset);
    }

    static roundBinNumber(bin_number, precision) {
        const less = bin_number.slice(0, precision);
        const middle = less.slice(); middle.push(1);
        
        const ulp = Array(precision - 1).fill(0); ulp.push(1);

        return bin_number[bin_number.length - 1] === 0 
            ? less : BinaryFloat.sumBinaryFloats(less, [], ulp, [])[0]
    }

    static isBinNumbersEqual(num1, num2) {
        [num1, num2] = BinaryFloat._alignBinNums(num1, num2);
        
        for (let i = 0; i < num1.length; i++)
            if (num1[i] !== num2[i]) return false;
        return true;
    }

    static isBinNumberLess(num1, num2) {
        [num1, num2] = BinaryFloat._alignBinNums(num1, num2);
        
        for (let i = 0; i < num1.length; i++){
            if (num1[i] < num2[i]) return true;
            if (num1[i] > num2[i]) return false;
        }   
        return false;  // Return false because equal
    }

    static _sumBinNumbers(num1, num2) {
        [num1, num2] = BinaryFloat._alignBinNums(num1, num2);
        
        let additional = 0;
        const result = new Array(num1.length);
        for (let i = num1.length - 1; i >= 0; i--) {
            result[i] = (num1[i] + num2[i] + additional) % 2;
            additional = Math.floor((num1[i] + num2[i] + additional) / 2);
        }
        if (additional) result.unshift(additional); return result;
    }

    static _subBinNumbers(num1, num2) {  // Works if num1 > num2
        [num1, num2] = BinaryFloat._alignBinNums(num1, num2);
        
        let loan = 0;
        const result = new Array(num1.length);
        for (let i = num1.length - 1; i >= 0; i--) {
            const sub_val = num1[i] - loan - num2[i];
            [result[i], loan] = sub_val >= 0 ? [sub_val, 0] : [sub_val + 2, 1];
        }
        return result;
    }

    static _alignBinNums(num1, num2) {
        switch (num1.length > num2.length) {
            case true: num2 = arrayPreFill(num1.length, num2); break;
            case false: num1 = arrayPreFill(num2.length, num1); break;
        }
        return [num1, num2];
    }
}

module.exports = BinaryFloat;
