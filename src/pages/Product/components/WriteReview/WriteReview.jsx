
import styles from './WriteReview.module.scss'
import { Rating, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { useFormik } from 'formik';
import { ReviewSchema } from '../../../../utils/validate';
import productsApi from '../../../../api/productsApi';
import { useNavigate, useParams } from 'react-router-dom';
import { addReview } from '../../../../store/productsSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { updateStateDialog } from '../../../../store/authSlice';
import { b64DecodeUnicode } from '../../../../utils/ultils';

export default function WriteReview() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [valueStar, setValueStar] = useState(5)
    const handleValues = async (values,resetForm) => {
        if (b64DecodeUnicode(localStorage.getItem('ACCESS_TOKEN_SHOP'))) {
            setLoading(true)
            const dataReview = {
                content: values.content,
                rating: valueStar,
                productId: id
            }
            try {
                const response = await productsApi.postReview(dataReview)
                if (response.data.status === 201) {
                    const action = addReview(response.data.data)
                    dispatch(action)
                    toast.success(response.data.message)
                    resetForm()
                }
                else {
                    toast.error('Add review fail')
                }
            } catch (error) {
                console.log(error)
                toast.error(error.response.data.message)
            }
            setLoading(false)
        } else {
            const action = updateStateDialog(true)
            dispatch(action)
        }

    }
    const initialValues = {
        content: '',
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values, { resetForm }) => {
            handleValues(values,resetForm)
        },
        validationSchema: ReviewSchema
    }
    )
    return (
        <div className={styles.writeReview}>
            <h2>Write Review</h2>
            <div>
                <Rating
                    name="simple-controlled"
                    value={valueStar}
                    onChange={(event, newValue) => {
                        setValueStar(newValue);
                    }}
                />
            </div>

            <form onSubmit={formik.handleSubmit}>
                <div>
                    <TextField
                        label="Write Your Review..."
                        variant="filled"
                        sx={{
                            width: '73%',
                            marginTop: '7px'
                        }}
                        id='content'
                        name='content'
                        type='text'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.content}
                    />
                </div>

                <LoadingButton
                    type='submit'
                    loadingPosition='end'
                    variant='contained'
                    loading={loading}
                    sx={{
                        width: '248px',
                        height: '40px',
                        backgroundColor: '#FFD333',
                        marginTop: '13px',
                        color: 'black',
                        fontWeight: '700',
                        fontSize: '16px'
                    }}
                >
                    Post Your Review
                </LoadingButton>
            </form>

        </div>
    )
}