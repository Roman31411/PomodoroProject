export class AudioControl{
    constructor(){
        this.selectors = {
            audio: 'audio',
            bgMusic: 'bgMusic',
            notification: 'notification',
            clickSound: 'clickSound'
        }
        this.elements = {
            audiocontainer: document.getElementById(this.selectors.audio),
            music: document.getElementById(this.selectors.bgMusic),
            clickSound: document.getElementById(this.selectors.clickSound),
            notification: document.getElementById(this.selectors.notification),
        }
        this.musicStates = true
        this.initEventListeners()
    }   
    initEventListeners(){
      
    }
    soundClick(){
        this.elements.clickSound.play()
    }
    soundEndCycles(){
        this.elements.notification.play()
    }
    setMasterVolume(volume){
        const scaledVolume = volume / 100
        const {music, clickSound, notification} = this.elements
        music.volume = scaledVolume
        clickSound.volume = scaledVolume
        notification.volume = scaledVolume
    }
    
}