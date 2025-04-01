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
            clickSound: document.getElementById("clickSound"),
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
}