export class Scene {
    constructor() {
        this.children = [];
        this.clear = true;
        this._renderer = null;
        this._stats = false;
    }

    addNode(node) {
        this.children.push(node);
    }

    removeNode(node) {
        const index = this.children.indexOf(node);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
    }

    setRenderer(renderer) {
        this._renderer = renderer;
    }

    enableStats(enabled) {
        this._stats = enabled;
    }

    startFrame() {
        if (this.clear) {
            const gl = this._renderer.gl;
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        }
    }

    endFrame() {
        if (this._stats) {
            // Здесь можно добавить статистику рендеринга
        }
    }

    drawXRFrame(frame, pose) {
        if (!pose) return;

        const gl = this._renderer.gl;
        const session = frame.session;
        const baseLayer = session.renderState.baseLayer;

        gl.bindFramebuffer(gl.FRAMEBUFFER, baseLayer.framebuffer);

        for (let view of pose.views) {
            const viewport = baseLayer.getViewport(view);
            gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);

            // Отрисовка для каждого view
            this.children.forEach(child => {
                if (child.visible !== false) {
                    child.draw && child.draw(frame, view);
                }
            });
        }
    }
} 