

declare interface BootScene extends Phaser.Scene {
}

declare interface PlayScene extends Phaser.Scene {
}

declare interface Ship extends Phaser.GameObjects.Container {
	scene: PlayScene;
	
}


