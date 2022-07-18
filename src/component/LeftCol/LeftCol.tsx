import React from 'react';

import cl from './LeftCol.module.css'

import handler_radio_check from './handler_radio_click'

const LeftCol = () => {
    return (
        <div className={cl.left_col}>
            
            <div className={cl.income}>
                <p>Уровень дохода</p> 

                <div className={cl.block_radio}>
                    <input 
                        type="radio" 
                        name="income" 
                        value="income1" 
                        onChange={handler_radio_check}
                        defaultChecked
                    />
                    <label> Не имеет значения</label>
                </div>

                <div className={cl.block_radio}>
                    <input 
                        type="radio" 
                        name="income" 
                        value="income2"
                        onChange={handler_radio_check}
                    />
                    <label> от 13 000 руб.</label>
                </div>

                <div className={cl.block_radio}>
                    <input 
                        type="radio" 
                        name="income" 
                        value="income3"
                        onChange={handler_radio_check}
                    />
                    <label> от 24 000 руб.</label>
                </div>

                <div className={cl.block_radio}>
                    <input 
                        type="radio" 
                        name="income" 
                        value="income4"
                        onChange={handler_radio_check}
                    />
                    <label> от 41 000 руб.</label>
                </div>
                
                <div className={cl.block_radio}>
                    <input 
                        type="radio" 
                        name="income" 
                        value="income5"
                        onChange={handler_radio_check}
                    />
                    <label> Своя зарплата</label>
                </div>
                
                <div className={cl.block_radio}>
                    <input 
                        type="text" 
                        name="income" 
                        placeholder='от'
                    />
                </div>
            </div>
            
            
            <div className={cl.experience}>
                <p>Опыт работы</p> 

                <div className={cl.block_radio}>
                    <input 
                        type="radio" 
                        name="experience" 
                        value="experience1" 
                        onChange={handler_radio_check}
                        defaultChecked
                    />
                    <label> Не имеет значения</label>
                </div>

                <div className={cl.block_radio}>
                    <input 
                        type="radio" 
                        name="experience" 
                        value="experience2"
                        onChange={handler_radio_check}
                    />
                    <label> от 1 года до 3 лет </label>
                </div>

                <div className={cl.block_radio}>
                    <input 
                        type="radio" 
                        name="experience" 
                        value="experience3"
                        onChange={handler_radio_check}
                    />
                    <label> Нет опыта</label>
                </div>

                <div className={cl.block_radio}>
                    <input 
                        type="radio" 
                        name="experience" 
                        value="experience4"
                        onChange={handler_radio_check}
                    />
                    <label> от 3 до 6 лет</label>
                </div>

                <div className={cl.block_radio}>
                    <input 
                        type="radio" 
                        name="experience"
                        value="experience5"
                        onChange={handler_radio_check}
                    />
                    <label> Более 6 лет</label>
                </div>
            </div>

                



        </div>
    );
}

export default LeftCol;
