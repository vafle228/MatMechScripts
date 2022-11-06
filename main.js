const NormalFloat = require("./Float/normalfloat");
const { Zero, Inf, Nan } = require("./Float/constants");
const Float = require("./Float/float");

const BinaryFloat = require("./Binary/binaryfloat");
const BinaryConverter = require("./Binary/binary");

const { binaryLog } = require("./Utils/utils");



// console.log(
//     BinaryConverter.convertToDecimal(
//         ...BinaryFloat.sumBinaryFloats(i1, f1, i2, f2)
//     )
// );

const float = new Float(0.1 + 0.2);
console.log(float.toDecimal())

// const f = BinaryConverter.convertToBin(0.3)[1]

// console.log(f.join(""))

// 0.1
// 1.10011001100110011001100
// 1.10011001100110011001101
// 1.10011001100110011001101
// 1.10011001100110011001101
// 1.10011001100110011001101
// 1.100110011001100110011001100110011001100110011001101


// 0.3
// 1.00110011001100110011010
// 1.00110011001100110011010
// 1.00110011001100110011010
// 1.0011001100110011001100110011001100110011001100110011


// FUCK
// https://digitrain.ru/articles/511208/

// console.log(float.toDecimal());
// console.log(float._sign, float.power, float._mantisa);

// console.log(new Nan(12).toDecimal());

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
