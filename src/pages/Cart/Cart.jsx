import { HeaderOnly } from '../../layouts'
import styles from './Cart.module.scss'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TableItems from '../../components/TableItems';
import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import { useSelector } from 'react-redux';


export default function Cart() {
    const cart = useSelector(state => state.cart.cart)
    const totalPrice = cart.itemArr.reduce((total, value) => total + value.total, 0)
    
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
                    <TableItems />
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
                                <label className={styles.price}>${totalPrice+20}.00</label>
                            </div>

                            <LoadingButton
                                type='submit'
                                loadingPosition='end'
                                variant='contained'
                                loading={false}
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