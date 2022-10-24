import styles from './ContentProduct.module.scss';
import { Divider, Rating } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import Quantity from '../../../../components/Quantity';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import productsApi from '../../../../api/productsApi';
import cartApi from '../../../../api/cartApi';
import { updateStateAddItem } from '../../../../store/cartSlice';
import { toast } from 'react-toastify';


export default function ContentProduct({ product }) {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.cart)
    const quantity = useSelector(state => state.cart.quantityProductAdd)
    const stateAddItem = useSelector(state => state.cart.stateAddItem)
    const [loading, setLoading] = useState(false)
    const handleAddItem = () => {

        const result = cart.items.filter((value) => {
            return value.itemCartInfo.id === product.id
        })

        if (result.length === 0) {
            const dataItem = {
                "cartId": cart.cart.id,
                "productId": product.id,
                "quantity": quantity,
                "price": product.price,
                "total": product.price*quantity
            }
            const addItem = async () => {
                setLoading(true)
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
                setLoading(false)
            }
            addItem()
        } else {
            const updateItem = async () => {
                setLoading(true)
                try {
                    const inputQuantity = quantity + result[0].quantity
                    const totalPrice = inputQuantity * result[0].price
                    const response = await cartApi.updateItem(inputQuantity, totalPrice, result[0].id)
                    if (response.status === 200) {
                        toast.success('Add item success')
                    }
                } catch (error) {
                    console.log(error)
                }
                setLoading(false)
            }
            updateItem()

        }

    }

    return (
        <div className={styles.product}>

            <div className={styles.listImg}>
                <div className={styles.mainImg}>
                    <img src={product.images[0].url} alt='product img' width="474" height="474" />
                </div>

                <div className={styles.effectImg}>
                    <img src={product.images[0].url} alt='product img' width="87" height="87" />
                    <img src='https://luv.vn/wp-content/uploads/2021/08/hinh-anh-gai-xinh-16.jpg' alt='product img' width="87" height="87" />
                    <img src='https://thuthuatnhanh.com/wp-content/uploads/2020/01/anh-girl-xinh-cap-3-dang-yeu.jpg' alt='product img' width="87" height="87" />
                    <img src='data:image/jpeg;base64,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' alt='product img' width="87" height="87" />
                    <img src='https://genzrelax.com/wp-content/uploads/2022/03/hinh-gai-xinh.jpg' alt='product img' width="87" height="87" />
                </div>
            </div>

            <div className={styles.contentProduct}>
                <h1>{product.name}</h1>
                <div className={styles.rating}>
                    <Rating name="half-rating-read" precision={0.5} value={product.rating} readOnly size='medium' />
                    <Divider
                        sx={{
                            height: 15,
                            m: 0.5,
                            borderRightWidth: 2,
                            backgroundColor: '#565353',
                            margin: '0px 10px 0px 10px'
                        }}
                        orientation="vertical"
                    />
                    <label>{product.numOfReviews} Reviews</label>
                    <Divider
                        sx={{
                            height: 15,
                            m: 0.5,
                            borderRightWidth: 2,
                            backgroundColor: '#565353',
                            margin: '0px 10px 0px 10px'
                        }}
                        orientation="vertical"
                    />
                    <label>3k Sold</label>
                </div>
                <p>
                    {product.description}
                </p>

                <Divider
                    sx={{
                        borderRightWidth: 2,
                        backgroundColor: '#737070',
                        marginBottom: '19px',
                    }}
                />



                <div className={styles.stateProduct}>
                    <label className={styles.avaliability}>Avaliability: {product.countInStock > 0 ? <lable className={styles.state}>In stock</lable> : <lable className={styles.stateSoldout}>Sold out</lable>} </label>
                    <label className={styles.brand}>Brand: {product.brand}</label>
                    <label className={styles.code}>SKU: 83690/32</label>
                </div>

                <div className={styles.statePrice}>
                    <label className={styles.price}>${product.price}</label>
                    <div className={styles.sale}>
                        <label>50% Off</label>
                    </div>
                </div>

                <div className={styles.titleColor}>
                    <p>Select Color: </p>
                </div>

                <div className={styles.colors}>
                    <div style={{ backgroundColor: '#006CFF' }}></div>
                    <div style={{ backgroundColor: '#FC3E39' }}></div>
                    <div style={{ backgroundColor: '#171717' }}></div>
                    <div style={{ backgroundColor: '#FFF600' }}></div>

                </div>

                <label className={styles.titleQuantity}>Quantity: </label>

                <div className={styles.wrap}>
                    <Quantity amount={1} product={product} type={'product'} />

                    <div className={styles.btnAddToCart}>
                        <LoadingButton
                            loading={loading}
                            sx={{
                                fontFamily: 'Roboto',
                                fontWeight: '700',
                                fontSize: '16px',
                                color: 'black',
                            }}
                            onClick={handleAddItem}
                        >
                            <AddShoppingCartIcon sx={{ marginLeft: '10px' }} />
                            Add to cart
                        </LoadingButton>
                    </div>
                </div>
                <div className={styles.finalRating}>
                    <p>Rate: </p>
                    <Rating name="read-only" value={product.rating} readOnly size='medium' />
                </div>

            </div>

        </div >
    )
}