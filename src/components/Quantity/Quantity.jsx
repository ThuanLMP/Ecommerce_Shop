import styles from './Quantity.module.scss';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity } from '../../store/cartSlice';



export default function Quantity({ amount, product, index, handleUpdate, type }) {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(amount)
    const handleClickReduce = async () => {
        if (type === 'cart')
            await handleUpdate(quantity - 1, (quantity - 1) * product.price, product.id, 'reduce', index)
        setQuantity(quantity => quantity - 1)
        const action = updateQuantity(quantity - 1)
        dispatch(action)
    }

    const handleClickAdd = async () => {
        if (type === 'cart')
            await handleUpdate(quantity + 1, (quantity + 1) * product.price, product.id, 'add', index)
        setQuantity(quantity => quantity + 1)
        const action = updateQuantity(quantity + 1)
        dispatch(action)

    }

    return (
        <div className={styles.quantity}>

            <div onClick={() => {
                if (quantity > 1) {
                    handleClickReduce()
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
                }}
                />
            </div>

            <label>{quantity}</label>

            <div onClick={() => {
                handleClickAdd()
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