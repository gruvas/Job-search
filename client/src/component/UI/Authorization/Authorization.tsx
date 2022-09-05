import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useHttp } from '../../../hooks/http.hook';

const Authorization = () => {
    const {request} = useHttp()


    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const loginHandler = async () => {
        try {
            let data = await request('/api/auth/login', 'POST', {...form})

            window.localStorage.setItem('useData', JSON.stringify(data))
            
            alert('Вход выполнен успешно')
            window.location.reload()

        } catch (e) {
            alert('Неверный логин или пароль')
        }
    }



    return (
        <div>
            <div className='login_form'>
                    <p>Личный кабинет</p>

                    <div className='login_form_input'>
                        <input className='login_form_input_email' placeholder='Email' type="text" 
                        id='email' name='email' onChange={changeHandler}
                        />
                        <input className='login_form_input_password' placeholder='Пароль' type="password" 
                        id='password' name='password' onChange={changeHandler}
                        />
                    </div>

                    <button onClick = {loginHandler}  className='login_form_btn'>Вход</button>
                    
                    <Link className="registration_transition" to='registration'>
                        <p>Нет аккаунта?</p>
                        <p>Зарегистрируйся</p>
                    </Link>
                </div>
        </div>
    );
}

export default Authorization;
