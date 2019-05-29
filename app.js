class Player {
	constructor(name) {
		this.name = name;
		this.position = 0;
	}
}

class Game {
	constructor(players) {
		this.playNum = 1;
		this.gameOver = false;
		this.players = players.map(name => {
			let player = new Player(name);
			return player;
		});
		this.winner = "";

		this.chutLad = {
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
	}

	turn() {
		let currentPlayer = this.players[this.playNum % this.players.length];
		let result = this.movePlayer(currentPlayer);
		console.log(`${this.playNum}: ${result}`);

		if (currentPlayer.position === 100) {
			this.winner = currentPlayer.name;
			console.log(`The winner is ${this.winner}!`);
			this.gameOver = true;
		}
		this.playNum += 1;
	}

	movePlayer(currentPlayer) {
		let leap = Math.ceil(Math.random() * 6);
		let oldPos = currentPlayer.position;
		let newPos = currentPlayer.position + leap;
		let addText = ``;

		if (newPos > 100) {
			return `${currentPlayer.name}: ${currentPlayer.position} --> ${
				currentPlayer.position
			}`;
		}

		if (this.chutLad.hasOwnProperty(newPos)) {
			if (newPos < this.chutLad[newPos]) {
				addText = ` --LADDER-->${this.chutLad[newPos]}`;
			} else {
				addText = ` --CHUTE-->${this.chutLad[newPos]}`;
			}
			currentPlayer.position = this.chutLad[newPos];
		} else {
			currentPlayer.position = newPos;
		}

		return `${currentPlayer.name}: ${oldPos} --> ${newPos}${addText}`;
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
