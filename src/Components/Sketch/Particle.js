import * as mathjs from "mathjs"
import { Vector, Color } from 'p5'
import { Lines, Queue } from "./Queue";

export class Particle{
    static lifeSpan = 10000

    constructor(initialX, initialY, initialVelocity = new Vector(0, 0), cost = 1){
        this.x = initialX; this.y = initialY
        this.velocity = initialVelocity
        this.previousPositions = new Queue(150)
        this.lifeSpan = Particle.lifeSpan
        this.cost = cost
    }

    draw(canvas, color="white"){
       
            let drawColor = canvas.color(color)
            let levels = drawColor.levels
        
        
        canvas.push()
        canvas.noStroke()
        this.previousPositions.list = this.previousPositions.list.filter((point, index) => {
            let alpha = Math.floor(canvas.map(index, 0, this.previousPositions.length, 0, 150))
            drawColor = canvas.color(levels[0], levels[1], levels[2], alpha)
            canvas.fill(drawColor)
            canvas.circle(point.x, point.y, 7)

            return true
        })
        
        canvas.pop()
    }

    updatePosition(){
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.previousPositions.push({ x: this.x, y: this.y, lifeSpan: 5000 })
    }

    updateVelocity(vector){
        this.velocity.add(vector).limit(5)
    }
}

export class ParticleManager {
    constructor(flowField, numParticles = 20){
        this.flowField = flowField
        this.particleList = this.instantiateParticles(numParticles)

    }

    instantiateParticles(numParticles){
        return [...Array(numParticles)].map(() => {
            let xPosition = Math.floor(Math.random() * this.flowField.width), yPosition = Math.floor(Math.random() * this.flowField.height);
            return new Particle(xPosition, yPosition)
        })
    }

    updateParticles(){
        let numParticlesDeleted = 0;
        this.particleList = this.particleList.filter((particle, index) => {
            let nearestFlowPoint = this.flowField.nearestFlowPoint(particle.x, particle.y)
            let heading = Vector.fromAngle(nearestFlowPoint.heading)

            // heading.rotate(Math.PI/2)
            particle.updateVelocity(heading)
            particle.updatePosition()

            particle.lifeSpan -= particle.cost;

            // Out of bounds check
            if(particle.x > this.flowField.width  || particle.x < 0 || particle.y > this.flowField.height || particle.y < 0){
                particle.lifeSpan = 0
            }

            if(particle.lifeSpan <= 0) {
                numParticlesDeleted ++
            }
            return particle.lifeSpan > 0
        })

        this.particleList.push(...this.instantiateParticles(numParticlesDeleted))
    }

    draw(canvas){
        this.particleList.forEach(particle => {
            particle.draw(canvas, "white")
        })
    }
}