import { IUser } from "./IUser"

export interface IVacancies extends IUser {
  name_organization?: string
  address?: string
  experience?: string
  employment?: string
  description?: string
  responsibilities?: string
  requirements?: string
  terms?: string
  links_user?: string[]
  links_creator?: string[]
}