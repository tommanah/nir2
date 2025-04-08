export class Node {
    constructor() {
        this.visible = true;
        this.matrix = new Float32Array(16);
        this.children = [];
        this.parent = null;
        this.isSelected = false;
        this.scale = {x: 1, y: 1, z: 1};
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

    setSelected(selected) {
        this.isSelected = selected;
        // Распространяем выделение на дочерние элементы
        this.children.forEach(child => {
            if (child.setSelected) {
                child.setSelected(selected);
            }
        });
    }

    setScale(x, y, z) {
        this.scale.x = x;
        this.scale.y = y;
        this.scale.z = z;
        this.updateMatrix();
    }

    scaleBy(factor) {
        this.scale.x *= factor;
        this.scale.y *= factor;
        this.scale.z *= factor;
        this.updateMatrix();
    }

    updateMatrix() {
        // Обновляем матрицу трансформации с учетом масштаба
        // Здесь нужно применить масштаб к текущей матрице трансформации
        const scaleMatrix = new Float32Array([
            this.scale.x, 0, 0, 0,
            0, this.scale.y, 0, 0,
            0, 0, this.scale.z, 0,
            0, 0, 0, 1
        ]);
        
        // Умножаем текущую матрицу на матрицу масштабирования
        this.multiplyMatrices(this.matrix, scaleMatrix);
    }

    multiplyMatrices(a, b) {
        const result = new Float32Array(16);
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let sum = 0;
                for (let k = 0; k < 4; k++) {
                    sum += a[i * 4 + k] * b[k * 4 + j];
                }
                result[i * 4 + j] = sum;
            }
        }
        this.matrix = result;
    }

    clone() {
        const clone = new Node();
        clone.visible = this.visible;
        clone.matrix = new Float32Array(this.matrix);
        clone.isSelected = this.isSelected;
        clone.scale = {...this.scale};
        this.children.forEach(child => {
            if (child.clone) {
                clone.addNode(child.clone());
            }
        });
        return clone;
    }
} 