
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
		this.destination = undefined;
		this.desiredAngle = undefined;

	}

	setDestination(x, y) {

		this.destination = new Phaser.Math.Vector2(x, y);

	}

	setDesiredAngle(angle) {

		this.desiredAngle = angle;

	}

	update() {

		if (this.destination) {

			const dist = Phaser.Math.Distance.BetweenPoints(this, this.destination);

			if (dist < this.speed) {
				// arrived
				this.setPosition(this.destination.x, this.destination.y);
				delete this.destination;
			}
			else {
				// move towards destination
				const angle = Phaser.Math.Angle.BetweenPoints(this, this.destination);

				this.setPosition(
					this.x + this.speed * Math.cos(angle),
					this.y + this.speed * Math.sin(angle),
				);
			}

		}

		if (this.desiredAngle !== undefined) {

			const diff = GLOBAL.Utils.getDeltaAngle(this.rotation, this.desiredAngle);

			if (Math.abs(diff) < this.angularSpeed) {
				// angle achieved
				this.setRotation(this.desiredAngle);
				delete this.desiredAngle;
			}
			else {
				// rotate
				this.setRotation(this.rotation + Math.sign(diff) * this.angularSpeed);
			}
		}

	}
}