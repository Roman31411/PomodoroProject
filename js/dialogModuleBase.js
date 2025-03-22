export class dialogModuleBase{
    constructor(dialogId){
        this.elements = {
            dialogMain: document.getElementById(dialogId),
            btnYes: document.querySelector(`#${dialogId} button[data-btn="Yes"]`),
            btnNo: document.querySelector(`#${dialogId} button[data-btn="No"]`),
        }
        this.initEventListeners()
    }
    initEventListeners(){
        this.elements.btnYes.addEventListener('click', () =>{
            console.log("click yes")
             this.handleDialog(true)
        })
        this.elements.btnNo.addEventListener('click', () =>{
            console.log("click no")
             this.handleDialog(false)
        })
    }
    handleDialog(){
        
    }
}

