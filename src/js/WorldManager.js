
class WorldManager {

	constructor(scene) {

		this.scene = scene;


		this.ships = [];
		this.enemies = [];
	}

	selectShip(ship) {

		for (let i = 0; i < this.ships.length; i++) {
			this.ships[i].select(false);
		}

		ship.select();
		
	}

	setDestination(x, y) {

		for (let i = 0; i < this.ships.length; i++) {
			const ship = this.ships[i];

			if (ship.isSelected()) {
				ship.setDestination(x, y);
			}
		}

	}

	setDesiredAngle(angle) {

		for (let i = 0; i < this.ships.length; i++) {
			const ship = this.ships[i];

			if (ship.isSelected()) {
				ship.setDesiredAngle(angle);
			}
		}
		
	}

	drawPlayfield() {

		this.scene.playfield.clear();

		// commands in progress
		if (this.scene.playfield.data.get('isDrawing')) {

			const currentPoint = this.scene.playfield.data.get('currentPoint');

			this.scene.playfield.moveTo(currentPoint.x, currentPoint.y);
			this.scene.playfield.lineTo(this.scene.input.activePointer.x, this.scene.input.activePointer.y);

			this.scene.playfield.strokePath();
		}

		// active commands
		for (let i = 0; i < this.ships.length; i++) {
			const ship = this.ships[i];

			if (ship.destinations.length || ship.desiredAngles.length) {
				
				const x = (ship.destinations.length ? ship.destinations[0].x : ship.x) - this.scene.cameras.main.scrollX;
				const y = (ship.destinations.length ? ship.destinations[0].y : ship.y) - this.scene.cameras.main.scrollY;

				const angle = ship.desiredAngles.length ?  ship.desiredAngles[0] : ship.rotation;

				this.scene.playfield.moveTo(x, y);
				this.scene.playfield.lineTo(x + 60 * Math.cos(angle), y + 60 * Math.sin(angle));

				this.scene.playfield.strokePath();

			}
		}

	}


	update() {

		for (let i = 0; i < this.ships.length; i++) {
			this.ships[i].update();
		}

		for (let i = 0; i < this.enemies.length; i++) {
			this.enemies[i].update();
		}

		this.drawPlayfield();
	}
}