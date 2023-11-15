
import {Route, Routes, } from 'react-router-dom'
import s from './Modal.module.css'
import FromELem from '../FormElem/FromElem'
import { useEffect } from 'react'
import { ReactComponent as XMark } from '../../icons/xmark-solid.svg'


function Modal({active, setActive}){

    const handlerEscapeKeyPress = (event) => {
        if (event.key === 'Escape'){
            setActive(false)
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handlerEscapeKeyPress)
    }, [])



    // window.onkeydown =(e) => {
    //     if (e.key === 'Escape'){
    //         setActive(false)
    //     }
    // }


    return(
        <div className={`${s.modal} ${active && s.active}`} onClick={() => setActive(false)}>
            <div onClick={(e) => e.stopPropagation()} className={`${s.modal_content} ${active && s.active}`}>
                <XMark className={s.icon_modal} onClick={() => setActive(false)}/>
                <Routes>
                    <Route path='/login' element={<FromELem
                                                                    title={'Авторизация'}
                                                                    type={'login'}
                                                                    button={{submit: 'Авторизоваться', redirect: 'Регистрация'}}
                                                                    link={'/registration'}
                                                                    input={{email: 'Почта', password: 'Пароль'}}
                                                                    infoText={'Укажите логин и пароль для авторизации'}
                                                        />}/>
                    <Route path='/registration' element={<FromELem
                                                                    title={'Регистрация'}
                                                                    type={'reg'}
                                                                    button={{submit: 'Зарегистрироваться', redirect: 'Авторизация'}}
                                                                    link={'/login'}
                                                                    input={{email: 'Почта', password: 'Пароль', secondPass: 'Подтверждение пароля'}}
                                                                    infoText={'Регистрируясь, вы соглашаетесь с нашими правилами политики и конфиденциальности'}
                                                        />}/>
                    <Route path='/reset' element={<FromELem
                                                                    title={'Сброс пароля'}
                                                                    type={'reset'}
                                                                    button={{submit: 'Сброс пароля', redirect: 'Авторизация'}}
                                                                    link={'/login'}
                                                                    input={{email: 'Почта'}}
                                                                    infoText={'Указав почту, к вам придет письмо для сброса пароля. Срок активации сброса - 24 часа'}
                                                        />}/>
                </Routes>
            </div>     
        </div>

    )
}

export default Modal