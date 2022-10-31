const NormalFloat = require("./Float/normalfloat");
const float = new NormalFloat(12);

console.log(float._power, float._mantisa)

console.log(float.toDecimal());

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