fetch('https://www.anapioficeandfire.com/api/characters?page=3&pageSize=50')
	.then((result) => {
		return result.json()
	})
	.then(result => {
		createCard(result);
	})
	.catch(error => console.log(error));

var cards = document.querySelector(".card");
var cardArray = [];

function createCard(card) {
	var counter = 0;
	const playCard = [];
	card.forEach(char => {
		if (char.culture) {
			playCard.push(char)
		}
	})
	for (var i = 0; i < 10; i++) {
		cardArray.push({
			"Name": playCard[i].name,
			"Gender": playCard[i].gender,
			"Image": "../img/token-0" + counter + ".png"
		})
		cards.innerHTML += "<div class='card__character' data-name='" + playCard[i].name + "'><div class='card__details'><img class='card__token' src='../img/token-0" + counter + ".png'><p class='card__charName'>" + playCard[i].name + "</p>" + "<p class='card__gender'>Gender: " + playCard[i].gender + "</p>" + "<p class='card__gender'>Culture: " + playCard[i].culture + "</p></div></div>"
		if (i % 2) {
			counter += 1
		}
	}
}
var modal = document.getElementById("modal");

function showCards() {
	modal.style.display = "block";
	chooseCard();
}

function chooseCard() {
	var player1 = null;
	var player2 = null;
	var allCharacters = document.querySelectorAll(".card__character");

	allCharacters.forEach(function (character, index) {
		character.addEventListener("click", function () {
			var nameOfCharacter = this.dataset.name;
			if (this.classList.contains("card__selectedPlayer1")) {
				this.classList.remove("card__selectedPlayer1");
				player1 = null;
			} else if (this.classList.contains("card__selectedPlayer2")) {
				this.classList.remove("card__selectedPlayer2");
				player2 = null;
			} else {
				if (player1 !== null && player2 !== null) {
					return;
				}

				if (player1 === null) {
					this.classList.add("card__selectedPlayer1");
					player1 = nameOfCharacter;
				} else {
					this.classList.add("card__selectedPlayer2");
					player2 = nameOfCharacter;
				}
			}
		})
	})
}

function saveChosenCards() {

	localStorage.clear();

	var savedCards = [];
	var storage = [];
	var selectedCharacter1 = document.querySelector(".card__selectedPlayer1");
	var selectedCharacter2 = document.querySelector(".card__selectedPlayer2");
	//var cardImg;
	var chosenPlayers = [selectedCharacter1, selectedCharacter2]
	if (selectedCharacter1 !== null && selectedCharacter2 !== null) {
		console.log(chosenPlayers)
		chosenPlayers.forEach((chosen, index) => {
			savedCards.push(chosen.dataset.name);
			cardArray.forEach((card, index) => {
				if (chosen.dataset.name.includes(card.Name)) {
					storage.push({
						savedCards: card
					});
				}
			})
		})
		console.log(savedCards)
		console.log("storage ", storage)
		localStorage.setItem("Token", JSON.stringify(storage));
	}
}
saveChosenCards()
