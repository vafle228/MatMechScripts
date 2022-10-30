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
}

module.exports = BinaryFloat;
