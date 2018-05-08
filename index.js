
//get elements
const levelOneSolution = [1,3,2]
const levelTwoSolution = [1,5,3,4,2]
const levelThreeSolution = [7,4,2,4,1,2,3]
const container = document.getElementById('container')
let ansArray = []
let levelCounter = 0

//intro
function startGame(){
  alert('hi!')
  levelOne(levelOneSolution)
  debugger


}



//logic!!!
function levelLogic(solution){
  playerWin = false
  console.log(playerWin)
  generateButtons(solution) // execute generate buttons
  console.log(solution)
}

//level 1
function levelOne(solution){
  levelLogic(solution)
}

//level 2
function levelTwo(solution){
  levelLogic(solution)
}




//declare generate buttons
function generateButtons(solution){
  let bombButtonDiv = document.createElement('div')

  solution.forEach((item,i) => {
    let newButton = document.createElement('button');
    let buttonCount = i + 1



      newButton.innerHTML = `${buttonCount}`;
      console.log(newButton)
      newButton.id = `Button${buttonCount}`


      bombButtonDiv.appendChild(newButton);

  })
  container.appendChild(bombButtonDiv)
  bombButtonDiv.addEventListener('click', function(event){
    if(event.target.tagName === 'BUTTON') {
      handleCombinationAttempt(event.target.innerText, solution)
    }
  })
}


//handle combination
function handleCombinationAttempt(buttonNumber, solution){ //inputs button number + solution array
  ansArray.push(parseInt(buttonNumber))//pushes parsed number into empty

  console.log(ansArray)

  let matches = ansArray.map((number, index) => {

    return solution[index] === number
  })

  if (matches.includes(false)) {

    alert("boom")
    ansArray = []
  } else if (matches.length === solution.length) {
    alert("YAYYYY")
    ansArray = []
    container.innerHTML = ""
    playerWin = true

  }

  if(playerWin === true){
    levelTwo(levelTwoSolution)
  }

}
