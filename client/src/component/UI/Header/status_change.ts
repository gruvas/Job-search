import { IUser } from "../../interface/IUser"

 export async function status_change(request: any, data_user: IUser) {

    let user = {
        id:  data_user._id, 
        looking_job: !data_user.looking_job
    }

    if(!data_user.looking_job && !data_user.profession) {
        alert('Для изменения статуса необходимо в личном кабинете заполнить данные о себе.')
    } else {
       await request('/api/users/status_change', 'POST', {...user})
       alert('Статус изменен')
       window.location.reload()
    }
}