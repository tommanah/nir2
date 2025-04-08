export class ARModeSelector {
    constructor(interactionManager) {
        this.interactionManager = interactionManager;
        this.createUI();
    }

    createUI() {
        // Кнопка режима размещения
        const placementButton = this.createButton('📦 Разместить', 'placement');
        
        // Кнопка режима редактирования
        const editButton = this.createButton('✏️ Редактировать', 'edit');

        // Находим контейнер для кнопок режимов внутри model-select
        const container = document.querySelector('.model-select .buttons-container');
        if (!container) {
            console.error('Buttons container not found!');
            return;
        }

        container.appendChild(placementButton);
        container.appendChild(editButton);

        // Устанавливаем начальный режим
        this.interactionManager.setMode('placement');
        placementButton.style.background = '#4CAF50';
        placementButton.style.color = 'white';
    }

    createButton(text, mode) {
        const button = document.createElement('button');
        button.textContent = text;
        button.style.cssText = `
            padding: 8px 16px;
            border: none;
            border-radius: 5px;
            background: white;
            color: black;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s;
            user-select: none;
            -webkit-user-select: none;
            white-space: nowrap;
            flex: 1;
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
        // Сбрасываем стили всех кнопок в контейнере режимов
        const buttons = document.querySelector('.model-select .buttons-container').querySelectorAll('button');
        buttons.forEach(button => {
            button.style.background = 'white';
            button.style.color = 'black';
        });
    }
} 