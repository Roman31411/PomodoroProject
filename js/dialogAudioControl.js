export class dialogAudioControl{
    constructor(dialogId){
        this.elements = {
            dialogMain: document.getElementById(dialogId)
        }
        this.elements.dialogMain.show()

        this.initEventListeners()
    }
    initEventListeners(){

    }
    addVolumeIcons(){
        const inputs = this.elements.dialogMain.querySelectorAll("fieldset input[type='range']")
        inputs.forEach(input => {
            //create div for input and img
            const wrapper = document.createElement('div')
            wrapper.className = 'inputs-wrapper'

        })
    }
}