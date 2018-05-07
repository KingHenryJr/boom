//intro
function startGame(){
  alert('hi!')
  levelOne()

}


//get elements
const levelTwoSolution = []
const levelThreeSolution = []
const container = document.getElementById('container')



//event listeners

//lev functions
function levelOne(){
  const levelOneSolution = [3,1,2]
  let ansArray = []
  
  levelOneSolution.forEach((item,i)=> {
    let newButton = document.createElement('button');
    let buttonCount = i + 1

      newButton.innerHTML = `${buttonCount}`;
      newButton.id = `Button${buttonCount}`
      container.appendChild(newButton);
  })

  container.addEventListener('click', function(e){
    if(event.target.tagName === 'BUTTON') {
      handleCombinationAttempt(event.target.innerText)
    }
  })

  function handleCombinationAttempt(number){
    ansArray.push(parseInt(number))
    const matches = ansArray.map((attemptN,index) => {
      console.log(levelOneSolution[index] === attemptN);
      return levelOneSolution[index] === attemptN
    })
    if (matches.includes(false)) {
      alert("boom")
      ansArray = []
      console.log(ansArray);
    } else if (matches.length === levelOneSolution.length) {
      alert("YAYYYY")
      ansArray = []
      console.log(ansArray)
    }
  }
}
