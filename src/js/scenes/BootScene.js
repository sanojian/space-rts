
/**
 * loading screen
 */

class BootScene extends Phaser.Scene {

	constructor() {
		super({
			key: 'boot'
		});
	}

	preload() {

	}

	
	create() {

		console.log('Space RTS v ' + DEFS.VERSION);

		this.load.on('complete', () => {

			this.scene.start('play');
		});

		this.loadAssets();
		
	}

	loadAssets() {

		this.load.image('ship_player', 'gfx/ship_player_1.png');
		this.load.image('ship_enemy', 'gfx/ship_enemy_1.png');
		this.load.image('ship_player_highlight', 'gfx/ship_player_1_highlight.png');

		this.load.start();

	}


}