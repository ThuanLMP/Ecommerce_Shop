import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateOrder } from '../../../../store/orderSlice'
import { b64DecodeUnicode } from '../../../../utils/ultils'
import { shippingInfoSchema } from '../../../../utils/validate'
import styles from './ShippingInfo.module.scss'


export default function ShippingInfo() {
    const dispatch = useDispatch()
    const dataOrder = useSelector(state => state.order.dataOrder)
    const [stateEdit, setStateEdit] = useState(false)
    const handleClickEdit = () => {
        setStateEdit(true)
    }
    const formik = useFormik({
        initialValues: {
            address: dataOrder.order.address,
            contact: dataOrder.order.contact
        },
        onSubmit: (values,{resetForm}) => {
            const dataUpdate = {
                ...dataOrder.order,
                address: values.address,
                contact: values.contact
            }
           const action = updateOrder(dataUpdate)
           dispatch(action)
           setStateEdit(false)
        },
        validationSchema: shippingInfoSchema
    })


   

    return (
        <div className={styles.shippingInfor}>
            <h2 style={{ marginLeft: '15px' }}>Shipping Information</h2>
            {
                stateEdit === false ? (
                    <div className={styles.shippingData}>
                        <p>{dataOrder.order.address}</p>
                        <label>Phone Number</label>
                        <p>{dataOrder.order.contact}</p>
                        <label>Email Address</label>
                        <p>{JSON.parse(b64DecodeUnicode(localStorage.getItem('user'))).email}</p>
                        <div
                            onClick={handleClickEdit}
                        >Edit address</div>
                    </div>


                ) : (
                    <div className={styles.formEdit}>
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                                <TextField
                                    id="address"
                                    label="Address"
                                    variant="standard"
                                    sx={{
                                        marginBottom: '9px',
                                    }}
                                    name='address'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.address}
                                />
                            </div>
                            <div className={styles.titleError}>
                                    <label>{formik.errors.address}</label>
                            </div>
                            <div>

                                <TextField
                                    id="contact"
                                    label="Phone number"
                                    variant="standard"
                                    sx={{
                                        marginBottom: '9px',
                                    }}
                                    name = 'contact'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.contact}
                                />
                            </div>
                            <div className={styles.titleError}>
                                    <label>{formik.errors.contact}</label>
                            </div>
                            <div>
                                <Button variant="contained"  type="submit" sx={{
                                    width: '100px',
                                    marginTop: '5px'
                                }}>Save</Button>
                            </div>

                        </form>

                    </div>
                )
            }

        </div>
    )
}