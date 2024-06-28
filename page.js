window.scrollTo(0,0)

let about = document.getElementById("about").getBoundingClientRect()
let skill = document.getElementById("skill").getBoundingClientRect()
let project = document.getElementById("projects").getBoundingClientRect()

let offset = (window.innerHeight * 0.1) - 15

document.getElementById("navHome").addEventListener("click", function() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  })
})

document.getElementById("navAbout").addEventListener("click", function() {
  window.scrollTo({
    top: about.y - offset,
    left: 0,
    behavior: "smooth"
  })
})

document.getElementById("navSkill").addEventListener("click", function() {
  window.scrollTo({
    top: skill.y - offset,
    left: 0,
    behavior: "smooth"
  })
})

document.getElementById("navProject").addEventListener("click", function() {
  window.scrollTo({
    top: project.y - offset,
    left: 0,
    behavior: "smooth"
  })
})








window.addEventListener("scroll", function() {
  let value = window.scrollY
  document.getElementsByClassName("left")[0].style.top = value * -0.2 + "px"


  let nav = document.getElementById("nav")
  
  if (value != 0) {
    nav.style.backgroundColor = "#0e1525"
    nav.style.borderBottom = "3px solid white"
  } 
  if (value <= 5) {
    nav.style.backgroundColor = ""
    nav.style.borderBottom = ""
  }
  
}, false)

// window.alert(window.scrollY)

let frames = document.getElementsByClassName("frame")

let text = document.getElementsByClassName("text")

let holder = document.getElementsByClassName("frameHolder")

let current = 0

for(let i = 0; i < frames.length-1; i++) {
  frames[i].id = i
  frames[i].addEventListener("click", function() {
    if(current != frames[i].id) {
      current = i
      text[current].style.display = "flex"
      text[behind()].style.display = "none"
      frames[behind()].style.display = "none"
      frames[infront()].style.display = "flex"
    }
  })
}

frames[frames.length-1].addEventListener("click", function() {
  current = 0
  frames[frames.length-1].style.display = "none"
  frames[frames.length-2].style.display = "none"
  frames[0].style.display = "flex"
  frames[1].style.display = "flex"
  text[0].style.display = "flex"
  text[text.length-1].style.display = "none"
})

function behind() {
  if (current-1 < 0) {
    return frames.length-1
  } else {
    return current-1
  }
}

function infront() {
  if (current+1 > frames.length-1) {
    return 0
  } else {
    return current+1
  }
}