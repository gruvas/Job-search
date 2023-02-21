import { makeAutoObservable } from 'mobx'

class SearchString {
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

const search_string = new SearchString()

export default search_string
