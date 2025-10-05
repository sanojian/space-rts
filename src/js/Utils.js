GLOBAL.Utils = {

	arrayRotate(arr) {
		const newArray = new Array();

		for (let j = 0; j < arr[0].length; j++) {
			newArray.push([]);
			for (let i = arr.length - 1; i > -1; i--) {
				newArray[j].push(arr[i][j]);
			};
		};

		return newArray;
	},

	getFont(size) {

		return size + "px " + DEFS.FONT;
	},

	twoDigit(num) {

		return (num < 10 ? '0' : '') + num;
	},

	// Fisher–Yates (aka Knuth) Shuffle
	shuffleArray(array) {
		let currentIndex = array.length;

		// While there remain elements to shuffle...
		while (currentIndex != 0) {

			// Pick a remaining element...
			let randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
		}
	},

	capitalize(str) {
		const splitStr = str.toLowerCase().split(' ');
		for (let i = 0; i < splitStr.length; i++) {
			splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
		}
		return splitStr.join(' '); 
	},
	
	readUrlParams() {

		const params = new Proxy(new URLSearchParams(window.location.search), {
			get: (searchParams, prop) => searchParams.get(prop),
		});

		return params;
	},

	resizeLabel(label, size) {

		if (label.displayWidth > size) {
			label.setFont(GLOBAL.Utils.getFont(Math.floor(26 * size / label.displayWidth)));
		}
			
	},

	lineInterceptsCircle: function(circleP, radius, lineP1, lineP2){
		var a, b, c, d, u1, u2, ret, retP1, retP2, v1, v2;
		v1 = {x: 0, y: 0};
		v2 = {x: 0, y: 0};
		v1.x = lineP2.x - lineP1.x;
		v1.y = lineP2.y - lineP1.y;
		v2.x = lineP1.x - circleP.x;
		v2.y = lineP1.y - circleP.y;
		b = (v1.x * v2.x + v1.y * v2.y);
		c = 2 * (v1.x * v1.x + v1.y * v1.y);
		b *= -2;
		d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - radius * radius));
		if(isNaN(d)){ // no intercept
			return false;
		}
		return true;
	},

	normalizeAngle(angle) {
		angle = angle % (2 * Math.PI);
		return angle < 0 ? angle + 2 * Math.PI : angle;
	},

	// specidal modulo without signed return
	mod(a, n) {
		return (a % n + n) % n;
	},

	getDeltaAngle(current, target ) {

		let diff = target - current;
		while (diff < -Math.PI) {
			diff += Math.PI * 2;
		}
		while (diff > Math.PI) {
			diff -= Math.PI / 2;
		}

		return diff;
  	}

	
};