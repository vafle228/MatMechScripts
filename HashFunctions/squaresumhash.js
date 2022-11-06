const IHash = require("./basehash");

class SquareSumHash extends IHash {
    static hash(string) {
        let hash = 0;
        for (let i = 0; i < string.length; i++) 
            hash += Math.pow(string.charCodeAt(i), 2);
        return hash;
    }

    static recurent_hash(last_hash, last_str, new_str) {
        return (
            last_hash -
            Math.pow(last_str.charCodeAt(0), 2) +
            Math.pow(new_str.charCodeAt(new_str.length - 1), 2)
        );
    }
}

module.exports = SquareSumHash;
