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
	const playCard = [];
	console.log(card);
	card.forEach(char =>{
		if(char.culture){
			playCard.push(char)
		}
	})
	for(var i = 0; i < 10; i++){
		cardArray.push({"Name": playCard[i].name, "Gender": playCard[i].gender, "Image": "../img/token-0"+ counter +".png"})
		cards.innerHTML += "<div class='card__character' data-name='" + playCard[i].name + "'><div class='card__details'><img class='card__token' src='../img/token-0"+ counter +".png'><p class='card__charName'>" + playCard[i].name + "</p>"+ "<p class='card__gender'>Gender: " + playCard[i].gender + "</p>" + "<p class='card__gender'>Culture: " + playCard[i].culture + "</p></div></div>"	
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
	//var cardImg;
	var chosenPlayers = Array.from(selectedCharacters);
	console.log(chosenPlayers)
	chosenPlayers.forEach((chosen, index)=>{
		savedCards.push(chosen.dataset.name);
	})
	console.log(savedCards)
	cardArray.forEach((card, index) =>{
		if(savedCards.includes(card.Name)){
			storage.push(card);
		}
	})
	console.log("storage ",storage)
	localStorage.setItem("Token", JSON.stringify(storage));	
}
saveChosenCards()