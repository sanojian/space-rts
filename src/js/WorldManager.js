
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

	update() {

		for (let i = 0; i < this.ships.length; i++) {
			this.ships[i].update();
		}

		for (let i = 0; i < this.enemies.length; i++) {
			this.enemies[i].update();
		}
	}
}