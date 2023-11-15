import { Link } from 'react-router-dom'
import Button from '../../UI/Button/Button'
import s from './FromElem.module.css'
import Input from '../../UI/Input/Input'
import {useForm} from 'react-hook-form'


function FromELem(props){
    const {title, type, button, link, input, infoText} = props
    const {
        register,
        reset,
        handleSubmit,
        formState: {errors},
        watch
    } = useForm()
    

    const onSubmit = (data) => {
        console.log(data)
        console.log('SecPass', watch('password'))
        reset()
    }

    const enterHandler = (event) => {
        if (event.key === 'Enter'){
            event.preventDefault()
        }
    }

    return(
        <div>
            <form 
                    onSubmit={handleSubmit(onSubmit)}
                    onKeyDown={enterHandler}
            >
                <h2>{title}</h2>
                
                <p>{input.email}</p>

                {/* Почта */}
                <Input {...register('email', {
                    required: 'Поле должно быть заполнено',
                    pattern: {
                        value: /^([A-z])+([0-9-_.])*([A-z0-9-_.])*@([A-z])+([0-9-_.])*([A-z0-9-_.])*[.]([A-z]){2,6}$/,
                        message: 'Указана неверная почта'
                    }
                })}/>
                    {errors.email && <p className={s.warning_text}>{errors.email.message}</p>}

                {/* Пароль */}
                {type !== 'reset' && (
                    <>
                        <p>{input.password}</p>
                        <Input {...register('password', {
                            required: 'Поле должно быть заполнено',
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                message: 'Пароль должен содержать минимум 8 букв и хотя бы 1 цифру'
                            }
                        })}/>
                         {errors.password && <p className={s.warning_text}>{errors.password.message}</p>}
                    </>
                )}
                   


                {/* Сброс пароля */}
                {type === 'reg' && (
                    <>
                        <p>{input.secondPass}</p>
                        <Input {...register('secondPass', {
                            required: 'Подтверждение пароля должно быть заполненно',
                            validate: (value) => value === watch('password') || 'Пароли не совпадают'
                        })}/>
                        {errors.secondPass && <p className={s.warning_text}>{errors.secondPass.message}</p>}
                    </>
                )}
                
                
                <p className={s.info_text}>{infoText}</p>

                {type === 'login' && (
                    <Link to={'/reset'}>
                        <p>Сброс пароля</p>
                    </Link>
                )}

                <Link to={link} className='decoration_none'>
                    <Button title={button.redirect} color={'white'}/>
                </Link>

                <Button title={button.submit} color={'yellow'}/>
            </form>
        </div>
    )
}

export default FromELem