export class dialogAudioControl{
    constructor(dialogId, Audio, JSONSevice){
        this.JSONSevice = JSONSevice
        this.AudioControl = Audio
        this.selectors = {
            btnOpen: '.music-btn',
            btnClose: '.close-btn',
            mainVolumeChanger: 'mainVolume'
        }
        const {btnOpen, btnClose, mainVolumeChanger} = this.selectors
        this.elements = {
            dialogMain: document.getElementById(dialogId),
            btnOpen: document.querySelector(btnOpen),
            btnClose: document.querySelector(btnClose),
            mainVolumeChanger: document.getElementById(mainVolumeChanger)
        }
        console.log(this.elements)
        this.addVolumeIcons = this.addVolumeIcons.bind(this);
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)

        this.initEventListeners()
    }
    initEventListeners(){
        window.addEventListener('DOMContentLoaded',() => {
            this.addVolumeIcons()
            this.bindVolumeControls()
        } )
        this.elements.btnOpen.addEventListener('pointerdown', this.open)
        this.elements.btnClose.addEventListener('pointerdown', this.close)
        
    }
    open(){
        this.elements.dialogMain.show()
    }
    close(){
        this.elements.dialogMain.close()
    }
    bindVolumeControls(){
        console.log(document.getElementById(this.selectors.mainVolumeChanger))
        document.getElementById(this.selectors.mainVolumeChanger).addEventListener('change', (e) =>{
            this.AudioControl.setMasterVolume(e.target.value)
            this.JSONSevice.save('dsad' ,e.target.value)
        })
    }
    addVolumeIcons(){
        const inputs = this.elements.dialogMain.querySelectorAll("fieldset input[type='range']")
        inputs.forEach(input => {
            //create container for input and img
            const wrapper = document.createElement('div')
            wrapper.className = 'inputs-wrapper'

            //create img for input
            const muteIcon = document.createElement('img')
            muteIcon.src = '../source/icons/volumeOFF.svg'
            muteIcon.alt = 'mute'
            muteIcon.width = 20
            muteIcon.height = 20

            const unmuteIcon = document.createElement('img')
            unmuteIcon.src = '../source/icons/volumeON.svg'
            unmuteIcon.alt = 'unmute'
            unmuteIcon.width = 20
            unmuteIcon.height = 20

            //append element in wrapper
            wrapper.append(muteIcon, input.cloneNode(true), unmuteIcon)

            //replace origin input, wrapper
            input.replaceWith(wrapper)
        })
    }
}