
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

		this.worldMan.ships.push(new PlayerShip(this, 100, 100, 'ship_player'));
		this.worldMan.ships.push(new PlayerShip(this, 300, 500, 'ship_player'));
		this.worldMan.enemies.push(new EnemyShip(this, 500, 400, 'ship_player'));

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

		const playfield = this.add.graphics({
			fillStyle: { color: 0x000000 },
			lineStyle: { color: 0x00ff00, width: 1 }
		});
		const rect = new Phaser.Geom.Rectangle(0, 0, canvasW, canvasH);
		this.playfield = playfield;

		playfield
			.fillRectShape(rect)
			.setInteractive(rect, Phaser.Geom.Rectangle.Contains)
			.setScrollFactor(0)
			.setDataEnabled()
			.setAlpha(1);

		playfield
			.on('pointerdown', (pointer) => {
				this.worldMan.setDestination(pointer.worldX, pointer.worldY);

				playfield.data.set('isDrawing', true);
				playfield.data.set('currentPoint', new Phaser.Math.Vector2(pointer.x, pointer.y));
			})
			.on('pointerup', (pointer) => {

				if (this.playfield.data.get('isDrawing')) {

					const currentPoint = this.playfield.data.get('currentPoint');
					const angle = Phaser.Math.Angle.BetweenPoints(currentPoint, pointer);

					this.worldMan.setDesiredAngle(angle);
				}

				playfield.data.set('isDrawing', false);

			});
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

		// update playfield
		this.playfield.clear();

		if (this.playfield.data.get('isDrawing')) {

			const currentPoint = this.playfield.data.get('currentPoint');

			this.playfield.moveTo(currentPoint.x, currentPoint.y);
			this.playfield.lineTo(this.input.activePointer.x, this.input.activePointer.y);

			this.playfield.strokePath();
		}
	}


}