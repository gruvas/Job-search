export function user_search(request) {
    let user_obj = JSON.parse(localStorage.getItem('useData'))

    try {
        let user = request('/api/users/user_search', 'POST', { ...user_obj })
        return user
    } catch (e) { }
}