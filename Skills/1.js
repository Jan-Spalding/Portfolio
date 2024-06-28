import * as THREE from "/Portfolio/Imports/three.module.js"

import {FBXLoader} from "/Portfolio/Imports/FBXLoader.js"
import {OrbitControls} from /Portfolio/Imports/OrbitControls.js"

let sceneONE, cameraONE, loaderONE, ambientLightONE, lightONE, rendererONE, orbitCameraONE, clockONE, modelONE

let width = document.getElementsByClassName("frame")[0].clientWidth
let height = document.getElementsByClassName("frame")[0].clientHeight


function initONE() {
  sceneONE = new THREE.Scene()
  sceneONE.background = (new THREE.Color("rgb(255, 255, 255)"))
  cameraONE = new THREE.PerspectiveCamera(90, width/ height, 0.1, 1000)

  

  loaderONE = new FBXLoader()
  loaderONE.load("/Models/AK-47.fbx", (fbx) => {
    modelONE = fbx
    fbx.scale.setScalar(0.0005)
    fbx.position.y -= Math.PI/2
    fbx.position.set(0,0,0)
    sceneONE.add(fbx)
  },
  (load) => {
    console.log((load.loaded / load.total) * 100 + "%") 
  },
  (error) => {
    console.log(error)
  })

  ambientLightONE = new THREE.AmbientLight(0xffffff, 0.3)
  sceneONE.add(ambientLightONE)

  lightONE = new THREE.PointLight(0xffffff, 0.5, 100) 
  lightONE.position.set(4,10,4) 
  sceneONE.add(lightONE)
  

  cameraONE.position.set(0,5,-10)
  cameraONE.lookAt(new THREE.Vector3(0,0,0))

  rendererONE = new THREE.WebGLRenderer()
  rendererONE.setSize(width, height)

  document.getElementsByClassName("frame")[0].appendChild(rendererONE.domElement)

  orbitCameraONE = new OrbitControls( cameraONE, rendererONE.domElement)

  clockONE = new THREE.Clock()

  animateONE()
}

function animateONE() {
  requestAnimationFrame(animateONE)

  if (modelONE) {
    modelONE.rotation.y += 0.01
  }
  
  
  rendererONE.render(sceneONE,cameraONE)
}

initONE()
