const Node = require("./node");

function getCharFrequency(text) {
    const frequency = new Map();

    for (let character of text) {
        let char_val = frequency.get(character);
        frequency.set(character, char_val ? char_val + 1 : 1);
    }

    return frequency;
}

function getNodes(frequency) {
    const nodes = [];
    for (let [key, value] of frequency.entries())
        nodes.push(new Node(key, value));
    return nodes.sort((node1, node2) => node1 - node2);
}

module.exports = {
    getCharFrequency,
    getNodes,
};
