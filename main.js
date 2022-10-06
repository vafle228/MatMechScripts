function numRange(start, end) {
    return new Array(end - start).fill().map((val, index) => index + start);
}

function associateBits(code) {
    const associated_poses = new Array();

    for (let i = 0; Math.pow(2, i) < code.length; i++) {
        associated_poses.push(new Array());
        for (
            let j = Math.pow(2, i) - 1;
            j < code.length;
            j += Math.pow(2, i + 1)
        )
            associated_poses[i].push(...numRange(j, j + Math.pow(2, i)));
    }

    return associated_poses;
}

function replaceAt(str, index, new_el) {
    return str.substring(0, index) + new_el + str.substring(index);
}

const msg = "0010101";
const bits_poses = associateBits(msg);

const errors = new Array();
for (let i = 0; i < bits_poses.length; i++) {
    const control_sum = bits_poses[i].reduce(
        (prev, cur) => prev + +msg[cur],
        0
    );
    control_sum % 2 !== 0 ? errors.push(bits_poses[i]) : undefined;
}

if (errors.length === 0) console.log("No Errors");
else if (errors.length === 1) {
    console.log("ERROR");
    console.log(replaceAt(msg, errors[0][0], (msg[errors[0][0]] + 1) % 2));
} else {
    console.log("ERROR");
}
