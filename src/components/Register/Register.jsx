import styles from './Register.module.scss';
import Dialog from '@mui/material/Dialog';
import FormInput from '../FormInput';
import { useDispatch, useSelector } from 'react-redux';
import { updateStateDialog, updateStateDialogRegister } from '../../store/authSlice';
import { RegisterSchema } from '../../utils/validate';
import authApi from '../../api/authApi';
import { toast } from 'react-toastify';

const listFeild = [
    {
        name: 'username',
        type: 'text',
        label: 'User Name'
    },
    {
        name: 'email',
        type: 'email',
        label: 'Email@gmail.com'
    },
    {
        name: 'password',
        type: 'password',
        label: 'Password'
    },
    {
        name: 'confirmPassword',
        type: 'password',
        label: 'Confirm Password'
    }
]

const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
}

export default function Register() {

    const dispatch = useDispatch()
    const state = useSelector(state => state.auth.stateDialogRegister)
    const handleClickLogin = () => {
        const action1 = updateStateDialogRegister(false)
        dispatch(action1)
        const action2 = updateStateDialog(true)
        dispatch(action2)
    }
    const handleClickClear = () => {
        const action3 = updateStateDialogRegister(false)
        dispatch(action3)
    }
    const handleRegister = async (user, handleClick) => {
        handleClick(true)
        try {
            const response = await authApi.register(user);
            if (response.data.status === 201) {
                const action1 = updateStateDialogRegister(false)
                const action2 = updateStateDialog(true)
                dispatch(action1)
                dispatch(action2)
                toast.success(response.data.message)
            }
            else {
                toast.error('Register fail')
            }
        }
        catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
        handleClick(false)
    }


    return (
        <div>
            <Dialog
                open={state}
                maxWidth="xl"
                PaperProps={{
                    style: { borderRadius: 20 }
                }}
            >
                <div className={styles.loginForm} >
                    <div className={styles.imageForm}>
                        <p>Shop App</p>
                        <img src="https://scontent.xx.fbcdn.net/v/t1.15752-9/288103688_447706724131245_8597908434528655865_n.png?stp=dst-png_s180x540&_nc_cat=105&ccb=1-7&_nc_sid=aee45a&_nc_ohc=9GtwBGoEqkUAX_2jaCP&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdQNd3noBVedbURLNQ8gLWoaJwkDL-b6wDMGbraX1oAzOg&oe=636FC7CA" width="133" height="150"></img>
                    </div>

                    <div className={styles.inputForm}>
                        <h1>Welcome to Shop App</h1>
                        <FormInput
                            listFeild={listFeild}
                            typeButton={'Register'}
                            handleClickClear={handleClickClear}
                            initialValues={initialValues}
                            validate={RegisterSchema}
                            handleValues={handleRegister}
                        />
                        <div className={styles.featureMore1} onClick={handleClickLogin}>
                            <label>Login</label>
                        </div>
                        <div className={styles.featureMore2}>
                            <label>Show</label>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}