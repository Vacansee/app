console.log('Sourced main.js');

setTimeout(function() { // await 1s start animation
	buildings.style.transition = "transform .2s, width .4s";
}, 1000);

const threshold = 4/5
var initX = lastX = window.innerWidth
var initY = lastY = window.innerHeight
var initRatio = lastRatio = initX / initY

var buildings = document.getElementById("buildings");


// default: landscape
if (initRatio < threshold) { // switch to portrait
	buildings.style.transform = "rotate(90deg)";	
	buildings.style.width = initY; 
}
else buildings.style.width = initX;
buildings.style.opacity = 1


/*              === DESIGN OBJECTIVES ===
1. Full map visible on start and transition between modes
2. scale preserved when screen shrunk beyond startup size
3. fills space when screen grown beyond startup size  */

function resizeCheck() {
	var x = window.innerWidth
	var y = window.innerHeight
	var ratio = x/y
	// isNarrowing = (ratio < lastRatio)
	// isWidening = (ratio > lastRatio) 
	

	if (ratio < threshold) { // portrait mode
		if (lastRatio >= threshold) {
			buildings.style.transform = "rotate(90deg)"; 
			buildings.style.width = initY; 
		}
		else if (y > initY) buildings.style.width = y; 
	}

	if (ratio > threshold) { // landscape mode
		if (lastRatio <= threshold) {
			buildings.style.transform = "rotate(0deg)"; 
			buildings.style.width = initX; 
		}
		else if (x > initX) buildings.style.width = x; 		
	 }
	
	lastX = x
	lastY = y
	lastRatio = ratio
}
 
 window.addEventListener("resize", resizeCheck)