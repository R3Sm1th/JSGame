'use strict';
// Objects
const score0Area = document.querySelector('.player--0')
const score1Area = document.querySelector('.player--1')
const score0Elem = document.querySelector('#score--0')
const score1Elem = document.querySelector('#score--1')
const currScore0Elem = document.querySelector('#current--0')
const currentScore1Elem = document.querySelector('#current--1')
const newGame = document.querySelector('.btn--new')
const rollDice = document.querySelector('.btn--roll')
const hold = document.querySelector('.btn--hold')
const diceElem = document.querySelector('.dice')

// Initialisation
score0Elem.textContent = 0
score1Elem.textContent = 0
diceElem.classList.add('hidden')

let scoreBoard = [0, 0]
let currentScore = 0
let activePlayer = 0
let running = true

const switchPlayer = function() {
  document.getElementById(`current--${activePlayer}`).textContent = 0
  currentScore = 0
  activePlayer = activePlayer === 0 ? 1 : 0;
  score0Area.classList.toggle('player--active')
  score1Area.classList.toggle('player--active')
}

// Starting Game / First Roll
rollDice.addEventListener('click', function(){
  if (running){
    const dice =  Math.trunc(Math.random() * 6) + 1;
    console.log(dice)
    diceElem.classList.remove('hidden')
    diceElem.src = `dice-${dice}.png`

    if(dice !== 1){
      currentScore += dice
      document.getElementById(`current--${activePlayer}`).textContent = currentScore
    } else {
      switchPlayer()
    }
  }
})

hold.addEventListener('click', function(){
  if (running){
    scoreBoard[activePlayer] += currentScore
    document.getElementById(`score--${activePlayer}`).textContent = scoreBoard[activePlayer]
    currentScore = 0

    if (scoreBoard[activePlayer] >= 100){
      running = false
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
      diceElem.classList.add('hidden')
    } else {
      switchPlayer()
    }
  }
})

newGame.addEventListener('click', function(){
  scoreBoard = [0, 0]
  document.getElementById(`current--0`).textContent = 0
  document.getElementById(`current--1`).textContent = 0
  document.getElementById(`score--0`).textContent = 0
  document.getElementById(`score--1`).textContent = 0
  currentScore = 0
  activePlayer = 0
  score0Area.classList.remove('player--winner')
  score1Area.classList.remove('player--winner')
  diceElem.classList.remove('hidden')
  score0Area.classList.add('player--active')
  score1Area.classList.remove('player--active')
  running = true
})
