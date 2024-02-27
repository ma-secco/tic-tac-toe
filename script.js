// Exemplo de como você poderia adicionar um evento de clique a cada célula
let gameText = document.querySelector('h3');
const cells = document.querySelectorAll('.cell');
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        TicTacToeGame.handleCellClick(index);
        // Adicione aqui outras ações após o clique da célula, se necessário
    });
});

function updateCellContent(cellIndex, content) {
    cells[cellIndex].textContent = content;
}

const TicTacToeGame = {
    currentPlayer: 'X',
    gameActive: true,
    spaces: Array(9).fill(null),
    winningCombos: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],

    playerWon: function () {
        for (const condition of this.winningCombos) {
            let [a, b, c] = condition;

            if (
                this.spaces[a] &&
                this.spaces[a] === this.spaces[b] &&
                this.spaces[a] === this.spaces[c]
            ) {
                return {
                    winner: this.spaces[a],
                    winningCombo: [a, b, c]
                };
            }
        }

        return null;
    },

    handleCellClick: function (cellIndex) {

        if (!this.gameActive) return; //verifica se o jogo ainda está ativo

        else if (this.spaces[cellIndex] === null && this.gameActive) {
            this.spaces[cellIndex] = this.currentPlayer;
            updateCellContent(cellIndex, this.currentPlayer);

            const result = this.playerWon();
            if (result) {
                this.gameActive = false;
                gameText.textContent = ''
                gameText.innerText = `${result.winner} wins!`; 
                restartButton.classList.remove('hide'); // Mostrar o botão
            } else {
                if (this.isDraw()) {
                    this.gameActive = false;
                    gameText.textContent = ''
                    gameText.innerText = "It's a draw!"; 
                    restartButton.classList.remove('hide'); // Mostrar o botão
                } else {
                    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
                }
            }
        }
    },

    isDraw: function () {
        return this.spaces.every(space => space !== null);
    },

    restartGame: function () {
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.spaces = Array(9).fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
        });
        restartButton.classList.add('hide'); // esconde o botão
        gameText.innerText = "Click in any cell to conquer"
    }


};

// Exemplo de como você poderia adicionar um botão de reiniciar o jogo
const restartButton = document.querySelector('#play-again'); // Corrigido para selecionar o botão com o ID 'play-again'
restartButton.addEventListener('click', () => {
    TicTacToeGame.restartGame();
});


