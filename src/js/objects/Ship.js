
class Ship extends Phaser.GameObjects.Container {

	constructor(scene, x, y, texture) {
	
		super(scene, x, y);
		scene.add.existing(this);


		this.shipImage = scene.add.image(0, 0, texture)
			.setInteractive()
			.on('pointerdown', () => {
				this.scene.worldMan.selectShip(this);
			});

		this.highlight = scene.add.image(0, 0, texture + '_highlight')
			.setVisible(false);

		this.add([
			this.shipImage,
			this.highlight
		]);
	}

	select(bSelect = true) {

		this.highlight.setVisible(bSelect);
	}
}