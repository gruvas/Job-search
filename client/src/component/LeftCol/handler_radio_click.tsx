const handler_radio_check = (e:any): string => {
    let active_input: string = e.target.value
    console.log(active_input, typeof e)
    return active_input 
}

export default handler_radio_check