import { dialogModuleBase } from "./dialogModuleBase.js"

export class dialogModuleNextCycles extends dialogModuleBase{
    constructor(dialogId, PomodoroTimer){
        super(dialogId)
        this.PomodoroTimer = PomodoroTimer
    }
    // Обработка ответа из диалогового окна
    handleDialog(continueWork){
        this.elements.dialogMain.close()
        if (continueWork) {
            this.PomodoroTimer.startTimer()
        } else {
            this.PomodoroTimer.resetTimer()
        }
    }
     
}