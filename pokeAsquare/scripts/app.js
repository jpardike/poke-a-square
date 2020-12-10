console.log('Welcome to Poke-A-Square...');

// == User Stories/game logic == //
// When the user clicks begin, the timer should start and the squares should populate with a random color
    // - How many squares? Round 1 = 50, multiple by round.
    // - How much time should the timer start with? 20s to start, divide by 2 each round.
    // - What colors should be used? Red, green, blue, purple
    // - What is the purpose of these colors? Player can only click blue square to score a point. Clicking on a different color will decrement score.
    // - How should rounds be handled? Increment round at the end of time.

// When the user clicks on a color: the color should disappear and score should be added or subtracted.
    // Player can only click blue square to score a point. Clicking on a different color will decrement score.
    // Should score carry over to next round? Yes, score carries over.
    // What happens when score reaches 0. Stop decrementing.

// When the round is over, the scores, round, and timer should be updated for the user to start over with increased difficulty.
    // How many rounds? 3 rounds
    // What should round and timer update to?
    // What is increased difficulty? Decreasing time and increasing squares per round. Multiply square count by round and divide time by round.

// When does the game end? After round 3.
// What happens when the game ends? Show score, allow user to play again.

// ---------------------------------- Code Organization

// Core Libraries
// 3rd Party Libraries
// 1. Global Variables
// Event Listeners
// functions
// Event Listeners


let score = 0;
const startTime = 30;
const startCount = 50;
let time = startTime;
let round = 1;

// ----------------------------------- STEP 1

// - Add event listener to "begin" button

$('button').on('click', function() {
    // console.log('Begin button clicked');
    // createSquares(20);
    // startTimer();
    // $('button').off('click');
    if (round >= 4) {
        score = 0;
        time = startTime;
        round = 1;
    }
    setRound();
});

// ---------------------------------- STEP 2
// - Make a createSquare function
// - It will take a parameter for number of squares.
// - Create a div with class square
// - Select the parent container and append the square.

const createSquares = function (numberOfSquares) {
    const $squaresContainer = $('.squares');

    // Clear parent containr
    $squaresContainer.empty();

    for (let i = 1; i <= numberOfSquares; i++) {
        // const $square = $('<div class="square" />');
        // Create div
        const $square = $('<div />');
        // Add square class
        $square.addClass('square');
        // Get Random Color
        // console.log(getRandomColor());
        $square.css('background-color', getRandomColor());
        // Append to parent
        $squaresContainer.append($square);
    }
};

// --------------------------------- STEP 3
// - Random Color Function
// - Define an array of colors: Blue, Red, Green, Purple
// - Random number generator to return a random index value

const getRandomColor = function() {
    const colors = ['blue', 'red', 'green', 'purple'];
    // Generate a random number between 0 and length of colors.
    let randomNumber = Math.floor(Math.random() * colors.length);
    // Use that random number to return a color form colors array
    return colors[randomNumber];
};

// --------------------------------- STEP 4
// - Add event listener to squares
// - Check the square color
// - If the color is blue, remove square and add a point
// - If the color is not blue, remove a point
// - Update DOM

// Event Delegation
$('.squares').on('click', '.square', function (event) {
    const $squareColor = $(this).css('background-color');
    console.log($squareColor);
    if ($squareColor === 'rgb(0, 0, 255)') {
        console.log('I am blue');
        //  Increment Score
        score++;
        // Remove clicked square
        $(this).remove();
        console.log(score);
    } else {
        if (score > 0) {
            // Decrement Score
            score--;
        }
    }
    // Update DOM
    $('h1').text(`Scoreboard: ${score}`);
    console.log(score);
});


// ---------------------------- STEP 5
// - Timer Function
// - Initialize a Global Time variable
// - User setInterval() to decrement time by 1 every second
// - Update DOM
//  - Check time: if time is equal to 0, stop timer, reset time and squares, finally start timer

const startTimer = function() {
    const timer = setInterval(function () {
        if (time === 0) {
            // Stop counting
            clearInterval(timer);
            // TODO Increment round
            round++;
            $('#round').text(`round: ${round}`);
            setRound();
            return;
        }
        time--;
        $('#timer').text(`timer: ${time}s`);
    }, 1000);
};


// ----------------------------- STEP 6
// - Set Round Function
// - Reset time and number of squares based on round
// - reset timer function
// - Check round: if round > 3 stop game and show score
// - If round < 3, multiply numberOfSquares by round and divide time by round

const setRound = function() {
    if (round > 3) {
        alert(`GAME OVER!\nYour score = ${score}`);
    } else {
        // Reset Time
        time = Math.floor(startTime / round);
        // Reset Squares on Gameboard
        createSquares(startCount * round);
        // Update DOM Time
        $('#timer').text(`timer: ${time}s`);
        // Restart Timer
        startTimer();
    }
};