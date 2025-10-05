
class WorldManager {

	constructor(scene) {

		this.scene = scene;

		this.ships = [];
	}

	selectShip(ship) {

		for (let i = 0; i < this.ships.length; i++) {

			this.ships[i].select(false);
		}

		ship.select();
		
	}

	update() {

		for (let i = 0; i < this.ships.length; i++) {

			this.ships[i].update();
		}
	}
}