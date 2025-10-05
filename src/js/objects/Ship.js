
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
		this.targetShip = undefined;

	}

	setDestination(x, y) {

		this.destinations = [ new Phaser.Math.Vector2(x, y) ];

		this.shipTargeting = undefined;

	}

	setDesiredAngle(angle) {

		if (angle === undefined) {
			// use existing angle
			angle = this.rotation;
		}
		this.desiredAngles = [ angle ];

		this.shipTargeting = undefined;
	}

	setTarget(enemy) {

		const x = this.destinations.length ? this.destinations[0].x : this.x;
		const y = this.destinations.length ? this.destinations[0].y : this.y;

		// clear existing waypoints
		this.destinations = [];
		this.desiredAngles = [];

		this.shipTargeting = {
			enemy: enemy,
			dx: x - enemy.x,
			dy: y - enemy.y,
			angle: Phaser.Math.Angle.Between(x, y, enemy.x, enemy.y)
		};

	}

	update() {

		let arrived = false;
		let rotated = false;

		if (this.shipTargeting) {

			const destination = this.destinations.length ? this.destinations[0] : new Phaser.Math.Vector2(0, 0);

			destination.x = this.shipTargeting.enemy.x + this.shipTargeting.dx;
			destination.y = this.shipTargeting.enemy.y + this.shipTargeting.dy;

			if (this.destinations.length == 0) {
				this.destinations.push(destination);
			}

			if (this.desiredAngles.length == 0) {
				this.desiredAngles.push(this.shipTargeting.angle);
			} 
			else {
				this.desiredAngles[0] = this.shipTargeting.angle;
			}
		}

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