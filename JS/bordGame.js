// Get chosen Players
var getPlayer = localStorage.getItem("Token");
var Players = JSON.parse(getPlayer);
Players.forEach((player, index) => {
	player["player"] = (index == 0) ? "Player1" : "Player2";
	player["position"] = 0;
	player["border"] = (index == 0) ? "img/player1_border-01.png" : "img/player2_border-02.png"
	player["color"] = (index == 0) ? "#d60000" :"#0000ff"
})

var currentPlayerTurn = 0;

//Traps
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
	setTimeout(() => {
		var square = document.querySelectorAll(".board__tile");
		var tiles = Array.from(square);
		Players.forEach((player, index) => {
			playerColor = player.color
			for (let i = tiles.length - 1; i >= 0; i--) {
				var playerTile = tiles[i].childNodes;
				playerTile.forEach(function (tileElm) {
					//remove player from last tile
					if (!tileElm.classList.length == 0) {
						if (tileElm.classList.contains(player.player)) {
							tileElm.remove();
						}
					}
				});
				//Players position
				if (tiles[i].dataset.p == player.position) {
					tiles[i].innerHTML += `<div class="board__player ${player.player}">
												<img src="${player.border}" style="background-Image:url(${player.savedCards.Image})">
											</div>`
					//set a color to the Dice based on CurrentPlayer Turn
					DiceColor();
				}
			}
			//tile traps
			traps.forEach(trap => {
				for (let i = tiles.length - 1; i >= 0; i--) {
					if (player.position == trap.start) {
						player.position = trap.end
					}
				}
			})
		})
	}, 1000)
}
