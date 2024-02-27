const fs = require("fs");
const ProgrammMemory = require("./SirMemory/main");
const ProgrammExecutor = require("./SirComands/main");

function validateData(programfile) {
    return fs.existsSync(programfile);
}

const programfile = process.argv[2];
if (validateData(programfile)) {
    const program = fs.readFileSync(programfile, "utf-8")
    
    const memory = new ProgrammMemory(program);
    const executor = new ProgrammExecutor(memory);

    let i = 0;
    while (memory.read("$" + i) != "endscript" && i != memory.length()) {
        const command = memory.read("$" + i);
        const opperands_count = executor[command].length;

        const result = executor[command](
            ...memory.readChunk("$" + (i + 1), "$" + (opperands_count + i + 1))
        );
        i = result ? result : i + 1 + opperands_count;  // goto handler
    }
}

else { console.log("Something went wrong! Check your args"); }
