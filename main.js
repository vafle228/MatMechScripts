const Float = require("./Float/float");
const [, , num1, operator, num2] = [...process.argv];

if (num2 !== undefined){
    const float1 = new Float(Number(num1));
    const float2 = new Float(Number(num2));

    switch (operator) {
        case "+": console.log(float1.add(float2).toDecimal()); break;
        case "-": console.log(float1.substract(float2).toDecimal()); break;
    }
}

else { console.log(new Float(Number(num1)).toDecimal()); }
