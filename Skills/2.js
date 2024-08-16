import * as THREE from "../Imports/three.module.js"

import {FBXLoader} from "../Imports/FBXLoader.js"
import {OrbitControls} from "../Imports/OrbitControls.js"

let sceneTWO, cameraTWO, loaderTWO, ambientLightTWO, lightTWO, rendererTWO, orbitCameraTWO, clockTWO, modelTWO

let width = document.getElementsByClassName("frame")[1].clientWidth
let height = document.getElementsByClassName("frame")[1].clientHeight


function initTWO() {
  sceneTWO = new THREE.Scene()
  sceneTWO.background = (new THREE.Color("rgb(255, 255, 255)"))
  cameraTWO = new THREE.PerspectiveCamera(90, width/ height, 0.1, 1000)

  

  loaderTWO = new FBXLoader()
  loaderTWO.load("../Models/boat.fbx", (fbx) => {
    modelTWO = fbx
    fbx.scale.setScalar(0.007)
    fbx.position.y -= Math.PI/2
    fbx.rotation.z += Math.PI/2
    console.log(fbx.wireframe)
    fbx.wireframe = true
    fbx.position.set(0,0,0)
    sceneTWO.add(fbx)
  },
  (load) => {
    console.log((load.loaded / load.total) * 100 + "%") 
  },
  (error) => {
    console.log(error)
  })

  ambientLightTWO = new THREE.AmbientLight(0xffffff, 0.3)
  sceneTWO.add(ambientLightTWO)

  lightTWO = new THREE.PointLight(0xffffff, 0.5, 100) 
  lightTWO.position.set(4,10,-5) 
  sceneTWO.add(lightTWO)
  

  cameraTWO.position.set(0,5,-10)
  cameraTWO.lookAt(new THREE.Vector3(0,0,0))

  rendererTWO = new THREE.WebGLRenderer()
  rendererTWO.setSize(width, height)

  document.getElementsByClassName("frame")[1].appendChild(rendererTWO.domElement)

  orbitCameraTWO = new OrbitControls( cameraTWO, rendererTWO.domElement)

  clockTWO = new THREE.Clock()

  animateTWO()
}

function animateTWO() {
  requestAnimationFrame(animateTWO)

  if (modelTWO) {
    modelTWO.rotation.y += 0.01
  }
  
  
  rendererTWO.render(sceneTWO,cameraTWO)
}

initTWO()
