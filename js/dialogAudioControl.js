export class dialogAudioControl{
    constructor(dialogId, Audio){
        this.AudioControl = Audio
        this.selectors = {
            dialogId: dialogId,
            btnOpen: '.music-btn',
            btnClose: '.close-btn'
        }
        this.elements = {
            dialogMain: document.getElementById(this.selectors.dialogId),
            btnOpen: document.querySelector(this.selectors.btnOpen),
            btnClose: document.querySelector(this.selectors.btnClose)
        }
        console.log(this.elements)
        this.addVolumeIcons = this.addVolumeIcons.bind(this);
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)

        this.initEventListeners()
    }
    initEventListeners(){
        window.addEventListener('DOMContentLoaded', this.addVolumeIcons)
        this.elements.btnOpen.addEventListener('pointerdown', this.open)
        this.elements.btnClose.addEventListener('pointerdown', this.close)
    }
    open(){
        this.elements.dialogMain.show()
    }
    close(){
        this.elements.dialogMain.close()
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