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

function createCard(card){
	var counter = 0;
	for(var i = 6; i < 16; i++){
		cardArray.push({"Name": card[i].name, "Gender": card[i].gender})
		cards.innerHTML += "<div class='card__character' data-name='" + card[i].name + "'><div class='card__details'><img class='card__token' src='../img/token-0"+ counter +".png'><p class='card__charName'>" + card[i].name + "</p>"+ "<p class='card__gender'>" + card[i].gender + "</p>" + "<p class='card__gender'>" + card[i].culture + "</p></div></div>"	
		if(i % 2){
			counter += 1
		}
	}
}
var modal = document.getElementById("modal");
function showCards(){
	modal.style.display = "block";
	chooseCard();
}

function chooseCard(){
	var playerCards = document.querySelectorAll(".card__character");

	for(var i = 0; i < playerCards.length; i++) {

		playerCards[i].addEventListener("click", function(e) {

			var checkedCards = document.querySelectorAll(".card__character.checked");

			if(this.className.indexOf("checked") === -1) {

				if(checkedCards.length > 1) {
					// don't use an alert
					alert("only select two cards");
				}
				else {
					this.classList.add("checked")
				}
				
			} else {
				this.classList.remove("checked")
			}		
		})
	}
}
	
function saveChosenCards() {

	localStorage.clear();

	var savedCards = [];
	var storage = [];
	var selectedCharacters = document.querySelectorAll(".checked");

	var chosenPlayers = Array.from(selectedCharacters);

	chosenPlayers.forEach(function(chosen, index){
		savedCards.push(chosen.dataset.name);
	})

	cardArray.forEach(function(card, index){

		if(savedCards.includes(card.Name)){
			storage.push(card);
		}
	})

	localStorage.setItem("Token", JSON.stringify(storage));	
}
