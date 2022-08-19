export const exit = () => {
    let confirmation: boolean = window.confirm("Вы точно хотите выйти?");

    if(confirmation == true) {
        localStorage.removeItem('useData')
        window.location.href = '/';
    }
}