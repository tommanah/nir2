export class ARInteractionManager {
    constructor() {
        this.mode = 'placement'; // 'edit' или 'placement'
        this.selectedObject = null;
        this.initialPinchDistance = 0;
    }

    setMode(mode) {
        if (mode !== 'edit' && mode !== 'placement') {
            throw new Error('Неверный режим. Используйте "edit" или "placement"');
        }
        
        // При смене режима снимаем выделение
        if (this.selectedObject) {
            this.selectedObject.setSelected(false);
            this.selectedObject = null;
        }
        
        this.mode = mode;
    }

    handleTouch(event, scene, hitTestCallback) {
        if (this.mode === 'placement') {
            // В режиме размещения вызываем переданный callback для размещения объекта
            hitTestCallback(event);
        } else if (this.mode === 'edit') {
            // В режиме редактирования обрабатываем выделение
            this.handleEditModeTouch(event, scene);
        }
    }

    handleEditModeTouch(event, scene) {
        const touch = event.touches[0];
        const {clientX: x, clientY: y} = touch;

        // Если уже есть выделенный объект, снимаем выделение
        if (this.selectedObject) {
            this.selectedObject.setSelected(false);
            this.selectedObject = null;
        }

        // Ищем объект под касанием среди размещенных объектов
        const hitObject = this.findObjectUnderTouch(x, y, scene);
        if (hitObject) {
            this.selectedObject = hitObject;
            hitObject.setSelected(true); // Это активирует каркас выделения
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

    findObjectUnderTouch(x, y, scene) {
        // Рекурсивный поиск объекта под точкой касания
        const findInNode = (node) => {
            if (node.hitTest && node.hitTest(x, y)) {
                return node;
            }

            for (const child of node.children) {
                const found = findInNode(child);
                if (found) return found;
            }

            return null;
        };

        return findInNode(scene);
    }
} 