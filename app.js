class PomodoroTimer{
    constructor(){
        this.WORK_TIME = 25 * 60
        this.BREAK_TIME = 5 * 60
        this.LONG_BREAK_TIME = 20 * 60
        this.totalWorkTime = 0
        this.isWorking = true
        this.timerid = null
        this.cycles = 0
        this.currentPreset = '25/5'

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
        }
        

    }
    initEventListeners(){

    }
    handlePresetClick(btn){
        this.currentPreset = btn.dataset.preset
    }
}