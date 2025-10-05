function initGame() {

	const MIN_WIDTH = 720;
	
	const aspect = window.innerWidth / window.innerHeight;
	let height = 1390
	if (aspect < MIN_WIDTH / 1390) {
		height = Math.min(1390, MIN_WIDTH / aspect);
	}
	
	var config = {

		type: Phaser.AUTO,
		scene: [BootScene, PlayScene, UiScene],
		pixelArt: true,
		backgroundColor: '#333333',
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH,
			width:  Math.max(MIN_WIDTH, (height / window.innerHeight) * window.innerWidth),
			height: height,
		},
		input: {
			gamepad: true
		},
	};

	
	var game = new Phaser.Game(config);

	// check for url params
	const params = GLOBAL.Utils.readUrlParams();
	GLOBAL.player1 = params.player || GLOBAL.player1;
	GLOBAL.player2 = params.opponent || GLOBAL.player2;
	GLOBAL.gameId = params.gameId || GLOBAL.gameId;
	GLOBAL.apiUrl = params.api || GLOBAL.apiUrl;

	console.log("Game initialized");
}

