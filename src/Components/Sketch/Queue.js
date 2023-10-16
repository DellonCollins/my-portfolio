export class Queue{
    constructor(maxEntries, ...items){
        this.list = [...items]
        this.maxEntries = maxEntries
    }

    push(item){
        this.list.push(item)
        if(this.list.length > this.maxEntries){
            this.list.shift()
        }
    }

    get length(){
        return this.list.length
    }
}

export class Lines {
    constructor(maxEntries, ...items){
        this.queue = new Queue(maxEntries, ...items)
    }

    push(item){
        this.queue.push(item)
    }

    draw(canvas, color, strokeWeight = 1){
        canvas.push()
        canvas.stroke(color)
        canvas.strokeWeight(strokeWeight)
        if(this.queue.length < 2){ return }

        
        for (let index = 0; index < this.queue.list.length - 1; index++) {
            let start = this.queue.list[index], end = this.queue.list[index + 1];
            
            canvas.line(start.x, start.y, end.x, end.y)
            
        }
        canvas.pop()
    }
} 