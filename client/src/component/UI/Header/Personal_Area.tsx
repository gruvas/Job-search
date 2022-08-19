import { useEffect, useState } from 'react';

import { useHttp } from '../../../hooks/http.hook';


import { exit } from '../../exit_personal_accountю';
import { IUser } from '../../interface/IUser';
import { user_search } from '../../requests/user_search';
import { status_change } from './status_change';




const PersonalArea = () => {
    const {request} = useHttp()

    const [data_user, setUser] = useState<IUser>({
        _id: '',
        email: '',
        password: '',
        phone: '',
        about_me: '',
        salary: '',
        looking_job: false
    })
    
    useEffect(() => {
        let data = user_search(request)

        data.then(async function(value: any){
            await setUser(value)
        })
    }, [])
    
    return (
        <div className='header_personal_area'>
            <div>
                <div className='header_personal_area_text'>
                    <h1>Личный кабинет</h1>
                    <p className='header_personal_area_email'>{data_user.email || 'email'}</p>
                    <p className='header_personal_area_name'>{data_user.name || 'name'}</p>
                    

                        {
                            data_user.type == 'workman' && (
                                <>
                                    <div className='header_personal_area_status'>
                                        <p>Статус: </p>
                                        {data_user.looking_job ? (
                                                <p className='status_active'>&nbsp;активен</p>
                                            )
                                            : <p className='status_not_active'>&nbsp;неактивен</p>
                                        }
                                    </div>
                                    
                                    <p className='header_personal_area_change' onClick={() => {status_change(request, data_user)}}>Изменить статус</p>
                                </>
                            )
                        }

                </div>

                <button className='header_personal_area_btn' onClick={exit}>Выйти</button>
            </div>
        </div>
    );
}

export default PersonalArea;


