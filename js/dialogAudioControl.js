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
        this.addVolumeIcons = this.addVolumeIcons.bind(this)
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)

        this.initEventListeners()
    }
    initEventListeners(){
        window.addEventListener('DOMContentLoaded',() => {
            this.addVolumeIcons()
            this.bindVolumeControls()
        } )
        this.elements.btnOpen.addEventListener('click', this.open)
        this.elements.btnClose.addEventListener('click', this.close)
        
    }
    open(){
        this.elements.dialogMain.show()
    }
    close(){
        this.elements.dialogMain.close()
    }
    bindVolumeControls(){
        const volumeControls = [
            {
                selector: this.selectors.mainVolumeChanger,
                setter: (e) => this.AudioControl.setMasterVolume(e),
                saveKey: 'MasterVolume'
            },
            {
                selector: this.selectors.musicVolumeChanger,
                setter: (e) => this.AudioControl.setMusicVolume(e),
                saveKey: 'MusicVolume'
            },
            {
                selector: this.selectors.clickVolumeChanger,
                setter: (e) => this.AudioControl.setClickVolume(e),
                saveKey: 'ClickVolume'
            },
            {
                selector: this.selectors.notificationVolumeChanger,
                setter: (e) => this.AudioControl.setNotificationVolume(e),
                saveKey: 'NotificationVolume'
            }
        ]
        volumeControls.forEach(({selector, setter, saveKey})=>{
            const element = document.getElementById(selector)
            if (!element) return

            element.addEventListener('change', (e)=>{
                const value = e.target.value
                setter(value)
                this.JSONSevice.save(saveKey, value)
            })
        })
    }
    addVolumeIcons() {
        const inputs = this.elements.dialogMain.querySelectorAll("fieldset input[type='range']")
        
        // Создаем функцию для генерации SVG-иконок
        const createIcon = (iconId) => {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
            const use = document.createElementNS("http://www.w3.org/2000/svg", "use")
            
            svg.setAttribute('width', '20')
            svg.setAttribute('height', '20')
            svg.setAttribute('role', 'button')
            use.setAttribute('href', `/source/icons/sprite.svg#${iconId}`)
            use.setAttribute('xlink:href', `/source/icons/sprite.svg#${iconId}`) // Для старых браузеров
            
            svg.appendChild(use)
            return svg
        }
    
        inputs.forEach(input => {
            const wrapper = document.createElement('div')
            wrapper.className = 'inputs-wrapper'
            // Создаем кнопки с SVG
            const muteButton = document.createElement('button')
            muteButton.type = 'button'
            muteButton.className = 'volume-btn'
            muteButton.title = 'off volume'
            muteButton.appendChild(createIcon('icon-volume-off'))
            
            const unmuteButton = document.createElement('button')
            unmuteButton.type = 'button'
            unmuteButton.className = 'volume-btn'
            unmuteButton.title = 'on volume'
            unmuteButton.appendChild(createIcon('icon-volume-on'))
    
            // Клонируем input
            const clonedInput = input.cloneNode(true)
    
            // Добавляем элементы в обертку
            wrapper.append(muteButton, clonedInput, unmuteButton)
    
            // Заменяем оригинальный input
            input.replaceWith(wrapper)
        })
    }
}