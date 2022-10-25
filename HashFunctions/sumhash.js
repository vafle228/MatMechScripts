const IHash = require("./basehash");

class SumHash extends IHash {
    static hash(string) {
        let hash = 0;
        for (let i = 0; i < string.length; i++) 
            hash += string.charCodeAt(i);
        return hash;
    }

    static recurent_hash(last_hash, last_str, new_str) {
        return (
            last_hash -
            last_str.charCodeAt(0) +
            new_str.charCodeAt(new_str.length - 1)
        );
    }
}

module.exports = SumHash;