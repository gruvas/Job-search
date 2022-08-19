import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../component/UI/Header/Header';
import JobCreation from '../component/UI/JobCreation/JobCreation';
import ListCreatedVacancies from '../component/UI/ListCreatedVacancies/ListCreatedVacancies';
import ListEmployees from '../component/UI/ListEmployees/ListEmployees';
import { useHttp } from '../hooks/http.hook';

import { IVacancies } from '../component/interface/IVacancies';

const PersonalAreaEmployer = () => {
    const {request} = useHttp()

    const [vacancies, setVacancies] = useState<IVacancies[]>([]);
    const [typeUser, setTypeUser] = useState<IVacancies[]>([]);
    const [users, setUsers] = useState<any[]>([]);

    let useData = JSON.parse(localStorage.getItem('useData') || 'false')
    let user_id: string = useData.userId


    useEffect(() => {
        // @ts-ignore
        let intermediate = request('/api/vacancy/vacancy_search', 'POST', {user_id})

        intermediate.then((value) => {
            setVacancies(value)
        })

        // @ts-ignore
        let user = request('/api/users/user_search', 'POST', {userId: user_id})

        user.then((value) => {
            setTypeUser(value.type)
        })

        const post_search = async () => {
            setUsers(await array_creation(request, user_id))
        }
        
        post_search()
    }, [])

    useEffect(() => {
        console.log('users', users)
    }, [users])
    

    return (
        <div>
            <Header/>

            <div className='navbar'>
                <Link className='link' to="/">Перейсти на основную страницу</Link>
            </div>

            <div className='main_content personal_area'>

                {vacancies.map((post, index) =>
                        <ListCreatedVacancies value={post} type={typeUser} 
                        index={index} key={'list_created_vacancies' + post._id}/>
                    )
                }

                <JobCreation/>

                {users.map((post, index) =>
                        <ListEmployees value={post} index={index}
                        key={'list_employees' + post._id + index}/>
                    )
                }

            </div>
        </div>
    );
}

export default PersonalAreaEmployer;


async function array_creation(request: any, userId: string) {
    let arr_links: any
    let arr_users: any[] = []

    let intermediate_vacancy, intermediate_users

    //@ts-ignore
    let data = request('/api/users/links_vacancy', 'POST', {userId}).then((value) => {
        console.log('userId', userId)
        console.log('value', value)
        return (value)
    })

    arr_links = await data;

    for(let i = 0; i < arr_links.length; i++) {
        //@ts-ignore
        let vacancy = request('/api/vacancy/vacancyid_search', 'POST', {id: arr_links[i]}).then((value) => {
            // setArr_links(value)
            return (value)
        })

        intermediate_vacancy = await vacancy

        //@ts-ignore
        let user = request('/api/vacancy/user_search', 'POST', {id: intermediate_vacancy}).then((value) => {
            // setArr_links(value)

            return (value)
        })

        intermediate_users = await user

        if(intermediate_users.length != 0) {
            intermediate_users.vacancy_id = intermediate_vacancy._id

            arr_users.push(intermediate_users)
        }
    }

    return(arr_users)
}