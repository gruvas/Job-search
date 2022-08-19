import sort_options from "../../../store/sort_options"

const handler_radio_check = (e:any): string => {
    const arr_income: number[] = [0, 13000, 24000, 41000, 1]
    const arr_experience: string[] = [
        'Не имеет значения', 'От 1 года до 3 лет', 
        'Нет опыта', 'От 3 до 6 лет', 'Более 6 лет'
    ]

    const reg_income_numbers = new RegExp(/income(.*)/)
    const reg_experience_numbers = new RegExp(/experience(.*)/)


    let active_input: string = e.target.value

    let check_salary = reg_income_numbers.exec(active_input)
    let check_experience = reg_experience_numbers.exec(active_input)
    // let [original_expression, result] = regExp!.exec(active_input)
    
    if(check_salary != null) {
        console.log(check_salary[1])

        

        if(Number(check_salary![1]) == 5) {
            const input_element = document.getElementById('input_income5') as HTMLInputElement

            sort_options.updateSalary(Number(input_element.value))
        } else {
            sort_options.updateSalary(arr_income[Number(check_salary[1])-1])
        }

        console.log(sort_options.salary)
    } else {
        console.log(check_experience![1])

        sort_options.updateExperience(arr_experience[Number(check_experience![1])-1])

        console.log(sort_options.experience)
    }


    return active_input 
}

export default handler_radio_check