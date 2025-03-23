export class AudioControl{
    constructor(){
        this.elements = {
            audiocontainer: document.getElementById("audio"),
            music: document.getElementById("bgMusic"),
            btnControlMusic: document.querySelector(".music-btn"),
            click: document.getElementById("click"),
            notification: document.getElementById("notification")
        }
        console.log(this.elements)
        this.musicStates = true
        this.initEventListeners()
    }   
    initEventListeners(){
        this.elements.btnControlMusic.addEventListener('pointerdown', () => this.toggleMusic())
    }
    toggleMusic(){
        this.soundClick()
        if(this.musicStates){
            this.musicStates = false
            this.elements.music.pause()
            this.elements.btnControlMusic.textContent = "Music: OFF"
        }else{
            this.musicStates = true
            this.elements.music.play()
            this.elements.btnControlMusic.textContent = "Music: ON"
        }
    }
   soundClick(){
        this.elements.click.play()
    }
    soundEndCycles(){
        this.elements.notification.play()
    }
}