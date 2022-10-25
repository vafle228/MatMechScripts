class Node {
    constructor(name, weigth, children = null) {
        this.name = name;
        this.weight = weigth;
        this.children = children;
    }

    [Symbol.toPrimitive](hint) {
        return hint === "number" ? this.weight : this.name;
    }

    createParent(node) {
        return new Node(this.name + node.name, +this + +node, [this, node]);
    }
}

module.exports = Node;
