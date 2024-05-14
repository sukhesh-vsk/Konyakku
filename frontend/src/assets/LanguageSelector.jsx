import React, { useState } from 'react'
import { styles } from './style'

const LanguageSelector = (props) => {
    const [options, setOption] = useState(['en', 'ta', 'ja', 'fr', 'hi', 'ru', 'ml']);

    return (
        <div>
            {props.txt} ({props.lang}) : &nbsp;
            <select
                style={styles.select}
                value={props.lang}
                onChange={(e) => props.onChange(e.target.value)}
            >
                {options.map((opt, index) => (
                    <option
                        style={styles.option}
                        key={index}
                        value={opt}
                    >
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default LanguageSelector