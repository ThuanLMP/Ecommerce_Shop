import styles from './ForgotPassword.module.scss'
import FormInput from '../FormInput';
import Dialog from '@mui/material/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import { updateStateDialog, updateStateDialogForgotPassword } from '../../store/authSlice';
import { ForgotPasswordSchema } from '../../utils/validate';
import authApi from '../../api/authApi';
import { toast } from 'react-toastify';

const listFeild = [
    {
        name: 'email',
        type: 'email',
        label: 'Email@gmail.com'
    },

]
const initialValues = {
    email: ''
}

export default function ForgotPassword() {

    const dispatch = useDispatch()
    const state = useSelector(state => state.auth.stateDialogForgotPassword)

    const handleClickLogin = () => {
        const action1 = updateStateDialogForgotPassword(false)
        const action2 = updateStateDialog(true)
        dispatch(action1)
        dispatch(action2)
    }
    const handleClickClear = () => {

        const action3 = updateStateDialogForgotPassword(false)
        dispatch(action3)
    }

    const handleForgotPassword = async (value, handleClick,resetForm) => {
        handleClick(true)
        try {
            const response = await authApi.forgotPassword(value.email)
            if (response.status === 200) {
                resetForm()
                toast.success(response.data.message)

            }
        } catch (error) {
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
                <div className={styles.forgotForm} >
                    <div className={styles.inputForm}>
                        <h1>Forgot Password?</h1>
                        <p>Please enter your email to recover your password</p>

                        <FormInput
                            listFeild={listFeild}
                            typeButton={'Send new Password'}
                            handleClickClear={handleClickClear}
                            initialValues={initialValues}
                            validate={ForgotPasswordSchema}
                            handleValues={handleForgotPassword}
                        />
                        <div className={styles.featureMore1} onClick={handleClickLogin} >
                            <label>Login</label>
                        </div>
                    </div>
                    <div className={styles.imageForm}>
                        <p>Shop App</p>
                        <img src="https://scontent.xx.fbcdn.net/v/t1.15752-9/288103688_447706724131245_8597908434528655865_n.png?stp=dst-png_s180x540&_nc_cat=105&ccb=1-7&_nc_sid=aee45a&_nc_ohc=9GtwBGoEqkUAX_2jaCP&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdQNd3noBVedbURLNQ8gLWoaJwkDL-b6wDMGbraX1oAzOg&oe=636FC7CA" width="133" height="150"></img>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}