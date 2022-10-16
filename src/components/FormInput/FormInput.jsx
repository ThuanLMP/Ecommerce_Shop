
import { IconButton, TextField } from '@mui/material'
import styles from './FormInput.module.scss'
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch } from 'react-redux';
import { updateStateDialog, updateStateDialogRegister } from '../../store/authSlice';
export default function FormInput({ listFeild, typeButton }) {

    const dispatch = useDispatch();


    const handleClickClear = () => {
        const action = updateStateDialog(false)
        dispatch(action)
        const action2 = updateStateDialogRegister(false)
        
        dispatch(action2)
    }
    return (
        <div className={styles.form}>
            <form>
                {
                    listFeild.map((value, index) => {
                        return (
                            <div key={index}>
                                <TextField type={value.type} label={value.label} variant="standard" sx={{
                                    width: '300px',
                                    marginTop: '3px'
                                }} /> <br />
                            </div>
                        )

                    })
                }
                <button className={styles.btnLogin} type='submit'>{typeButton}</button>
            </form>
            <IconButton sx={
                {
                    "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.25)",
                    },
                    backgroundColor: '#FFFFFF',
                    border: 'solid 1px #E4E4E4',
                    position: 'absolute',
                    right: '5px',
                    top: '5px'
                }}
                onClick={handleClickClear}
                >
                <ClearIcon />
            </IconButton>
        </div>
    )
}