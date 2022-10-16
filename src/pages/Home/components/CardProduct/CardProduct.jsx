import styles from './CardProduct.module.scss'
import IconButton from '@mui/material/IconButton';
import { Rating } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


export default function CardProduct({ product }) {

    return (
        <div className={styles.cardProduct}>
            <img src={product.images[0].url} alt="product" />
            <div className={styles.contentProduct}>
                <label className={styles.nameProduct}>{product.name}</label>
                <label className={styles.idProduct}>ID: {product.id}</label>
                <Rating name="read-only" value={+product.rating} readOnly size='small' />
                <label className={styles.saleProduct}>50% Off</label>
                <label className={styles.priceProduct}> $ {product.price}</label>
                <IconButton type="submit" sx={{ position: 'absolute', right: '23px', top: '77px' }} aria-label="search" >
                    <AddShoppingCartIcon fontSize='large' />
                </IconButton>
                <button className={styles.stateProduct}>Available</button>
            </div>

        </div>
    )
}