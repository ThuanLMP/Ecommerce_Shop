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
import { updateCart, updateStateAddItem } from '../../../../store/cartSlice';
import { toast } from 'react-toastify';


const formatDataCart = (product) => {
    const itemArr = [
        {
            productId: product.id,
            quantity: 1,
            price: product.price,
            total: product.price
        }
    ]

    let dataCart = {
        cart: {
            totalPrice: product.price,
            userId: JSON.parse(localStorage.getItem('user')).id
        },
        itemArr: itemArr
    }

    return dataCart
}


export default function CardProduct({ product }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const carts = useSelector(state => state.cart.carts)
    const cart = useSelector(state => state.cart.cart)
    const stateAddItem = useSelector(state => state.cart.stateAddItem)
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
            if (carts.total === 0) {
                const createCart = async () => {
                    try {
                        const response = await cartApi.createCart(formatDataCart(product))
                        if (response.data.status === 201) {
                            const action = updateCart(response.data.data)
                            dispatch(action)
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
                createCart()
            } else {
                const result = cart.items.filter((value) => {
                    return value.itemCartInfo.id === product.id
                })
                if (result.length === 0) {
                    const dataItem = {
                        "cartId": cart.cart.id,
                        "productId": product.id,
                        "quantity": 1,
                        "price": product.price,
                        "total": product.price
                    }
                    const addItem = async () => {
                        try {
                            const response = await cartApi.addItem(dataItem)
                            if (response.status === 200) {
                                const action = updateStateAddItem(!stateAddItem)
                                dispatch(action)
                                toast.success('Add item success')
                            }
                        } catch (error) {
                            console.log(error)
                        }
                    }
                    addItem()
                }else{
                    toast.error('Item exist')
                }
            }
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