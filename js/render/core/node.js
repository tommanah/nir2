export class Node {
    constructor() {
        this.visible = true;
        this.matrix = new Float32Array(16);
        this.children = [];
        this.parent = null;
        this.isSelected = false;
        this.scale = {x: 1, y: 1, z: 1};
        this.originalColor = null;
        this.highlightColor = [1.0, 0.5, 0.0, 1.0]; // Оранжевый цвет для выделения
        this.boundingBox = {
            min: {x: 0, y: 0, z: 0},
            max: {x: 0, y: 0, z: 0}
        };
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
        if (selected) {
            this.highlight();
            // Показываем визуальные маркеры для масштабирования
            this.showScaleHandles();
        } else {
            this.removeHighlight();
            // Скрываем визуальные маркеры
            this.hideScaleHandles();
        }
        
        this.children.forEach(child => {
            if (child.setSelected) {
                child.setSelected(selected);
            }
        });
    }

    highlight() {
        if (this.material && !this.originalColor) {
            // Сохраняем оригинальный цвет
            this.originalColor = [...this.material.color];
            // Устанавливаем цвет выделения
            this.material.color = this.highlightColor;
            // Добавляем свечение
            this.material.emissive = [0.2, 0.2, 0.0];
        }
    }

    removeHighlight() {
        if (this.material && this.originalColor) {
            // Возвращаем оригинальный цвет
            this.material.color = this.originalColor;
            this.material.emissive = [0, 0, 0];
            this.originalColor = null;
        }
    }

    showScaleHandles() {
        // Создаем визуальные маркеры для масштабирования
        // на углах объекта
        this.calculateBoundingBox();
        // Здесь код для отображения маркеров масштабирования
    }

    hideScaleHandles() {
        // Удаляем визуальные маркеры
    }

    calculateBoundingBox() {
        // Вычисляем границы объекта для правильного размещения маркеров
    }

    // Метод для проверки попадания точки касания в объект
    hitTest(x, y, camera) {
        // Реализация проверки попадания точки касания в объект
        // с учетом перспективы камеры
        return false; // Заглушка
    }

    // Обработка жеста масштабирования
    handlePinchGesture(scale) {
        if (this.isSelected) {
            this.scaleBy(scale);
        }
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