import styles from './CardProduct.module.scss'
import IconButton from '@mui/material/IconButton';
import { Rating } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from 'react-router-dom';
import { updateProduct, updateReviews } from '../../../../store/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import productsApi from '../../../../api/productsApi';
import { addItem, addQuantity, updateTotalPrice } from '../../../../store/cartSlice';


export default function CardProduct({ product }) {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.cart)
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
        let checkItem = false
        if (cart.itemArr.length > 0) {
            cart.itemArr.map((value, index) => {
                if (value.productId === product.id) {
                    checkItem = true
                    const action = addQuantity(index)
                    const action1 = updateTotalPrice(index)
                    dispatch(action)
                    dispatch(action1)
                }
            })
            if (checkItem === false) {
                const item = {
                    productId: product.id,
                    quantity: 1,
                    price: product.price,
                    total: product.price,
                    name: product.name,
                    img: product.images[0].url ?? ''

                }
                const action1 = addItem(item)
                dispatch(action1)
            }
        } else {
            const item = {
                productId: product.id,
                quantity: 1,
                price: product.price,
                total: product.price,
                name: product.name,
                img: product.images[0].url ?? ''
            }
            const action = addItem(item)
            dispatch(action)
        }

    }


    return (
        <div className={styles.cardProduct}>
            <img src={product.images[0].url} alt="product" onClick={handleClick} />
            <div className={styles.contentProduct}>
                <label className={styles.nameProduct}>{product.name}</label>
                <label className={styles.idProduct}>ID: {product.id}</label>
                <Rating name="read-only" value={+product.rating} readOnly size='small' />
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