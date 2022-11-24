const Float = require("./Float/float");
const [, , num1, operator, num2] = [...process.argv];

if (num2 !== undefined){
    const float1 = new Float(Number(num1));
    const float2 = new Float(Number(num2));

    let result;
    switch (operator) {
        case "+": result = float1.add(float2); break;
        case "-": result = float1.substract(float2); break;
    }

    console.log(result.toString());
    console.log(result.toDecimal());
}

else { console.log(new Float(Number(num1)).toString()); }
