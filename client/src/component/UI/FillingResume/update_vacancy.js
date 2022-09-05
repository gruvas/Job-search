const update_vacancy = (request, user) => {
    let user_obj = JSON.parse(localStorage.getItem('useData'))
    let user_id = user_obj.userId

    if(user.experience === undefined) {
        alert('Необходимо заполнить дополнительные контакты')
    } else {
        try {
            request('/api/users/update_vacancy', 'POST', {user_id, user})
        } catch (e) {}
    
        alert("Вакансия обновлена и выставлена для поиска.");
    }

}

export default update_vacancy;
