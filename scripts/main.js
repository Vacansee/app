console.log('Sourced main.js')

const colors = [
	"#fdfedc",
	"#fef6c0",
	"#feeea4",
	"#fdd884",
	"#fdc675",
	"#fcad60",
	"#f99a57",
	"#f57948",
	"#eb6045",
	"#d7434b",
	"#c9314b",
	"#9e0041"
]

setTimeout(function() { // await 1s start animation
	map.style.transition = "transform .2s, width .4s"
}, 1000)

const threshold = 4/5
var initX = largestX = lastX = window.innerWidth
var initY = largestY = lastY = window.innerHeight
var initRatio = largestRatio = lastRatio = initX / initY

var map = document.getElementById("map")
var test = document.getElementById("test")
var mapBox = document.getElementById("map-container")
var popup = document.getElementById("popup")
nametag = document.getElementById("nametag")
popupName = document.getElementById("popup-name")

// default: landscape
if (initRatio < threshold) { // switch to portrait
	map.style.transform = "rotate(90deg)"
	test.style.transform = "rotate(-90deg)"
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
			test.style.transform = "rotate(-90deg)"
			map.style.width = y
		}
		else if (y > initY) map.style.width = y
	}

	if (ratio > threshold) { // landscape mode
		if (lastRatio <= threshold) {
			map.style.transform = "rotate(0deg)"
			test.style.transform = "rotate(0deg)"
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
		// mapBox.style.transform = "translateY(0px)"
		mapBox.style.transform = "scale(1)"
		popup.style.transform = "translateY(200px)"

	} catch { /* pass*/ }
})


var isFirst = false

for (const b of buildings) {
	var randColor = colors[Math.floor(Math.random() * colors.length)];
	b.style.fill = randColor
	b.addEventListener("mouseover", function() {
		window.onmousemove = function(c) {
			x = c.clientX
			y = c.clientY
			nametag.style.top = y - 50 + "px"
			tagWidth = nametag.getBoundingClientRect().width
			nametag.style.left = x - (tagWidth/2.2) + "px"

		}
		
		bringToFront(b)
		nametag.innerText=b.id.replace(/-/g, ' ')
		// Only show nametag on unselected buildings
		if (!b.classList.contains("selected")) nametag.style.opacity = 1
		
	})
	b.addEventListener("mouseleave", function() {
		nametag.style.opacity = 0
	})
	b.addEventListener("click", function(c) {
		x = c.clientX
		console.log(x)
		y = c.clientY
		console.log(y)
		console.log(b.getBoundingClientRect())
		try {
			last = document.querySelector(".selected")
			last.classList.remove('selected')
		} catch { isFirst = true }
		finally { 
			b.classList.add("selected")
			popupName.innerText=b.id.replace(/-/g, ' ') + " ›"
			console.log(isFirst)
			if (!isFirst) {
				mapBox.style.transition = "all .5s"	
				mapBox.style.transformOrigin = 'translate(' + x + 'px,' + y + 'px)'
			} else {
				mapBox.style.transition = "transform .5s, scale .5s, transform-origin 0s"
			}
			// mapBox.style.transform = "translateY(-100px)"
			mapBox.style.transform = "scale(2)"
			mapBox.style.transformOrigin = x + "px " + y + "px"
			popup.style.transform = "translateY(0px)"

			nametag.style.opacity = 0 // hide nametag when building selected

			isFirst = false

		}
	})
}
 
 window.addEventListener("resize", resizeCheck)