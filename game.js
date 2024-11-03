var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var started = false;
var level = 0;

function newColor() {
    level++;
    userPattern = [];
    var randomColor = Math.floor(Math.random()*4);
    gamePattern.push(buttonColors[randomColor]);
    $("#" + buttonColors[randomColor]).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(buttonColors[randomColor]);
    $("h1").html("Level " + level);
    $("h1").css("color", "#FEF2BF");
    
};

$(".btn").on("click", function () {
   var userChosenColor = $(this).attr("id")
   userPattern.push(userChosenColor);
   playSound(userChosenColor);
   animatePress(userChosenColor);
   checkAnswer(userPattern.length-1);
});
//There is no addEventListener method in jQuery, use on() instead
//to select this with jQuery I need to use $
//remeber attr


function playSound(name) {
    var audio = new Audio("./sounds/"+ name +".mp3");
    audio.play();
};
//Pay attention to that ^^^, that's a good way of using functions

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    },150);
}


$(document).on("keydown", function() {
  if (!started) {
    $("h1").html("Level " + level);
    newColor(); 
    started = true;
  }
})
//I need to put if statement,inside the function
//(!started) and (started===false) are equal

function checkAnswer(currentLevel) {
if (userPattern[currentLevel]==gamePattern[currentLevel]) {
    console.log("Great!");
    if (userPattern.length===gamePattern.length) {
        setTimeout(function() {
            newColor();
        }, 1000);
    }
} else {
    console.log("Wrong!");
    setTimeout(function() {
        gameOver()
    }, 300);
}
}

function gameOver() {
    // var audio = new Audio("./sounds/wrong.mp3");
    // audio.play(); or use playSound
    playSound("wrong");
    $("h1").html("Game Over, Press Any Key to Restart");
    $("h1").css("color", "red");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    started=false;
    level=0;
    gamePattern = [];
}
//How game knows that my sequence is not equal to the game's sequence, even though it checks for the last element only? 
//Answer: using this checkAnswer(userPattern.length-1); it checks each index one by one 1-1[0];2-1[1];and so on  (userPattern[currentLevel]==gamePattern[currentLevel])

//Step 10 
// 1. Create a new function called startOver().

// 2. Call startOver() if the user gets the sequence wrong.

// 3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
// Already did that in gameOver();