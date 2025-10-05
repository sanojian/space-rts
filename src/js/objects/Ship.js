
class Ship extends Phaser.GameObjects.Container {

	constructor(scene, x, y, texture) {
	
		super(scene, x, y);
		scene.add.existing(this);

		this.shipImage = scene.add.image(0, 0, texture);

		this.add([
			this.shipImage
		]);


		this.speed = 3;
		this.angularSpeed = 0.01;
		
		this.destinations = [];
		this.desiredAngles = [];

	}

	setDestination(x, y) {

		this.destinations = [ new Phaser.Math.Vector2(x, y) ];

	}

	setDesiredAngle(angle) {

		this.desiredAngles = [ angle ];

	}

	update() {

		let arrived = false;
		let rotated = false;

		if (this.destinations.length) {

			const destination = this.destinations[0];
			const dist = Phaser.Math.Distance.BetweenPoints(this, destination);

			if (dist < this.speed) {
				// arrived
				this.setPosition(destination.x, destination.y);
				arrived = true;
			}
			else {
				// move towards destination
				const angle = Phaser.Math.Angle.BetweenPoints(this, destination);

				this.setPosition(
					this.x + this.speed * Math.cos(angle),
					this.y + this.speed * Math.sin(angle),
				);
			}

		}

		if (this.desiredAngles.length) {

			const desiredAngle = this.desiredAngles[0];
			const diff = GLOBAL.Utils.getDeltaAngle(this.rotation, desiredAngle);

			if (Math.abs(diff) < this.angularSpeed) {
				// angle achieved
				this.setRotation(desiredAngle);
				rotated = true;
			}
			else {
				// rotate
				this.setRotation(this.rotation + Math.sign(diff) * this.angularSpeed);
			}
		}

		if (arrived && rotated) {
			// remove waypoint
			this.destinations.shift();
			this.desiredAngles.shift();
		}

	}
}