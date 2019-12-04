//players
var getPlayer = localStorage.getItem("Token");
var Players = JSON.parse(getPlayer);

Players.forEach((player, index) => {
	player["player"] = (index == 0) ? "Player1" : "Player2";
	player["position"] = 0;
	player["color"] = (index == 0) ? "#fff" : "#000"
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
	return new Promise(resolve => {
		setTimeout(() => {
			var square = document.querySelectorAll(".board__tile");
			var tiles = Array.from(square);
			Players.forEach((player, index) => {
				for (let i = tiles.length - 1; i >= 0; i--) {
					var playerTile = tiles[i].childNodes;
					playerTile.forEach(function (tileElm) {
						if (!tileElm.classList.length == 0) {
							console.log(tileElm.classList, player.player)
							if (tileElm.classList.contains(player.player)) {
								tileElm.remove();
							}
						}
					});
					if (tiles[i].dataset.p == player.position) {
						tiles[i].innerHTML = `<div class="board__player ${player.player}" style="background-color:${player.color}"><img src="${player.Image}"></div>`
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
		}, 1000, rolled(width / 2 - 15, height / 2 + 20, counter))
	})
}


//renderBoard();
