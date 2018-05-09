
//get elements
const bombContainer = document.getElementById('bombContainer')
const instructions = document.getElementById('instructions')
const timer = document.getElementById('timer')
const timerDiv = document.getElementById('timerDiv')
const buttonRestart = document.getElementById('hiddenButton')
const startButton = document.getElementById('startButton')
const gameContainer = document.getElementById('game-container')
const clipboardContainer = document.getElementById('clipboardContainer')
const signInDiv = document.getElementById('signInDiv')
const loginDiv = document.getElementById('loginDiv')
const pressSignUp = document.getElementById('pressSignup')
const pressLogin = document.getElementById('pressLogin')
const introButtons = document.getElementById('introButtons')
const introFormDiv = document.getElementById('introFormDiv')

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
let userId = 0
//intro page
function intro(){

  hideGame()//hides game assets
  pressSignup.addEventListener('click', pressedSignup)
  pressLogin.addEventListener('click', pressedLogin)


  //after successful signup or login
   //reveal start button when info submitted
  startButton.addEventListener('click', startGame)

}

//starts gameplay
function startGame(){
  introButtons.classList.add('hidden') //hides intro buttons
  introFormDiv.classList.add('hidden') //hides intro forms

  clipboardContainer.classList.remove('hidden')
  instructionsContainer.classList.remove('hidden')
  timerDiv.classList.remove('hidden')

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
  timer.innerHTML = 00 + ":" + 35;
  startTimer();
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
  //create bomb
  generateButtons(solution) // execute generate buttons + sets off the chain
}
//generate bomb



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

  bombContainer.appendChild(bombButtonDiv) //appending div with buttons to our empty container
  bombButtonDiv.addEventListener('click', function(event){ //adding event listeners to our buttons div
    if(event.target.tagName === 'BUTTON') {

      //snap wires
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
  bombContainer.innerHTML = "" //empty container of all divs (buttons + event listeners)
  playerWin = true
  levelCounter += 1
  levelProgression() // progression logic
}

//wrong button
function wrongButton(){
  bombExploded = true
  levelCounter = 0
  animateExplosion();
  clearExplosion()
  hideGame()
  showRestartButton() // reveals restart hidden restart button
}

//hide game info
function hideGame(){
  bombContainer.innerHTML = ""
  gameContainer.classList.add('hidden')
  clipboardContainer.classList.add('hidden')
  timerDiv.classList.add('hidden')
  ansArray = [] //clears our parsed number array
  clearInterval(interval)
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
      bombExploded = true
      levelCounter = 0
      animateExplosion();
      clearExplosion()
      hideGame()
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

//press signup button
function pressedSignup(){
  signInDiv.innerHTML = introForm() //shows signup form
  onSignUpSubmit()//signup listener
  introButtons.classList.add('hidden')
}

//press login button
function pressedLogin(){
  loginDiv.innerHTML = loginForm() //shows login form
  onLoginSubmit()//login listener
  introButtons.classList.add('hidden')
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
function checkUser(json){

}

//keeping user id
function addUserId(json){
  userId += json.id
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
      }).then(res => res.json()).then(console.log)

    })
    // if (userId !== 0){
    //
    // }
  }

// login stuff
function onLoginSubmit(){
  const loginSubmit = document.getElementById('loginsubmit')
  const loginName = document.getElementById('gamertag')
  loginSubmit.addEventListener("submit", (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/api/v1/users', {
    }).then(res => res.json()).then(checkUser)


  })
  if (userId !== 0) {
    startButton.classList.remove('hidden')
  }

}
