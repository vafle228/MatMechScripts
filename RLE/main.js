const rle_escape = {
    esc_symbol: "#",

    encode(str) {
        let [count, result] = [1, ""];

        for (let i = 0; i < str.length; i++) {
            if (str[i] == str[i + 1] && count < 255) count++;
            
            else if (count > 3 || str[i] == this.esc_symbol) {
                result += this._codeEsc(str[i], count); count = 1;
            } 
            else { result += str[i].repeat(count); count = 1; }
        }
        return result;
    },

    decode(code) {
        let [i, result] = [0, ""];

        while (i != code.length) {
            if (code[i] == this.esc_symbol) {
                result += this._decodeEsc(code[i + 2], code[i + 1]); i += 3;
            }
            else { result += code[i]; i++; }
        }
        return result;
    },

    _decodeEsc(symbol, count) {
        return symbol.repeat(count.charCodeAt(0));
    },

    _codeEsc(symbol, count) {
        return this.esc_symbol + String.fromCharCode(count) + symbol;
    },
};

const rle_jump = {
    encode(str) {
        let count = 1,
            result = "",
            buf = "";

        for (let i = 0; i < str.length; i++) {
            if (str[i] == str[i + 1] && count < 127) count++;
            
            else if (count < 3) {
                if (buf.length >= 127) {
                    result += this._codeJump(buf.substring(0, 127), 128);
                    buf = buf.substring(127);
                }
                buf += str.substr(i - count + 1, count); count = 1;
            } 
            
            else if (count >= 3) {
                if (buf.length != 0) {
                    result += this._codeJump(buf, 128); buf = "";
                }
                result += this._codeJump(str[i - 1], count - 1); count = 1;
            }
        }
        return buf ? result + this._codeJump(buf, 128) : result;
    },

    decode(code) {
        let [result, i] = ["", 0];

        while (i != code.length) {
            if (code[i].charCodeAt(0) < 128) {
                result += code[i + 1].repeat(code[i].charCodeAt(0)); i += 2;
            } else {
                let offset = code[i].charCodeAt(0) - 128 + 1;
                result += code.substring(i + 1, i + offset); i += offset;
            }
        }
        return result;
    },

    _codeJump(buf, offset) {
        return String.fromCharCode(buf.length + offset) + buf;
    },
};

function validateData(operation, coder, input) {
    if (!fs.existsSync(input)) return false;

    if (operation != "encode" && operation != "decode") return false;

    if (coder != "escape" && coder != "jump") return false;

    return true;
}

const fs = require("fs");

let [, , operation, coder, input, output] = [...process.argv];

if (validateData(operation, coder, input)) {
    const rle_obj = coder == "escape" ? rle_escape : rle_jump;

    fs.writeFileSync(
        output,
        operation == "encode"
            ? rle_obj.encode(fs.readFileSync(input, "utf8"))
            : rle_obj.decode(fs.readFileSync(input, "utf8"))
    );
}
else { console.log("Agruments error!") }
