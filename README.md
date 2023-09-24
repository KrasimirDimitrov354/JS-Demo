# JS-Demo - Slot Machine
This is fairly simple project in which I have practiced basic JavaScript coding. The slot machine operates as follows:
1. First, the user enters a valid deposit amount.
2. Then, the user must specify the number of lines they want to bet on. The minimum is one line and the maximum is three lines.
3. After that, the user must enter a valid bet amount. The bet is multiplied by the number of betting lines.
4. At this point, the program spins the slot machine and generates three lines with three symbols each. The produced result is transposed and printed out.
5. Next, the program checks if there are any winning rows. For a row to be considered winning, all row symbols must be the same.
6. Then, the number of winning rows is compared to the number of betting lines. The winnings or loss is determined by the number of betting lines.
   - If the number of betting lines is smaller than the number of winning rows, the user gets his winnings and a bonus.
   - If the number is equal, the user gets just his winnings.
   - If the number is larger, the user gets his winnings minus a losing fee.
   - If there are no winning rows, the user loses all of their bet multiplied by the number of betting lines.
7. Finally, the user is informed whether they have won or lost. They are given the option to continue playing if they have balance left, otherwise the game ends.
