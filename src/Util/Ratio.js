export class Ratio{
    constructor(numEntries){
        this.entries = Array(numEntries).fill(1)
    }

    increment(index, value = 1) {
        this.entries[index] += value
        return this.entries[index]
    }

    decrement(index, value = 1) {
        this.entries[index] -= value
        return this.entries[index]
    }

    get sum () {
        let total = 0
        this.entries.forEach(entry => {
            total += entry
        })
        return total
    }

    getRatio(index){
        return {
            a: this.entries[index],
            b: this.sum
        }
    }

    getRatios(){
        return this.entries.map(entry => {
            return entry / this.sum
        })
    }

    getRandomIndexLeast(){
        let weights = Array(4).fill(0)
        this.getRatios().forEach((entry, index, array) => {
            if(index === 0){
                weights[index] = { offset: entry, index, value: entry}
            } else {
                weights[index] = { offset: entry + weights[index - 1].offset, index, value: entry}
            }
        })

        // Create ranges based on the relative value of each entry
        let start = 0, ranges = Array(4).fill(0);
        for (let index = 0; index < weights.length; index++) {
            let diff = weights[index].offset - start
            ranges[index] = { range: [start, start + diff], dist: diff, index }
            start += diff            
        }

        // sort weights by increasing value
        weights.sort((a,b) => a.value-b.value)

        // sort ranges by increasing value
        let sortedRanges = Array.from(ranges).sort((a,b) => {
            return b.dist - a.dist
        })

        //the largest ranges are corresponded to the smallest entry values. the smallest entries are now most likely to be selected
       
        let rand = Math.random(), randomIndex
        for (let index = 0; index < sortedRanges.length; index++) {
            let range = sortedRanges[index].range
            let low = range[0], high = range[1]
            if(rand >= low && rand < high){
                randomIndex = index
                return weights[randomIndex].index
            }   
        }

        
    }

    get(index){
        return this.entries[index] / this.sum
    }
}