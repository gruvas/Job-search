import sort_options from "../../../store/sort_options"


const salary_change = () => {
    const radio = document.getElementById('radio_income5') as HTMLInputElement

    radio!.checked = true

    const input_element = document.getElementById('input_income5') as HTMLInputElement

    sort_options.updateSalary(Number(input_element.value))
}

export default salary_change;
