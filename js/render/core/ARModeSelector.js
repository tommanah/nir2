export class ARModeSelector {
    constructor(interactionManager) {
        this.interactionManager = interactionManager;
        this.createUI();
    }

    createUI() {
        // Создаем контейнер для кнопок
        const container = document.createElement('div');
        container.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
            background: rgba(0, 0, 0, 0.5);
            padding: 10px;
            border-radius: 10px;
            z-index: 1000;
        `;

        // Кнопка режима размещения
        const placementButton = this.createButton('📦 Разместить', 'placement');
        
        // Кнопка режима редактирования
        const editButton = this.createButton('✏️ Редактировать', 'edit');

        container.appendChild(placementButton);
        container.appendChild(editButton);
        document.body.appendChild(container);
    }

    createButton(text, mode) {
        const button = document.createElement('button');
        button.textContent = text;
        button.style.cssText = `
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            background: white;
            color: black;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s;
        `;

        button.addEventListener('click', () => {
            this.interactionManager.setMode(mode);
            this.updateButtonStyles();
            button.style.background = '#4CAF50';
            button.style.color = 'white';
        });

        return button;
    }

    updateButtonStyles() {
        // Сбрасываем стили всех кнопок
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.style.background = 'white';
            button.style.color = 'black';
        });
    }
} 