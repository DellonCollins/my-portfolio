import * as math from "mathjs"
import { Vector } from 'p5'
export class FlowGrid{
    constructor (width, height, canvas, numIntervalsX = 10, numIntervalsY = 10){
        this.canvas = canvas
        this.width = width; this.height = height
        this.flowMap = undefined

        this.initializeFlowField(numIntervalsX, numIntervalsY)
    }

    initializeFlowField(numIntervalsX, numIntervalsY){
        let pointsGrid = math.matrix(math.ones([numIntervalsX + 1, numIntervalsY + 1]))
        let xCoords = math.range(0, this.width, this.width/numIntervalsX, true), yCoords = math.range(0, this.height, this.height/numIntervalsY, true)
    
        
        this.flowMap = math.map(pointsGrid, (element, index) => {
            let _x = xCoords.get([index[0]]), _y = yCoords.get([index[1]])
            return new FlowPoint(_x, _y)
        })
        
        console.log(xCoords, yCoords, this.flowMap, this.width)

        this.setFlowValues()
    }
    
    setFlowValues(){
        let [xRange, yRange] = this.flowMap.size(); let increment = 0.1
        let xOffset = 0
        this.canvas.noiseSeed(36)
        for (let x = 0; x < xRange; x++){
            let yOffset = 0
            for (let y = 0; y < yRange; y++){

                let timeDelta = this.canvas.frameCount/500
                let noise = this.canvas.noise(xOffset + timeDelta, yOffset + timeDelta )
                let angle = noise * this.canvas.TWO_PI
                let vector = Vector.fromAngle(angle)

                let flowPoint = this.flowMap.get([x, y])
                flowPoint.heading = vector.heading()

                yOffset += increment
            }
            xOffset += increment
        }
    }

    draw(){
        this.flowMap.forEach((element)=>{
            element.draw(this.canvas)
        })

        this.setFlowValues()
    }

    nearestFlowPoint(x, y){
        let [xRange, yRange] = this.flowMap.size()
        //subtract 1 from ranges because a grid with 10 
        let blockWidth = this.width/(xRange - 1), blockHeight = this.height/(yRange - 1)

        let xCell = Math.floor(x / blockWidth)
        if(x % blockWidth >= blockWidth/2) {
            xCell +=  1
        }

        let yCell = Math.floor(y / blockHeight)
        if(y % blockHeight >= blockHeight/2) {
            yCell +=  1
        }

        let nearestPoint = this.flowMap.get([xCell, yCell])
        return nearestPoint

    }
}

class FlowPoint{
    constructor(x, y, heading = undefined){
        this.x = x; this.y = y
        this.heading = heading
    }

    draw(canvas, color = "pink", size = 10){
        canvas.push()
        canvas.stroke(color)
        canvas.strokeWeight(1)
        canvas.translate(this.x, this.y)
        canvas.rotate(this.heading)
        canvas.line(0,0,size,0)
        canvas.pop()
    }
}
