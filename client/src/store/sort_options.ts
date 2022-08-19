import { makeAutoObservable } from "mobx"

class sort_options {    
    experience = 'Не имеет значения'
    salary = 0
    state = false

    constructor() {
        makeAutoObservable(this)
    }

    updateExperience(experience: string) {
        this.experience = experience
    }

    updateSalary(salary: number) {
        this.salary = salary
    }

    updateState(state: boolean) {
        this.state = state
    }
}

export default new sort_options()
