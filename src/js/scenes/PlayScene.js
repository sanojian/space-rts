
/**
 * play scene
 */

class PlayScene extends Phaser.Scene {

	constructor() {
		super({
			key: 'play'
		});

		this.lastUpdate = 0;

	}
	
	create() {

		this.worldMan = new WorldManager(this);

		this.createInteractiveArea();

		this.worldMan.ships.push(new Ship(this, 100, 100, 'ship_player'));
		this.worldMan.ships.push(new Ship(this, 300, 500, 'ship_player'));

		this.scene.launch('ui');

		this.time.delayedCall(50, () => {

			GLOBAL.uiScene = this.scene.get('ui');
			GLOBAL.playScene = this.scene.get('play');

			this.startGame();
		});
	}

	createInteractiveArea() {

		const canvasW = this.sys.game.canvas.width;
		const canvasH = this.sys.game.canvas.height;

		const playfield = this.add.graphics({ fillStyle: { color: 0x000000 } });
		const rect = new Phaser.Geom.Rectangle(0, 0, canvasW, canvasH);
		this.playfield = playfield;

		playfield
			.fillRectShape(rect)
			.setInteractive(rect, Phaser.Geom.Rectangle.Contains)
			.setScrollFactor(0)
			.setAlpha(0.01);

		playfield.on('pointerdown', (pointer) => {
			console.log(pointer.worldX)
		})
	}

	startGame() {

		GLOBAL.changeState(DEFS.STATES.PLAYING);

	}

	update() {

		// limit physics to target fps
		let now = new Date().getTime();
		if (now - this.lastUpdate > 1000 / DEFS.TARGET_FPS) {

			if (GLOBAL.state == DEFS.STATES.PLAYING) {
				this.worldMan.update();
			}

			this.lastUpdate = now;
		}


	}


}