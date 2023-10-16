import * as math from "mathjs"
import { Vector } from 'p5'
export class Grid{
    constructor (width, height, canvas, numPointsX = 10, numPointsY = 10){
        this.canvas = canvas; this.width = width; this.height = height
        let pointsGrid = math.matrix(math.ones([numPointsX + 1, numPointsY + 1]))
        let xCoords = math.range(0, width, width/numPointsX, true), yCoords = math.range(0, height, height/numPointsY, true)
    
        
        this.coordinateMap = math.map(pointsGrid, (element, index) => {
            let _x = xCoords.get([index[0]]), _y = yCoords.get([index[1]])
            return new Point(_x, _y)
        })
        
        console.log(xCoords, yCoords, this.coordinateMap, this.width)
    }

    initializeFlowField(){
        let [xRange, yRange] = this.coordinateMap.size(); let increment = 0.2
        let xOffset = 0
        for (let x = 0; x < xRange; x++){
            let yOffset = 0
            for (let y = 0; y < yRange; y++){
                let noise = this.canvas.noise(xOffset, yOffset)
                let angle = noise * this.canvas.TWO_PI
                let vector = Vector.fromAngle(angle)

                let coord = this.coordinateMap.get([x, y])
                // this.canvas.push()
                // this.canvas.stroke(150)
                // this.canvas.strokeWeight(1)
                // this.canvas.translate(coord.x, coord.y)
                // this.canvas.rotate(vector.heading())
                // this.canvas.line(0,0, this.width/rows,0)
                // this.canvas.pop()

                yOffset += increment
            }
            xOffset += increment
        }
    }
    
    draw(){
        this.coordinateMap.forEach((element)=>{
            element.draw(this.canvas)
        })
    }
}

class Point{
    constructor(x, y, value = undefined){
        this.x = x; this.y = y
        this.value = value
    }

    draw(canvas, color = "black", size = 10){
        canvas.push()
        canvas.stroke(color);
        canvas.strokeWeight(size);
        canvas.point(this.x, this.y)
        canvas.pop()
    }
}

export function flowField(grid, canvas, increment = 0.1){
    
    let [xRange, yRange] = grid.coordinateMap.size();
    let xOffset = 0
    for (let x = 0; x < xRange; x++){
        let yOffset = 0
        for (let y = 0; y < yRange; y++){
            let noise = canvas.noise(xOffset, yOffset)
            let angle = noise * canvas.TWO_PI
            let vector = Vector.fromAngle(angle)

            let coord = grid.coordinateMap.get([x, y])
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