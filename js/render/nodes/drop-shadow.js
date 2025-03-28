import { Node } from '../core/node.js';

export class DropShadowNode extends Node {
    constructor() {
        super();
        this.visible = true;
        this.scale = new Float32Array([1, 1, 1]);
    }

    draw(frame, view) {
        if (!this.visible) return;
        // Здесь должна быть реализация отрисовки тени
        // Для простоты примера оставим базовую реализацию
    }

    clone() {
        const clone = new DropShadowNode();
        clone.visible = this.visible;
        clone.scale = new Float32Array(this.scale);
        return clone;
    }
} 