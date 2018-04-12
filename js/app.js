const deck = document.querySelector('.deck');
const card = document.querySelectorAll('.card');
let cards = Array.from(card);
let flippedCards = [];
let rightCards = [];
const counter = document.querySelector('.moves');
const message = document.querySelector('.alert');
const star1 = document.querySelector('.first');
const star2 = document.querySelector('.second');
const star3 = document.querySelector('.third');

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//Display all the cards back when the page is loaded
document.body.onload = startGame;
function startGame() {
	cards = shuffle(cards);
	for (let card of cards) {
		card.classList.remove('open', 'show', 'match', 'wrong', 'right', 'blocked');
		deck.appendChild(card);
	}
	flippedCards = [];
	rightCards = [];
	counter.innerHTML = 0;
	message.style.display = 'none';
	star1.classList.remove('after');
	star2.classList.remove('after');
	star3.classList.remove('after');

}

//Make the cards flip when clicked
let displayCard = function (event) {
	if (event.target.className === 'card') {
	// if (event.target.tagName === 'LI') {
		event.target.classList.add('open');
		event.target.classList.add('show');
		event.target.classList.add('blocked');
	}
	if (event.target.classList.contains('open')) {
		flippedCards.push(event.target);
		console.log(flippedCards);
	}
	if (flippedCards.length === 2) {
			remove();
			control();
			counter.innerHTML++;
			score();	
	}
};
deck.addEventListener('click',displayCard);

// Restart function
const restart = document.querySelector('.restart');
restart.addEventListener('click', function() {
	startGame();
	setTimeout(replay, 300);
});

//Check if the cards match when two of them are clicked
function control () {
	if (flippedCards[0].innerHTML === flippedCards[1].innerHTML) {
		rotate();
		setTimeout(match, 500);
	} else if (flippedCards[0].innerHTML !== flippedCards[1].innerHTML) {
		wiggle();
		setTimeout(unmatch, 700);
		}
}

//Make the cards rotate when matched
function rotate() {
	flippedCards[0].classList.add('right');
	flippedCards[1].classList.add('right');

}
//Declare the match function
function match() {
	flippedCards[0].classList.add('match');
	flippedCards[1].classList.add('match');
	flippedCards[0].classList.remove('open', 'show', 'right');
	flippedCards[1].classList.remove('open', 'show', 'right');
	rightCards.push(flippedCards);
	flippedCards = [];
	deck.addEventListener('click',displayCard);
	if (rightCards.length === 8) {
		setTimeout(end, 500);
	}
}
function remove() {
		deck.removeEventListener('click', displayCard);
}


//Make the cards wiggle when they're unmatched
function wiggle () {
	flippedCards[0].classList.add('wrong');
	flippedCards[1].classList.add('wrong');
}

//Declare the unmatch function
function unmatch() {
	flippedCards[0].classList.remove('open', 'show', 'wrong', 'blocked');
	flippedCards[1].classList.remove('open', 'show', 'wrong', 'blocked');
	flippedCards = [];
	deck.addEventListener('click', displayCard);
}

/*
Create the winner message:
-creating the variables to store the message value and the buttons
-creating a function to chenge the message to display moves and time
-creating a function to display the message
-creating two events in case of clicking one button or the other
*/

const button1 = document.querySelector('.one');
const button2 = document.querySelector('.two');
const messages = document.querySelector('.change');
const messages2 = document.querySelector('.timer');
function alert() {
	if (message.style.display = 'inline-block') {
		messages.innerHTML = 'Moves: ' + counter.innerHTML;
		messages2.innerHTML = 'Time: ' + h1.textContent;
	}
}
function end() {
	message.style.display = 'inline-block';
	stop();
	return alert()
}
button1.addEventListener('click', function() {
	startGame();
	replay();
	timer();
});
button2.addEventListener('click', function() {
	return message.style.display = 'none';
});

//stars
function score() {
	if (counter.innerHTML>8 && counter.innerHTML<16) {
		star3.classList.add('after');
	} else if (counter.innerHTML>16 && counter.innerHTML<20) {
		star2.classList.add('after');
	} else if (counter.innerHTML>20){
		star1.classList.add('after')
	}
}

/*
Timer:
-create the function to keep the timer going
-create the function to make the timer start
-create the function to stop it at the end of the game
-create the function to make it starts again after clicking 'yes' or 'restart'
*/
let time = document.getElementsByTagName('time')[0];
let seconds = 0;
let minutes = 0;
let hours = 0;
let t;

function add() {
	if (counter.innerHTML > 0) {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    time.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    }
    timer();
} 
function timer() {
    t = setTimeout(add, 1000);
}
timer();
function replay() {
	time.textContent = '00:00:00';
	seconds = 0; minutes = 0; hours = 0;
}
function stop() {
	clearTimeout(t);
}





 





