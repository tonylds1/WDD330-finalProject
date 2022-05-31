var c=(s,r,e)=>new Promise((l,m)=>{var d=t=>{try{o(e.next(t))}catch(n){m(n)}},u=t=>{try{o(e.throw(t))}catch(n){m(n)}},o=t=>t.done?l(t.value):Promise.resolve(t.value).then(d,u);o((e=e.apply(s,r)).next())});import{getLocalStorage as a,setLocalStorage as h}from"./utils.js";export default class i{constructor(){this.currentTheme=a("theme"),this.prefersDarkScheme=window.matchMedia("(prefers-color-scheme: dark)")}init(){return c(this,null,function*(){window.matchMedia("(prefers-color-scheme: light)").matches&&this.currentTheme==null?this.currentTheme="light":window.matchMedia("(prefers-color-scheme: dark)").matches&&this.currentTheme==null&&(this.currentTheme="dark"),yield this.darkModeButton(),this.currentTheme=="dark"?this.darkMode():this.currentTheme=="light"&&this.lightMode()})}darkModeButton(){return c(this,null,function*(){document.querySelectorAll(".darkModeToggle").forEach(e=>{this.changeButtonImage(),e.addEventListener("click",()=>{this.currentTheme=="light"?(this.currentTheme="dark",this.darkMode(),this.changeButtonImage()):this.currentTheme=="dark"&&(this.lightMode(),this.currentTheme="light",this.changeButtonImage()),h("theme",this.currentTheme)})})})}changeButtonImage(){document.querySelectorAll(".darkModeToggle").forEach(e=>{this.currentTheme=="light"?e.src="../images/moon.png":this.currentTheme=="dark"&&(e.src="../images/sunny.png")})}darkMode(){document.documentElement.style.setProperty("--primary-color","#1BD4BA"),document.documentElement.style.setProperty("--secondary-color","#000"),document.documentElement.style.setProperty("--tertiary-color","#e05d0b"),document.documentElement.style.setProperty("--quaternary-color","#dadfe1"),document.documentElement.style.setProperty("--base-color","#363636"),document.documentElement.style.setProperty("--text-color","white"),document.documentElement.style.setProperty("--light-background","#dadfe1"),document.documentElement.style.setProperty("--dark-grey","#fefefe")}lightMode(){document.documentElement.style.setProperty("--primary-color","#04AA6D"),document.documentElement.style.setProperty("--secondary-color","#cbf3f0"),document.documentElement.style.setProperty("--tertiary-color","#ffbf69"),document.documentElement.style.setProperty("--quaternary-color","#ff9f1c"),document.documentElement.style.setProperty("--base-color","#ffffff"),document.documentElement.style.setProperty("--text-color","black"),document.documentElement.style.setProperty("--light-background","#fefefe"),document.documentElement.style.setProperty("--dark-grey","#000000")}}
