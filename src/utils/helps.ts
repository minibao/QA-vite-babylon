import { BoundingInfo, Mesh, Scene, Vector3 } from '@babylonjs/core'
import { machine } from 'os'

// 这里主要是为了计算相机在z=0位置的最大距离
type MaxXy = {
  maxX: number
  maxY: number
}
export function getMaxXY(scene: Scene): MaxXy {
  const camera = scene.activeCamera
  const fov = camera?.fov as number
  const engine = scene.getEngine()
  const width = engine.getRenderWidth()
  const height = engine.getRenderHeight()
  const maxY = (fov / 2) * 150
  const maxX = (maxY * width) / height

  return { maxX, maxY }
}

export function getMeshBound(mesh: Mesh) {
  const childMeshes = mesh.getChildMeshes()

  let min = childMeshes[0].getBoundingInfo().boundingBox.minimumWorld
  let max = childMeshes[0].getBoundingInfo().boundingBox.maximumWorld

  for (let i = 0; i < childMeshes.length; i++) {
    let meshMin = childMeshes[i].getBoundingInfo().boundingBox.minimumWorld
    let meshMax = childMeshes[i].getBoundingInfo().boundingBox.maximumWorld

    min = Vector3.Minimize(min, meshMin)
    max = Vector3.Maximize(max, meshMax)
  }

  mesh.setBoundingInfo(new BoundingInfo(min, max))
  const boundingBox = mesh.getBoundingInfo().boundingBox
  const size = boundingBox.maximum.subtract(boundingBox.minimum)
  console.log(boundingBox)
  
  mesh.showBoundingBox = true
}

function compareMin(x: number, y: number) {
  return x - y
}

export function getMinByArray(arr: Array<any>) {
  if (arr.length) {
    const minValue = arr.reduce((min, arr) => {
      // return compareMin()
    })
    // arr.filter(item => )
  }
}


export class Queue<T> {
  public items: Array<T>

  constructor(private maxSize: number) {
    this.items = []
  }

  enqueue(element: T): void {
    if (this.items.length >= this.maxSize) this.items.shift()
    this.items.push(element)
  }

  front(): T | undefined {
    if (this.isEmpty()) {
      return undefined
    } else {
      return this.items[0]
    }
  }

  delFront(): void {
    this.items.shift()
  }

  delTail(): void {
    this.items.pop()
  }

  isEmpty(): boolean {
    return this.items.length === 0
  }

  get size(): number {
    return this.items.length
  }

  clear(): void {
    this.items = []
  }

  countFrequency(): { item: any, count: number } {
    const count = new Map()
    let maxCount = 0
    let mostFrequentItem: T | undefined

    for (const item of this.items) {
      const currentCount = (count.get(item) || 0) + 1
      count.set(item, currentCount)

      if (currentCount > maxCount) {
        maxCount = currentCount
        mostFrequentItem = item
      }
    }

    return { item: mostFrequentItem, count: maxCount }
  }
}

export function uuid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4()
}