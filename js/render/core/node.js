export class Node {
    constructor() {
        this.visible = true;
        this.matrix = new Float32Array(16);
        this.children = [];
        this.parent = null;
    }

    addNode(node) {
        node.parent = this;
        this.children.push(node);
    }

    removeNode(node) {
        const index = this.children.indexOf(node);
        if (index !== -1) {
            node.parent = null;
            this.children.splice(index, 1);
        }
    }

    clone() {
        const clone = new Node();
        clone.visible = this.visible;
        clone.matrix = new Float32Array(this.matrix);
        this.children.forEach(child => {
            if (child.clone) {
                clone.addNode(child.clone());
            }
        });
        return clone;
    }
} 