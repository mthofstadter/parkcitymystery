var colorCode = "";
let index = 0;
let round = 0;
var blinking = false;
var clickIndex = 0;


let gameMessage;

function loadFunc() {
    document.getElementById("colorsDiv").style = "display: none";
    gameMessage = document.getElementById("gameMessage");
    gameMessage.style = "display: none";
    let wonBefore = localStorage.getItem("wonBefore");
    if(wonBefore == "true") {
        win();
    } else {
        localStorage.setItem("wonBefore", "false");
    }
}

function startGame() {
    localStorage.setItem("wonBefore", "false");
    colorCode = ""; //reset
    for(var i=0; i<8; i++) {
        colorCode = colorCode +  Math.floor(Math.random() * 4);
    }

    document.getElementById("colorsDiv").style = "display: flexbox";
    document.getElementById("hint").innerHTML = "";
    gameMessage.classList.remove("won");
    gameMessage.classList.remove("lost");
    document.getElementById("startButton").style = "visibility: hidden";
    gameMessage.style = "display: none";

    index = 0;
    round = 0;
    clickIndex = 0;
    blinking = true;
    setTimeout(blink, 1000);
}

function blink() {
    blinking = true;
    if(index<3+round) {
        highlight(colorCode.charAt(index));
        index++;
        setTimeout(blink, 500);
    } else {
        blinking = false;
    }
}

function nextRound() {
    round++;
    index = 0;
    clickIndex = 0;
    if(round==6) {
        win();
        return;
    }
    blink();
}
function clickColor(colorDiv) {
    if(blinking) { //doesn't allow clicking until sequence over
        return;
    }
    highlight(divNum(colorDiv));
    let answer = divNum(colorDiv);
    let correctAnswer = colorCode.charAt(clickIndex);
    if(answer == correctAnswer) {
        clickIndex++;
    } else {
        gameOver();
        return;
    }
    if(clickIndex == round+3) { //passed round
        setTimeout(nextRound,750);
    }

}

function gameOver() {
    document.getElementById("startButton").style = "visibility: show;"
    document.getElementById("colorsDiv").style = "display: none";
    gameMessage.innerHTML = "Game Over";
    gameMessage.style = "display: block";
    gameMessage.classList.add("lost");

}

function divNum(colorDiv) {
    if(colorDiv.id == "greenDiv") {
        return 0;
    } else if(colorDiv.id == "redDiv") {
        return 1;
    } else if(colorDiv.id == "blueDiv") {
        return 2;
    } else if(colorDiv.id == "yellowDiv") {
        return 3;
    }
}

 function highlight(colorDiv) {
    if(colorDiv == "0") {
        colorDiv = "greenDiv";
    } else if(colorDiv == "1") {
        colorDiv = "redDiv";
    } else if(colorDiv == "2") {
        colorDiv = "blueDiv";
    } else if(colorDiv == "3") {
        colorDiv = "yellowDiv";
    }
    document.getElementById(colorDiv).classList.add("highlight");
    setTimeout(function() {
        unhighlight(colorDiv);
    }, (300))
 }


 function unhighlight(colorDiv) {
    if(colorDiv == "0") {
        colorDiv = "greenDiv";
    } else if(colorDiv == "1") {
        colorDiv = "redDiv";
    } else if(colorDiv == "2") {
        colorDiv = "blueDiv";
    } else if(colorDiv == "3") {
        colorDiv = "yellowDiv";
    }
    document.getElementById(colorDiv).classList.remove("highlight");
 }

 function win() {
    if(localStorage.getItem("wonBefore") == "true") {
        gameMessage.innerHTML = "You already slayed";
    } else {
        localStorage.setItem("wonBefore", "true");
        gameMessage.innerHTML = "You slayed";
    }
    document.getElementById("colorsDiv").style = "display: none";
    document.getElementById("instructions").style = "display: none";
    gameMessage.classList.add("won");
    gameMessage.style = "display: block";
    document.getElementById("hint").innerHTML = 
    "All the way from the capital city<br> Step by step with care<br> Even though they don't smell pretty<br>Look inside the correct pair";
 }

/* Password ===================================== */

 function checkPassword() {
    let errorMessage = document.getElementById("errorMessage");
    let passwordInput = document.getElementById("password");
    let pass = passwordInput.value;
    pass = pass.split(" ").join("");
    pass = pass.toLowerCase();
    let alphabetized = pass.split('').sort().join('');
    console.log(alphabetized);

    if(pass == "tischtuesdaytea" || pass == "tuesdayteatisch") {
        errorMessage.innerHTML = "";
        passwordInput.classList.remove("error");
        console.log("correct");

        showSpell();
    } else if(alphabetized == "aacdeehisstttuy") {
        errorMessage.innerHTML = "Incorrect: You need to unscramble the password";
        passwordInput.classList.add("error");
        passwordInput.value = "";
    } else {
        errorMessage.innerHTML = "Incorrect Password";
        passwordInput.classList.add("error");
        passwordInput.value = "";
    }
}

function showSpell() {
    var spellDiv = document.getElementById("spellDiv");
    var spellDiv = document.getElementById("spellDiv");
    spellDiv.classList.add("reveal");
    document.getElementById("spellInstructions").innerHTML = "Gather around your fallen friends and place the resurrection pickle on their bodies.<br>Everyone must join hands and speak as one.<br>Recite the spell:"
    document.getElementById("spell").innerHTML = "Baa baa Dicky Moe, have you any wool?<br>Yas kweng yas kweng three bags full<br>Jack be nimble Jack be quick<br>Jack jump over this gaping slit";

}