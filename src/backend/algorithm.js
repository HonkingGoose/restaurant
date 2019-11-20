module.exports = class Algorithm {
    init(availableTables, nrPeople) {
        this.availableTables = availableTables
        this.nrPeople = nrPeople

        this.solutions = []

        this.solutions.push(this.newSolution(1))

        console.log("Algorithm: ")
        console.log(this.solutions)
    }

    newSolution(nrTablesToUse) {
        for (const table of this.availableTables) {
            let combination = []
            combination.push(table)

            if (this.getCapacity(combination) >= this.nrPeople) {
                return combination
            }
        }
    }

    getCapacity(tables) {
        let cap = 0
        for (const table of tables) {
            cap += table.capacity
        }

        return cap
    }

    calculateFactor(combination) {
        const cap = this.getCapacity(combination)

        return Math.abs(((a * 2 + b) / b) - 1)
    }
}
