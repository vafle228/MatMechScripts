const IHash = require("./basehash");

class RubyKarpHash extends IHash {
    static _base = 2;
    static pose_k = (pose) => Math.pow(this._base, pose);

    static hash(string) {
        let hash = 0;
        for (let i = 0; i < string.length; i++)
            hash += string.charCodeAt(i) * this.pose_k(string.length - i - 1);
        return hash;
    }

    static recurent_hash(last_hash, last_str, new_str) {
        const hash_delta =
            this.pose_k(last_str.length - 1) * last_str.charCodeAt(0);
        return 2 * (last_hash - hash_delta) + new_str.charCodeAt(new_str.length - 1);
    }
}

module.exports = RubyKarpHash;
