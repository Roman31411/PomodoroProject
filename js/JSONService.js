export class JSONSevice{
    constructor(){

    }
    static save(KEY, date){
        localStorage.setItem(KEY, JSON.stringify(date))
    }
    static load(KEY){
        return JSON.parse(localStorage.getItem(KEY))
    }
}