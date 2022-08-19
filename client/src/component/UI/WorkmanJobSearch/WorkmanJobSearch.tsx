import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { useHttp } from '../../../hooks/http.hook';
import sort_options from '../../../store/sort_options';

import { IVacancies } from '../../interface/IVacancies'
import ListCreatedVacancies from '../ListCreatedVacancies/ListCreatedVacancies';
import search_string from '../../../store/search_string';

const WorkmanJobSearch = observer(() => {
    const {request} = useHttp()

    let userId = JSON.parse(localStorage.getItem('useData') || 'false').userId

    const [vacancies, setVacancies] = useState<IVacancies[]>([]);
    const [typeUser, setTypeUser] = useState<IVacancies[]>([]);

    useEffect(() => {
        const user_verification = async () => {
            //@ts-ignore
            let data = request('/api/auth/check', 'POST', {id: userId}).then((value) => {
                return value
            })
    
            let user = await data
            
            if(user == null) {
                localStorage.removeItem('useData')

                window.location.reload()
            }
        }

        if(userId !== undefined) {
            user_verification()
        }

        // @ts-ignore
        let intermediate = request('/api/vacancy/active_vacancy_search', 'POST')

        intermediate.then((value: any) => {
            setVacancies(value)
        })

        // @ts-ignore
        let user = request('/api/users/user_search', 'POST', {userId})

        user.then((value: any) => {
            setTypeUser(value.type)
        })
        
    }, [])

    useEffect(() => {
        if(sort_options.state == true) {
            console.log(1)

            if(sort_options.experience == 'Не имеет значения') {
                //@ts-ignore
                let intermediate = request('/api/vacancy/vacancy_search_salary', 'POST', {salary: Number(sort_options.salary)})

                intermediate.then((value: any) => {
                    setVacancies(value)
                })
            } else {
                //@ts-ignore
                let intermediate = request('/api/vacancy/vacancy_search_salary_experience', 'POST', {salary: sort_options.salary, experience: sort_options.experience})

                intermediate.then((value: any) => {
                    setVacancies(value)
                })
            }

            sort_options.updateState(false)
        }
    }, [sort_options.state])

    useEffect(() => {
        if(search_string.state == true) {
            //@ts-ignore
            let intermediate = request('/api/vacancy/vacancy_search_name', 'POST', {text: search_string.text})
            
            intermediate.then((value: any) => {
                setVacancies(value)
            })

            search_string.updateState(false)
        }
    }, [search_string.state])

    return (
        <>
            {vacancies.map((post, index) =>
                    <ListCreatedVacancies value={post} type={typeUser} index={index} key={post._id}/>
                )
            }
        </>
    );
})

export default WorkmanJobSearch;