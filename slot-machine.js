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
    while (true)
    {
        const amountRaw = prompt("Enter deposit amount: ");
        const amountConverted = parseFloat(amountRaw);

        if(isNaN(amountConverted) || amountConverted <= 0)
        {
            console.log("You must enter a positive number value.");
        }
        else
        {
            return amountConverted;
        }
    }
};

const getNumberOfLines = () => {
    while (true)
    {
        const linesRaw = prompt("Enter number of lines you want to bet on: ");
        const linesConverted = parseInt(linesRaw);

        if (isNaN(linesConverted) || 
        linesConverted < MIN_LINES || linesConverted > MAX_LINES)
        {
            console.log("You must enter a number value between 1 and 3.");
        }
        else
        {
            return linesConverted;
        }
    }
};

const getBet = (balance, bettingLinesCount) => {
    while (true)
    {
        const amountRaw = prompt("Enter amount for bet per line: ");
        const amountConverted = parseFloat(amountRaw);

        if (isNaN(amountConverted) || amountConverted <= 0 || 
        amountConverted > balance / bettingLinesCount)
        {
            console.log("You must enter a positive number value no greater than " + (Math.floor(balance / bettingLinesCount)) + ".");
        }
        else
        {
            return amountConverted;
        }
    }
};

const spin = () => {
    const symbolsTotal = [];
    for (const [symbol, occurence] of Object.entries(SYMBOLS_OCCURENCES))
    {
        for (let i = 0; i < occurence; i++)
        {
            symbolsTotal.push(symbol);
        }
    }

    const reels = [];
    for (let i = 0; i < COLS; i++)
    {
        reels.push([]);
        const reelSymbols = [...symbolsTotal];
        
        for (let j = 0; j < ROWS; j++)
        {
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

    for (let i = 0; i < ROWS; i++)
    {
        transposedRows.push([]);

        for (let j = 0; j < COLS; j++)
        {
            transposedRows[i].push(reels[j][i]);
        }
    }

    return transposedRows;
};

const printSpin = (spin) => {
    for (const row of spin)
    {
        let rowString = "";

        for (let i = 0; i < row.length; i++)
        {
            rowString += row[i];

            if (i != row.length - 1)
            {
                rowString += " | ";    
            }
        }

        console.log(rowString);
    }
};

let balance = deposit();
const bettingLinesCount = getNumberOfLines();
const bet = getBet(balance, bettingLinesCount);

const reels = spin();
const transposed = transpose(reels);

printSpin(transposed);