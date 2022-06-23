import './style.scss'
import * as THREE from 'three'
// import * as dat from 'lil-gui'
import gsap from 'gsap'
import * as Tone from 'tone'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

import fragmentShader1 from './shaders/fragment1.glsl'
import fragmentShader2 from './shaders/fragment2.glsl'

import firefliesVertexShader from './shaders/firefliesVertex.glsl'
import firefliesFragmentShader from './shaders/firefliesFragment.glsl'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'



import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const sampler = new Tone.Sampler({
	urls: {
		A1: "mixkit-cartoon-animal-crying-in-pain-2.wav",
		A2: "mixkit-cartoon-insect-complain-32.wav",
    A3: "mixkit-cartoon-little-cat-meow-91.wav",
    A4: "mixkit-cartoon-monkey-mocking-and-giggling-108.wav",
    A5: "mixkit-cow-single-moo-1747.wav",
    B1: "mixkit-domestic-cat-hungry-meow-45.wav",
    B2: "mixkit-jungle-ape-sound-2419.wav" ,
    B3: "mixkit-little-cat-attention-meow-86.wav",
    B4: "mixkit-wolf-creature-howling-roar-1777.wav"
	},

}).toDestination();

let notes = ['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'B2', 'B3', 'B4']

const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()


const loadingBarElement = document.querySelector('.loading-bar')
const loadingBarText = document.querySelector('.loading-bar-text')
const loadingManager = new THREE.LoadingManager(
  // Loaded
  () =>{
    window.setTimeout(() =>{
      gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 5, value: 0, delay: 2 })

      loadingBarElement.classList.add('ended')
      loadingBarElement.style.transform = ''

      loadingBarText.classList.add('fade-out')

    }, 500)
  },

  // Progress
  (itemUrl, itemsLoaded, itemsTotal) =>{
    const progressRatio = itemsLoaded / itemsTotal
    loadingBarElement.style.transform = `scaleX(${progressRatio})`

  }
)

const gtlfLoader = new GLTFLoader(loadingManager)

const textureLoader = new THREE.TextureLoader(loadingManager)

const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
const overlayMaterial = new THREE.ShaderMaterial({
  depthWrite: false,
  uniforms:
    {
      uAlpha: { value: 1 }
    },
  transparent: true,
  vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
  fragmentShader: `
  uniform float uAlpha;
        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
    `
})

const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
scene.add(overlay)

console.log(overlay)


//Models

const ruinTexture = textureLoader.load('bake4.jpg')

ruinTexture.flipY = false
ruinTexture.encoding = THREE.sRGBEncoding







const ruinMaterial = new THREE.MeshBasicMaterial({ map: ruinTexture,
  side: THREE.FrontSide, skinning: false})


  const monkeyMaterial = new THREE.MeshBasicMaterial({ map: ruinTexture,
    side: THREE.FrontSide, skinning: true})


      const lizardMaterial = new THREE.MeshBasicMaterial({ map: ruinTexture,
        side: THREE.FrontSide, skinning: true})


          const snakeMaterial = new THREE.MeshBasicMaterial({ map: ruinTexture,
            side: THREE.FrontSide, skinning: true})







  const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true,
    depthWrite: true,
    clipShadows: true,
    wireframe: false,
    side: THREE.FrontSide,
    uniforms: {
      uFrequency: {
        value: new THREE.Vector2(10, 5)
      },
      uTime: {
        value: 0
      },
      uValueA: {
        value: Math.random()
      },
      uValueB: {
        value: Math.random()
      },
      uValueC: {
        value: Math.random()
      },
      uValueD: {
        value: 9
      },
      uValueAlpha: {
      value: 1
    }
    }
  })

  const shaderMaterial1 = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader1,
    transparent: true,
    depthWrite: true,
    clipShadows: true,
    wireframe: false,
    side: THREE.FrontSide,
    uniforms: {
      uFrequency: {
        value: new THREE.Vector2(10, 5)
      },
      uTime: {
        value: 0
      },
      uValueA: {
        value: Math.random()
      },
      uValueB: {
        value: Math.random()
      },
      uValueC: {
        value: Math.random()
      },
      uValueD: {
        value: 9
      },
      uValueAlpha: {
      value: 1
    }
    }
  })

  const shaderMaterial2 = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader2,
    transparent: true,
    depthWrite: true,
    clipShadows: true,
    wireframe: false,
    side: THREE.FrontSide,
    uniforms: {
      uFrequency: {
        value: new THREE.Vector2(10, 5)
      },
      uTime: {
        value: 0
      },
      uValueA: {
        value: Math.random()
      },
      uValueB: {
        value: Math.random()
      },
      uValueC: {
        value: Math.random()
      },
      uValueD: {
        value: 9
      },
      uValueAlpha: {
      value: 1
    }
    }
  })



let materialsArr = [shaderMaterial, shaderMaterial1, shaderMaterial2]

