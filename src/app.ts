import '@babylonjs/core/Debug/debugLayer'
import '@babylonjs/inspector'
import { Engine, Scene, AxesViewer, Vector3, HavokPlugin, ArcRotateCamera, Tools, Color3, SceneLoader, Color4 } from '@babylonjs/core'
// import HavokPhysics from '@babylonjs/havok'
// import MainScene from './game/main-scene'


const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement

const startRenderLoop = function (engine: Engine, canvas: HTMLCanvasElement) {
  engine.runRenderLoop(function () {
    if (sceneToRender && sceneToRender.activeCamera) {
      sceneToRender.render()
      fps()
    }
  })
}

let engine: Engine
let scene: Scene
let sceneToRender: Scene
const createDefaultEngine = function () {
  return new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false })
}

class Playground {
  static CreateScene(engine: Engine, canvas: HTMLCanvasElement) {
    const scene = new Scene(engine)

    // new MainScene(scene, canvas, engine)
    scene.clearColor = new Color4(0.31, 0.48, 0.64)

    //add an arcRotateCamera to the scene
    var camera = new ArcRotateCamera('camera', Tools.ToRadians(125), Tools.ToRadians(70), 25, new Vector3(0, 3, 0), scene)
    camera.lowerRadiusLimit = 10
    camera.upperRadiusLimit = 40

    camera.attachControl(canvas, true)

    const pirateFortImport = SceneLoader.ImportMesh('', './model/', 'pirate-fort.glb', scene, (meshes) => {
      meshes[0].name = 'pirateFort'
      scene.getMeshByName('sea')!.material!.needDepthPrePass = true
      scene.getLightByName('Sun')!.intensity = 12
    })
    

    return scene
  }
}

const createScene = function () {
  return Playground.CreateScene(engine, engine.getRenderingCanvas()!)
}

const initFunction = async function () {
  const asyncEngineCreation = async function () {
    try {
      return createDefaultEngine()
    } catch (e) {
      console.log('the available createEngine function failed. Creating the default engine instead')
      return createDefaultEngine()
    }
  }

  engine = await asyncEngineCreation()
  if (!engine) throw 'engine should not be null.'
  startRenderLoop(engine, canvas)
  scene = createScene()
}

initFunction().then(() => {
  sceneToRender = scene
})

const fps = () => {
  const dom = document.getElementById('display-fps')
  if (dom) {
    dom.innerHTML = `${engine.getFps().toFixed()} fps`
  } else {
    const div = document.createElement('div')
    div.id = 'display-fps'
    div.innerHTML = '0'
    document.body.appendChild(div)
  }
}

window.addEventListener('keydown', ev => {
  // Shift+Ctrl+Alt+I
  if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
    if (scene.debugLayer.isVisible()) {
      scene.debugLayer.hide()
    } else {
      scene.debugLayer.show()
    }
  }
})

// resize window
window.addEventListener('resize', () => {
  engine.resize()
})

window.onbeforeunload = () => {
  scene.onBeforeRenderObservable.clear()
  scene.onAfterRenderObservable.clear()
  scene.onKeyboardObservable.clear()
}
