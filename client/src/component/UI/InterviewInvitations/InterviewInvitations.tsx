import React from 'react';

const InterviewInvitations = () => {
    return (
        <div className='interview_invitations'>
            <h1 className='interview_invitations_title'>Приглашения на собеседования</h1>

            <div className='listVacancies'>
                <h1 className='listVacancies_profession'>
                    Frontend-разработчик React (TeamLead/Senior/Middle)
                </h1>
                <h1 className='listVacancies_company'>
                    Human Line
                </h1>
                <h1 className='listVacancies_salary'>
                    от 120 000 руб.
                </h1>
                <h1 className='listVacancies_address'>
                    Адрес: Преображенская улица, 107
                    Октябрьский район, Киров, 610046 
                </h1>
                <h1 className='listVacancies_description'>
                    Разработка нового функционала, в соответствии с описанием задач в Jira, Confluence и других ресурсах. Исправление найденных дефектов и оптимизация кода.
                    Знание библиотеки React (Обязательно). Redux или MobX. Знание TypeScript. Понимание верстки (HTML, CSS или любой препроцессор). Опыт работы с Server...
                </h1>

                <div className='interview_invitations_contacts'>
                    <p>Контакты:&ensp;</p>
                    <p>test@mail.com</p>
                </div>

                <button className='listVacancies_respond delete'>Удалить</button>
            </div>
        </div>
    );
}

export default InterviewInvitations;
