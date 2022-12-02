const gameButtons = document.getElementsByClassName('user-choice');

for (let i = 0; i < gameButtons.length; i++) {
    var button = gameButtons[i];
    button.addEventListener('click', startGame);
}   

function startGame(e){
    let userSelected = e.target.id;
    let card = document.getElementById(userSelected).closest('.card-col').getElementsByClassName('card')[0];
    setDisplay(userSelected, card);
    let computerSelected = computersTurn();

    scoreCounter(findWinner(userSelected, computerSelected));
};

const scoreCounter = (winner) => {
    let allDisplay = document.querySelectorAll('.win');

    let playerScore = document.getElementsByClassName('play-wins')[0];
    let compScore = document.getElementsByClassName('comp-wins')[0];

    console.log(playerScore)
    console.log(compScore)

    allDisplay.forEach(item => {
        item.classList.remove('d-none');
    });

    if(winner === 'player'){
        let result = Number(playerScore.innerText) + 1;
        playerScore.innerText = result;
    }
    else if(winner === 'computer'){
        let result = Number(compScore.innerText) + 1;
        compScore.innerText = result;
    }
}

const computersTurn = () => {
    let possibles = ["rock", "paper", "scissors"];
    let computerChoice = possibles[Math.floor(Math.random() * possibles.length)]
    let computerCard = document.getElementById('computer').getElementsByClassName('card')[0];

    setDisplay(computerChoice, computerCard);

    return computerChoice;
}

function setDisplay(item, card){
    card.querySelector('.item-img').src = `./resources/${item}.avif`;
    card.querySelector('.card-title').innerHTML = item.toUpperCase();
    card.classList.remove('d-none');
}

const findWinner = (userSelection, compSelection) => {
    let messageContainer = document.getElementsByClassName('messageContainer')[0];
    let message = '';
    let winner;
    
    const Rules = {
        "rock" : "scissors",
        "scissors" : "paper",
        "paper" : "rock"
    };    

    if(userSelection === compSelection){
        message += 'It\'s a tie! '; 
        winner = 'none';
    }
    else if(Rules[userSelection] === compSelection){
        message += 'YOU WIN! '; 
        winner = 'player';        
    }
    else{
        message += 'COMPUTER WINS! ';
        winner = 'computer';
    }

    messageContainer.querySelector('.message').innerHTML = message;
    return winner;
}
