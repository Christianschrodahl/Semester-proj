//Dice
window.rollDice = () => {
	const max = 1;
	const roll = Math.ceil(Math.random() * max);
	currentPlayer.position += roll;
	console.log(currentPlayer)
	renderBoard();
}
//players
const players = [{
	name: "Cloud",
	position: 0,
	color: "gold"
}, {
	name: "Sephiroth",
	position: 0,
	color: "white"
}];
let currentPlayerTurn = 0;
var currentPlayer = players[currentPlayerTurn];

const boardSize = 50;

//render board function
const renderBoard = () => {

	//creating player position

	var newPlayer = document.createElement("div");
	newPlayer.classList.add("board__player")
	var square = document.querySelectorAll(".board__tile");
	for (let i = 0; i < square.length; i++) {
		if (square[i].dataset.p == currentPlayer.position) {
			square[i].appendChild(newPlayer);
		} else {
			square[i].innerHTML = ''
		}
	}
}

renderBoard();