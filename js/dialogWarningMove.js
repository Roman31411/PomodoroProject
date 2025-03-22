import { dialogModuleBase } from "./dialogModuleBase.js"

export class dialogWarningMove extends dialogModuleBase{
    constructor(dialogId, PomodoroTimer){
        super(dialogId)
        this.PomodoroTimer = PomodoroTimer
    }
    handleDialog(sure) {
        if (sure && this.PomodoroTimer.selectedPresetBtn) {
            this.PomodoroTimer.ignoreCheck = true;
            this.PomodoroTimer.handlePresetClick(this.PomodoroTimer.selectedPresetBtn);
            this.PomodoroTimer.selectedPresetBtn = null; // Сбросить после обработки
        }
        this.elements.dialogMain.close()
    }
}