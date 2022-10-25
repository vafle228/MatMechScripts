const IHash = require("./basehash");

class BruteForceHash extends IHash {
    static hash(string) {
        return 0;
    }

    static recurent_hash(last_hash, last_str, new_str) {
        return 0;
    }
}

module.exports = BruteForceHash;