const threshold = 1
var lastRatio = lastX / lastY
var test = document.getElementById("test")


window.addEventListener("resize", resizeCheck)

// default: landscape
if (lastRatio < threshold) { // switch to portrait
	map.style.transform = "rotate(90deg)"
	test.style.transform = "rotate(-90deg)"
	map.style.width = lastY
}
else map.style.width = lastX


function resizeCheck() {
	var x = window.innerWidth
	var y = window.innerHeight
	var ratio = x/y
	

	if (ratio < threshold) { // portrait mode
		if (lastRatio >= threshold) {
			map.style.transform = "rotate(90deg)" 
			test.style.transform = "rotate(-90deg)"
			map.style.width = y
		}
		else if (y > lastY) map.style.width = y
	}

	if (ratio > threshold) { // landscape mode
		if (lastRatio <= threshold) {
			map.style.transform = "rotate(0deg)"
			test.style.transform = "rotate(0deg)"
			map.style.width = x
		}
		else if (x > lastX) map.style.width = x
	 }
	
	lastX = x
	lastY = y
	lastRatio = ratio
}
 