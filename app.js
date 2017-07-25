/*
Regulile Jocului:

- Jocul are 2 jucatori si se joaca pe ture
- Pe fiecare tura, fiecare jucatar poate sa dea cu zarul de cate ori vrea, iar punctajul va fi adunat catre punctajul lui total
- DAR, daca un jucator da cu zarul 1, pierde tot punctajul, dupa care vine randul celuilalt jucator
- Jucatorul poate apasa butonul HOLD, ceea ce inseamna ca isi cedeaza tura iar scorul lui dupa acea tura va fi adunat la scorul global
- Primul jucator care atinge scorul de 100 Global, castiga jocul

*/

var scores, roundScore, activePlayer, gamePlaying;

init();


document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. Atribuim zarului un numar aleatorui
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. Afisam rezultatele
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';


        //3. Updatam scorul rundei daca zarul nu a fost 1
        if (dice !== 1) {
            //Adaugam scorul
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Este randul jucatorului urmator
            nextPlayer();
        }
    }    
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Adaugam scorul rundei la scorul la scorul global
        scores[activePlayer] += roundScore;

        // Updatam interfata
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Verificam daca jucatorul a castigat jocul
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Urmatorul joc
            nextPlayer();
        }
    }
});


function nextPlayer() {
    //Urmatorul jucator
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}