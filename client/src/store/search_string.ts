import { makeAutoObservable } from 'mobx'

class search_string {
	text = ''
	state: boolean = false
	constructor() {
		makeAutoObservable(this)
	}

	updateText(text: string) {
		this.text = text
	}

	updateState(state: boolean) {
		this.state = state
	}
}

export default new search_string()
