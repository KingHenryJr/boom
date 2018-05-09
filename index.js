
//get elements
const container = document.getElementById('bombContainer')
const instructions = document.getElementById('instructions')
const timer = document.getElementById('timer')
const timerDiv = document.getElementById('timerDiv')
const buttonRestart = document.getElementById('hiddenButton')
const startButton = document.getElementById('startButton')
const gameContainer = document.getElementById('game-container')
const clipboardContainer = document.getElementById('clipboardContainer')
const signInDiv = document.getElementById('signInDiv')
const loginDiv = document.getElementById('loginDiv')
let interval //empty interval

//solutions
const levelOneSolution = [1,3,2]
const levelTwoSolution = [2,3,1]
const levelThreeSolution = [4,1,2,2]
const levelFourSolution = [3,1,2,3]
const levelFiveSolution = [2,4,1,3]

//default settings
let ansArray = []
let levelCounter = 0
let playerWin = false
let bombExploded = false


//intro page
function intro(){

  hideGame()//hides game assets
  //reveals start button
  signInDiv.innerHTML = introForm() //shows signup form
  loginDiv.innerHTML = loginForm() //shows login form
  onSignUpSubmit()//signup listener
  onLoginSubmit()//login listener
  // startButton.classList.remove('hidden') //reveal start button when info submitted
  startButton.addEventListener('click', startGame)

}

//starts gameplay
function startGame(){
  signInDiv.classList.add('hidden')//hides sign in div
  loginDiv.classList.add('hidden')
  showGame() //unhide all game assets
  startButton.classList.add('hidden') //hides start button
  buttonRestart.classList.add('hidden') //hides restart button

  levelOne(levelOneSolution) //runs level 1
}

//level 1
function levelOne(solution){
  timer.innerHTML = 00 + ":" + 5;
  startTimer();
  levelLogic(solution)
  instructions.innerText = "Press the First Button. Then the Third Button. Then the Second."
}

//level 2
function levelTwo(solution){
  timer.innerHTML = 00 + ":" + 10;
  startTimer();
  levelLogic(solution)
  instructions.innerText = "Press the Second Button. Then the Third Button. Then the First Button."
}

//level 3
function levelThree(solution){
  timer.innerHTML = 00 + ":" + 15;
  startTimer();
  levelLogic(solution)
  instructions.innerText = "Press the Fourth Button. Then the First Button. Then the Second. Then the Second."
}

//level 4
function levelFour(solution){
  timer.innerHTML = 00 + ":" + 15;
  startTimer();
  levelLogic(solution)
  instructions.innerText = "Press the Third Button. Do not press the Fourth Button. Then the First. Then the Second. Then the Third."
}

//level 5
function levelFive(solution){
  levelLogic(solution)
  instructions.innerText = "Press the Second Button. Then the Fourth. Then the First. Then the Third."
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
    wrongButton() //explodes bomb + resets + reveals restart button
  } else if (matches.length === solution.length) {
    winner() // resets interval + advances function through level progression
  }
}


//win actions
function winner(){
  alert("YAYYYY") //CHANGE TO WIN SCREEN!!!!!!
  clearInterval(interval)
  ansArray = []
  container.innerHTML = "" //empty container of all divs (buttons + event listeners)
  playerWin = true
  levelCounter += 1
  levelProgression() // progression logic
}

//wrong button
function wrongButton(){
  bombExploded = true
  animateExplosion();
  clearExplosion()
  container.innerHTML = ""
  clearInterval(interval)
  levelCounter = 0
  ansArray = [] //clears our parsed number array
  showRestartButton() // reveals restart hidden restart button
}

//hide game info
function hideGame(){

  gameContainer.classList.add('hidden')
  clipboardContainer.classList.add('hidden')
  timerDiv.classList.add('hidden')
}

//show game stuff
function showGame(){
  timerDiv.classList.remove('hidden')
  gameContainer.classList.remove('hidden')
  clipboardContainer.classList.remove('hidden')
}

//reveals restart button
function showRestartButton(){
  buttonRestart.classList.remove('hidden')
  buttonRestart.addEventListener('click', startGame)
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

//timer
function startTimer() {
  function timerStuff(){
    let presentTime = timer.innerHTML;
    let timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if(s==59){m=m-1}
    timer.innerHTML = m + ":" + s;
    if (s === "00"){
      timer.innerHTML = ""
      bombExploded = true
      animateExplosion();
      clearExplosion()
      container.innerHTML = ""
      levelCounter = 0
      ansArray = []
      clearInterval(interval)
      showRestartButton() //reveals restart button
    }
  }

   interval = setInterval(timerStuff, 1000);
}

//timer checkseconds
function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}

//create username form
function introForm(){
    return `
       <div id="newUserName">
       Create A Username!
       <br>
         <form>
         <br>
         Username:<br>
         <br>
         <input type="text" id="createName"><br>
         <br>
        <input type="submit" id="createsubmit">
        <br>
        </form>
         <div>
   `
  }

//login Form
  function loginForm(){
      return `
         <div id="login">
         Login
         <br>
           <form>
           <br>
           Username:<br>
           <br>
           <input type="text" id="gamertag"><br>
           <br>
          <input type="submit" id="loginsubmit">
          </form>
           <div>
     `
    }

// submit stuff
  function onSignUpSubmit(){
    const createSubmit = document.querySelector('form')
    const createName = document.getElementById('createName')
    createSubmit.addEventListener("submit", (e) => {
      e.preventDefault()
      const postdata = {
        name: createName.value
      }

      fetch('http://localhost:3000/api/v1/users',{
        method: 'POST',
        body: JSON.stringify(postdata),
        headers: {
          "content-type": "application/json"
        }
      }).then(res => res.json()).then()
    })
  }

// login stuff
function onLoginSubmit(){
  const loginSubmit = document.getElementById('loginsubmit')
  const loginName = document.getElementById('gamertag')
}
