//this module is used for most of the work done on the library.html page
import {
  getLocalStorage,
  setLocalStorage
} from "./utils.js";
export default class DarkMode {
  constructor() {
    // this.deviceColorSetting
    this.currentTheme = getLocalStorage("theme")
    this.prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")
  }

  async init() {
    // if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    //   this.deviceColorSetting = "dark"
    // } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    //   this.deviceColorSetting = "light"
    // } else {
    //   this.deviceColorSetting = "light";
    // }

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

  //   displayColorMode() {
  //     console.log("Device:", this.deviceColorSetting)
  //   }

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
    console.log("dark")
    // let root = document.querySelector(":root");
    // console.log()
    // console.log(root.style.getPropertyValue("--tertiary-color"))
    // document.documentElement.style.setProperty("--tertiary-color", "lightblue");
    document.documentElement.style.setProperty("--primary-color", "#1ad4ba");
    // document.documentElement.style.setProperty("--secondary-color", "#ec1bbc");
    document.documentElement.style.setProperty("--tertiary-color:", "#000");
    // document.documentElement.style.setProperty("--quaternary-color", "#b86eeb");
    // document.documentElement.style.setProperty("--white", "#000");
    // console.log(root.style.getPropertyValue("--white"))
    document.documentElement.style.setProperty("--tertiary-color", "black");
  }

  lightMode() {
    console.log("light")
    // let root = document.querySelector(":root");
    // console.log(root.style.getPropertyValue("--tertiary-color"))
    document.documentElement.style.setProperty("--primary-color", "#04AA6D");
    // document.documentElement.style.setProperty("--secondary-color", "#cbf3f0");
    // document.documentElement.style.setProperty("--tertiary-color:", "#ffbf69");
    // document.documentElement.style.setProperty("--quaternary-color", "#ff9f1c");
    // document.documentElement.style.setProperty("--white", "#ffffff");
    // console.log(root.style.getPropertyValue("--white"))

    document.documentElement.style.setProperty("--tertiary-color", "white");
  }


  //   changecolor(mode) {
  //     console.log(`the site is now in ${mode} mode`)
  //     // change the image for the button
  //     // change all of the site colors
  //   }
}







// function darkModeCode() {
//   // Select the button
//   const btn = document.querySelector(".btn-toggle");
//   // Check for dark mode preference at the OS level
//   const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
//   // Get the user"s theme preference from local storage, if it"s available
//   const currentTheme = localStorage.getItem("theme");
//   // If the user"s preference in localStorage is dark...
//   if (currentTheme == "dark") {
//     // ...let"s toggle the .dark-theme class on the body
//     document.body.classList.toggle("dark-mode");
//     // Otherwise, if the user"s preference in localStorage is light...
//   } else if (currentTheme == "light") {
//     // ...let"s toggle the .light-theme class on the body
//     document.body.classList.toggle("light-mode");
//   }


//   // Listen for a click on the button 
//   btn.addEventListener("click", function () {
//     // If the user"s OS setting is dark and matches our .dark-mode class...
//     if (prefersDarkScheme.matches) {
//       // ...then toggle the light mode class
//       document.body.classList.toggle("light-mode");
//       // ...but use .dark-mode if the .light-mode class is already on the body,
//       var theme = document.body.classList.contains("light-mode") ? "light" : "dark";
//     } else {
//       // Otherwise, let"s do the same thing, but for .dark-mode
//       document.body.classList.toggle("dark-mode");
//       var theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
//     }
//     // Finally, let"s save the current preference to localStorage to keep using it
//     localStorage.setItem("theme", theme);
//   });

// }
