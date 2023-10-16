import * as math from "mathjs"
import { Vector } from 'p5'
export class FlowGrid{
    constructor (width, height, canvas, numPointsX = 10, numPointsY = 10){
        this.canvas = canvas; 
        this.width = width; this.height = height
        this.flowMap = undefined;

        this.initializeFlowField(numPointsX, numPointsY)
    }

    initializeFlowField(numPointsX, numPointsY){
        let pointsGrid = math.matrix(math.ones([numPointsX + 1, numPointsY + 1]))
        let xCoords = math.range(0, this.width, this.width/numPointsX, true), yCoords = math.range(0, this.height, this.height/numPointsY, true)
    
        
        this.flowMap = math.map(pointsGrid, (element, index) => {
            let _x = xCoords.get([index[0]]), _y = yCoords.get([index[1]])
            return new FlowPoint(_x, _y)
        })
        
        console.log(xCoords, yCoords, this.flowMap, this.width)

        let [xRange, yRange] = this.flowMap.size(); let increment = 0.2
        let xOffset = 0
        for (let x = 0; x < xRange; x++){
            let yOffset = 0
            for (let y = 0; y < yRange; y++){
                let noise = this.canvas.noise(xOffset, yOffset)
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
    }
}

class FlowPoint{
    constructor(x, y, heading = undefined){
        this.x = x; this.y = y
        this.heading = heading
    }

    draw(canvas, color = "black", size = 10){
        canvas.push()
        canvas.stroke(150)
        canvas.strokeWeight(1)
        canvas.translate(this.x, this.y)
        canvas.rotate(this.heading)
        canvas.line(0,0,size,0)
        canvas.pop()
    }
}

export function flowField(grid, canvas, increment = 0.1){
    
    let [xRange, yRange] = grid.flowMap.size();
    let xOffset = 0
    for (let x = 0; x < xRange; x++){
        let yOffset = 0
        for (let y = 0; y < yRange; y++){
            let noise = canvas.noise(xOffset, yOffset)
            let angle = noise * canvas.TWO_PI
            let vector = Vector.fromAngle(angle)

            let coord = grid.flowMap.get([x, y])
            canvas.push()
            canvas.stroke(150)
            canvas.strokeWeight(1)
            canvas.translate(coord.x, coord.y)
            canvas.rotate(vector.heading())
            canvas.line(0,0, grid.width/xRange,0)
            canvas.pop()

            yOffset += increment
        }
        xOffset += increment
    }
}