import * as THREE from "./Imports/three.module.js"
import { EffectComposer } from './Imports/EffectComposer.js';
import { RenderPass } from './Imports/RenderPass.js';
import { UnrealBloomPass } from './Imports/UnrealBloomPass.js';


let scene, camera, renderer, meshCube, ambientLight, light, composer

let elements = []

function init() {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1, 2000) ;


  meshCube = new THREE.Mesh(
    new THREE.TorusGeometry( 10, 3, 16, 50 ),
    new THREE.MeshBasicMaterial({color:0xffffff, wireframe:true})
  );

  meshCube.position.y -= 3.8;
  meshCube.castShadow = true;
  meshCube.receiveShadow = true
  scene.add(meshCube)

  ambientLight = new THREE.AmbientLight(0xffffff, 1)
  scene.add(ambientLight)

  light = new THREE.PointLight(0xffffff, 1, 200)

  light.position.set(-3, 2, -3)
  light.castShadow = true;
  light.shadow.camera.near = 0.1
  light.shadow.camera.far = 25
  scene.add(light)

  camera.position.set(-10, -3, -10)
  camera.lookAt(new THREE.Vector3(135, 1.8 ,-10 ))
  
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setClearColor( 0x000000, 0 );
  renderer.setSize(window.innerWidth, window.innerHeight);

  // renderer.setSize(300, 200)

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;

  const renderScene = new RenderPass( scene, camera );


  const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
  bloomPass.threshold = 0
  bloomPass.strength = 1.1
  bloomPass.radius = 0

  composer = new EffectComposer( renderer );
  composer.addPass( bloomPass );
  composer.addPass( renderScene );

  document.getElementById("home").appendChild(renderer.domElement);
  renderer.domElement.style.position = "absolute"

  for (let i = 0; i < 50; i++) {
    let newMesh = new THREE.Mesh(
      new THREE.SphereGeometry( 0.3, 12, 8 ),
      new THREE.MeshBasicMaterial({color:0x242a3c, wireframe:true})
    );

    newMesh.position.set(Math.floor(Math.random() * -20), Math.floor(Math.random() * 20) - 5, Math.floor(Math.random() * -20));

    // scene.add(newMesh)
    elements.push(newMesh)
  }

  animate()
}

function animate() {
  requestAnimationFrame(animate);

  for (let i = 0; i < elements.length; i++) {
    elements[i].rotation.y += 0.01
  }
  
  meshCube.rotation.x += 0.002;
  meshCube.rotation.y += 0.005;

  meshCube.position.y += Math.sin(Date.now() / 500) / 20

  const c1 = new THREE.Color(1, 0, 0)
  const c2 = new THREE.Color(0, 0, 1)
  const sphereColour = c1.lerp(c2, Math.sin(Date.now()/ 700) *0.5 + 0.5)

  meshCube.material.color.set(sphereColour) 

  renderer.render(scene, camera)
  composer.render();
}

window.onload = init

window.addEventListener("scroll", function() {
  let value = window.scrollY

  meshCube.position.y = (value / 40)
})

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}
    
window.addEventListener("resize", onWindowResize)

for (let i = 0; i < document.getElementsByClassName("editMore").length; i++) {
  document.getElementsByClassName("editMore")[i].addEventListener("click", function() {
    location.href = "./editing.html"
  })
}