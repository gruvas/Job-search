import React from 'react';
import { IPropsUser } from '../../interface/IPropsUser';

const UserList = (props: IPropsUser) => {

    let value = props.value
    
    return (
        <div className='listVacancies'>

            {value.profession !== '' && value.profession !== undefined && (
                <p className='listVacancies_profession'>{value.profession}</p>
            )}

            {value.name !== '' && value.name !== undefined && (
                <p className='listVacancies_profession'>{value.name}</p>
            )}

            {value.salary !== '' && value.salary !== undefined && (
                <p className='listVacancies_address'>{value.salary} руб</p>
            )}
            
            {value.education !== '' && value.education !== undefined && (
                <div className='listVacancies_address'>
                    <p className='bold'>Образование: </p>
                    <p>{value.education}</p>
                </div>
            )}

            {value.experience !== '' && value.experience !== undefined && (
                <div className='listVacancies_address'>
                    <p className='bold'>Опыт работы: </p>
                    <p>{value.experience}</p>
                </div>
            )}

            {value.about_me !== '' && value.about_me !== undefined && (
               <div className='listVacancies_address'>
                    <p className='bold'>Обо мне: </p>
                    <p>{value.about_me}</p>
                </div>
            )}            

            <div className='listVacancies_address'>
                <p className='bold'>Контакты: </p>
                <p>{value.contacts}</p>
            </div>
        
        </div>
    );
}

export default UserList;
