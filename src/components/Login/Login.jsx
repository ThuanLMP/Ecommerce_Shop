
import { TextField, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStateDialog, updateStateDialogRegister } from '../../store/authSlice';
import FormInput from '../FormInput';
import styles from './Login.module.scss'


export default function Login() {
    const listFeild = [
        {
            type: 'email',
            label: 'Email@gmail.com'
        },
        {
            type: 'password',
            label: 'Password'
        }
    ]
    const dispatch = useDispatch()
    const state = useSelector(state => state.auth.stateDialog)
    const handleClickRegister = () => {
        const action1 = updateStateDialog(false)
        dispatch(action1)
        const action2 = updateStateDialogRegister(true)
        dispatch(action2)
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
                        <FormInput listFeild={listFeild} typeButton={'Login'} />
                        <div className={styles.featureMore1} onClick={handleClickRegister}>
                            <label>Create An Accout</label>
                        </div>
                        <div className={styles.featureMore2}>
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