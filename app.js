let chutLad = {
	1: 38,
	4: 14,
	9: 31,
	21: 42,
	28: 84,
	36: 44,
	51: 67,
	71: 91,
	80: 100,
	16: 6,
	47: 26,
	49: 11,
	56: 53,
	62: 19,
	64: 60,
	93: 73,
	95: 75,
	98: 78
};

class Player {
	constructor(name) {
		this.name = name;
		this.position = 0;
	}

	move() {
		let leap = Math.ceil(Math.random() * 6);
		return this.validateMove(leap);
	}

	validateMove(leap) {
		let oldPos = this.position;
		let newPos = this.position + leap;
		let addText = ``;

		if (newPos > 100) {
			return `${this.name}: ${this.position} --> ${this.position}`;
		}

		if (chutLad.hasOwnProperty(newPos)) {
			if (newPos < chutLad[newPos]) {
				addText = ` --LADDER-->${chutLad[newPos]}`;
			} else {
				addText = ` --CHUTE-->${chutLad[newPos]}`;
			}
			this.position = chutLad[newPos];
		} else {
			this.position = newPos;
		}

		return `${this.name}: ${oldPos} --> ${newPos}${addText}`;
	}
}

class Game {
	constructor(players) {
		this.playNum = 1;
		this.gameOver = false;
		this.players = [];
		this.winner = "";

		players.forEach(name => {
			let player = new Player(name);
			this.players.push(player);
		});
	}

	turn() {
		let currentPlayer = this.players[this.playNum % this.players.length];
		let result = currentPlayer.move();
		console.log(`${this.playNum}: ${result}`);

		if (currentPlayer.position == 100) {
			this.winner = currentPlayer.name;
			console.log(`The winner is ${this.winner}!`);
			this.gameOver = true;
		}
		this.playNum += 1;
	}
}

function main() {
	let players = ["jake", "ross", "zorro"];
	let myGame = new Game(players);
	// console.log(myGame);
	while (!myGame.gameOver) {
		myGame.turn();
	}
}

main();
