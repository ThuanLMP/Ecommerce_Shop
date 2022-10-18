import { HeaderOnly } from '../../../layouts'
import styles from './ProductDetails.module.scss'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Divider } from '@mui/material';
import CardProduct from '../../Home/components/CardProduct';
import ContentProduct from '../components/ContentProduct';
import ReviewProducts from '../components/ReviewProducts';
import WriteReview from '../components/WriteReview';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import productsApi from '../../../api/productsApi';



export default function ProductDetails() {
    const navigate = useNavigate()
    const product = useSelector(state => state.products.product)
    const { id } = useParams()
    const [products, setProducts] = useState([])

    const handleClickHome = () => {
        navigate('/home')
    }

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            try {
                const response = await productsApi.getProductsByCategory(product.category);
                setProducts(response.data.data.result)
            } catch (error) {
                console.log(error)
            }
        }
        fetchProductsByCategory()
    }, [id])



    return (
        <HeaderOnly>
            <div className={styles.wrapProduct}>
                <div className={styles.nav}>
                    <div className={styles.navList}>
                        <ul>
                            <li onClick={handleClickHome}>Home</li>
                            <ArrowForwardIosIcon fontSize='small' sx={{ color: '#6C757D' }} />
                            <li>{product.category}</li>
                            <ArrowForwardIosIcon fontSize='small' sx={{ color: '#6C757D' }} />
                            <li>{product.name}</li>
                        </ul>
                    </div>
                </div>
                <ContentProduct />
                <ReviewProducts />
                <WriteReview />
                <div className={styles.relatedProducts}>
                    <div className={styles.titleRalated}>
                        <h2>Related Products</h2>
                        <Divider
                            sx={{
                                borderRightWidth: 2,
                                backgroundColor: '#737070',
                                marginBottom: '19px',
                                width: '73%',
                                marginTop: '20px',
                                marginLeft: '10px'
                            }}
                        />
                    </div>

                    <div className={styles.wrapProducts}>
                        <div className={styles.cardProducts}>
                            {
                                products.length > 0 ? (
                                    products.map((value, index) => {
                                        return (
                                            <CardProduct key={value.id} product={value} />
                                        )
                                    })


                                ) : (
                                    <h2>No product !</h2>
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>

        </HeaderOnly>
    )
}