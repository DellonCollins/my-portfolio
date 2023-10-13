import * as math from "mathjs"
export class Grid{
    constructor (width, height, canvas, numPointsX = 10, numPointsY = 10){
        this.canvas = canvas
        let pointsGrid = math.matrix(math.ones([numPointsX + 1, numPointsY + 1]))
        let xCoords = math.range(0, width, width/numPointsX, true), yCoords = math.range(0, height, height/numPointsY, true)
    
        this.grid = math.map(pointsGrid, (element, index) => {
            let _x = xCoords.get([index[0]]), _y = yCoords.get([index[1]])
            return new Point(_x, _y)
        })
        this.grid.
        console.log(xCoords, yCoords, this.grid)
    }
    
    draw(){
        this.grid.forEach((element, index)=>{
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

function flowField(grid, canvas, increment = 0.2){
    let [rows, cols] = grid.size();
    for (let x = 0; x < rows; x++){
        let xOffset = 0
        for (let y = 0; y < cols; y++){
            let yOffset = 0
        }
    }
}