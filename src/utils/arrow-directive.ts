import { Color3, CreateGreasedLine, Curve3, GreasedLineMeshColorDistribution, GreasedLineMeshWidthDistribution, GreasedLineTools, Scene, Vector3 } from '@babylonjs/core'
import { cloneDeep } from 'lodash'

export class ArrowDirective {
  constructor(private scene: Scene) {}

  create(start: Vector3, end: Vector3): void {
    this.clear()
    const center = Vector3.Center(start, end)
    const maxY = Math.max(start.y, end.y)
    center.y = maxY + 5
    end.y += 1

    const bezier = Curve3.CreateQuadraticBezier(start, center, end, 200)
    const points = bezier.getPoints()
    points.splice(-1)

    const widths = new Array(400).fill(1)
    for (let i = 0; i < 20; i++) {
      widths[i] = 0
    }

    const arrowLength = 20
    const arrowWidth = 1.5
    for (let i = 0; i < arrowLength + 1; i++) {
      widths[399 - i] = i * arrowWidth / 20
    }

    const line = CreateGreasedLine(
      'arrow-directive-1',
      {
        points,
        widths,
        // ribbonOptions: {}
      },
      {
        width: 2,
        color: Color3.FromHexString('#666666')
      }
    )
    line.renderingGroupId = 2
    line.isPickable = false
  }

  /* dispose */
  _create(start: Vector3, end: Vector3): void {
    this.clear()
    const center = Vector3.Center(start, end)
    const maxY = Math.max(start.y, end.y)
    center.y = maxY + 5
    end.y += 1
    
    const width = 3
    const colors = [Color3.FromHexString('#535353')]

    const bezier = Curve3.CreateQuadraticBezier(start, center, end, 20)
    const bezierPoints = bezier.getPoints()
    const bezierPointsClone = cloneDeep(bezierPoints)
    bezierPointsClone.splice(-2)

    const line = CreateGreasedLine(
      'arrow-directive-1',
      { points: bezierPointsClone },
      { colors, useColors: true, width, colorDistribution: GreasedLineMeshColorDistribution.COLOR_DISTRIBUTION_EVEN }
    )
    line.renderingGroupId = 2
    line.isPickable = false

    const length = bezierPoints.length
    const direction = end.subtract(bezierPoints[length - 3])

    const cap = GreasedLineTools.GetArrowCap(bezierPoints[length - 3], direction, 1, 2, 2)

    const lineCap = CreateGreasedLine('arrow-directive-2', {
      points: cap.points,
      widths: cap.widths,
      ribbonOptions: {},
      widthDistribution: GreasedLineMeshWidthDistribution.WIDTH_DISTRIBUTION_START,
      instance: line
    })
    lineCap.renderingGroupId = 2
    lineCap.isPickable = false
    
    bezierPoints.length = 0
    bezierPointsClone.length = 0
  }

  clear(): void {
    if (this.scene.getMeshByName('arrow-directive-1')) {
      this.scene.getMeshByName('arrow-directive-1')?.dispose()
    }
    // if (this.scene.getMeshByName('arrow-directive-2')) {
    //   this.scene.getMeshByName('arrow-directive-2')?.dispose()
    // }
  }
}
