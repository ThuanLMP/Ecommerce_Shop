import styles from './ContentProduct.module.scss';
import { Divider, Rating } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useSelector } from 'react-redux';
import Quantity from '../../../../components/Quantity';


export default function ContentProduct() {
    const product = useSelector(state => state.products.product)
    
    
    return (
        <div className={styles.product}>
            <div className={styles.listImg}>
                <div className={styles.mainImg}>
                    <img src={product.images[0].url} alt='product img' width="474" height="474" />
                </div>

                <div className={styles.effectImg}>
                    <img src={product.images[0].url} alt='product img' width="87" height="87" />
                    <img src={product.images[0].url} alt='product img' width="87" height="87" />
                    <img src={product.images[0].url} alt='product img' width="87" height="87" />
                    <img src={product.images[0].url} alt='product img' width="87" height="87" />
                    <img src={product.images[0].url} alt='product img' width="87" height="87" />
                </div>
            </div>

            <div className={styles.contentProduct}>
                <h1>{product.name}</h1>
                <div className={styles.rating}>
                    <Rating name="read-only" value={product.rating} readOnly size='small' />
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

                <label className={styles.titleQuantity}>Quantity: </label>

                <div className={styles.wrap}>
                   <Quantity amount={1}/>

                    <div className={styles.btnAddToCart}>
                        <LoadingButton
                            sx={{
                                fontFamily: 'Roboto',
                                fontWeight: '700',
                                fontSize: '16px',
                                color: 'black',
                            }}
                        >
                            <AddShoppingCartIcon sx={{ marginLeft: '10px' }} />
                            Add to cart
                        </LoadingButton>
                    </div>
                </div>

               
            </div>
        </div>
    )
}