const closeButton = document.querySelector("#tutorialCloseButton")
const tutorialButton = document.querySelector("#tutorialButton")
const outLineTutorial = document.querySelector("#outline")
const indexPage = document.querySelector("#index-container")
tutorialButton.addEventListener(("click"),()=>{
    outLineTutorial.style.display = "grid"
    indexPage.style.display = "none"


})
closeButton.addEventListener(("click"),()=>{
    indexPage.style.display = "block"
    outLineTutorial.style.display = "none"
})
