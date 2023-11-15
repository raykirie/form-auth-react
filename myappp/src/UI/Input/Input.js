import s from './Input.module.css'
import {forwardRef} from 'react'


const Input = forwardRef((props, ref) => {
    return(
        <input {...props} ref={ref} className={s.inp_elem}/>
    )
})

export default Input