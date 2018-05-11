
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
const body = document.getElementById('body')
const explosionSound = document.getElementById("explosionSound")
const backgroundSound = document.getElementById("backgroundSound")
const countdownSound = document.getElementById("countdownSound")
const keypad = document.getElementById("keypad")
let interval //empty interval

//solutions
const levelOneSolution = [1,3,2]
const levelTwoSolution = [2,3,1]
const levelThreeSolution = [4,1,2,2]
const levelFourSolution = [3,1,2,3]
const levelFiveSolution = [4,3,2,1]
const levelSixSolution = [2,4,3,5,2]
const levelSevenSolution = [3,4,3,5,2]
const levelEightSolution = [6,3,2,4,1,2]
const levelNineSolution = [4,3,3,5,4,6,2]
//default settings
let ansArray = []
let levelCounter = 0
let playerWin = false
let bombExploded = false
let userId = 0
let userName = []

//intro page
function intro(){ //on page load create login page
  hideGame() //hides game assets
  clipboardContainer.classList.add('hidden')
  body.style.background = ""
  body.style.background = "url('img/introBG.jpg') #181743 no-repeat fixed center"
  pressSignup.addEventListener('click', pressedSignup) //press sign up button
  pressLogin.addEventListener('click', pressedLogin) //press log in button
  startButton.addEventListener('click', startGame) //when revealed starts game
}

//starts gameplay
function startGame(){
  backgroundSound.play()
  body.style.background = "url('img/space.gif') no-repeat fixed center"
  body.style.backgroundSize = "cover"

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

//-------------------- LEVELS / add levels here

//level 1
function levelOne(solution){
  timer.innerHTML = 00 + ":" + 6;
  startTimer();
  levelLogic(solution)
  instructions.innerText = "Press the First Button. Then the Third Button. Then the Second Button."
}

//level 2
function levelTwo(solution){
  timer.innerHTML = 00 + ":" + 6;
  startTimer();
  levelLogic(solution)
  instructions.innerText = "Press the Second Button. Then the Third Button. Then the First Button."
}

//level 3
function levelThree(solution){
  timer.innerHTML = 00 + ":" + 10;
  startTimer();
  levelLogic(solution)
  instructions.innerText = "Press the Fourth Button. Then the First Button. Then the Second. Then the Second."
}

//level 4
function levelFour(solution){
  timer.innerHTML = 00 + ":" + 10;
  startTimer();
  levelLogic(solution)
  instructions.innerText = "Press the Third Button. Never press the Fourth Button. Then the First. Then the Second. Then the Fourth. Then the Third."
}

//level 5
function levelFive(solution){
  timer.innerHTML = 00 + ":" + 15;
  startTimer();
  levelLogic(solution)
  instructions.innerText = "Press the buttons right to left. Bottom to top."
}

//level 6 + background change
function levelSix(solution){
  timer.innerHTML = 00 + ":" + 15;
  startTimer();
  body.style.background = "url('img/space2.gif') no-repeat fixed center"
  body.style.backgroundSize = "cover"//background change to red
  levelLogic(solution)
  instructions.innerText = "Press the Second Button. Press the button two to the right of the previous Button. Then the button to the Left. Then the Fifth. Press the button to the left of the Third."
}

// lvl7
function levelSeven(solution){
  timer.innerHTML = 00 + ":" + 15;
  startTimer();
  levelLogic(solution)
  instructions.innerText = "Press the Third Button. Then the button number of Eight subtracted by Four. Then the Third. Then the Fifth. Then the second from the Left."
}

// lvl 8
function levelEight(solution){
  timer.innerHTML = 00 + ":" + 18;
  startTimer();
  levelLogic(solution)
  instructions.innerText = "Press the Sixth Button. Then the Third. Never press Fifth button. Then the Second from the Left. Then Third from the Right. Then the First. Then the Fifth button. Then the Second."
}

// lvl 9
function levelNine(solution){
  timer.innerHTML = 00 + ":" + 20;
  startTimer();
  levelLogic(solution)
  instructions.innerText = "Press the Fourth Button. Then the Third from the Left. Then the Second button pressed. Then the Fifth. Then the First button pressed. Dont press the Third. Then the Sixth. Then the Third. Then the Second."
}

function victory(){
  alert("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥")
  backgroundSound.pause();
  backgroundSound.currentTime = 0
  instructionsHeader.innerText = "YOU WIN!"
  instructions.innerText = "HOOORAY!"
  hideGame()
  showRestartButton()
}

//progresses levels if playerWin is true and the counter has been incremented + add Progression here
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
    levelSix(levelSixSolution)
  } else if (playerWin === true && levelCounter === 6) {
    levelSeven(levelSevenSolution)
  } else if (playerWin === true && levelCounter === 7) {
    levelEight(levelEightSolution)
  } else if (playerWin === true && levelCounter === 8) {
    levelNine(levelNineSolution)
  } else if (playerWin === true && levelCounter === 9) {
    victory()
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
      newButton.setAttribute("class", "buttonClass")
      bombButtonDiv.appendChild(newButton); //append buttons to bomb div
  })

  keypad.appendChild(bombButtonDiv) //appending div with buttons to our empty container
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
  keypad.innerHTML = "" //empty container of all divs (buttons + event listeners)
  playerWin = true
  levelCounter += 1
  levelProgression() // progression logic
}

