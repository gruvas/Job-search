const SalaryValidation = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let theEvent = e || window.event;
    let key_number: number = theEvent.keyCode || theEvent.which;
    let key_string: string = String.fromCharCode( key_number );
    let regex = /[0-9]/;
    if( !regex.test(key_string) ) {
        if(theEvent.preventDefault) theEvent.preventDefault();
    }
}

export default SalaryValidation;
