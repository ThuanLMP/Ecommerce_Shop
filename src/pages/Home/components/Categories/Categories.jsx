import styles from './Categories.module.scss'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import clsx from "clsx";
import { useEffect, useState } from 'react';
import productsApi from '../../../../api/productsApi';
import { useDispatch, useSelector } from 'react-redux';
import { updateCategory } from '../../../../store/productsSlice';


export default function Categories() {
    const dispatch = useDispatch()
    const [categories, setCategories] = useState([])
    const category = useSelector(state => state.products.category)
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await productsApi.getAllCategories();
                setCategories(response.data.data)
                const action = updateCategory(response.data.data[0])
                dispatch(action)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCategories();
    }, [])

    const handleChangeCategory = (value) => {
        const action = updateCategory(value)
        dispatch(action)
    }
    return (
        <div className={styles.categories}>
            <div className={styles.headerTitle}>
                <IconButton sx={{ marginLeft: '-40px' }} aria-label="menu">
                    <MenuIcon style={{ color: '#FFFFFF' }} fontSize='large' />
                </IconButton >

                <Typography sx={{
                    color: '#FFFFFF',
                    fontWeight: '700',
                    fontSize: '32px'
                }} >
                    Categories
                </Typography>
            </div>

            <div className={styles.listCategories}>
                {
                    categories.map((value, index) => {
                        return (
                            <div className={clsx(styles.fieldType, value === category ? styles.select : '')} key={index} onClick={() => handleChangeCategory(value)}>
                                <label>{value}</label>
                                <ArrowForwardIosIcon sx={{ position: 'absolute', right: '0' }} />
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}