import styles from './CardProduct.module.scss'
import IconButton from '@mui/material/IconButton';
import { Rating } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from 'react-router-dom';
import { updateProduct, updateReviews } from '../../../../store/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import productsApi from '../../../../api/productsApi';
import { accessToken } from '../../../../config/tokens';
import { updateStateDialog } from '../../../../store/authSlice';
import cartApi from '../../../../api/cartApi';
import { updateCart } from '../../../../store/cartSlice';



export default function CardProduct({ product }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const carts = useSelector(state => state.cart.carts)
    const user = useSelector(state => state.auth.user)
    const createCart = async (dataCart) => {
        try {
            const response = await cartApi.createCart(dataCart)
            const action = updateCart(response.data.data)
            dispatch(action)
        } catch (error) {
            console.log(error)
        }
    }
    const getCartById = async (id) => {
        try {
            const response = await cartApi.getCartById(id)
            const action = updateCart(response.data.data)
            dispatch(action)
        } catch (error) {
            console.log(error)
        }
    }

    const handleClick = async () => {
        try {
            const response = await productsApi.getProductById(product.id)
            const action = updateProduct(response.data.data.product)
            dispatch(action)
            const action1 = updateReviews(response.data.data.reviews)
            dispatch(action1)
        } catch (error) {
            console.log(error)
        }
        navigate(`/home/products/${product.id}`)
    }

    const handleAddItems = () => {
        if (!localStorage.getItem(accessToken)) {
            const action = updateStateDialog(true)
            dispatch(action)
        } else {
            
        }

    }


    return (
        <div className={styles.cardProduct}>
            <img src={product.images[0].url} alt="product" onClick={handleClick} />
            <div className={styles.contentProduct}>
                <label className={styles.nameProduct}>{product.name}</label>
                <label className={styles.idProduct}>ID: {product.id}</label>
                <Rating name="half-rating-read" precision={0.5} value={+product.rating} readOnly size='small' />
                <label className={styles.saleProduct}>50% Off</label>
                <label className={styles.priceProduct}> $ {product.price}</label>
                <IconButton
                    sx={{ position: 'absolute', right: '23px', top: '77px' }}
                    aria-label="search"
                    onClick={handleAddItems}
                >
                    <AddShoppingCartIcon fontSize='large' />
                </IconButton>
                <button className={styles.stateProduct}>Available</button>
            </div>

        </div>
    )
}