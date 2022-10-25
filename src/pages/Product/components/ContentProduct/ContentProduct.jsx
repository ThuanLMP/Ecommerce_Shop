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
    const [imgDisplay, setImgDisplay] = useState(product.images[0].url)


    const listImg = [
        product.images[0].url,
        'https://luv.vn/wp-content/uploads/2021/08/hinh-anh-gai-xinh-16.jpg',
        'https://thuthuatnhanh.com/wp-content/uploads/2020/01/anh-girl-xinh-cap-3-dang-yeu.jpg',
        'https://genzrelax.com/wp-content/uploads/2022/03/hinh-gai-xinh.jpg',
        'https://thuthuatnhanh.com/wp-content/uploads/2021/06/Hinh-anh-Rose-Black-Pink-1.jpg'
    ]

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
                "total": product.price * quantity
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
                    <img src={imgDisplay} alt='product img' width="474" height="474" />
                </div>

                <div className={styles.effectImg}>
                    {
                        listImg.map((value) => {
                            return (
                                <img src={value} alt='product img' width="87" height="87" onClick={()=>{
                                    setImgDisplay(value)
                                }} />
                            )

                        })
                    }
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