let sceneGroup, ruin, pool, pool1, pool2, snake, monkey, lizard, animalsArr, mixer, gltfVar

let coverArr = []
gtlfLoader.load(
  'ancient2.glb',
  (gltf) => {
    // gltf.scene.scale.set(0.5,0.5,0.5)
    gltfVar = gltf
    sceneGroup = gltf.scene
    sceneGroup.needsUpdate = true
    sceneGroup.position.y -= 1
    // sceneGroup.position.z -= .5
    scene.add(sceneGroup)
    console.log(gltf)
    console.log(sceneGroup)


    ruin = gltf.scene.children.find((child) => {
      return child.name === 'ruins'
    })

    pool = gltf.scene.children.find((child) => {
      return child.name === 'pool'
    })

    pool1 = gltf.scene.children.find((child) => {
      return child.name === 'pool2'
    })

    pool2 = gltf.scene.children.find((child) => {
      return child.name === 'pool3'
    })

    snake = gltf.scene.children.find((child) => {
      return child.name === 'snake'
    })

    lizard = gltf.scene.children.find((child) => {
      return child.name === 'lizard'
    })

    monkey = gltf.scene.children.find((child) => {
      return child.name === 'monkey'
    })



    console.log(monkey)


    ruin.material = ruinMaterial
    //
    pool.material = shaderMaterial

    pool1.material = shaderMaterial1

    pool2.material = shaderMaterial2
    //
    monkey.children[1].material = monkeyMaterial
    monkey.children[1].frustumCulled = false;

    lizard.children[1].material = lizardMaterial
      lizard.children[1].frustumCulled = false;

    snake.children[1].material = snakeMaterial
      snake.children[1].frustumCulled = false;



    animalsArr = [monkey.children[1], lizard.children[1], snake.children[1]]
    console.log(animalsArr)


  }
)

document.querySelector('#titular').addEventListener('click', (e) => {
materialsArr.map(x=> {
  x.uniforms.uValueA.value =  Math.random()
  x.uniforms.uValueB.value =  Math.random()
  x.uniforms.uValueC.value =  Math.random()

  
})

})


//Lights
const directionalLight = new THREE.DirectionalLight('#ffffff')
directionalLight.position.set(1,1,0)
scene.add(directionalLight)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */

 // group

 const cameraGroup = new THREE.Group()
 scene.add(cameraGroup)
// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 7
scene.add(camera)


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.maxPolarAngle = Math.PI / 2 - 0.1
//controls.enableZoom = false;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: false
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

renderer.domElement.addEventListener( 'pointerdown', onClick, false )


function onClick() {
  event.preventDefault()

  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1
  raycaster.setFromCamera( mouse, camera )

  var intersects = raycaster.intersectObjects( animalsArr, true )

  // if ( intersects.length > 0 ) {
  sampler.triggerAttackRelease(notes[Math.floor(Math.random()* notes.length)], "1n");

    console.log(intersects[0])
    if(gltfVar.animations[0]){
    mixer = new THREE.AnimationMixer(gltfVar.scene)
    let random = Math.floor(Math.random() * 3) +3


    // console.log(mixer)
    // gltfVar.animations.map(x => {
      // console.log(x)
      const action = mixer.clipAction( gltfVar.animations[random])
      // action.clampWhenFinished = true
      action.setLoop(THREE.LoopOnce, 1)
      action.play()
    // })


  }
  //}


}

const color = 0x00FF00;
  const density = 0.01;
  scene.fog = new THREE.FogExp2(color, density, .1);


  //Fireflies

  //Geometries

  const fireFliesGeometry = new THREE.BufferGeometry()
  const fireFliesCount = 30
  const positionArray = new Float32Array(fireFliesCount * 3)
  const scaleArray = new Float32Array(fireFliesCount)


  for(let i = 0; i < fireFliesCount; i++ ){
    positionArray[i *3 +0] = (Math.random() - .5) * 4
    positionArray[i *3 +1] = Math.random() * 1.5
    positionArray[i *3 +2] = (Math.random() - .5) * 4

    scaleArray[i] = Math.random()
  }

  fireFliesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))

  fireFliesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1))

  //Material

  const fireFliesMaterial  = new THREE.ShaderMaterial({
    uniforms: {
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uSize: { value: 200 },
      uTime: { value: 0}
    },
    vertexShader: firefliesVertexShader,
    fragmentShader: firefliesFragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending

  })



  const fireFlies = new THREE.Points(fireFliesGeometry, fireFliesMaterial)

  scene.add(fireFlies)

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime  = 0

const tick = () =>
{
    if ( mixer ) mixer.update( clock.getDelta() )
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Update controls
    controls.update()

    shaderMaterial.uniforms.uTime.value = elapsedTime
    shaderMaterial1.uniforms.uTime.value = elapsedTime
    shaderMaterial2.uniforms.uTime.value = elapsedTime
    fireFliesMaterial.uniforms.uTime.value = elapsedTime


    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
