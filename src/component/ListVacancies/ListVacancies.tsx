import React from 'react';

const ListVacancies = () => {
    return (
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

            <button className='listVacancies_respond'>Откликнуться</button>
            <button className='listVacancies_show_contacts'>Показать контакты</button>
        </div>
    );
}

export default ListVacancies;
