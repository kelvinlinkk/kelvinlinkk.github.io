class Gacha{
    constructor(){
        this.FiveStarCounter = 0
        this.FourStarCounter = 0
        this.fiveUPrate = 0.5
        this.fourUPrate = 0.5
        this.fivebasicrate = 0.009
    }
    setWeight(five, four) {
        const w1 = Math.min(1, this.fivebasicrate + (five > 73 ? (1 - this.fivebasicrate) / 17 * (five - 73) : 0))
        const w2 = Math.min(1, 0.051 + (four > 8 ? 0.51 * (four - 8) : 0))
        return [w1, w2]
    }
    pick() {
        this.FiveStarCounter += 1
        this.FourStarCounter += 1
        const [FiveStarWeight, FourStarWeight] = this.setWeight(this.FiveStarCounter, this.FourStarCounter)
        const ThreeStarWeight = 1 - 0.051 - this.fivebasicrate
        const r = Math.random()
        if (r < FiveStarWeight) {
            this.FiveStarCounter = 0
            if (Math.random() <= this.fiveUPrate) { this.fiveUPrate = 0.5; return 6 }
            this.fiveUPrate = 1
            return 5
        } else if (r - FiveStarWeight < FourStarWeight) {
            this.FourStarCounter = 0
            if (Math.random() <= this.fourUPrate) { this.fourUPrate = 0.5; return 4 }
            this.fourUPrate = 1
            return 3
        } else {
            return 2
        }
    }
    reset() {
        this.FiveStarCounter = 0
        this.FourStarCounter = 0
        this.fiveUPrate = 0.5
    }
}

export default Gacha;