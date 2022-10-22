
import Dialog from '@mui/material/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import authApi from '../../api/authApi';
import cartApi from '../../api/cartApi';
import { accessToken, refreshToken } from '../../config/tokens';
import { updateStateDialog, updateStateDialogForgotPassword, updateStateDialogRegister, updateUser } from '../../store/authSlice';
import { updateCart, updateCarts } from '../../store/cartSlice';
import { SigninSchema } from '../../utils/validate';
import FormInput from '../FormInput';
import styles from './Login.module.scss'

const listFeild = [
    {
        name: 'email',
        type: 'email',
        label: 'Email@gmail.com'
    },
    {
        name: 'password',
        type: 'password',
        label: 'Password'
    }
]

const initialValues = {
    email: '',
    password: ''
}

export default function Login() {
    const carts = useSelector(state => state.cart.carts)
    const dispatch = useDispatch()
    const state = useSelector(state => state.auth.stateDialog)
    const user = useSelector(state => state.auth.user)
   
    const getMyCart = async () => {
        try {
            const response = await cartApi.getMyCart()
            if (response.data.status === 200) {
                const action = updateCarts(response.data.data.carts)
                dispatch(action)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const setupCart = async () => {
        try {
            const response = await cartApi.getMyCart()
            if (response.data.status === 200) {
                const action = updateCarts(response.data.data.carts)
                dispatch(action)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleClickRegister = () => {
        const action1 = updateStateDialog(false)
        dispatch(action1)
        const action2 = updateStateDialogRegister(true)
        dispatch(action2)
    }

    const handleClickForgot = () => {
        const action1 = updateStateDialog(false)
        const action2 = updateStateDialogForgotPassword(true)
        dispatch(action1)
        dispatch(action2)
    }
    const handleClickClear = () => {
        const action1 = updateStateDialog(false)
        dispatch(action1)
    }

    const handleLogin = async (user, handleClick, resetForm) => {
        handleClick(true)
        try {
            const response = await authApi.login(user);
            if (response.data.status === 200) {
                resetForm()
                const dataResponse = response.data.data
                localStorage.setItem(accessToken, dataResponse.tokens.access.token)
                localStorage.setItem(refreshToken, dataResponse.tokens.refresh.token)
                const userData = {
                    id: dataResponse.user.id,
                    username: dataResponse.user.username,
                    email: dataResponse.user.email,
                    role: dataResponse.user.role,
                    avatar: dataResponse.user.avatar
                }
                localStorage.setItem('user', JSON.stringify(userData))
                const action = updateUser(dataResponse.user)
                dispatch(action)
                const action1 = updateStateDialog(false)
                dispatch(action1)
                getMyCart()


            } else {
                toast.error('Login fail')
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
                <div className={styles.loginForm} >
                    <div className={styles.inputForm}>
                        <h1>Welcome to Shop App</h1>
                        <FormInput
                            listFeild={listFeild}
                            typeButton={'Login'}
                            handleClickClear={handleClickClear}
                            initialValues={initialValues}
                            validate={SigninSchema}
                            handleValues={handleLogin}
                        />
                        <div className={styles.featureMore1} onClick={handleClickRegister}>
                            <label>Create An Accout</label>
                        </div>
                        <div className={styles.featureMore2} onClick={handleClickForgot}>
                            <label>Forgot ?</label>
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