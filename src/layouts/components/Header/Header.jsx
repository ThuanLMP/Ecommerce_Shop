import styles from './Header.module.scss'
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Dialog, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useNavigate } from 'react-router-dom';
import { updateStateDialog } from '../../../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { accessToken, refreshToken } from '../../../config/tokens';
import authApi from '../../../api/authApi';
import { toast } from 'react-toastify';
import cartApi from '../../../api/cartApi';
import { updateCart, updateCarts } from '../../../store/cartSlice';




export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [stateDialogUser, setStateDialogUser] = useState(false)
    let user = JSON.parse(localStorage.getItem('user'))
    const cart = useSelector(state => state.cart.cart)
    const stateDialog = useSelector(state => state.auth.stateDialog)
    const carts = useSelector(state => state.cart.carts)
    const stateAddItem = useSelector(state => state.cart.stateAddItem)
    const stateDeleteItem = useSelector(state => state.cart.stateDeleteItem)

    useEffect(() => {
        user = JSON.parse(localStorage.getItem('user'))
    }, [stateDialog])

    useEffect(() => {
        if (localStorage.getItem(accessToken)) {
            const getMyCart = async () => {
                try {
                    const response = await cartApi.getMyCart()
                    if (response.data.status === 200) {
                        const action = updateCarts(response.data.data.carts)
                        dispatch(action)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            getMyCart()
        }
    },[stateDialog,stateAddItem,stateDeleteItem])

    useEffect(() => {
        if (localStorage.getItem(accessToken)) {
            const getCartById = async () => {
                try {
                    const response = await cartApi.getCartById(carts.result[0].id)
                    if (response.data.status === 200) {
                        const action = updateCart(response.data.data)
                        dispatch(action)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            if (carts.total > 0) {
                getCartById()
            } 
        }

    }, [carts,stateAddItem,stateDeleteItem])


    const handleClickAvatar = () => {
        setStateDialogUser(state => !state)
    }

    const handleClickUser = () => {
        const action = updateStateDialog(true);
        dispatch(action)
    }

    const handleClose = () => {
        setStateDialogUser(false)
    }
    const handleClickProfile = () => {
        navigate('/home/my-profile')
    }

    const handleClickLogout = async () => {
        try {
            const refreshTk = localStorage.getItem(refreshToken)
            const userData = JSON.parse(localStorage.getItem('user'))
            const dataLogout = {
                refreshToken: refreshTk,
                deviceId: `deviceId-${userData.email}`
            }
            const response = await authApi.logout(dataLogout);
            if (response.data.status === 200) {
                localStorage.removeItem(refreshToken)
                localStorage.removeItem(accessToken)
                localStorage.removeItem('user')
                navigate('../../home')
                toast.success(response.data.message)
            }
            else {
                toast.error('Logout fail')
            }
        } catch (error) {
            console.log(error)
            toast.error('Logout fail')
        }
        handleClose()
    }

    return (
        <div className={styles.header}>
            <div className={styles.topBar}>
                <ul>
                    <li>About Us</li>
                    <li>Contacts</li>
                    <li>Store</li>
                    <li>Tracks</li>
                    <li>Orders</li>
                </ul>
            </div>

            <div className={styles.mainBar}>
                <div className={styles.title} onClick={() => {
                    navigate('/home')
                }}>
                    <h1 className={styles.titleHeader}>SHOP APP</h1>
                </div>
                <Box
                    component="form"
                    sx={{
                        p: '1px 4px',
                        display: 'flex',
                        alignItems: 'center',
                        width: 748,
                        height: 51,
                        backgroundColor: '#C4C4C4',
                        marginTop: '35px',
                        marginLeft: '20px',
                        borderRadius: '5px'

                    }}
                >
                    <IconButton sx={{ p: '10px' }} aria-label="menu">
                        <MenuIcon />
                    </IconButton>

                    <Typography sx={{
                        color: '#4B4B4B',
                        fontWeight: '700'
                    }} >
                        Categories
                    </Typography>

                    <Divider sx={{ height: 51, m: 0.5 }} orientation="vertical" />

                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search Items"
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />

                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon fontSize='large' />
                    </IconButton>

                </Box>
                <div className={styles.icons}>
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="cart" onClick={() => {
                        navigate('/home/cart')
                    }}>
                        <ShoppingCartIcon fontSize='large' sx={{ color: '#323232' }} />
                        {
                            cart.items.length > 0 ? (
                                <div className={styles.amountItems}>
                                    <label>{cart.items.length}</label>
                                </div>
                            ) : (<></>)
                        }


                    </IconButton>
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="user">
                        {
                            user === null ?
                                (<PersonOutlineIcon fontSize='large' sx={{ color: '#323232' }} onClick={handleClickUser} />)
                                :
                                (<Avatar alt="Avatar" src={user.avatar} onClick={handleClickAvatar} />)
                        }
                    </IconButton>
                </div>
                <div className={styles.menuDialog}>
                    <Dialog
                        open={stateDialogUser}
                        BackdropProps={{
                            style: {
                                height: '89.5%',
                                marginTop: '178px'
                            }
                        }}
                        PaperProps={{
                            style: { borderRadius: 5 },
                            sx: {
                                m: 0,
                                bottom: 120,
                                left: 430,
                            }
                        }}
                        onClose={handleClose}
                    >
                        <div className={styles.menu}>
                            <ul className={styles.listItem}>
                                <li onClick={handleClickProfile}>My Profile</li>
                                <li>Order History</li>
                                <li onClick={handleClickLogout}>Logout</li>
                            </ul>
                        </div>

                    </Dialog>
                </div>



            </div >


        </div >
    )
}