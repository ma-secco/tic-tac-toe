const TIC_TAC_TOE = (() => {

    const cells = document.querySelectorAll('.cell');
    const playAgainBtn = document.getElementById('play-again');
    const gameOverInfo = document.getElementById('game-over-info');

    let currentPlayer = 'X';
    let gameActive = true;
    let spaces = Array(9).fill(null)

    const tieMessage = "It's a tie";
    const winningMessage = () => `${currentPlayer} wins!`;  
  
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ]

    cells.forEach(cell => cell.addEventListener('click', handleClick));

    const handleClick = (event) => {
      const cellIndex = parseInt(event.target.dataset.index);
      if (spaces[cellIndex] === null && gameActive) {
        spaces[cellIndex] = currentPlayer;
        event.target.textContent = currentPlayer;
        const winningCombo = playerWon();
        displayWinner(winningCombo);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }}
    
    

    const playerWon = () =>{
        for(const condition of winningCombos){
            let [a, b, c] = condition
    
            if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
                return [a,b,c]
            } 
        }
        return false  
   
    }



})();