//wrong button
function wrongButton(){
  bombExploded = true
  levelCounter = 0
  backgroundSound.pause();
  backgroundSound.currentTime = 0
  animateExplosion();
  explosionSound.play()
  clearExplosion()
  clipboardContainer.classList.add('hidden')
  hideGame()
  showRestartButton() // reveals restart hidden restart button
}

//-------------------- Hide or Reveal Game Logic

//hide game info
function hideGame(){
  keypad.innerHTML = ""
  gameContainer.classList.add('hidden')
  // clipboardContainer.classList.add('hidden')
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

//-------------------- Explosions

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
      explodeContainer.delay(1500).fadeOut(500, function(){
        explodeContainer.remove();
    })
  }
}

//-------------------- Timer

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
      backgroundSound.pause();
      backgroundSound.currentTime = 0
      explosionSound.play()
      animateExplosion();
      clearExplosion()
      clipboardContainer.classList.add('hidden')
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

//-------------------- Signup + Login

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
       <br>
         <form>
         <br>
         <img src="img/username.png" width="160" height="40"><br><br>

         <input type="text" id="createName"><br>
         <br>
         <input type="image" name="submit" src="img/create.png" id="createsubmit" width="100" height="35">
        <br>
        </form>
         <div>
   `
  }

// login Form
function loginForm(){
      return `
         <div id="login">
         <br>
           <form>
           <br>
           <img src="img/username.png" width="160" height="40"><br>
           <br>
           <input type="text" id="gamertag"><br>
           <br>
          <input type="image" name="submit" src="img/login.png" id="loginsubmit" width="100" height="35">
          </form>
           <div>
     `
    }

// keeping user id
function addUserId(json){
  userId = json["id"]
  userName = json["name"]
  startButton.classList.remove('hidden')
  signInDiv.classList.add('hidden')
}

// check to see if user is in database - if so reveal start button
function checkUser(json){

  const loginName = document.getElementById('gamertag')
  let filteredUser = json.filter((item)=> loginName.value == item["name"]) //filtering through json data for the correct user
  userId += filteredUser[0]["id"] //stashing the user id of the logged in user
  userName.push(filteredUser[0]["name"])
  if(userId !== 0 && userName.length > 0){
    startButton.classList.remove('hidden')
    loginDiv.classList.add('hidden')
  }

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
      }).then(res => res.json()).then(addUserId)
    })
  }

// login stuff
function onLoginSubmit(){
  const loginSubmit = document.querySelector('form')
  const loginName = document.getElementById('gamertag')
  loginSubmit.addEventListener("submit", (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/api/v1/users', {
    }).then(res => res.json()).then(checkUser)
  })
}
