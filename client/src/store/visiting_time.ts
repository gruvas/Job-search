import { makeAutoObservable } from 'mobx'
import { IVisitingTime } from '../component/interface/IVisitingTime'

class VisitingTime {
	visiting_time: IVisitingTime[] = []

	constructor() {
		makeAutoObservable(this)
	}

	addTime(time: IVisitingTime) {
		this.visiting_time.push(time)
	}

	removeTime(id: string) {
		this.visiting_time = this.visiting_time.filter((time) => time._id !== id)
	}

	fetchTime(request: any) {
		try {
			this.visiting_time = request('/api/reception_unemployed/time', 'POST')
		} catch (e) {}
	}
}

const visiting_time = new VisitingTime()

export default visiting_time
