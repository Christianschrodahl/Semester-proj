//This is used for player dice Color to se if the dice has been rolled and then check player turn
var diceColorTurn = false

function DiceColor() {	
	const element = document.querySelector('#canvasDice');
	const animation = new Zdog.Illustration({
		element,
	});
	const PI = Math.PI * 2;
	// This Anchor is used for rotation
	const dice = new Zdog.Anchor({
		addTo: animation,
	});
	// group describing the faces through rounded rectangles
	const faces = new Zdog.Group({
		addTo: dice,
	});

	var sides = new Zdog.Rect({
		addTo: faces,
		stroke: 30,
		width: 30,
		height: 30,
		color: "#555",
		translate: {
			z: -15,
		},
	});
	if (diceColorTurn == true) {
		sides.color = (currentPlayerTurn == 0) ? "#0000ff" : "#d60000"
	}
	// rotate the faces around the center
	sides.copy({
		rotate: {
			x: PI / 4,
		},
		translate: {
			y: 15,
		},
	});

	sides.copy({
		rotate: {
			x: PI / 4,
		},
		translate: {
			y: -15,
		},
	});

	sides.copy({
		translate: {
			z: 15,
		},
	});
	
	const one = new Zdog.Ellipse({
		addTo: dice,
		diameter: 15,
		stroke: false,
		fill: true,
		color: 'hsl(0, 0%, 100%)',
		translate: {
			z: 30,
		},
		value: 2,
	});

	const two = new Zdog.Group({
		addTo: dice,
		rotate: {
			x: PI / 4,
		},
		translate: {
			y: 30,
		},
	});

	one.copy({
		addTo: two,
		translate: {
			y: 10,
		},
	});

	one.copy({
		addTo: two,
		translate: {
			y: -10,
		},
	});

	const three = new Zdog.Group({
		addTo: dice,
		rotate: {
			y: PI / 4,
		},
		translate: {
			x: 30,
		},
	});

	one.copy({
		addTo: three,
		translate: {
			z: 0,
		},
	});

	one.copy({
		addTo: three,
		translate: {
			x: 10,
			y: -10,
			z: 0,
		},
	});

	one.copy({
		addTo: three,
		translate: {
			x: -10,
			y: 10,
			z: 0,
		},
	});

	const four = new Zdog.Group({
		addTo: dice,
		rotate: {
			y: PI / 4,
		},
		translate: {
			x: -30,
		},
	});

	two.copyGraph({
		addTo: four,
		rotate: {
			x: 0,
		},
		translate: {
			x: 10,
			y: 0,
		},
	});

	two.copyGraph({
		addTo: four,
		rotate: {
			x: 0,
		},
		translate: {
			x: -10,
			y: 0,
		},
	});

	const five = new Zdog.Group({
		addTo: dice,
		rotate: {
			x: PI / 4,
		},
		translate: {
			y: -30,
		},
		result: 5
	});

	four.copyGraph({
		addTo: five,
		rotate: {
			y: 0,
		},
		translate: {
			x: 0,
		},
	});

	one.copy({
		addTo: five,
		translate: {
			z: 0,
		},
	});

	const six = new Zdog.Group({
		addTo: dice,
		translate: {
			z: -30,
		},
	});

	two.copyGraph({
		addTo: six,
		rotate: {
			x: 0,
			z: PI / 4,
		},
		translate: {
			x: 0,
			y: 0,
		},
	});

	four.copyGraph({
		addTo: six,
		rotate: {
			y: 0,
		},
		translate: {
			x: 0,
		},
	});
	//This is a static illustration
	animation.updateRenderGraph();

	const rotation = {
		x: 0,
		y: 0,
		z: 0,
	};

	// array describing the rotation necessary to highlight the difference faces

	const rotate = [
		{
			x: 0,
			y: 0,
			value: 1
    },
		{
			x: PI / 4,
			y: 0,
			value: 2,
  },
		{
			x: 0,
			y: PI / 4,
			value: 3
  },
		{
			x: 0,
			y: (PI * 3) / 4,
			value: 4
  },
		{
			x: (PI * 3) / 4,
			y: 0,
			value: 5
  },
		{
			x: PI / 2,
			y: 0,
			value: 6
  },
];
	// utility function returning a positive integer up to a maximum value
	const randomInt = (max = 6) => Math.floor(Math.random() * max);
	// utility function returning a random item from an array
	const randomItem = arr => arr[randomInt(arr.length)];
	// function animating the dice according to the input x and y values
	var roll = 0;

	function rollDice({
		x,
		y,
		value
	}) {
		// animate the object toward the input values
		anime({
			targets: rotation,
			x: x + PI * randomInt(),
			y: y + PI * randomInt(),
			z: PI * randomInt(),
			duration: 1000,

			update() {
				dice.rotate.x = rotation.x;
				dice.rotate.y = rotation.y;
				dice.rotate.z = rotation.z;
				animation.updateRenderGraph();
			},
		});
		roll = value;
		renderBoard()
	}

	//Dice role, setting player position and checking who won.
	window.roleDice = () => {
		rollDice(randomItem(rotate))
		var currentPlayer = Players[currentPlayerTurn];
		currentPlayer.position += roll;
		currentPlayerTurn++;
		if (currentPlayerTurn >= Players.length) {
			currentPlayerTurn = 0;
		}
		if (currentPlayer.position >= 25) {
			localStorage.setItem("Winner", JSON.stringify(currentPlayer));
			if (localStorage.getItem("Winner")) {
				document.location.href = "endGame.html";
				hasWon = true;
			}
		}
		diceColorTurn = true
	}
}

DiceColor()
