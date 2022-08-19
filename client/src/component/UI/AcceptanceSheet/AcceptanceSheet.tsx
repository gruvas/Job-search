import { useEffect, useState } from 'react';

import { useHttp } from '../../../hooks/http.hook';

import { monthNames } from '../../monhNames';


const AcceptanceSheet = () => {
    const {request} = useHttp()
    let fields: IFields[] = []

    const [data, setData] = useState<IFields[]>([])

    let data_obj: any, user_obj

    useEffect(() => {
        let data = request('/api/reception_unemployed/time', 'POST').then((value) => {return (value)})
    
    
        const data_acquisition = async () => {
            data_obj = await data;
            
            //@ts-ignore
            let user = request('/api/users/user_search', 'POST', {userId: data_obj[0].unemployed}).then((value) => {return (value)})

            const printAddress = async () => {
                user_obj = await user;

                for(let i = 0; i < data_obj.length; i++) {
                    let date: Date = new Date(data_obj[i].date)

                    fields.push({
                        date: date,
                        day: date.getDate(),
                        month: monthNames(date.getMonth()),
                        hours: date.getHours(),
                        minutes: date.getMinutes(),
                        name: user_obj.name,
                        profession: user_obj.profession,
                        education: user_obj.education,
                        salary: user_obj.salary,
                        phone: user_obj.phone,
                        contacts: user_obj.contacts
                    })
                }

                fields.sort(function(a,b){return new Date(a.date).getTime() - new Date(b.date).getTime()});
                setData(fields)
            };

            printAddress()
        };

        data_acquisition()
    }, [])

    return (
        <div>
            {data.map((post, index) => 
                <div key={'acceptance_sheet' + index}>

                    {index != 0 && data[index-1].day == post.day 
                    && data[index-1].month == post.month ? (
                            <div></div>
                        ) : (
                            <div className='personal_area_admin_date'>
                                {`${post.day} ${post.month}`}
                            </div>
                        )
                    }

                    <div className='personal_area_admin_card'>
                        <div className='pa_time'>
                            <p>Время:&ensp;</p>

                            {post.minutes == 0 ? (
                                <p>{`${post.hours}: 00`}</p>
                                ) : (
                                    <p>{`${post.hours}: ${post.minutes}`}</p>
                                )
                            }
                        </div>

                        <div className='pa_main_information'>
                            <div className='pa_field'>
                                <p>
                                    {post.name}
                                </p>
                            </div>

                            {post.profession == undefined ? (
                                <div></div>
                            ) : (
                                    <div className='pa_field'>
                                        <p>
                                            Профессия:&ensp;
                                        </p>

                                        <p>{`${post.hours}: ${post.minutes}`}</p>
                                    </div>
                                )
                            }

                            {post.education == undefined ? (
                                    <div></div>
                            ) : (
                                    <div className='pa_field'>
                                        <p>
                                            Образование:&ensp;
                                        </p>

                                        <p>{post.education}</p>
                                    </div>
                                )
                            }

                            {post.salary == undefined ? (
                                    <div></div>
                            ) : (
                                    <div className='pa_field'>
                                        <p>
                                            Желаемая заработная плата:&ensp;
                                        </p>

                                        <p>
                                            {post.salary}
                                        </p>
                                    </div>
                                )
                            }

                            {post.phone == undefined || post.phone == '' ? (
                                    <div></div>
                            ) : (
                                    <div className='pa_field'>
                                        <p>
                                            Телефон:&ensp;
                                        </p>

                                        <p>
                                            {post.phone}
                                        </p>
                                    </div>
                                )
                            }

                            {post.contacts == undefined ? (
                                    <div></div>
                            ) : (
                                    <div className='pa_field'>
                                        <p>
                                            Дополнительные контакты:&ensp;
                                        </p>

                                        <p>
                                            {post.contacts}
                                        </p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>  
            )}
        </div>
    );
}

export default AcceptanceSheet;


interface IFields {
    date: Date,
    day: number,
    month: string,
    hours: number,
    minutes: number,
    name: string,
    profession: string,
    education: string,
    salary: string,
    phone: string,
    contacts: string
}