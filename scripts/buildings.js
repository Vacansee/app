var buildings = document.getElementById("buildings").children
var mapBox = document.getElementById("map-container")

var nametag = document.getElementById("nametag")
var popupName = document.getElementById("popup-name")
var popup = document.getElementById("popup")

var mask = document.getElementById("mask")
var bg = document.getElementById("bg")

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
	"#9e0041",
]

setTimeout(function() { // await 1s start animation
	map.style.transition = "transform .2s, width .4s"
}, 1000)


// move SVG path to bottom of parent; called on hover
function bringToFront(b) {  
	let group = b.parentNode
	group.appendChild(b)
}

map.style.opacity = 1
mask.style.opacity = 0

mask.addEventListener("click", function() {
	try {
		// deselect
		let sel = document.querySelector(".selected")
		sel.classList.remove('selected')
		// mapBox.style.transform = "translateY(0px)"
		mapBox.style.transform = "scale(1)"
		popup.style.transform = "translateY(200px)"
		mask.style.pointerEvents = "none"
		mask.style.opacity = 0

	} catch { /* pass*/ }
})

var unselected = false

for (const b of buildings) {
	if (b.id == "mask") continue
	var randColor = colors[Math.floor(Math.random() * colors.length)];
	b.style.fill = randColor
	b.addEventListener("mouseover", function() {
		window.onmousemove = function(c) {
			clickX = c.clientX
			clickY = c.clientY
			nametag.style.top = clickY - 50 + "px"
			tagWidth = nametag.getBoundingClientRect().width
			nametag.style.left = clickX - (tagWidth/2.2) + "px"

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
		clickX = c.clientX
		clickY = c.clientY
		var bBox =  b.getBoundingClientRect()
		var boxCenterX = bBox.x + bBox.width/2
		var boxCenterY = bBox.y + bBox.height/2

		try {
			last = document.querySelector(".selected")
			last.classList.remove('selected')
		}
		catch { unselected = true }
		finally { 
			b.classList.add("selected")
			popupName.innerText=b.id.replace(/-/g, ' ') + " ›"
			nametag.style.opacity = 0 // hide nametag when building selected

			if (unselected) {
				let group = b.parentNode
				group.appendChild(mask)
				group.appendChild(b)
				mask.style.opacity = 0.6
				mask.style.pointerEvents = "inherit"

				mapBox.style.transform = `scale(3) translate(${lastX/2 - boxCenterX}px, ${lastY/2 - boxCenterY - 50}px)`
				popup.style.transform = "translateY(0px)"
				unselected = false
			}
		}
	})
}