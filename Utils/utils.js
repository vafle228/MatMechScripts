function compareArrays(arr1, arr2) {
    // Returns if arr1 is bigger than arr2
    if (arr1.length !== arr2.length) return arr1.length > arr2.length;

    for (let i = 0; i < arr1.length; i++)
        if (arr1[i] === arr2[i]) return arr1[i] > arr2[i];
    // If arr1 == arr2 return undefined
}

function binaryLog(number) {
    return Math.log(number) / Math.log(2);
}

module.exports = {
    binaryLog,
    compareArrays,
};
