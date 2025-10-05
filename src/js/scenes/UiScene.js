
/**
 * ui scene
 */

class UiScene extends Phaser.Scene {

	constructor() {
		super({
			key: 'ui'
		});

	}
	create() {

		const canvasW = this.sys.game.canvas.width;
		const canvasH = this.sys.game.canvas.height;

		// fps counter
		const fpsStyle = {
			font: '12pt Courier',
			fill: "#fff",
			wordWrapWidth: canvasW - 20
		};
		this.frame = 0;
		this.fpsText = this.add.text(canvasW - 24, canvasH - 32, 'fps' + DEFS.VERSION, fpsStyle)
			.setOrigin(1, 0.5);		


	}


	update() {

		if (this.frame % GLOBAL.fpsThrottle === 0) {
			this.fpsText.setText('fps: ' + this.game.loop.actualFps.toFixed(0) + '\nv.' + DEFS.VERSION)
		}

		this.frame++;

	}


}