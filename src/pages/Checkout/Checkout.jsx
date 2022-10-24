import styles from './Checkout.module.scss'
import { HeaderOnly } from "../../layouts";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ListItems from './component/ListItems';
import { Divider, Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import ShippingInfo from './component/ShippingInfor/ShippingInfo';
import { updateItemArr, updateMethodPayment } from '../../store/orderSlice';
import { useEffect, useState } from 'react';
import orderApi from '../../api/orderApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const methodPayment = ['Cash on delivery', 'Check payment', 'Paypal', 'Master Card']
const formatDataOrder = (items) => {
    const result = items.map((value) => {
        return {
            productId: value.itemCartInfo.id,
            quantity: value.quantity,
            price: value.price,
            total: value.quantity * value.price
        }
    })
   return result
}
export default function Checkout() {
    const cart = useSelector(state => state.cart.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let totalPrice = 0;
    cart.items.map((value) => {
        return totalPrice = totalPrice + value.total
    })
    const dataOrder = useSelector(state => state.order.dataOrder)
    const [loading,setLoading] = useState(false)
    const handleClickMethodPay = (value) => {
        const action = updateMethodPayment(value)
        dispatch(action)
    }
    useEffect(()=>{
        const action = updateItemArr(formatDataOrder(cart.items))
        dispatch(action)
    },[cart])

    const handleCheckout = async () => {
        setLoading(true)
        try {
            const response = await orderApi.createOrder(dataOrder)
            if(response.status===200){
                toast.success('New order created')
            }else{
                toast.error('Fail')
            }
        } catch (error) {
            console.log(error)
            toast.error('Fail')
        }
        setLoading(false)
        navigate('/home')
    }

    return (
        <HeaderOnly>
            <div className={styles.nav}>
                <div className={styles.navList}>
                    <ul>
                        <li>Home</li>
                        <ArrowForwardIosIcon fontSize='small' sx={{ color: '#6C757D' }} />
                        <li>Shopping Cart</li>
                        <ArrowForwardIosIcon fontSize='small' sx={{ color: '#6C757D' }} />
                        <li>Checkout</li>
                    </ul>
                </div>
            </div>
            <div className={styles.checkout}>
                <div>
                    <h2>Checkout</h2>
                    <div className={styles.listProduct}>
                        <ListItems items={cart.items} />
                    </div>
                </div>

                <div className={styles.inforCheckout}>

                    <ShippingInfo />

                    <div className={styles.checkoutInfor}>
                        <div>
                            <h2>Checkout</h2>
                            <div className={styles.contentCheckout}>
                                <label className={styles.title}>Subtotal</label> <label className={styles.price}>${totalPrice}.00</label> <br />
                                <label className={styles.title}>Shipping</label> <label className={styles.price}>$20.00</label>
                            </div>
                        </div>

                        <Divider
                            sx={{
                                borderRightWidth: 2,
                                backgroundColor: '#737070',
                                marginBottom: '19px',
                                marginTop: '19px'
                            }}
                        />

                        <div className={styles.listPayment}>
                            <label className={styles.title}>Total</label> <label className={styles.price}>${totalPrice + 20}.00</label> <br />
                            <FormControl sx={{
                                marginTop: '34px'
                            }}>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                >   {
                                        methodPayment.map((value) => {
                                            return (
                                                <div className={styles.buttonPayment}>
                                                    <FormControlLabel
                                                        onClick={() => handleClickMethodPay(value)}
                                                        checked={value === dataOrder.order.paymentMethod}
                                                        value={value}
                                                        sx={{
                                                            marginLeft: '13px',
                                                        }}
                                                        control={<Radio />}
                                                        label={
                                                            <Typography
                                                                sx={{
                                                                    fontSize: 16,
                                                                    fontWeight: 700,
                                                                }}>
                                                                {value}
                                                            </Typography>
                                                        }
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </RadioGroup>
                            </FormControl>
                            <LoadingButton
                                type='submit'
                                loadingPosition='end'
                                variant='contained'
                                onClick={handleCheckout}
                                loading={loading}
                                sx={{
                                    width: '300px',
                                    height: '35px',
                                    backgroundColor: '#FFD333',

                                    color: 'black',
                                    fontWeight: '700',
                                    fontSize: '24px',
                                    marginLeft: '42px',
                                    fontFamily: 'Roboto',
                                    textTransform: 'none'
                                }}
                            >
                                Checkout
                            </LoadingButton>

                        </div>

                    </div>
                </div>
            </div>
        </HeaderOnly>
    )
}