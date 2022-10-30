function baseLog(base) {
    return function (x) {
        return Math.log(x) / Math.log(base);
    };
}

let a = 5;
const bin_log = baseLog(0.5);

const NormalFloat = require("./Float/normalfloat");
const float = new NormalFloat(85);

console.log(float.toDecimal());

console.log(float._mantisa, float._power, float._sign)

// console.log(String(float));
// console.log(Number(float));

// const BinaryFloat = require("./Binary/binaryfloat");
// const fb1 = new BinaryFloat(10.125);
// const fb2 = new BinaryFloat(12.125);

// fb1.expMultiply(2)

// console.log(`${fb1}`);

// const Binary = require("./Float/binary");
// console.log(Binary.convertToBin(1/133));

// .11001101


// Парсер команд
// Исполнение команд
// Все ))

// Арифметика:
// Sub + sub || normal + normal || sub + normal
// Sub - sub || nomral - normal || normal - sub (sign depends on greater one)


// max(nf1.pow, nf2.pow) -> min(nf1, nf2) / (max_pow - min_pow) -> math

// 1,111011
// 5 -> 101 -> 1.01 -> 0 129 01 (2)
// 0.5 -> 0.1 -> 1.0 -> 0 126 0 (-1)
// число -> бинарку -> float