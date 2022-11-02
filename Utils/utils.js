function compareArrays(arr1, arr2) {
    // Returns if arr1 is bigger than arr2
    if (arr1.length !== arr2.length) return arr1.length > arr2.length;

    for (let i = 0; i < arr1.length; i++)
        if (arr1[i] === arr2[i]) return arr1[i] > arr2[i];
    // If arr1 == arr2 return undefined
}

function binaryLog(number) {
    if (number === 0) return 0;
    return Math.log(number) / Math.log(2);
}

function arrayFill(length, array) {
    if (array.length >= length) array.length = length;
    for (let i = array.length; i < length; i++) array.push(0);
    return array;
}

function arrayPreFill(length, array) {
    if (array.length >= length) array.length = length;
    for (let i = array.length; i < length; i++) array.unshift(0);
    return array;
}

module.exports = {
    binaryLog,
    compareArrays,
    arrayFill,
    arrayPreFill,
};
