/**
 * global dynamic variables
 */

const GLOBAL = {

	state: DEFS.STATES.LOADING,
	
	fpsThrottle: 60,
	fpsValues: [],
	animPostfix: '',

	lang: 'EN',

	seed: Date.now(),

	changeState(newState) {

		// for debug
		for (let key in DEFS.STATES) {
			if (newState == DEFS.STATES[key]) {
				console.log(key);
			}
		}

		GLOBAL.state = newState;
	}

};