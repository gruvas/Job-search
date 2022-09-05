import React, { useState, useEffect } from 'react';

import DisplayPassword from '../component/display_password';
import PhoneNumberValidation from '../component/validation/phone_number_validation';
import { useHttp } from '../hooks/http.hook'
import arrow_down from '../img/arrow_down.svg'
import eye from '../img/eye.svg'


const Registration = () => {
    const {loading, request} = useHttp()

    const [form, setForm] = useState({
        email: '',
        password: '',
        name: '',
        phone: '',
        about_me: '',
        type: ''
    })

    const [isOpen, setOpen] = useState(false);
    const [title, setTitle] = useState('Поиск работы')

    useEffect(() => {
        let type_user

        if(title === 'Поиск работы') {
            type_user = 'workman'
        } else {
            type_user = 'employer'
        }

        setForm({...form, type: type_user})
    }, [title])


    const [typePassword, setTypePassword] = useState('password');

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            await request('/api/auth/register', 'POST', {...form})
            
            alert('Регистрация завершена')
            window.location.href = '/'

        } catch (e) {
            alert('Необходимо заполнить все поля и придумать пароль не меньше 6 символов. Может быть данный email уже зарегистрирован.')
        }
    }

    return (
        <div className='registration'>
            <h1>
                Регистрация
            </h1>

            <input className="registration_email" type="text" placeholder='Email' 
            id='email' name='email' onChange={changeHandler} maxLength={35}/>

            <div className='registration_password'>
                <input className="registration_password_input" type={typePassword} placeholder='Пароль'
                id='password' name='password' onChange={changeHandler} maxLength={35}/>
                <button className="registration_password_btn" onClick={() => setTypePassword(DisplayPassword(typePassword))}>
                    <img className="registration_password_btn_img" src={eye} alt="" />
                </button>
            </div>

            <input className="registration_name" type="text" placeholder='ФИО' 
            id='name' name='name' onChange={changeHandler} maxLength={50}/>
            <input className="registration_phone" type="text" placeholder='Телефон' onKeyPress={PhoneNumberValidation} 
            id='phone' name='phone' onChange={changeHandler} maxLength={25}/>
            <textarea className="registration_about_me" placeholder='О себе' 
            id='about_me' name='about_me' onChange={changeHandler} maxLength={254}></textarea>

            <div className='dropdown no_select'>
                <div className='dropdown_title' onClick={() => setOpen(!isOpen)}>
                    <p className='dropdown_title_p'>{title}</p> 
                    <img src={arrow_down} alt="" />
                </div>

                {
                    isOpen && (
                        <>
                            <div className='dropdown_value'>
                                <div onClick={() => {setTitle('Поиск работы'); setOpen(false)}}>Поиск работы</div>
                                <hr className='dropdown_hr'/>
                                <div  onClick={() => {setTitle('Поиск сотрудника'); setOpen(false)}}>Поиск сотрудника</div>
                            </div>
                        </>
                    )
                }

            </div>

            <button className='registration_btn' onClick={registerHandler} disabled={loading}>Завершить регистрацию</button>
        </div>
    );
}

export default Registration;



