import { makeAutoObservable } from 'mobx'

class SortOptions {
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

const sort_options = new SortOptions()

export default sort_options
