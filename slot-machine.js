const prompt = require("prompt-sync")();

const MIN_LINES = 1;
const MAX_LINES = 3;

const ROWS = 3;
const COLS = 3;

const SYMBOLS_OCCURENCES = {
    '$': 4,
    '\&': 8,
    '@': 16,
    '#': 24
};

const SYMBOLS_MULTIPLIERS = {
    '$': 10,
    '\&': 6,
    '@': 5,
    '#': 3
};

const deposit = () => {
    while (true) {
        const amountRaw = prompt("Enter deposit amount: ");
        const amountConverted = parseFloat(amountRaw);

        if(isNaN(amountConverted) || amountConverted <= 0) {
            console.log("You must enter a positive number value.");
        } else {
            return amountConverted;
        }
    }
};

const getNumberOfLines = () => {
    while (true) {
        const linesRaw = prompt("Enter number of lines you want to bet on: ");
        const linesConverted = parseInt(linesRaw);

        if (isNaN(linesConverted) || 
        linesConverted < MIN_LINES || linesConverted > MAX_LINES) {
            console.log("You must enter a number value between 1 and 3.");
        } else {
            return linesConverted;
        }
    }
};

const getBet = (balance, bettingLines) => {
    while (true) {
        const amountRaw = prompt("Enter amount for bet per line: ");
        const amountConverted = parseFloat(amountRaw);

        if (isNaN(amountConverted) || amountConverted <= 0 || 
        amountConverted > balance / bettingLines) {
            console.log("You must enter a positive number value no greater than " + 
            (Math.floor(balance / bettingLines)) + ".");
        } else {
            return amountConverted;
        }
    }
};

const spin = () => {
    const symbolsTotal = [];
    for (const [symbol, occurence] of Object.entries(SYMBOLS_OCCURENCES)) {
        for (let i = 0; i < occurence; i++) {
            symbolsTotal.push(symbol);
        }
    }

    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbolsTotal];
        
        for (let j = 0; j < ROWS; j++) {
            const symbolIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[symbolIndex];

            reels[i].push(selectedSymbol);
            reelSymbols.splice(symbolIndex, 1);
        }
    }

    return reels;
};

const transpose = (reels) => {
    const transposedRows = [];

    for (let i = 0; i < ROWS; i++) {
        transposedRows.push([]);

        for (let j = 0; j < COLS; j++) {
            transposedRows[i].push(reels[j][i]);
        }
    }

    return transposedRows;
};

const printSpin = (spinArray) => {
    for (const row of spinArray) {
        let rowString = "";

        for (let i = 0; i < row.length; i++) {
            rowString += row[i];

            if (i != row.length - 1) {
                rowString += " | ";    
            }
        }

        console.log(rowString);
    }
};

const getWinnings = (spinArray, betAmount, bettingLines) => {
    let winnings = 0;
    let winningRows = 0;

    for (let i = 0; i < spinArray.length; i++) {
        const currentRow = spinArray[i];
        let isWinning = true;

        for (const symbol of currentRow) {
            if (symbol != currentRow[0]) {
                isWinning = false;
                break;
            }
        }

        if (isWinning) {
            winningRows++;

            if (winningRows <= bettingLines) {
                winnings += betAmount * SYMBOLS_MULTIPLIERS[currentRow[0]];
            }
        }
    }

    if (winningRows > bettingLines) {
        winnings += betAmount;
    } else if (winningRows < bettingLines && winningRows != 0) {
        winnings -= betAmount * 1.5;
    } else if (winningRows == 0) {
        winnings -= betAmount * bettingLines;
    }

    if (winnings >= 0) {
        console.log("You won!")
    } else {
        console.log("You lost!")
    }

    return winnings;
};

const game = () => {
    let balance = deposit();

    while (true) {
        const bettingLines = getNumberOfLines();
        const bet = getBet(balance, bettingLines);
        
        balance -= bet * bettingLines;

        const reels = spin();
        const transposed = transpose(reels);
        
        printSpin(transposed);
        
        const winnings  = getWinnings(transposed, bet, bettingLines);
        balance += winnings;
  
        if (balance <= 0) {
            console.log("Game Over!");
            break;
        } else {
            console.log("Your current balance is " + balance + ".");
            const playAgain = prompt("Do you want to continue playing? (y/n) ");
            if (playAgain != 'y') {
                console.log("Come back soon!");
                break;
            } 
        }
    }  
}

game();