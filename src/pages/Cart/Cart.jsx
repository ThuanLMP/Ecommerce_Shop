import { HeaderOnly } from '../../layouts'
import styles from './Cart.module.scss'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TableItems from '../../components/TableItems';
import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import cartApi from '../../api/cartApi';
import { addQuantity, reduceQuantity, updateStateDeleteItem, updateTotalPrice } from '../../store/cartSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export default function Cart() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart.cart)
    const stateDeleteItem = useSelector(state=> state.cart.stateDeleteItem)
    const totalPrice = cart.items.reduce((total, value) => total + value.total, 0)

    const updateItem = async (value, total, id, type, index) => {
        try {
            const response = await cartApi.updateItem(value, total, id)
            if (response.data.status === 200) {
                if (type === 'add') {
                    const action = addQuantity(index)
                    dispatch(action)
                }
                else {
                    const action = reduceQuantity(index)
                    dispatch(action)
                }
                const action1 = updateTotalPrice(index)
                dispatch(action1)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleClickCheckout = () => {
        navigate('/home/checkout')
    }
    const handleDelete = async (id) => {
        try {
            const response = await cartApi.deleteItem(id)
            if(response.status===200){
                const action = updateStateDeleteItem(!stateDeleteItem)
                dispatch(action)
                toast.success('Delete item success')
            }

        } catch (error) {
            console.log(error)
            toast.error('Delete fail')
        }
    }

    return (
        <HeaderOnly>
            <div className={styles.wrapProduct}>
                <div className={styles.nav}>
                    <div className={styles.navList}>
                        <ul>
                            <li>Home</li>
                            <ArrowForwardIosIcon fontSize='small' sx={{ color: '#6C757D' }} />
                            <li>Shopping Cart</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.contentCart}>
                    <p className={styles.titleName}>Shopping Cart</p>
                    <TableItems items={cart.items} updateItem={updateItem} handleDelete = {handleDelete} />
                    <div className={styles.wrap}>
                        <div className={styles.formCoupon}>
                            <TextField variant='filled' label='Coupon Code' sx={{
                                width: '280px',
                                height: '49px'
                            }} />
                            <LoadingButton
                                type='submit'
                                loadingPosition='end'
                                variant='contained'
                                loading={false}
                                sx={{
                                    width: '178px',
                                    height: '49px',
                                    backgroundColor: '#FFD333',
                                    marginTop: '3px',
                                    color: 'black',
                                    fontWeight: '700',
                                    fontSize: '18px',
                                    marginLeft: '5%',
                                    fontFamily: 'Roboto',
                                    textTransform: 'none'
                                }}
                            >
                                Apply Coupon
                            </LoadingButton>
                        </div>
                        <div className={styles.cartTotals}>
                            <h2>Cart Totals</h2>
                            <div className={styles.subTotal}>
                                <label>Subtotal</label>
                                <label className={styles.price}>${totalPrice}.00</label>
                            </div>
                            <div className={styles.shipping}>
                                <label>Shipping</label>
                                <label className={styles.price}>$20.00</label>
                            </div>
                            <div className={styles.total}>
                                <label>Total</label>
                                <label className={styles.price}>${totalPrice + 20}.00</label>
                            </div>

                            <LoadingButton
                                type='submit'
                                loadingPosition='end'
                                variant='contained'
                                loading={false}
                                onClick={handleClickCheckout}
                                sx={{
                                    width: '487px',
                                    height: '69px',
                                    backgroundColor: '#FFD333',
                                    marginTop: '13px',
                                    color: 'black',
                                    fontWeight: '700',
                                    fontSize: '34px',
                                    marginLeft: '5%',
                                    fontFamily: 'Roboto',
                                    textTransform: 'none'
                                }}
                            >
                                Proceed to checkout
                            </LoadingButton>
                        </div>

                    </div>
                </div>
            </div>
        </HeaderOnly>
    )
}