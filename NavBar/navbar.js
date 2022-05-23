const barButton = document.querySelector("#barButton")
const closeBar = document.querySelector("#closeBar")
const bar = document.querySelector("#bar")
let counter = 0
barButton.addEventListener("click", ()=>{
    if(counter == 0){
        counter = 1
        bar.classList.add("opened")
        bar.classList.remove("closed")
    }
    else if(counter == 1){
        counter = 0
        bar.classList.add("closed")
        bar.classList.remove("opened")
    }
})
closeBar.addEventListener("click",() =>{
    counter = 0
    bar.classList.add("closed")
    bar.classList.remove("opened")
    
})
