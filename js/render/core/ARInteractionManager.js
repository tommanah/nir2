export class ARInteractionManager {
    constructor(scene, camera, placedObjects) {
        this.mode = 'placement';
        this.selectedObject = null;
        this.initialPinchDistance = 0;
        this.scene = scene;
        this.camera = camera;
        this.placedObjects = placedObjects;
        this.raycaster = new Raycaster();
        this.lastIntersectedObject = null;
    }

    setMode(mode) {
        if (mode !== 'edit' && mode !== 'placement') {
            throw new Error('Неверный режим. Используйте "edit" или "placement"');
        }
        
        // При смене режима снимаем выделение и сбрасываем прозрачность
        if (this.selectedObject) {
            this.selectedObject.setSelected(false);
            this.selectedObject = null;
        }
        this.resetAllObjectsOpacity();
        
        this.mode = mode;
    }

    // Сброс прозрачности всех объектов
    resetAllObjectsOpacity() {
        for (const object of this.placedObjects) {
            if (object.material && object.material.transparent) {
                object.material.opacity = 1.0;
            }
        }
    }

    // Обновление пересечений луча с объектами
    updateRaycasterIntersections(frame) {
        if (!frame || this.mode !== 'edit') return;

        const pose = frame.getViewerPose(frame.session.renderState.baseLayer.getViewerPose());
        if (!pose) return;

        // Получаем матрицу преобразования из pose
        const view = pose.views[0];
        const viewMatrix = new Matrix4().fromArray(view.transform.matrix);
        
        // Устанавливаем направление луча из центра экрана
        this.raycaster.ray.origin.setFromMatrixPosition(viewMatrix);
        this.raycaster.ray.direction.set(0, 0, -1).applyMatrix4(viewMatrix);

        // Проверяем пересечения с размещенными объектами
        const intersects = this.raycaster.intersectObjects(this.placedObjects);

        // Сбрасываем прозрачность предыдущего объекта
        if (this.lastIntersectedObject && (!intersects.length || intersects[0].object !== this.lastIntersectedObject)) {
            this.lastIntersectedObject.material.opacity = 1.0;
            this.lastIntersectedObject = null;
        }

        // Устанавливаем прозрачность для нового пересеченного объекта
        if (intersects.length > 0) {
            const intersectedObject = intersects[0].object;
            if (intersectedObject !== this.lastIntersectedObject) {
                intersectedObject.material.opacity = 0.6;
                this.lastIntersectedObject = intersectedObject;
            }
        }
    }

    handleTouch(event, scene, hitTestCallback) {
        if (this.mode === 'placement') {
            hitTestCallback(event);
        } else if (this.mode === 'edit' && this.lastIntersectedObject) {
            // Выбираем объект, на который указывает луч
            if (this.selectedObject) {
                this.selectedObject.setSelected(false);
            }
            this.selectedObject = this.lastIntersectedObject;
            this.selectedObject.setSelected(true);
        }
    }

    handlePinchStart(event) {
        if (this.mode !== 'edit' || !this.selectedObject) return;

        if (event.touches.length === 2) {
            const touch1 = event.touches[0];
            const touch2 = event.touches[1];
            this.initialPinchDistance = Math.hypot(
                touch2.clientX - touch1.clientX,
                touch2.clientY - touch1.clientY
            );
        }
    }

    handlePinchMove(event) {
        if (this.mode !== 'edit' || !this.selectedObject) return;

        if (event.touches.length === 2) {
            const touch1 = event.touches[0];
            const touch2 = event.touches[1];
            const currentDistance = Math.hypot(
                touch2.clientX - touch1.clientX,
                touch2.clientY - touch1.clientY
            );

            const scale = currentDistance / this.initialPinchDistance;
            this.selectedObject.handlePinchGesture(scale);
            this.initialPinchDistance = currentDistance;
        }
    }
} 