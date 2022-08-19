import { useState } from 'react';
import { useHttp } from '../../../hooks/http.hook';

const ListEmployees = (props: any) => {
    const {request} = useHttp()

    let value = props.value[0]
    let index = props.index[0]
    let vacancyId = props.value.vacancy_id

    const [element_display, setElementDisplay] = useState(true)


    let storeg = JSON.parse(localStorage.getItem('useData') || 'false')

    function deleting_links(userId: string, vacancyId: string) {
        console.log(userId, vacancyId)
        //@ts-ignore
        request('/api/vacancy/deleting_links', 'POST', {userId, vacancyId})

        alert('Удаление прошло успешно')

        setElementDisplay(false)
    }

    console.log(value._id, storeg.userId)

    return (
        <div>
            {
                element_display && (
                    <>
                        {
                            index == 0 && (
                                <h1 className='title'>Список откликнувшихся</h1>
                            )
                        }

                        <div className='list_employees'>

                            {
                                value.profession != undefined && (
                                    <h1 className='listVacancies_profession'>
                                        {value.profession}
                                    </h1>
                                )
                            }

                            {
                                value.name != undefined && (
                                    <h1 className='listVacancies_company'>
                                        {value.name}
                                    </h1>
                                )
                            }

                            {
                                value.salary != undefined && (
                                    <h1 className='listVacancies_salary'>
                                        {value.salary} руб.
                                    </h1>
                                )
                            }

                            {
                                value.about_me != undefined && (
                                    <h1 className='listVacancies_description'>
                                        <p className='bold'>Обо мне</p>
                                        <p>{value.about_me}</p>
                                    </h1>
                                )
                            }

                            {
                                value.education != undefined && (
                                    <h1 className='listVacancies_description'>
                                        <p className='bold'>Образование</p>
                                        <p>{value.education}</p>
                                    </h1>
                                )
                            }

                            {
                                value.contacts != undefined && (
                                    <h1 className='list_employees_contacts'>
                                        <p className='bold'>Контакты для связи: </p>
                                        <p>{value.contacts}</p>
                                    </h1>
                                )
                            }

                            <button className='list_employees_btn_delete'
                            onClick={() => deleting_links(value._id, vacancyId)}>
                                Удалить
                            </button>
                        </div>
                    </>

                )
            }
        </div>
    );
}

export default ListEmployees;
