var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var counter = 6;
var x = 0;
const Points2D = function (x, y) {
	this.x = x;
	this.y = y;
};
const Point3D = function (x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
}
//size represents the width, height dept of the dice.
const Dice = function (x, y, z, size) {

	Point3D.call(this, x, y, z);

	size *= 0.5;

	//All points of the Dice
	this.vertices = [new Point3D(x - size, y - size, z - size),
                    new Point3D(x + size, y - size, z - size),
                    new Point3D(x + size, y + size, z - size),
                    new Point3D(x - size, y + size, z - size),
                    new Point3D(x - size, y - size, z + size),
                    new Point3D(x + size, y - size, z + size),
                    new Point3D(x + size, y + size, z + size),
                    new Point3D(x - size, y + size, z + size)];

	//this is for each side of the dice. it refers to the vereces above.
	this.faces = [[0, 1, 2, 3], [0, 4, 5, 1], [1, 5, 6, 2], [3, 2, 6, 7], [0, 3, 7, 4], [4, 7, 6, 5]];
};

Dice.prototype = {

	rotateX: function (radian) {

		var cosine = Math.cos(radian);
		var sine = Math.sin(radian);

		for (let i = this.vertices.length - 1; i > -1; --i) {

			let p = this.vertices[i];
			let y = (p.y - this.y) * cosine - (p.z - this.z) * sine;
			let z = (p.y - this.y) * sine + (p.z - this.z) * cosine;
			p.y = y + this.y;
			p.z = z + this.z;

		}

	},
	rotateY: function (radian) {
		var cosine = Math.cos(radian);
		var sine = Math.sin(radian);
		for (let i = this.vertices.length - 1; i > -1; --i) {

			let p = this.vertices[i];

			let x = (p.z - this.z) * sine + (p.x - this.x) * cosine;
			let z = (p.z - this.z) * cosine - (p.x - this.x) * sine;
			p.x = x + this.x;
			p.z = z + this.z;
		}
	}
};

var die = new Dice(0, 0, 80, 45);

function project(points3d, width, height) {
	var points2d = new Array(points3d.length);

	var focal_length = 100;

	for (let i = points3d.length - 1; i > -1; --i) {
		let p = points3d[i];

		let x = p.x * (focal_length / p.z) + width * 0.5;
		let y = p.y * (focal_length / p.z) + height * 0.5;

		points2d[i] = new Points2D(x, y);
	}
	return points2d;
}
var height;
var width;
async function animation() {
	// window.requestAnimationFrame(animation);

	height = document.querySelector(".board__dice").clientHeight;
	width = document.querySelector(".board__dice").clientWidth;

	ctx.canvas.height = height;
	ctx.canvas.width = width;

	ctx.fillStyle = "#333";
	ctx.fillRect(0, 0, width, height);

	die.rotateX(-0.03);
	die.rotateY(0.03);
	ctx.fillStyle = "red";

	var vertices = project(die.vertices, width, height)
	for (let i = die.faces.length - 1; i > -1; --i) {
		let face = die.faces[i];

		let p1 = die.vertices[face[0]];
		let p2 = die.vertices[face[1]];
		let p3 = die.vertices[face[2]];

		let v1 = new Point3D(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
		let v2 = new Point3D(p3.x - p1.x, p3.y - p1.y, p3.z - p1.z);

		let normal = new Point3D(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.x, v1.x * v2.y - v1.y * v2.x);

		if (-p1.x * normal.x + -p1.y * normal.y + -p1.z * normal.z <= 0) {
			ctx.beginPath();
			ctx.moveTo(vertices[face[0]].x, vertices[face[0]].y);
			ctx.lineTo(vertices[face[1]].x, vertices[face[1]].y);
			ctx.lineTo(vertices[face[2]].x, vertices[face[2]].y);
			ctx.lineTo(vertices[face[3]].x, vertices[face[3]].y);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();
		}
	}

	x++
	if (x === 607) {
		window.clearInterval(intervalID)
		await renderBoard();
	}
}
animation()

function rolled(x, y, count) {
	return new Promise(resolve => {
		ctx.beginPath();
		ctx.font = "60px arial";
		ctx.strokeText(count, x, y)
		ctx.fill();
	})
}
var intervalID;
var hasWon = false;
window.roleDice = () => {
	const max = 6;
	const roll = Math.ceil(Math.random() * max);
	x = 0
	counter = roll;
	intervalID = setInterval(function () {
		animation();
	}, 0.01);
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
}
