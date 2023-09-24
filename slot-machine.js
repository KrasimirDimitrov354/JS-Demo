const prompt = require("prompt-sync")();

const deposit = () => {
    while (true){
        const amountRaw = prompt("Enter deposit amount: ");
        const amountConverted = parseFloat(amountRaw);

        if(isNaN(amountConverted) || amountConverted <= 0){
            console.log("You must enter a positive number value.");
        } else {
            return amountConverted;
        }
    }
};

const MIN_LINES = 1;
const MAX_LINES = 3;

const getNumberOfLines = () => {
    while (true) {
        const linesRaw = prompt("Enter number of lines you want to bet on: ");
        const linesConverted = parseInt(linesRaw);

        if (isNaN(linesConverted) || linesConverted < MIN_LINES || linesConverted > MAX_LINES) {
            console.log("You must enter a number value between 1 and 3.");
        } else {
            return linesConverted;
        }
    }
};

const getBet = (balance, bettingLinesCount) => {
    while (true) {
        const amountRaw = prompt("Enter amount for bet per line: ");
        const amountConverted = parseFloat(amountRaw);

        if (isNaN(amountConverted) || amountConverted <= 0 || amountConverted > balance / bettingLinesCount) {
            console.log("You must enter a positive number value no greater than " + (Math.floor(balance / bettingLinesCount)) + ".");
        } else {
            return amountConverted;
        }
    }
};

let balance = deposit();
const bettingLinesCount = getNumberOfLines();
const bet = getBet(balance, bettingLinesCount);