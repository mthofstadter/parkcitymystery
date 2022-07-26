
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
    var colorCode = "";
    for(var i=0; i<8; i++) {
        colorCode = colorCode +  Math.floor(Math.random() * 4);
    }
    console.log("code = " + colorCode);
    blink(colorCode);
}

function blink(colorCode) {
    var round = 0; //0-5
    for(var i=0; i<(round+3); i++) {
        var blinkColor = colorCode.charAt(i);
        console.log("char = " + blinkColor);
        setTimeout(function() {
            highlight(blinkColor);
        }, 1000+(2000*i))
        setTimeout(function() {
            unhighlight(blinkColor);
        }, 2000+(2000*i))
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
    console.log("wait..." + colorDiv);
    document.getElementById(colorDiv).classList.add("highlight");
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