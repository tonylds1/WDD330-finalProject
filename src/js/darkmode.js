//this module is used for most of the work done on the library.html page
import { getLocalStorage, setLocalStorage } from "./utils.js";

export default class DarkMode {
  constructor() {
    // this.deviceColorSetting
    this.currentTheme = getLocalStorage("theme")
    this.prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")
  }

  async init() {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      this.deviceColorSetting = "dark"
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      this.deviceColorSetting = "light"
    } else {
      this.deviceColorSetting = "light";
    }

    // Set the page colors based on the current theme
    if (this.currentTheme == "dark") {
      this.darkMode()
      //   document.body.classList.toggle("dark-mode");
    } else if (this.currentTheme == "light") {
      this.lightMode()
      //   document.body.classList.toggle("light-mode");
    }

    // give button functionality to toggle the dark mode at will
    await this.darkModeButton()
  }

  toggleDarkMode() {
    if (this.currentTheme == "light") {
      this.currentTheme = "dark"
      this.darkMode()
    } else if (this.currentTheme == "dark") {
      this.lightMode()
      this.currentTheme = "light"
    }

    setLocalStorage("theme", this.currentTheme);
  }

  async darkModeButton() {
    let button = document.querySelector(".darkModeToggle");
    button.addEventListener("click", () => {
      this.toggleDarkMode()
      //   console.log(this.currentColorSetting)
    });
  }


  darkMode() {
    console.log("dark");
    // let root = document.querySelector(":root");
    // console.log()
    // document.documentElement.style.setProperty("--tertiary-color", "lightblue");
    document.documentElement.style.setProperty("--primary-color", "#1BD4BA");
    document.documentElement.style.setProperty("--secondary-color", "#000");
    document.documentElement.style.setProperty("--tertiary-color", "#bf8c00");
    document.documentElement.style.setProperty("--quaternary-color", "#dadfe1");
    document.documentElement.style.setProperty("--base-color", "#363636");
    document.documentElement.style.setProperty("--text-color", "white");
    document.documentElement.style.setProperty("--light-background", "#dadfe1");
    document.documentElement.style.setProperty("--dark-grey", "#fefefe");

    // console.log(root.style.getPropertyValue("--white"))

    // document.documentElement.style.setProperty("--tertiary-color", "black");

  }

  lightMode() {
    console.log("light");
    // let root = document.querySelector(":root");
    // console.log(root.style.getPropertyValue("--tertiary-color"))
    document.documentElement.style.setProperty("--primary-color", "#04AA6D");
    document.documentElement.style.setProperty("--secondary-color", "#cbf3f0");
    document.documentElement.style.setProperty("--tertiary-color", "#ffbf69");
    document.documentElement.style.setProperty("--quaternary-color", "#ff9f1c");
    document.documentElement.style.setProperty("--base-color", "#ffffff");
    document.documentElement.style.setProperty("--text-color", "black");
    document.documentElement.style.setProperty("--light-background", "#fefefe");
    document.documentElement.style.setProperty("--dark-grey", "#000000");

    // document.documentElement.style.setProperty("--tertiary-color", "white");
  }

}