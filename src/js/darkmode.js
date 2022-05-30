//this module is used for most of the work done on the library.html page
import { getLocalStorage, setLocalStorage } from "./utils.js";
export default class DarkMode {
    constructor(){
        this.deviceColorSetting
        this.currentColorSetting = getLocalStorage("color-setting")
    }

    init() {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches){
            this.deviceColorSetting = "dark"
        } else if (window.matchMedia("(prefers-color-scheme: light)").matches){
            this.deviceColorSetting = "light"
        } else {
            this.deviceColorSetting = "light";
        }

        if (this.currentColorSetting == null) {
            this.currentColorSetting = "light"
        }

        this.displayColorMode()
    }

    displayColorMode(){
        console.log(this.deviceColorSetting)
        console.log(this.currentColorSetting)
    }
}