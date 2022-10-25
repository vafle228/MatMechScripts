function decodeMsg(msg) {
    const bits_poses = associateBits(msg);

    const errors = new Array();
    for (let i = 0; i < bits_poses.length; i++) {
        const control_sum = bits_poses[i].reduce(
            (prev, cur) => prev + +msg[cur], 0
        );
        control_sum % 2 !== 0 ? errors.push(bits_poses[i]) : undefined;
    }

    alert(errors.length === 0 ? "NO ERRORS" : "ERROR");

    if (errors.length !== 0) {
        const error_pos =
            errors.length === 1 ? errors[0][0] : getSameElement(...errors);
        msg = replaceAt(msg, error_pos, (+msg[error_pos] + 1) % 2);
    }

    return msg;
}

function encodeMsg(msg) {
    for (let i = 0; Math.pow(2, i) < msg.length; i++)
        msg = addAt(msg, Math.pow(2, i) - 1, "0");
    const bits_poses = associateBits(msg);

    for (let i = 0; i < bits_poses.length; i++)
        msg = replaceAt(
            msg,
            bits_poses[i][0],
            bits_poses[i].reduce((prev, cur) => prev + +msg[cur], 0) % 2
        );
    
    return msg;
}
