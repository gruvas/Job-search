import { makeAutoObservable } from "mobx"

class visiting_time {
    visiting_time: IVisitingTime[] = []

    constructor() {
        makeAutoObservable(this)
    }

    addTime(time: IVisitingTime) {
        this.visiting_time.push(time)
    }

    removeTime(id: string) {
        this.visiting_time = this.visiting_time.filter( time => time._id !== id)
    }

    fetchTime(request: any) {
        try {
            this.visiting_time = request('/api/reception_unemployed/time', 'POST')           
        } catch (e) {}
    }

}

export default new visiting_time()

interface IVisitingTime {
    _id: string
    date: Date
    employee: string
    unemployed: string
}

