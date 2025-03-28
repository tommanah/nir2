import { Node } from '../core/node.js';

export class Gltf2Node extends Node {
    constructor(options = {}) {
        super();
        this.url = options.url;
        this.model = null;
        this.visible = true;
        this.matrix = new Float32Array(16);
        this._loadModel();
    }

    async _loadModel() {
        try {
            const response = await fetch(this.url);
            const gltf = await response.json();
            // Здесь должна быть реализация загрузки и парсинга GLTF
            // Для простоты примера оставим базовую реализацию
            this.model = gltf;
        } catch (error) {
            console.error('Error loading GLTF model:', error);
        }
    }

    draw(frame, view) {
        if (!this.visible || !this.model) return;
        // Здесь должна быть реализация отрисовки модели
    }

    clone() {
        const clone = new Gltf2Node({ url: this.url });
        clone.matrix = new Float32Array(this.matrix);
        clone.visible = this.visible;
        return clone;
    }
} 