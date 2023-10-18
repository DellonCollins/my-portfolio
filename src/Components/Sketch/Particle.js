import * as mathjs from "mathjs"
import { Vector, Color, LINES, POINTS } from 'p5'
import { Lines, Queue } from "./Queue";

export class Particle{
    static lifeSpan = 1000
    static speedLimit = 6


    constructor(initialX, initialY, initialVelocity = new Vector(0, 0), color, cost = 1){
        this.x = initialX; this.y = initialY
        this.velocity = initialVelocity.limit(Particle.speedLimit)
        this.previousPositions = new Queue(1)
        this.isInBounds = true
        this.cost = cost
    }

    draw(canvas, color="white"){
        this.drawPath(canvas, color)
    }

    drawPath(canvas, color){
        let drawColor = canvas.color(color)
        let levels = drawColor.levels
        let alpha = 5
        drawColor = canvas.color(levels[0], levels[1], levels[2], alpha)
        canvas.push()
        canvas.stroke(drawColor)
        canvas.strokeWeight(1)
        if(this.previousPositions.list[this.previousPositions.length-1]){
            canvas.line(this.x, this.y, this.previousPositions.list[this.previousPositions.length-1].x, this.previousPositions.list[this.previousPositions.length-1].y)

        }
        
        canvas.pop()
    }

    drawLines(canvas, color="white"){
        let drawColor = canvas.color(color)
        let levels = drawColor.levels
        let alpha = 50
        drawColor = canvas.color(levels[0], levels[1], levels[2], alpha)
        
        canvas.push()
        canvas.beginShape(LINES)
        canvas.noFill()
        
        canvas.stroke(drawColor)
        canvas.strokeWeight(3)

        this.previousPositions.list = this.previousPositions.list.filter((point, index, vertices) => {            
            canvas.vertex(point.x, point.y)
                        
            point.lifeSpan -= 5

            return point.lifeSpan > 0
        })
        canvas.endShape()
        
        canvas.pop()
    }

    updatePosition(canvas, savePrevPositions = true){
        if(savePrevPositions){
            this.previousPositions.push({ x: this.x, y: this.y, lifeSpan: Particle.lifeSpan })
        }
        this.x += this.velocity.x
        this.y += this.velocity.y
        
    }

    updateVelocity(vector){
        this.velocity.add(vector).limit(Particle.speedLimit)
    }
}

export class ParticleManager {
    
    constructor(flowField, numParticles = 20){
        this.flowField = flowField
        this.particleList = this.instantiateParticlesFromEdge(numParticles)
        this.rotation = Math.PI * 0
    }

    instantiateParticles(numParticles){
        return [...Array(numParticles)].map(() => {
            let xPosition = Math.floor(Math.random() * this.flowField.width), yPosition = Math.floor(Math.random() * this.flowField.height);
            return new Particle(xPosition, yPosition, new Vector(Math.random() * Particle.speedLimit / 2, Math.random() * Particle.speedLimit / 2))
        })
    }

    instantiateParticlesFromEdge(numParticles){
        if(Math.random() < 0.25){
            return this.instantiateParticles(numParticles)
        } 
        return [...Array(numParticles)].map(() => {
            let edge = Math.floor(Math.random()*3)
            let v = Particle.speedLimit
            let xPosition, yPosition
            let screenWidth = this.flowField.width, screenHeight = this.flowField.height
            let velocity
            switch (edge) {
                //Right
                case 0:
                    xPosition = this.flowField.width - 1
                    yPosition = Math.floor(Math.random() * this.flowField.height)
                    velocity = new Vector(-v, 0)
                    break
                //Top
                case 1:
                    xPosition = Math.floor(Math.random() * this.flowField.width);
                    yPosition = 1
                    velocity = new Vector(0, v)
                    break
                case 2:
                    xPosition = Math.floor(Math.random() * this.flowField.width);
                    yPosition = this.flowField.height - 1
                    velocity = new Vector(0, -v)
                    break
                //Left
                case 3:
                    xPosition = 1
                    yPosition = Math.floor(Math.random() * this.flowField.height)
                    velocity = new Vector(v, 0)
                    break
                //Bottom
                default:
                    break
            }
            
            return new Particle(xPosition, yPosition, velocity)
        })
    }

    updateParticles(canvas){
        let numParticlesDeleted = 0;
        this.particleList = this.particleList.filter((particle, index) => {
            if( !particle.isInBounds && particle.previousPositions.list.length === 0 ) { return false }

            if ( !particle.isInBounds ) { return false }

            let nearestFlowPoint = this.flowField.nearestFlowPoint(particle.x, particle.y)
            let heading = Vector.fromAngle(nearestFlowPoint.heading).mult(nearestFlowPoint.strength)

            let rotationScale = 0.001
            this.rotation += rotationScale * Math.random() - (rotationScale / 2)
            heading.rotate(this.rotation)
            
            particle.updateVelocity(heading)
            particle.updatePosition(canvas)

            // Out of bounds check
            if(particle.x > this.flowField.width  || particle.x < 0 || particle.y > this.flowField.height || particle.y < 0){
                numParticlesDeleted++
                particle.isInBounds = false
            }

            return true
        })
        

        this.particleList.push(...this.instantiateParticlesFromEdge(numParticlesDeleted))
    }
    

    draw(canvas){
        let timeDomain = 100
        
        let color = canvas.lerpColor(canvas.color("blue"), canvas.color("pink"), (canvas.frameCount % timeDomain) / timeDomain)
        this.particleList.forEach(particle => {
            particle.draw(canvas, color)
        })
    }
}