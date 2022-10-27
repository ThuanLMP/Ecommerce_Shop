
import { IconButton, TextField } from '@mui/material'
import styles from './FormInput.module.scss'
import ClearIcon from '@mui/icons-material/Clear';
import LoadingButton from '@mui/lab/LoadingButton';
import { useFormik } from 'formik';
import { useState } from 'react';

export default function FormInput({ listFeild, typeButton, handleClickClear, initialValues, validate, handleValues }) {

    const [loading, setLoading] = useState(false)

    const handleLoading = (value) => {
        setLoading(value)
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values, { resetForm }) => {
            handleValues(values, handleLoading, resetForm)
        },
        validationSchema: validate
    })
    
    let messErr = ''

    if (typeButton === 'Login') {
        messErr = `${formik.errors.email ?? ''} ${formik.errors.password ?? ''}`
    }
    if (typeButton === 'Register') {
        messErr = `${formik.errors.username ?? ''} ${formik.errors.email ?? ''} ${formik.errors.password ?? ''} ${formik.errors.confirmPassword ?? ''}`
    }
    if (typeButton === 'Send new Password') {
        messErr = `${formik.errors.email ?? ''}`
    }

    const checkValue = (value) => {
        if (value === 'email') {
            return formik.values.email
        }
        else if (value === 'password') {
            return formik.values.password
        }
        else if (value === 'username') {
            return formik.values.username
        }
        else if (value === 'confirmPassword') {
            return formik.values.confirmPassword
        }
    }

    return (

        <div className={styles.form}>
            <form onSubmit={formik.handleSubmit}>
                {
                    listFeild.map((value, index) => {
                        return (
                            <div key={index}>
                                <TextField
                                    type={value.type}
                                    label={value.label}
                                    variant="standard"
                                    sx={{
                                        width: '300px',
                                        marginTop: '1px',
                                        marginBottom: '10px'
                                    }}
                                    id={value.name}
                                    name={value.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={checkValue(value.name)}
                                /> <br />
                            </div>
                        )

                    })
                }
                
                <span className={styles.error}>{messErr}</span>
                <div className={styles.btn}>
                    <LoadingButton
                        loading={loading}
                        loadingPosition="end"
                        variant="contained"
                        type="submit"
                        sx={
                            {
                                mt: 3,
                                mb: 2,
                                fontSize: '20px',
                                fontWeight: '700',
                                backgroundColor: '#FFD333',
                                color: 'black',
                                maxHeight: '37px',
                                '&:hover': {
                                    backgroundColor: '#bf9706',
                                },
                            }}
                        fullWidth
                    >
                        {typeButton}
                    </LoadingButton>
                </div>
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