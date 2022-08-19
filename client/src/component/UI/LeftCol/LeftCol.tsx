import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import style from './LeftCol.module.css'

import handler_radio_check from './handler_radio_click'

import SalaryValidation from "../../validation/salary_validation";
import sort_options from '../../../store/sort_options';
import salary_change from './salary_change';

const LeftCol = observer((props?: any) => {
    let st = props.value

    return (
        <div className={`left_col ${st}`}>
            
            <div className={style.income}>
                <p>Уровень дохода</p> 

                <div className={style.block_radio}>
                    <input 
                        type="radio" 
                        name="income" 
                        value="income1" 
                        onChange={handler_radio_check}
                        defaultChecked
                    />
                    <label> Не имеет значения</label>
                </div>

                <div className={style.block_radio}>
                    <input 
                        type="radio" 
                        name="income" 
                        value="income2"
                        onChange={handler_radio_check}
                    />
                    <label> от 13 000 руб.</label>
                </div>

                <div className={style.block_radio}>
                    <input 
                        type="radio" 
                        name="income" 
                        value="income3"
                        onChange={handler_radio_check}
                    />
                    <label> от 24 000 руб.</label>
                </div>

                <div className={style.block_radio}>
                    <input 
                        type="radio" 
                        name="income" 
                        value="income4"
                        onChange={handler_radio_check}
                    />
                    <label> от 41 000 руб.</label>
                </div>
                
                <div className={style.block_radio}>
                    <input
                        id='radio_income5'
                        type="radio" 
                        name="income" 
                        value="income5"
                        onChange={handler_radio_check}
                    />
                    <label> Своя зарплата</label>
                </div>
                
                <div className={style.block_radio}>
                    <input
                        id='input_income5'
                        type="text" 
                        name="income" 
                        placeholder='от'
                        onChange={salary_change}
                        onKeyPress={SalaryValidation}
                        maxLength={12}
                    />
                </div>
            </div>
            
            
            <div className={style.experience}>
                <p>Опыт работы</p> 

                <div className={style.block_radio}>
                    <input 
                        type="radio" 
                        name="experience" 
                        value="experience1" 
                        onChange={handler_radio_check}
                        defaultChecked
                    />
                    <label> Не имеет значения</label>
                </div>

                <div className={style.block_radio}>
                    <input 
                        type="radio" 
                        name="experience" 
                        value="experience2"
                        onChange={handler_radio_check}
                    />
                    <label> от 1 года до 3 лет </label>
                </div>

                <div className={style.block_radio}>
                    <input 
                        type="radio" 
                        name="experience" 
                        value="experience3"
                        onChange={handler_radio_check}
                    />
                    <label> Нет опыта</label>
                </div>

                <div className={style.block_radio}>
                    <input 
                        type="radio" 
                        name="experience" 
                        value="experience4"
                        onChange={handler_radio_check}
                    />
                    <label> от 3 до 6 лет</label>
                </div>

                <div className={style.block_radio}>
                    <input 
                        type="radio" 
                        name="experience"
                        value="experience5"
                        onChange={handler_radio_check}
                    />
                    <label> Более 6 лет</label>
                </div>
            </div>

            <button className={style.left_col_btn} onClick={filtering_application}>Применить</button>

        </div>
    );
})

export default LeftCol;

function filtering_application() {
    sort_options.updateState(true)
}