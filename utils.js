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
    return str.substring(0, index) + new_el + str.substring(index + 1);
}

function addAt(str, index, new_el) {
    return str.substring(0, index) + new_el + str.substring(index);
}

function getSameElement(...arrays) {
    for (let i = 0; i < arrays[0].length; i++) {
        for (let j = 1; j < arrays.length; j++) {
            if (!arrays[j].includes(arrays[0][i])) break;
            if (j === arrays.length - 1) return arrays[0][i];
        }
    }
}
