
class PlayerShip extends Ship {

	constructor(scene, x, y) {

		super(scene, x, y, 'ship_player');


		this.shipImage
			.setInteractive()
			.on('pointerdown', () => {
				this.scene.worldMan.selectShip(this);
			});


		this.highlight = scene.add.image(0, 0, 'ship_player_highlight')
			.setVisible(false);

		this.add(this.highlight);

	}

	select(bSelect = true) {

		this.highlight.setVisible(bSelect);
	}

	isSelected() {
		return this.highlight.visible;
	}
	
}