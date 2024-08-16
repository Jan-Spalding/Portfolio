import * as THREE from "../Imports/three.module.js"

import {FBXLoader} from "../Imports/FBXLoader.js"
import {OrbitControls} from "../Imports/OrbitControls.js"

let sceneTHREE, cameraTHREE, loaderTHREE, ambientLightTHREE, lightTHREE, rendererTHREE, orbitCameraTHREE, clockTHREE, modelTHREE

let width = document.getElementsByClassName("frame")[2].clientWidth
let height = document.getElementsByClassName("frame")[2].clientHeight

console.log(width)


function initTHREE() {
  console.log("this is working")
  sceneTHREE = new THREE.Scene()
  sceneTHREE.background = (new THREE.Color("rgb(255, 255, 255)"))
  cameraTHREE = new THREE.PerspectiveCamera(90, width/ height, 0.1, 1000)

  

  loaderTHREE = new FBXLoader()
  loaderTHREE.load("../Models/boat.fbx", (fbx) => {
    modelTHREE = fbx
    fbx.scale.setScalar(0.007)
    fbx.position.y -= Math.PI/2
    fbx.rotation.z += Math.PI/2
    fbx.position.set(0,0,0)
    sceneTHREE.add(fbx)
  },
  (load) => {
    console.log((load.loaded / load.total) * 100 + "%") 
  },
  (error) => {
    console.log(error)
  })

  ambientLightTHREE = new THREE.AmbientLight(0xffffff, 0.3)
  sceneTHREE.add(ambientLightTHREE)

  lightTHREE = new THREE.PointLight(0xffffff, 0.5, 100) 
  lightTHREE.position.set(4,10,-5) 
  sceneTHREE.add(lightTHREE)
  

  cameraTHREE.position.set(0,5,-10)
  cameraTHREE.lookAt(new THREE.Vector3(0,0,0))

  rendererTHREE = new THREE.WebGLRenderer()
  rendererTHREE.setSize(width, height)

  document.getElementsByClassName("frame")[2].appendChild(rendererTHREE.domElement)

  orbitCameraTHREE = new OrbitControls( cameraTHREE, rendererTHREE.domElement)

  clockTHREE = new THREE.Clock()

  animateTHREE()
}

function animateTHREE() {
  requestAnimationFrame(animateTHREE)

  if (modelTHREE) {
    modelTHREE.rotation.y += 0.01
  }
  
  
  rendererTHREE.render(sceneTHREE,cameraTHREE)
}

initTHREE()
