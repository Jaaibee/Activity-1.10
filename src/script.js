import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()
const gui = new dat.GUI()

const material = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  wireframe: true,
  metalness: 0.4,
  roughness: 0.3
})

const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1, 50, 50, 50), material)
const cone = new THREE.Mesh(new THREE.ConeGeometry(0.6, 1.2, 64, 64), material)
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.6, 64, 64), material)

box.position.x = -2
sphere.position.x = 2
scene.add(box, cone, sphere)

scene.add(new THREE.AmbientLight(0xffffff, 0.5))
const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.set(2, 3, 4)
scene.add(pointLight)

gui.add(material, 'metalness', 0, 1, 0.001)
gui.add(material, 'roughness', 0, 1, 0.001)

const sizes = { width: window.innerWidth, height: window.innerHeight }
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 4
scene.add(camera)

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

function tick() {
  const t = performance.now() / 1000
  box.rotation.y = cone.rotation.y = sphere.rotation.y = t * 0.3
  box.rotation.x = cone.rotation.x = sphere.rotation.x = t * 0.15
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}
tick()
    