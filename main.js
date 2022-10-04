function codeText(codes, text) {
    let code = "";
    let result = "";

    for (let i = 0; i <= text.length; i++) {
        result += codes.get(code) ? codes.get(code) : "";
        code = codes.get(code) ? text[i] : code + text[i];
    }

    if (code !== undefined && code.length !== 0)
        console.log("Cannot code text with", codes);
    return result;
}

function validateArguments(operation, input) {
    const file_exists = fs.existsSync(input);
    const valid_operation = operation === "code" || operation === "decode";

    return file_exists && valid_operation;
}

const fs = require("fs");
const HaffmanAlg = require("./HaffmanAlg/main");

const [, , operation, input, code_file, output] = [...process.argv];

if (validateArguments(operation, input)) {
    const text_data = fs.readFileSync(input, "utf-8");

    if (operation === "code") {
        const codes = HaffmanAlg(text_data);
        fs.writeFileSync(
            code_file,
            codes.map((val) => val.join(": ")).join("\n")
        );
        fs.writeFileSync(output, codeText(new Map(codes), text_data));
    }

    if (operation === "decode") {
        const codes = fs
            .readFileSync(code_file, "utf-8")
            .split("\n")
            .map((val) => val.split(": ").reverse());
        fs.writeFileSync(output, codeText(new Map(codes), text_data));
    }
}
else { console.log("Arguments Error!"); }
