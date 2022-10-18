import { HeaderOnly } from "../../layouts";
import styles from './Home.module.scss'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Categories from "./components/Categories/Categories";
import CardProduct from "./components/CardProduct";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import productsApi from "../../api/productsApi";


export default function Home() {

    const [products, setProducts] = useState([]);
    const category = useSelector(state => state.products.category)

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            try {
                const response = await productsApi.getProductsByCategory(category);
                setProducts(response.data.data.result)
            } catch (error) {
                console.log(error)
            }
        }
        fetchProductsByCategory()
    }, [category])

    return (
        <HeaderOnly>
            <div className={styles.home}>
                <div className={styles.cardCate}>
                    <Categories />
                    <div className={styles.images}>
                        <div className={styles.mainImg}>
                            <img src="https://images.alphacoders.com/122/1229908.jpg" alt="Girl in a jacket" />
                        </div>
                        <div className={styles.subImg}>
                            <img src="https://www.teahub.io/photos/full/157-1579286_fond-d-cran-msi.jpg" alt="Girl in a jacket" />
                            <img src="https://www.teahub.io/photos/full/157-1579286_fond-d-cran-msi.jpg" alt="Girl in a jacket" />
                            <img src="https://www.teahub.io/photos/full/157-1579286_fond-d-cran-msi.jpg" alt="Girl in a jacket" />
                        </div>
                    </div>
                </div>

                <div className={styles.benefits}>
                    <div className={styles.cardBenefit}>
                        <div className={styles.iconShip}>
                            <LocalShippingIcon fontSize="large" />
                        </div>
                        <div className={styles.contentBenefit}>
                            <h2>Free Shipping</h2>
                            <p>For orders from %50</p>
                        </div>

                    </div>

                    <div className={styles.cardBenefit}>
                        <div className={styles.iconShip}>
                            <LocalShippingIcon fontSize="large" />
                        </div>
                        <div className={styles.contentBenefit}>
                            <h2>Free Shipping</h2>
                            <p>For orders from %50</p>
                        </div>

                    </div><div className={styles.cardBenefit}>
                        <div className={styles.iconShip}>
                            <LocalShippingIcon fontSize="large" />
                        </div>
                        <div className={styles.contentBenefit}>
                            <h2>Free Shipping</h2>
                            <p>For orders from %50</p>
                        </div>

                    </div><div className={styles.cardBenefit}>
                        <div className={styles.iconShip}>
                            <LocalShippingIcon fontSize="large" />
                        </div>
                        <div className={styles.contentBenefit}>
                            <h2>Free Shipping</h2>
                            <p>For orders from %50</p>
                        </div>

                    </div>

                </div>

                <div className={styles.bestSellers}>
                    <label>Bestsellers</label>
                    <button>Show more</button>
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

            </div >

        </HeaderOnly >
    )
}