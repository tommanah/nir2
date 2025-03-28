export class Ray {
    constructor() {
        this.origin = new Float32Array(3);
        this.direction = new Float32Array(3);
    }

    set(origin, direction) {
        this.origin.set(origin);
        this.direction.set(direction);
    }

    clone() {
        const ray = new Ray();
        ray.origin.set(this.origin);
        ray.direction.set(this.direction);
        return ray;
    }
} 