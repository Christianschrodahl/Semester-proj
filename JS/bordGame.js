var hasWon = false;
//Dice
window.rollDice = () => {
	const max = 2;
	const roll = Math.ceil(Math.random() * max);
	var currentPlayer = Players[currentPlayerTurn];
	currentPlayer.position += roll;
	currentPlayerTurn++;
	if (currentPlayerTurn >= Players.length) {
		currentPlayerTurn = 0;
	}
	if (currentPlayer.position >= 25) {
    alert("Player has won!");
    hasWon = true;
  }
	renderBoard();
}
//players
var getPlayer = localStorage.getItem("Token");
var Players = JSON.parse(getPlayer);

Players.forEach(player => {
	player["position"] = 0;
})

let currentPlayerTurn = 0;

const traps = [{
	start: 7,
	end: 4
}, {
	start: 13,
	end: 8
}, {
	start: 20,
	end: 15
}]

const boardSize = 50;

//render board function
const renderBoard = () => {
	var square = document.querySelectorAll(".board__tile");
	var tiles = Array.from(square);
	Players.forEach((player, index) => {
		for (let i = tiles.length - 1; i >= 0; i--) {
			if (tiles[i].dataset.p == player.position) {
				tiles[i].innerHTML = `<div class="board__player"><img src="${player.Image}"></div>`
			}
		}
		traps.forEach(trap => {
			for (let i = tiles.length - 1; i >= 0; i--) {
				if (player.position == trap.start) {
					player.position = trap.end
				}
			}
		})
	})

}


renderBoard();
