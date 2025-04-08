export class ARModeSelector {
    constructor(interactionManager) {
        this.interactionManager = interactionManager;
        this.setupEventListeners();
    }

    setupEventListeners() {
        const placementButton = document.getElementById('placementButton');
        const editButton = document.getElementById('editButton');

        if (!placementButton || !editButton) {
            console.error('Mode buttons not found!');
            return;
        }

        // Устанавливаем обработчики для кнопок
        placementButton.addEventListener('click', () => {
            this.interactionManager.setMode('placement');
            this.updateButtonStyles();
            placementButton.classList.add('active');
        });

        editButton.addEventListener('click', () => {
            this.interactionManager.setMode('edit');
            this.updateButtonStyles();
            editButton.classList.add('active');
        });

        // Устанавливаем начальный режим
        this.interactionManager.setMode('placement');
    }

    updateButtonStyles() {
        // Сбрасываем активное состояние всех кнопок
        const buttons = document.querySelectorAll('.buttons-container button');
        buttons.forEach(button => {
            button.classList.remove('active');
        });
    }
} 