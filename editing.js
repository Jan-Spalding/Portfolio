let data = document.getElementsByClassName("data")
let lines = document.getElementsByClassName("line")

for (let i = 0; i < data.length; i++) {
  lines[i].style.height = data[i].getBoundingClientRect().height + 20 + "px"
}

document.addEventListener("resize", function() {
  data = document.getElementsByClassName("data")
  lines = document.getElementsByClassName("line")
  for (let i = 0; i < data.length; i++) {
    lines[i].style.height = data[i].getBoundingClientRect().height + 20 + "px"
  }
}) 

document.getElementById("navHome").addEventListener("click", function() {
  location.href = "./"
})

document.getElementById("toTop").addEventListener("click", function() {
  window.scrollTo({top:0, behavior:"smooth"})
})

document.getElementById("toBottom").addEventListener("click", function() {
  bottom = data = document.getElementsByClassName("data")[0].getBoundingClientRect().bottom
  window.scrollTo({top:bottom, behavior: "smooth"})
})

let places = document.getElementsByClassName("data")

document.getElementById("navLine").addEventListener("click", function(event) {
  window.scrollTo({
    top: places[findVideo(event)].getBoundingClientRect().top,
    behavior: "smooth"
  })
})

document.getElementById("navLine").addEventListener("mousemove", function(event) {
  document.getElementById("selectTitle").innerHTML = places[findVideo(event)].children[0].innerHTML
  document.getElementById("selectDate").innerHTML = places[findVideo(event)].parentElement.children[0].children[0].innerHTML
  console.log(findVideo(event))
})


function findVideo(event) {
  let value = document.getElementById("navLine").getBoundingClientRect()

  let per = (event.pageX - value.left) / (value.right - value.left) * 100
  // console.log(per)

  places = document.getElementsByClassName("data")

  let add = 100 / places.length
  for (let i = places.length-1; i >= -1; i--) {
    if (per < add) {
      return i;
    }
    add += 100 / places.length
  }

  // console.log(add)
}