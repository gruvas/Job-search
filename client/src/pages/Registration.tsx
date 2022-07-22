import React from 'react';

const Registration = () => {
    return (
        <div className='registration'>
            <h1>
                Регистрация
            </h1>

            <input className="registration_email" type="text" placeholder='Email' maxLength={35}/>
            <input className="registration_password" type="password" placeholder='Пароль' maxLength={35}/>
            <input className="registration_name" type="text" placeholder='ФИО' maxLength={50}/>
            <input className="registration_phone" type="text" placeholder='Телефон' maxLength={20}/>
            <textarea className="registration_about_me" placeholder='О себе' maxLength={254}></textarea>

            <button className='registration_btn'>Завершить регистрацию</button>
        </div>
    );
}

export default Registration;
