export class dialogModuleBase{
    constructor(dialogId){
        this.elements = {
            dialogMain: document.getElementById(dialogId),
            btnYes: document.querySelector(`#${dialogId} button[data-btn="Yes"]`),
            btnNo: document.querySelector(`#${dialogId} button[data-btn="No"]`),
        }
    }
    initEventListeners(){
        this.elements.btnYes.addEventListener('click', () =>
             this.handleDialog(true))

        this.elements.btnNo.addEventListener('click', () =>
             this.handleDialog(false))
    }
    handleDialog(parametr){
        this.elements.dialogMain.close()
    }
}
