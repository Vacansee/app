console.log('Sourced main.js')

setTimeout(function() { // await 1s start animation
	map.style.transition = "transform .2s, width .4s"
}, 1000)

const threshold = 4/5
var initX = largestX = lastX = window.innerWidth
var initY = largestY = lastY = window.innerHeight
var initRatio = largestRatio = lastRatio = initX / initY

var map = document.getElementById("map")
var mapBox = document.getElementById("map-container")
var drawer = document.getElementById("drawer")

console.log(mapBox)



// default: landscape
if (initRatio < threshold) { // switch to portrait
	map.style.transform = "rotate(90deg)"
	map.style.width = initY 
}
else map.style.width = initX
map.style.opacity = 1


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
			map.style.transform = "rotate(90deg)" 
			map.style.width = y
		}
		else if (y > initY) map.style.width = y
	}

	if (ratio > threshold) { // landscape mode
		if (lastRatio <= threshold) {
			map.style.transform = "rotate(0deg)"
			map.style.width = x
		}
		else if (x > initX) map.style.width = x
	 }
	
	lastX = x
	lastY = y
	lastRatio = ratio
}

// move SVG path to bottom of parent
function bringToFront(b) {  
	let group = b.parentNode
	group.appendChild(b)
  }
  

var buildings = document.getElementById("buildings").children
var bg = document.getElementById("bg")

bg.addEventListener("click", function() {
	try {
		sel = document.querySelector(".selected")
		sel.classList.remove('selected')
		mapBox.style.transform = "translateY(0px)"
		drawer.style.transform = "translateY(200px)"
	}	
	catch { console.log("Nothing to deselect") }
})

for (const b of buildings) {
	nametag = document.getElementById("nametag")
	// console.log(b.id)
	b.addEventListener("mouseover", function() {
		window.onmousemove = function(c) {
			x = c.clientX
			y = c.clientY
			nametag.style.top = y - 50 + "px"
			tagWidth = nametag.getBoundingClientRect().width
			nametag.style.left = x - (tagWidth/1.8) + "px"

		}
		
		bringToFront(b)
		nametag.innerText=b.id.replace(/-/g, ' ')
		// Only show nametag on unselected buildings
		if (!b.classList.contains("selected")) nametag.style.opacity = 1
		
	})
	b.addEventListener("mouseleave", function() {
		nametag.style.opacity = 0
	})
	b.addEventListener("click", function() {
		try {
			last = document.querySelector(".selected")
			last.classList.remove('selected')
		}
		catch { console.log("First element selected") }
		finally { 
			b.classList.add("selected")
			mapBox.style.transform = "translateY(-100px)"
			drawer.style.transform = "translateY(0px)"

			nametag.style.opacity = 0 // hide nametag when building selected

		}
	})
}
 
 window.addEventListener("resize", resizeCheck)