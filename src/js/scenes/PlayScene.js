
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

		this.keyInputs = {
			keySHIFT: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT),
		};
		this.input.mouse.disableContextMenu();
			
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

				if (pointer.rightButtonDown()) {
					playfield.data.set('dragScreenOrigin', new Phaser.Math.Vector2(pointer.x, pointer.y));
				}
				else {
					this.worldMan.setDestination(pointer.worldX, pointer.worldY);

					playfield.data.set('isDrawing', true);
					playfield.data.set('currentPoint', new Phaser.Math.Vector2(pointer.x, pointer.y));
				}
			})
			.on('pointermove', (pointer) => {

				if (pointer.rightButtonDown()) {

					const dragScreenOrigin = playfield.data.get('dragScreenOrigin');

					this.cameras.main.setScroll(
						this.cameras.main.scrollX + (dragScreenOrigin.x - pointer.x),
						this.cameras.main.scrollY + (dragScreenOrigin.y - pointer.y)
					);

					playfield.data.set('dragScreenOrigin', new Phaser.Math.Vector2(pointer.x, pointer.y));

				}

			})
			.on('pointerup', (pointer) => {

				if (pointer.rightButtonDown()) {

				}
				else {
					if (this.playfield.data.get('isDrawing')) {

						const currentPoint = this.playfield.data.get('currentPoint');
						const angle = Phaser.Math.Angle.BetweenPoints(currentPoint, pointer);
						const dist = Phaser.Math.Distance.BetweenPoints(currentPoint, pointer);

						// make sure angle was deliberate
						if (dist > 60) {
							this.worldMan.setDesiredAngle(angle);
						}
						else {
							// keep exisint rotation
							this.worldMan.setDesiredAngle();
						}
					}

					playfield.data.set('isDrawing', false);
				}
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

	}


}