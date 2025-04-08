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
            pointer-events: auto;
        `;

        // Кнопка режима размещения
        const placementButton = this.createButton('📦 Разместить', 'placement');
        
        // Кнопка режима редактирования
        const editButton = this.createButton('✏️ Редактировать', 'edit');

        container.appendChild(placementButton);
        container.appendChild(editButton);

        // Ищем ui-container и добавляем в него наши кнопки
        const uiContainer = document.querySelector('.ui-container');
        if (uiContainer) {
            uiContainer.appendChild(container);
        } else {
            console.error('UI container not found!');
            document.body.appendChild(container);
        }

        // Устанавливаем начальный режим
        this.interactionManager.setMode('placement');
        placementButton.style.background = '#4CAF50';
        placementButton.style.color = 'white';
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
            user-select: none;
            -webkit-user-select: none;
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
            if (button.textContent.includes('📦') || button.textContent.includes('✏️')) {
                button.style.background = 'white';
                button.style.color = 'black';
            }
        });
    }
} 