import React from 'react';
import { Link } from "react-router-dom";

const Authorization = () => {
    return (
        <div>
            <div className='login_form'>
                    <p>Личный кабинет</p>

                    <div className='login_form_input'>
                        <input className='login_form_input_email' placeholder='Email' type="text" />
                        <input className='login_form_input_password' placeholder='Пароль' type="password" />
                    </div>

                    <button onClick = {(event) => {console.log(131)}}  className='login_form_btn'>Вход</button>
                    
                    <Link className="registration_transition" to='registration'>
                        <p>Нет аккаунта?</p>
                        <p>Зарегистрируйся</p>
                    </Link>
                </div>
        </div>
    );
}

export default Authorization;
