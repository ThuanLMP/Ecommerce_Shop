import styles from './Quantity.module.scss';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addQuantity, reduceQuantity, updateTotalPrice } from '../../store/cartSlice';


export default function Quantity({ amount, index }) {
    const dispatch = useDispatch()
    const product = useSelector(state => state.products.product)


    return (
        <div className={styles.quantity}>

            <div onClick={() => {
                if (amount === 1) {

                }
                else {
                    const action = reduceQuantity(index)
                    const action1 = updateTotalPrice(index)
                    dispatch(action)
                    dispatch(action1)
                }

            }}>
                <RemoveIcon sx={{
                    position: 'absolute',
                    left: '20px',
                    top: '10px',
                    color: '#33A0FF',
                    cursor: 'pointer',
                    ":hover": {
                        color: 'black'
                    }
                }} />
            </div>

            <label>{amount}</label>

            <div onClick={() => {
                if (amount === product.countInStock * 1) {

                }
                else {
                    const action = addQuantity(index)
                    const action1 = updateTotalPrice(index)
                    dispatch(action)
                    dispatch(action1)
                }

            }}>
                <AddIcon sx={{
                    position: 'absolute',
                    right: '20px',
                    top: '10px',
                    color: '#33A0FF',
                    cursor: 'pointer',
                    ":hover": {
                        color: 'black'
                    }
                }} />
            </div>

        </div>
    )
}