
//get elements
const container = document.getElementById('bombContainer')
const instructions = document.getElementById('instructions')

//solutions
const levelOneSolution = [1,3,2]
const levelTwoSolution = [2,3,1]
const levelThreeSolution = [4,1,2,2]
const levelFourSolution = [3,1,2,3]
const levelFiveSolution = [2,4,1,2]

//default settings
let ansArray = []
let levelCounter = 0
let playerWin = false
let bombExploded = false

//intro
function startGame(){
  levelOne(levelOneSolution)
}

//level 1
function levelOne(solution){
  levelLogic(solution)
  instructions.innerText = "Press the First Button. Then the Third Button. Then the Second."
}

//level 2
function levelTwo(solution){
  levelLogic(solution)
  instructions.innerText = "Press the Second Button. Then the Third Button. Then the First."
}

//level 3
function levelThree(solution){
  levelLogic(solution)
  instructions.innerText = "Press the Fourth Button. Then the First Button. Then the Second. Then the Second."
}

//level 4
function levelFour(solution){
  levelLogic(solution)
  instructions.innerText = "Press the Third Button. Do not press the Fourth Button. Then the Second. Then the Second."
}

//level 5
function levelFive(solution){
  levelLogic(solution)
}

//progresses levels if playerWin is true and the counter has been incremented
function levelProgression(){

  if (playerWin === true && levelCounter === 1) {
    levelTwo(levelTwoSolution)
  } else if (playerWin === true && levelCounter === 2) {
    levelThree(levelThreeSolution)
  } else if (playerWin === true && levelCounter === 3) {
    levelFour(levelFourSolution)
  } else if (playerWin === true && levelCounter === 4) {
    levelFive(levelFiveSolution)
  } else if (playerWin === true && levelCounter === 5) {
    alert("you made it!!!!")
  }
}

//logic!!!
function levelLogic(solution){
  playerWin = false
  generateButtons(solution) // execute generate buttons + sets off the chain
}

//declare generate buttons
function generateButtons(solution){
  let bombButtonDiv = document.createElement('div') //creating div to put buttons in

  solution.forEach((item,i) => {
    let newButton = document.createElement('button'); //creating button element
    let buttonCount = i + 1

      newButton.innerHTML = `${buttonCount}`; //button number
      newButton.id = `Button${buttonCount}`; //giving button id

      bombButtonDiv.appendChild(newButton); //append buttons to bomb div

  })
  container.appendChild(bombButtonDiv) //appending div with buttons to our empty container
  bombButtonDiv.addEventListener('click', function(event){ //adding event listeners to our buttons div
    if(event.target.tagName === 'BUTTON') {
      handleCombinationAttempt(event.target.innerText, solution) //passing in button pressed + solution to our combination handler
    }
  })
}

//handle combination
function handleCombinationAttempt(buttonNumber, solution){ //inputs button number + solution array
  ansArray.push(parseInt(buttonNumber))//pushes parsed number into empty array

  let matches = ansArray.map((number, index) => { //map over parsed number array
    return solution[index] === number //return array of comparisons
  })

  if (matches.includes(false)) { //check if any comparisons are false if so BOOM
    bombExploded = true
    animateExplosion();
    setTimeout(clearExplosion, 2000);

    container.innerHTML = ""
    levelCounter = 0
    ansArray = [] //clears our parsed number array
    startGame()
  } else if (matches.length === solution.length) {
    alert("YAYYYY") //CHANGE TO WIN SCREEN!!!!!!
    ansArray = []
    container.innerHTML = "" //empty container of all divs (buttons + event listeners)
    playerWin = true
    levelCounter += 1
    levelProgression()
  }
}

// animateExplosion
function animateExplosion(){
  let explodeDiv = document.createElement('div'),
      explodeImg = document.createElement('img');

      explodeDiv.id = "explosion"

      explodeImg.src = "img/explosion.gif"
      explodeDiv.classList.add('modal');
      explodeDiv.appendChild(explodeImg);
      document.body.append(explodeDiv);
}

// clearExplosions
function clearExplosion(){
  let explodeContainer = $('#explosion');
    if (explodeContainer && bombExploded === true) {
      explodeContainer.delay(2000).fadeOut(1000, function(){
        explodeContainer.remove();
      })
    }
}
