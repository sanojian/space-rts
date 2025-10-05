

class EnemyShip extends Ship {

	constructor(scene, x, y) {

		super(scene, x, y, 'ship_enemy');

		this.speed = 1;


		this.shipImage
			.setInteractive()
			.on('pointerup', () => {

				if (this.scene.playfield.data.get('isDrawing')) {
					
					this.scene.worldMan.targetShip(this);
					this.scene.playfield.data.set('isDrawing', false);
				
				}
			});
		
	}


	update() {

		if (this.destinations.length == 0) {
			this.createWaypoints();
		}

		super.update();
	}

	createWaypoints() {

		// super smaht ai

		this.destinations.push(new Phaser.Math.Vector2(this.x + 400, this.y));
		this.destinations.push(new Phaser.Math.Vector2(this.x + 400, this.y + 200));
		this.destinations.push(new Phaser.Math.Vector2(this.x, this.y + 200));
		this.destinations.push(new Phaser.Math.Vector2(this.x, this.y));

		this.desiredAngles.push(0);
		this.desiredAngles.push(0);
		this.desiredAngles.push(0);
		this.desiredAngles.push(0);
	}
}