import { Vector } from 'p5'
import { Ratio } from "../../Util/Ratio";

const Direction = {
    TOP: 0,
    RIGHT: 1,
    BOTTOM: 2,
    LEFT: 3
}

export class Particle {
    static speedLimit = 6

    constructor(position, initialVelocity = new Vector(0, 0)){
        this.position = position; this.velocity = initialVelocity.limit(Particle.speedLimit)
        this.isInBounds = true
    }

    draw(canvas, color="white"){
        this.drawPath(canvas, color)
    }

    drawPath(canvas, color){
        if(!this.previousPosition){ return }
        
        let lineColor = canvas.color(color), levels = lineColor.levels
        let alpha = 1

        canvas.push()
        lineColor = canvas.color(levels[0], levels[1], levels[2], alpha)
        canvas.stroke(lineColor)
        canvas.strokeWeight(1)
        canvas.line(this.position.x, this.position.y, this.previousPosition.x, this.previousPosition.y)
        canvas.pop()
    }

    updatePosition(){
        this.previousPosition = this.position.copy()
        this.position.add(this.velocity)
    }

    updateVelocity(vector, speedLimit = Particle.speedLimit){
        this.velocity.add(vector).limit(speedLimit)
    }
}

export class ParticleManager {
    constructor(flowField, numParticles = 20){
        this.flowField = flowField        
        this.particleExitTracker = new Ratio(4)
        this.particleList = this.instantiateParticlesFromEdge(numParticles)
        this.rotation = Math.PI / 8
    }

    get width() { return this.flowField.width }
    get height() { return this.flowField.height }

    instantiateParticles(numParticles){
        return [...Array(numParticles)].map(() => {
            let xPosition = Math.floor(Math.random() * this.width), yPosition = Math.floor(Math.random() * this.height);
            return new Particle(new Vector(xPosition, yPosition), new Vector(Math.random() * Particle.speedLimit / 2, Math.random() * Particle.speedLimit / 2))
        })
    }

    instantiateParticlesFromEdge(numParticles){
        let area = this.width * this.height
        let particleTracker = this.particleExitTracker

        // Small chance to randomly create particles in middle of screen if the screen is sufficiently big
        if(Math.random() < 0.15 && Math.sqrt(area) > 600){
            return this.instantiateParticles(numParticles)
        } 
        
        return [...Array(numParticles)].map(() => {
            let randomEdge = particleTracker.getRandomIndexLeast()         
            let speedLimit = Particle.speedLimit / 2
            let xPosition, yPosition, velocity
            switch (randomEdge) {
                //Top
                case Direction.TOP:
                    xPosition = Math.floor(Math.random() * this.width);
                    yPosition = 1
                    velocity = new Vector(0, speedLimit)
                    break
                //Right
                case Direction.RIGHT:
                    xPosition = this.width - 1
                    yPosition = Math.floor(Math.random() * this.height)
                    velocity = new Vector(-speedLimit, 0)
                    break
                //Bottom
                case Direction.BOTTOM:
                    xPosition = Math.floor(Math.random() * this.width);
                    yPosition = this.height - 1
                    velocity = new Vector(0, -speedLimit)
                    break
                //Left
                case Direction.LEFT:
                    xPosition = 1
                    yPosition = Math.floor(Math.random() * this.height)
                    velocity = new Vector(speedLimit, 0)
                    break
                default:
                    console.log("something went wrong")
                    break
            }
            
            return new Particle(new Vector(xPosition, yPosition), velocity)
        })
    }

    updateParticles(){
        let numParticlesDeleted = 0;

        this.particleList = this.particleList.filter((particle, index) => {
            let position = particle.position
            let nearestFlowPoint = this.flowField.nearestFlowPoint(position)
            let heading = Vector.fromAngle(nearestFlowPoint.heading).mult(nearestFlowPoint.strength)

            let rotationScale = 0.001
            this.rotation += rotationScale * Math.random() - (rotationScale / 2)
            heading.rotate(this.rotation)
            
            particle.updateVelocity(heading)
            particle.updatePosition()

            // Out of bounds check
            if (position.x > this.width || position.x < 0 || position.y > this.height || position.y < 0) {
                if(position.x > this.width){
                    this.particleExitTracker.increment(Direction.RIGHT)
                } else if (position.x < 0) {
                    this.particleExitTracker.increment(Direction.LEFT)
                } else if (position.y > this.height) {
                    this.particleExitTracker.increment(Direction.BOTTOM)
                } else if (position.y < 0) {
                    this.particleExitTracker.increment(Direction.TOP)
                }

                numParticlesDeleted++
                return false
            }

            return true
        })
        
        this.particleList.push(...this.instantiateParticlesFromEdge(numParticlesDeleted))
    }
    

    draw(canvas, color1 = "white", color2 = "cyan"){
        let timeDomain = 1000
        let color = canvas.lerpColor(canvas.color(color1), canvas.color(color2), (canvas.frameCount % timeDomain) / timeDomain)
        
        this.particleList.forEach(particle => {
            particle.draw(canvas, color)
        })
    }
}