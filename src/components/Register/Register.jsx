import styles from './Register.module.scss';
import Dialog from '@mui/material/Dialog';
import FormInput from '../FormInput';
import { useSelector } from 'react-redux';


export default function Register() {
    const listFeild = [
        {
            type: 'text',
            label: 'User Name'
        },
        {
            type: 'email',
            label: 'Email@gmail.com'
        },
        {
            type: 'password',
            label: 'Password'
        },
        {
            type: 'text',
            label: 'Confirm Password'
        }
    ]

    const state = useSelector(state => state.auth.stateDialogRegister)

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
                        <FormInput listFeild={listFeild} typeButton={'Register'} />
                        <div className={styles.featureMore1}>
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