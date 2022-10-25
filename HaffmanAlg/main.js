const {
    getNodes: getNodes,
    getCharFrequency: getCharFrequency,
} = require("./utils");

function getCodes(node) {
    if (node.children === null)
        return new Array([node.name, ""]);
    
    const left_branch = getCodes(node.children[0])
        .map((val) => ([val[0], "0" + val[1]]));
    
    const right_branch = getCodes(node.children[1])
        .map((val) => ([val[0], "1" + val[1]]));
    
    return left_branch.concat(right_branch)
}

function HaffmanAlg(text) {
    const nodes = getNodes(getCharFrequency(text));

    while (nodes.length !== 1) {
        const min_node = nodes.shift();
        const second_min_node = nodes.shift();

        nodes.push(min_node.createParent(second_min_node));

        nodes.sort((node1, node2) => node1 - node2);
    }

    if (nodes[0].children == null)
        return Array([nodes[0].name, "0"])
    return getCodes(nodes[0]);
}

module.exports =  HaffmanAlg;
