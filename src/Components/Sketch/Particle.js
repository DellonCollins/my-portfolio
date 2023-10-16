import * as mathjs from "mathjs"

export class Particle{
    constructor(initialX, initialY){
        this.x = initialX; this.y = initialY
        this.velocity = {x: 0, y: 0}
    }

    draw(canvas, color="yellow"){
        canvas.push()
        canvas.noStroke()
        canvas.fill(color)
        canvas.circle(this.x, this.y, 10)
        canvas.pop()
    }

    updatePosition(){
        this.x += this.velocity.x
        this.y += this.velocity.y
    }

    updateVelocity(x, y){
        this.velocity.x += x;
        this.velocity.y += y;
    }
}

export class ParticleManager {
    constructor(flowField, numParticles = 35){
        this.particleList = [...Array(numParticles)].map(() => {
            let xPosition = Math.floor(Math.random() * flowField.width), yPosition = Math.floor(Math.random() * flowField.height);
            return new Particle(xPosition, yPosition)
        })
        this.flowField = flowField
    }

    updateParticles(){
        this.particleList.forEach((particle) => {
            let nearestFlowPoint = this.flowField.nearestFlowPoint(particle.x. particle.y)
        })
    }

    draw(canvas){
        this.particleList.forEach(particle => {
            particle.draw(canvas)
        })
    }
}