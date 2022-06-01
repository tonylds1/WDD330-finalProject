//this module is used for most of the work done on the library.html page
import { getLocalStorage, setLocalStorage } from "./utils.js";

export default class DarkMode {
  constructor() {
    this.currentTheme = getLocalStorage("theme");
    this.prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  }

  async init() {
    // Set the preference the first time the user visits the site
    if (
      window.matchMedia("(prefers-color-scheme: light)").matches &&
      this.currentTheme == null
    ) {
      this.currentTheme = "light";

    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches && this.currentTheme == null) {
      this.currentTheme = "dark"
    } 
    await this.darkModeButton();


    // Set the page colors based on the current theme
    if (this.currentTheme == "dark") {
      this.darkMode();
    } else if (this.currentTheme == "light") {
      this.lightMode();
    }
  }

  async darkModeButton() {
    let buttonList = document.querySelectorAll(".darkModeToggle");
    // console.log(buttons)
    buttonList.forEach((button) => {
      this.changeButtonImage()
      button.addEventListener("click", () => {
        if (this.currentTheme == "light") {
          // button.src = "../images/sunny.png";
          this.currentTheme = "dark";
          this.darkMode();
          this.changeButtonImage()
        } else if (this.currentTheme == "dark") {
          // button.src = "../images/moon.png";
          this.lightMode();
          this.currentTheme = "light";
          this.changeButtonImage()
        }
        setLocalStorage("theme", this.currentTheme);
      });
    });
  }

  changeButtonImage() {
    let buttonList = document.querySelectorAll(".darkModeToggle");
    buttonList.forEach((button) => {
      if (this.currentTheme == "light") {
        button.src = "./images/moon.png";
      } else if (this.currentTheme == "dark") {
        button.src = "./images/sunny.png";
      }
    })
  }

  darkMode() {
    // console.log("dark");
    // document.querySelector(".darkModeToggle").innerHTML = "Light mode"
    document.documentElement.style.setProperty("--primary-color", "#1BD4BA");
    document.documentElement.style.setProperty("--secondary-color", "#000");
    document.documentElement.style.setProperty("--tertiary-color", "#e05d0b");
    document.documentElement.style.setProperty("--quaternary-color", "#dadfe1");
    document.documentElement.style.setProperty("--base-color", "#363636");
    document.documentElement.style.setProperty("--text-color", "white");
    document.documentElement.style.setProperty("--light-background", "#dadfe1");
    document.documentElement.style.setProperty("--dark-grey", "#fefefe");
  }

  lightMode() {
    // console.log("light");
    // document.querySelector(".darkModeToggle").innerHTML = "Dark mode"
    document.documentElement.style.setProperty("--primary-color", "#04AA6D");
    document.documentElement.style.setProperty("--secondary-color", "#cbf3f0");
    document.documentElement.style.setProperty("--tertiary-color", "#ffbf69");
    document.documentElement.style.setProperty("--quaternary-color", "#ff9f1c");
    document.documentElement.style.setProperty("--base-color", "#ffffff");
    document.documentElement.style.setProperty("--text-color", "black");
    document.documentElement.style.setProperty("--light-background", "#fefefe");
    document.documentElement.style.setProperty("--dark-grey", "#000000");
  }
}
