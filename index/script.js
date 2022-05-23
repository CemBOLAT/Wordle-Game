const tileDisplay = document.querySelector("#tile-container")
const keyDisplay = document.querySelector("#key-container")
const messageDisplay = document.querySelector("#message-box")
let wordle; 
function getWord (){
    fetch("http://localhost:8000/word")
    .then(response => response.json())
    .then(json => {
        console.log(json)
        wordle = json.toUpperCase()
    })
    .catch(error => console.log(error))
}
getWord()
const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    'DEL',
]
const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]
function setBoard(){
    guessRows.forEach((guessrow,guessRowsIndex) => {
        const rowElement = document.createElement("div")
        rowElement.setAttribute("id","guessRow-" + guessRowsIndex)
        rowElement.classList.add("row")
        guessrow.forEach((guess,guessIndex) => {
            const tileElement = document.createElement("div")
            tileElement.setAttribute("id", "guessRow-" + guessRowsIndex + "-tile-" + guessIndex)
            tileElement.setAttribute("class","tile")
            rowElement.append(tileElement)
        })
        tileDisplay.appendChild(rowElement)
    })
}
setBoard()
function keyBoard(){
    keys.forEach(key => {
        const buttonElement = document.createElement("button")
        buttonElement.textContent = key
        buttonElement.setAttribute("id",key)
        buttonElement.classList.add("keyBoardButton")
        buttonElement.addEventListener("click",() =>{check(key)})
        keyDisplay.append(buttonElement)
    })
}
keyBoard()
function check (key) {
    if(key == "DEL"){
        deleteLetter()
        return
    }
    if(key ==="ENTER"){
        checkRow()
        return
    }
    addLetter(key)
}
let currentRow = 0
let currentTile = 0
let isGameOver = false
const rows = document.querySelectorAll(".row")
function addLetter(key){
    if(currentTile < 5 && currentRow < 6){
        const tile = document.getElementById("guessRow-" + currentRow + "-tile-" + currentTile)
        tile.textContent = key
        guessRows[currentRow][currentTile] = key
        tile.setAttribute("data",key)
        currentTile++
    }
}

function deleteLetter(){
    if(currentTile > 0){
        currentTile--
        const tile = document.getElementById("guessRow-" + currentRow + "-tile-" + currentTile)
        tile.textContent = ""
        guessRows[currentRow][currentTile] = ""
        tile.setAttribute("data","")  
    }
}
function checkRow (){
    const guess = guessRows[currentRow].join("")
    if(currentTile == 5 ){ 
        fetch(`http://localhost:8000/check/?word=${guess}`)
            .then(response => response.json())
            .then(json =>{
                if(json == "Entry word not found"){
                    showMessage("Word not in list")
                    return;
                }
                else{
                    setTimeout(flipTile(),2000)
                    if(wordle == guess){
                        switch(currentRow){
                            case 0:
                                showMessage("Genious!")
                                break;
                            case 1:
                                showMessage("Magnificent!")
                                break;
                            case 2:
                                showMessage("Impressive!")
                                break;
                            case 3:
                                showMessage("Splendid!")
                                break;
                            case 4:
                                showMessage("Great")
                                break;
                            case 5:
                                showMessage("Phew")
                                break;
                        }
                        setTimeout(animationFunc(currentRow),2000)
                        isGameOver = true
                        return
                    }
                    else{
                        if(currentRow >= 5){
                            isGameOver = true
                            showMessage("Game Over")
                            setTimeout(()=>{
                                showMessage(`${wordle}`)
                            },2000  )

                            return
                        }
                        if(currentRow < 5 ){
                            currentRow++
                            currentTile = 0
                        }
                    }
                }
            })
            .catch(err=>console.log(err))
    }
}
function showMessage(message) {
    const messageElement = document.createElement("p")
    messageElement.textContent = message
    messageDisplay.append(messageElement)
    messageDisplay.style.display = "flex"
    setTimeout(() => {
        messageDisplay.removeChild(messageElement)
        messageDisplay.style.display = "none"
    },3000)
}
function addColorToKey(keyLetter ,color){
    const key = document.getElementById(keyLetter)
    key.classList.add(color)
}
function flipTile(){
    const rowTiles = document.querySelector("#guessRow-" + currentRow).childNodes
    let checkWordle = wordle
    const guess = []


    rowTiles.forEach(tile => {
        guess.push({letter:tile.getAttribute("data"),color:"grey-overlay"})
    })
    guess.forEach((guess,index)=>{
        if(guess.letter == wordle[index]){
            guess.color = "green-overlay"
            checkWordle = checkWordle.replace(guess.letter,"")
        }
    })

    guess.forEach(guess =>{
        if(checkWordle.includes(guess.letter)){
            guess.color = "yellow-overlay"
            checkWordle = checkWordle.replace(guess.letter,"")
        }
    })
    rowTiles.forEach((tile, index) => {
        setTimeout(()=>{
            tile.classList.add("flip")
            tile.classList.add(guess[index].color)
            addColorToKey(guess[index].letter , guess[index].color)
        }, 500 * index)
    })
}
function animationFunc(currentRow) {
    rows[currentRow].classList.add("animated")
}
