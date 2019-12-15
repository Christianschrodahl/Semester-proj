var getWinner = localStorage.getItem("Winner");
var winner = JSON.parse(getWinner);
var playerWon = document.querySelector(".winner");
for (let key in winner) {
	playerWon.innerHTML = `<div>
								<h1>Congratulations ${winner.player}</h1>
								<h2>You won!</h2>
								<p>You have proven you're wordy to become the next ${winner.savedCards.Name} <br>Play again and see if how many times you can crush you opponent as another character!</p>
							</div>`
}
