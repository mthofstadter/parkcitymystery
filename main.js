
var colorCode = "";
let index = 0;
let round = 0;
var blinking = false;
var clickIndex = 0;
var started = false;
var audio0 = new Audio('sounds/note0.mp3');
var audio1 = new Audio('sounds/note1.mp3');
var audio2 = new Audio('sounds/note2.mp3');
var audio3 = new Audio('sounds/note3.mp3');

function checkPassword() {
    var pass = document.getElementById("password").value;
    pass = pass.split(" ").join("");
    pass = pass.toLowerCase();
    console.log(pass);

    if(pass == "tischtuesdaytea") {
        console.log("correct");
        showSpell();
    } else {
        window.alert("wrong, bitch");
        console.log("wrong");
    }
}

function showSpell() {
    var spellDiv = document.getElementById("spell");
    spellDiv.classList.add("reveal");
    spellDiv.style = "display:block";
    // spellDiv.appe
    // appendChildElement = parentElement.appendChild(childElement)
    // appendChildElement.innerHTML = bookmark.url
}

function startGame() {
    //show colors
    //ready? 3... 2... 1...
    colorCode = ""; //reset
    for(var i=0; i<8; i++) {
        colorCode = colorCode +  Math.floor(Math.random() * 4);
    }
    console.log("code = " + colorCode);
    index = 0;
    round = 0;
    clickIndex = 0;
    started = true;
    blink();
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
    if(blinking || !started) { //doesn't allow clicking until sequence over
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
    started = false;
    window.alert("fail");
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
        console.log("here");
        audio0.currentTime = 0
        audio0.play();
        colorDiv = "greenDiv";
    } else if(colorDiv == "1") {
        audio1.currentTime = 0
        audio1.play();
        colorDiv = "redDiv";
    } else if(colorDiv == "2") {
        audio2.currentTime = 0
        audio2.play();
        colorDiv = "blueDiv";
    } else if(colorDiv == "3") {
        audio3.currentTime = 0
        audio3.play();
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
    window.alert("win");
 }