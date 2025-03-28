export function createWebGLContext(options) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2', options);
    if (!context) {
        throw new Error('WebGL 2 not supported');
    }
    return context;
}

export class Renderer {
    constructor(gl) {
        this.gl = gl;
        this.canvas = gl.canvas;
        this.currentXRSession = null;
    }

    setAnimationLoop(callback) {
        if (this.currentXRSession) {
            this.currentXRSession.requestAnimationFrame(callback);
        } else {
            this.canvas.requestAnimationFrame(callback);
        }
    }

    setSize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.gl.viewport(0, 0, width, height);
    }

    get xr() {
        return {
            enabled: true,
            isPresenting: !!this.currentXRSession,
            getSession: () => this.currentXRSession,
            setSession: (session) => {
                this.currentXRSession = session;
            },
            getReferenceSpace: () => this.currentXRReferenceSpace,
            setReferenceSpace: (space) => {
                this.currentXRReferenceSpace = space;
            }
        };
    }
} 