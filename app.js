class PomodoroTimer {
    constructor() {
        // Тайминги в секундах (минуты * 60)
        this.WORK_TIME = 25 * 60;    // Рабочее время
        this.BREAK_TIME = 5 * 60;    // Короткий перерыв
        this.LONG_BREAK_TIME = 20 * 60; // Длинный перерыв
        this.TIME_TO_LONG_BREAK = 7200; // 2 часа (7200 сек) работы до длинного перерыва
        
        // Состояние таймера
        this.totalWorkTime = 0;      // Общее накопленное рабочее время (в секундах)
        this.isWorking = true;       // Флаг текущего состояния (работа/перерыв)
        this.timerId = null;         // ID интервала для управления таймером
        this.cycles = 0;             // Количество завершенных циклов
        this.currentPreset = '25/5'; // Текущий выбранный пресет
        this.timeLeft = this.WORK_TIME; // Оставшееся время текущей фазы

        // Получаем элементы DOM
        this.elements = {
            timer: document.querySelector('.timer'),
            startBtn: document.querySelector('.start-btn'),
            resetBtn: document.querySelector('.reset-btn'),
            musicBtn: document.querySelector('.music-btn'),
            longBreakCounter: document.getElementById('longBreakCounter'),
            audio: document.getElementById('bgMusic'),
            dialog: document.getElementById('dialog'),
            dialogYes: document.getElementById('btnYes'),
            dialogNo: document.getElementById('btnNo'),
            progressRing: document.querySelector('.progress-ring .progress'),
            presetBtn: document.querySelector('.preset-btn')//Продолжать
        };

        // Инициализация прогресс-круга
        const radius = this.elements.progressRing.r.baseVal.value;
        this.circumference = 2 * Math.PI * radius; // Длина окружности
        // Устанавливаем dash-array равный длине окружности
        this.elements.progressRing.style.strokeDasharray = 
            `${this.circumference} ${this.circumference}`;
        // Смещаем dash-offset на полную длину, чтобы круг был пустым
        this.elements.progressRing.style.strokeDashoffset = this.circumference;

        this.initEventListeners();
        this.updateDisplay();
    }

    // Инициализация обработчиков событий
    initEventListeners() {
        this.elements.startBtn.addEventListener('click', () => this.toggleTimer());
        this.elements.resetBtn.addEventListener('click', () => this.resetTimer());
        
        // Обработчики для пресетов
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', () => this.handlePresetClick(btn));
        });
        
        // Обработчики диалогового окна
        this.elements.dialogYes.addEventListener('click', () => this.handleDialog(true));
        this.elements.dialogNo.addEventListener('click', () => this.handleDialog(false));
    }

    // Обработка клика на пресет
    handlePresetClick(btn) {
        if (btn.classList.contains('active')) return;

        // Парсим значения из data-атрибута (например "25/5" -> [25, 5])
        this.currentPreset = btn.dataset.preset;
        const [work, brk] = this.currentPreset.split('/').map(Number);
        
        // Конвертируем минуты в секунды для хранения
        this.WORK_TIME = work * 60;
        this.BREAK_TIME = brk * 60;

        // Обновляем UI и сбрасываем таймер
        document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.resetTimer();
    }

    // Обновление отображения таймера
    updateDisplay() {
        // Рассчитываем минуты: делим секунды на 60 и берем целую часть
        const minutes = Math.floor(this.timeLeft / 60);
        // Рассчитываем секунды: остаток от деления на 60
        const seconds = this.timeLeft % 60;
        
        // Форматируем в MM:SS с ведущими нулями
        this.elements.timer.textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Рассчитываем время до длинного перерыва: 120 минут - отработанные минуты
        this.elements.longBreakCounter.textContent = 
            Math.max(120 - Math.floor(this.totalWorkTime / 60), 0);
        
        this.updateProgress();
    }

    // Обновление прогресс-бара
    updateProgress() {
        // Определяем длительность текущей фазы
        const currentDuration = this.isWorking 
            ? this.WORK_TIME // Если рабочая фаза
            : (this.totalWorkTime >= this.TIME_TO_LONG_BREAK 
                ? this.LONG_BREAK_TIME // Если накопили 2 часа - длинный перерыв
                : this.BREAK_TIME);   // Иначе короткий перерыв
        
        // Рассчитываем прогресс: 
        // 1. Находим отношение оставшегося времени к полной длительности
        // 2. Умножаем на длину окружности
        // 3. Вычитаем из полной длины, чтобы анимация шла от полного к пустому
        const progress = this.circumference - (this.timeLeft / currentDuration) * this.circumference;
        
        // Применяем рассчитанное смещение
        this.elements.progressRing.style.strokeDashoffset = progress;
    }

    // Переключение состояния таймера (старт/пауза)
    toggleTimer() {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
            this.elements.startBtn.textContent = 'Продолжить';
        } else {
            this.startTimer();
        }
    }

    // Запуск основного таймера
    startTimer() {
        this.elements.startBtn.textContent = 'Пауза';
        // Запускаем интервал с шагом 1 секунда
        this.timerId = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();

            // Когда время закончилось
            if (this.timeLeft <= 0) {
                clearInterval(this.timerId);
                this.timerId = null;
                this.switchPhase(); // Меняем фазу

                // Если перешли в рабочую фазу - показываем диалог
                if (!this.isWorking) {
                    this.cycles++;
                    this.elements.dialog.showModal();
                } else {
                    this.startTimer();
                }
            }
        }, 1000); // Интервал 1000ms = 1 секунда
    }

    // Переключение между рабочим временем и перерывом
    switchPhase() {
        if (this.isWorking) {
            // Добавляем отработанное время к общему
            this.totalWorkTime += this.WORK_TIME;
            // Определяем длительность перерыва
            this.timeLeft = this.totalWorkTime >= this.TIME_TO_LONG_BREAK
                ? this.LONG_BREAK_TIME
                : this.BREAK_TIME;
        } else {
            // Сбрасываем на рабочее время
            this.timeLeft = this.WORK_TIME;
        }
        // Инвертируем флаг фазы
        this.isWorking = !this.isWorking;
        this.updateDisplay();
    }

    // Сброс таймера в начальное состояние
    resetTimer() {
        clearInterval(this.timerId);
        this.timerId = null;
        this.isWorking = true;
        this.timeLeft = this.WORK_TIME;
        this.totalWorkTime = 0;
        this.cycles = 0;
        this.elements.dialog.close();
        this.updateDisplay();
    }

    // Обработка ответа из диалогового окна
    handleDialog(continueWork) {
        this.elements.dialog.close();
        if (continueWork) {
            this.startTimer();
        } else {
            this.resetTimer();
        }
    }
}

new PomodoroTimer();