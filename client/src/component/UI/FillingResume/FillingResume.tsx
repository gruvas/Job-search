import { useEffect, useState } from "react";

import { useHttp } from "../../../hooks/http.hook";
import SalaryValidation from "../../validation/salary_validation";
import PhoneNumberValidation from "../../validation/phone_number_validation";
import update_vacancy from "./update_vacancy";
import { user_search } from "../../requests/user_search";

import arrow_down from '../../../img/arrow_down.svg'


const FillingResume = () => {
    const {request} = useHttp()
    
    const [data_user, setData_user] = useState({
        name: '',
        phone: '',
        about_me: '',
        profession: '',
        education: '',
        experience: '',
        salary: '',
        contacts: '',
        looking_job: true,
    })
    
    const [isOpen, setOpen] = useState(false)

    const [experience, setExperience] = useState('Требуемый опыт работы')
    
    useEffect(() => {
        let data = user_search(request)
        
        data.then(async function(value: any){
            await setData_user(value)

            await setExperience(value.experience || 'Требуемый опыт работы')
        })
    }, [])
    

    useEffect(() => {
        setData_user({...data_user, experience})
    }, [experience])

    

    const changeHandler = (event: any) => {
        setData_user({...data_user, [event.target.name]: event.target.value})
    }

    return (
        <div>
            <h1 className='main_content_title'>Личный кабинет</h1>

            <div className="filling_resume">
                <div>
                    <p className="filling_resume_title">ФИО</p>
                    <input type="text" className="filling_resume_input"  
                    id='name' name='name' defaultValue={data_user.name}
                    onChange={changeHandler} maxLength={75}/>
                </div>

                <div>
                    <p className="filling_resume_title">Профессия</p>
                    <input type="text" className="filling_resume_input"  
                    id='profession' name='profession' defaultValue={data_user.profession}
                    onChange={changeHandler} maxLength={75}/>
                </div>

                <div>
                    <p className="filling_resume_title">Образование</p>
                    <input type="text" className="filling_resume_input" 
                    id='education' name='education' defaultValue={data_user.education}
                    onChange={changeHandler} maxLength={75}/>
                </div>

                <div className="job_creation_indent dropdown_block" onClick={() => setOpen(!isOpen)}>
                    <p className="filling_resume_title">{experience}</p>
                    <img src={arrow_down} alt="" />
                </div>

                {
                    isOpen && (
                        <>
                            <div className='dropdown_menu'>
                                <p className='dropdown_menu_text' onClick={() => {setExperience('Не имеет значения'); setOpen(false)}}>Не имеет значения</p>
                                <hr className='dropdown_menu_hr'/>
                                <p className='dropdown_menu_text' onClick={() => {setExperience('Нет опыта'); setOpen(false)}}>Нет опыта</p>
                                <hr className='dropdown_menu_hr'/>
                                <p className='dropdown_menu_text'  onClick={() => {setExperience('От 1 года до 3 лет'); setOpen(false)}}>От 1 года до 3 лет</p>
                                <hr className='dropdown_menu_hr'/>
                                <p className='dropdown_menu_text'  onClick={() => {setExperience('От 3 до 6 лет'); setOpen(false)}}>От 3 до 6 лет</p>
                                <hr className='dropdown_menu_hr'/>
                                <p className='dropdown_menu_text'  onClick={() => {setExperience('Более 6 лет'); setOpen(false)}}>Более 6 лет</p>
                            </div>
                        </>
                    )
                }

                <div>
                    <p className="filling_resume_title">О себе</p>
                    <textarea className="filling_resume_textarea" 
                    id='about_me' name='about_me' defaultValue={data_user.about_me}
                    onChange={changeHandler} maxLength={499}/>
                </div>

                <div>
                    <p className="filling_resume_title">Желаемая заработная плата</p>
                    <input  className="filling_resume_input filling_resume_salary" type="text"
                    id='salary' name='salary'  defaultValue={data_user.salary}
                    onChange={changeHandler} onKeyPress={SalaryValidation}  maxLength={15}/>
                </div>

                <div>
                    <p className="filling_resume_title">Телефон</p>
                    <input  className="filling_resume_input filling_resume_phone" type="text" 
                    id='phone' name='phone'  defaultValue={data_user.phone}
                    onChange={changeHandler} onKeyPress={PhoneNumberValidation}  maxLength={25}/>
                </div>

                <div>
                    <p className="filling_resume_title">Дополнительные контакты (почта, телефон и т.п.)</p>
                    <input  className="filling_resume_input filling_resume_phone" type="text" 
                    id='contacts' name='contacts'  defaultValue={data_user.contacts}
                    onChange={changeHandler} maxLength={50}/>
                </div>

                <button className="filling_resume_btn" onClick={() => update_vacancy(request, data_user)}>Завершить оформление вакансии</button>
            </div>
        </div>
    );
}

export default FillingResume;
