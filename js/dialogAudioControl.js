export class dialogAudioControl{
    constructor(dialogId, Audio, JSONSevice){
        this.JSONSevice = JSONSevice
        this.AudioControl = Audio
        this.selectors = {
            btnOpen: '.music-btn',
            btnClose: '.close-btn',
            mainVolumeChanger: 'mainVolume',
            musicVolumeChanger: 'musicVolume',
            clickVolumeChanger: 'clickVolume',
            notificationVolumeChanger: 'notificationVolume',
        }
        const {btnOpen, btnClose, mainVolumeChanger} = this.selectors
        this.elements = {
            dialogMain: document.getElementById(dialogId),
            btnOpen: document.querySelector(btnOpen),
            btnClose: document.querySelector(btnClose),
        }
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
        document.getElementById(this.selectors.mainVolumeChanger).addEventListener('change', (e) =>{
            this.AudioControl.setMasterVolume(e.target.value)
            this.JSONSevice.save('MasterVolume', e.target.value)
        })
        document.getElementById(this.selectors.musicVolumeChanger).addEventListener('change', (e) =>{
            this.AudioControl.setMusicVolume(e.target.value)
            this.JSONSevice.save('MusicVolume', e.target.value)
        })
        document.getElementById(this.selectors.clickVolumeChanger).addEventListener('change', (e) =>{
            this.AudioControl.setClickVolume(e.target.value)
            this.JSONSevice.save('ClickVolume', e.target.value)
        })
        document.getElementById(this.selectors.notificationVolumeChanger).addEventListener('change', (e) =>{
            this.AudioControl.setNotificationVolume(e.target.value)
            this.JSONSevice.save('NotificationVolume', e.target.value)
        })

        // const volumeControls = [
        //     {
        //         selector: this.selectors.mainVolumeChanger,
        //         setter: (e) => this.AudioControl.setMasterVolume(e.target.value),
        //         saveKey: 'MasterVolume'
        //     },
        //     {
        //         selector: this.selectors.mainVolumeChanger,
        //         setter: (e) => this.AudioControl.setMusicVolume(e.target.value),
        //         saveKey: 'MusicVolume'
        //     },
        //     {
        //         selector: this.selectors.mainVolumeChanger,
        //         setter: (e) => this.AudioControl.setMasterVolume(e.target.value),
        //         saveKey: 'MasterVolume'
        //     },
        //     {
        //         selector: this.selectors.mainVolumeChanger,
        //         setter: (e) => this.AudioControl.setMasterVolume(e.target.value),
        //         saveKey: 'MasterVolume'
        //     }
        // ]
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