export interface IUser {
    _id: string
    email: string
    password: string
    phone: string
    about_me: string
    name?: string
    type?: string
    salary?: string
    status?: string
    looking_job: boolean
    profession?: string
    education?: string
    experience?: string
    contacts?: string
    links_time_receipt?: string[]
    links_vacancy?: string[]
    links_company?: string[]
    links_employee?: string[]
}