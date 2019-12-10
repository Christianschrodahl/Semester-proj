var player1 = null;
var player2 = null;
var playButton = document.getElementById("playButton");

var allCharacters = document.querySelectorAll(".selection-item");

allCharacters.forEach(function(character) {
    character.addEventListener("click", function() {

        var nameOfCharacter = this.dataset.name;

        if(this.classList.contains("selected-player1")) {
            this.classList.remove("selected-player1");
            player1 = null;
            displaySelectedCharacter("player1", null);
            localStorage.removeItem("player1");
        }
        else if(this.classList.contains("selected-player2")) {
            this.classList.remove("selected-player2");
            player2 = null;
            displaySelectedCharacter("player2", null);
            localStorage.removeItem("player2");
        }
        else {
            if(player1 !== null && player2 !== null) {
                return;
            }

            if(player1 === null) {
                this.classList.add("selected-player1");
                player1 = nameOfCharacter;
                displaySelectedCharacter("player1", nameOfCharacter);
                localStorage.setItem("player1", nameOfCharacter)
            }
            else {
                this.classList.add("selected-player2");
                player2 = nameOfCharacter;
                displaySelectedCharacter("player2", nameOfCharacter);
                localStorage.setItem("player2", nameOfCharacter)
            }
        }

        togglePlayButton();
    })
})


function displaySelectedCharacter(player, character) {
    var thePlayer = document.getElementById(player);
    if(character === null) {
        character = "Player not selected"
    }
    thePlayer.innerHTML = character;
}

function savePlayerToStorage(player, character) {
    localStorage.setItem(player, character)
}

function removePlayerFromStorage(player) {
    localStorage.removeItem(player)
}

function togglePlayButton() {
    if(player1 !== null && player2 !== null) {
        playButton.disabled = false;
    }
    else {
        playButton.disabled = true;
    }
}

playButton.addEventListener("click", function() {
    window.location.href = "game.html";
});