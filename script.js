document.addEventListener('DOMContentLoaded', () => {
    const gc = document.getElementById('game-container');
    const mgc = document.getElementById('message-container');
    let human ='X';
    let gb = ['', '', '', '', '', '', '', '', ''];
    let ga = true;
    for(let i = 0; i < 9; i++){
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleCellClick(i));
        gc.appendChild(cell);
    }

    function handleCellClick(index){
        if(!ga || gb[index] !== '')  return;
        human= 'X'
        makeMove(index, human); 
        if(checkwinner()) {
            displaywinner(`${human === 'X' ? 'You' : 'Computer'} wins!`);
            ga = false;
        } else if(gb.every(cell => cell !== '')) {
            displaywinner("It's a draw!");
            ga = false;
        }
        else{
            setTimeout(() => computerMove(), 500);
        }
    }
    //func to make a move 
    function makeMove(index, player) {
        gb[index] = player;
        const img = document.createElement('img');
        //create an image for elements X & O
        img.src = player === 'X' ? 'X.png' : 'O.png'; 
        //appending img to clicked cell
        gc.children[index].appendChild(img);
    }
    //func  to handle moves
    function computerMove() {
        human = '0';
        let winningmove = findWinningMove(human);
        if(winningmove !== -1){
            makeMove(winningmove, human);
        }
        else{
            let blockingMove = findWinningMove('X');
            if(blockingMove !== -1){
                makeMove(blockingMove, human);
            }
            else{
                let emptyPositions = gb.reduce((acc, val, index) => {
                    if(val === '') acc.push(index);
                    return acc;
                }, []);
                let ri = Math.floor(Math.random() * emptyPositions.length);
                let rm = emptyPositions[ri];
                makeMove(rm, human);
            }
        }
        //check for win  or draw
        if(checkwinner()) {
            displaywinner(`${human === 'X' ? 'Human' : 'Computer'} wins!`);
            ga = false;
        } else if(gb.every(cell => cell !== '')) {
            displaywinner("It's a draw!");
            ga = false;
        } else {
            human = 'X';
        }
    }
    //func to find winning move in the given player
    function findWinningMove(player) {
        const winPatterens = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8], //row
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8], //columns
            [0, 4, 8],
            [2, 4, 6]        //diagonal
        ];
        for(const pattern of winPatterens) {
            const count = pattern.reduce((acc, index) => (gb[index]  === player ? acc + 1 : acc), 0);
            if(count === 2) {
                const emptyIndex = pattern.find(index => gb[index] === '');
                if(emptyIndex !== undefined) {
                    return emptyIndex;
                }
            }
        }
        return -1;
    }
    // func to check if the current player has won the game
    function checkwinner() {
        const winPatterens = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8], //row
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8], //columns
            [0, 4, 8],
            [2, 4, 6]        //diagonal
        ];
        return winPatterens.some(pattern =>
            pattern.every(index => gb[index] === human));
    }
    // func to display the winnerr msg and newgame buttton
    function displaywinner(message) {
        mgc.innerHTML = `<p>${message}</p><button id="newgamebutton">New Game</button>`;
        document.getElementById("newgamebutton").style.display = 'block';
        document.getElementById("newgamebutton").addEventListener('click', newgame);
    }

    //event listener for new game bt
    function newgame() {
        human =  'X';
        gb = ['', '', '', '' ,'', '', '', '', ''];
        ga=true;
        mgc.innerHTML = '';
        for(let i = 0; i < 9; i++) {
            const cell = gc.children[i];
            cell.textContent = '';
            while(cell.firstChild) {
                cell.removeChild(cell.firstChild);
            }
        }

        if(human === '0') {
            setTimeout(() => computerMove(), 500);
        }
    }
});

