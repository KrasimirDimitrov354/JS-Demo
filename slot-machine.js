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
    const symbols = [];
    for (const [symbol, occurence] of Object.entries(SYMBOLS_OCCURENCES))
    {
        for (let i = 0; i < occurence; i++)
        {
            symbols.push(symbol);
        }
    }

    const reels = [];
    for (let i = 0; i < COLS; i++)
    {
        reels.push([]);
        const reelSymbols = [...symbols];
        
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

let balance = deposit();
const bettingLinesCount = getNumberOfLines();
const bet = getBet(balance, bettingLinesCount);

const reels = spin();