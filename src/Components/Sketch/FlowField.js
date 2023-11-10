import * as math from "mathjs"
import { Vector } from 'p5'
export class FlowGrid {
    constructor (width, height, canvas, numIntervalsX = 10, numIntervalsY = 10, chaos = 50){
        // this.canvas = canvas
        this.chaos = chaos
        this.width = width; this.height = height
        this.flowMap = undefined

        this.initializeFlowField(numIntervalsX, numIntervalsY, canvas)
    }

    initializeFlowField(numIntervalsX, numIntervalsY, canvas){
        let pointsGrid = math.matrix(math.ones([numIntervalsX + 1, numIntervalsY + 1]))
        let xCoords = math.range(0, this.width, this.width/numIntervalsX, true), yCoords = math.range(0, this.height, this.height/numIntervalsY, true)
        
        this.flowMap = math.map(pointsGrid, (element, index) => {
            let _x = xCoords.get([index[0]]), _y = yCoords.get([index[1]])
            return new FlowPoint(_x, _y)
        })

        this.setFlowValues(canvas)
    }
    
    setFlowValues(canvas){
        let [xRange, yRange] = this.flowMap.size(); let increment = 0.2
        let randomScale = 10
        canvas.noiseSeed(20 + (randomScale * (Math.random() - 0.5)))
        let xOffset = 0
        for (let x = 0; x < xRange; x++){
            let yOffset = 0
            for (let y = 0; y < yRange; y++){

                let chaosScale = (this.chaos / 100.0)
                let timeDelta = canvas.frameCount * ((chaosScale * 5000)/ 5000)
                let noise = canvas.noise(xOffset + timeDelta, yOffset + timeDelta)
                let angle = noise * canvas.TWO_PI
                let vector = Vector.fromAngle(angle)

                let flowPoint = this.flowMap.get([x, y])
                flowPoint.heading = vector.heading()

                yOffset += increment
            }
            xOffset += increment
        }
    }

    draw(canvas){
        this.flowMap.forEach((element)=>{
            element.draw(canvas)
        })

        this.setFlowValues(canvas)
    }

    nearestFlowPoint(position){
        let x = position.x, y = position.y
        let [xRange, yRange] = this.flowMap.size()
        //subtract 1 from ranges because a grid with 10 
        let blockWidth = this.width/(xRange - 1), blockHeight = this.height/(yRange - 1)


        // Round up if more than halfway to the next cell
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

class FlowPoint {
    constructor(x, y, heading = undefined){
        this.x = x; this.y = y
        this.heading = heading
        this.strength = Math.random()*3
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
