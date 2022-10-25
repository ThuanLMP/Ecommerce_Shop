import HeaderOnly from '../../layouts/HeaderOnly'
import styles from './Account.module.scss'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Profile from './components/Profile';
import { useEffect, useState } from 'react';
import userApi from '../../api/userApi';
import { useNavigate } from 'react-router-dom';
import { accessToken, refreshToken } from '../../config/tokens';
import authApi from '../../api/authApi';
import { toast } from 'react-toastify';
import OrderHistory from './components/OrderHistory/OrderHistory';
import TableList from './components/TableList';
import orderApi from '../../api/orderApi'
import { b64DecodeUnicode } from '../../utils/ultils';
const listHeader = [
    'Order', 'Date', 'Status', 'Total'
]
export default function Account() {
    const navigate = useNavigate()
    const [profile, setProfile] = useState()
    const [type, setType] = useState('My Profile')
    const [orders,setOrders] = useState([])
    useEffect(() => {
        const getMyProfile = async () => {
            try {
                const response = await userApi.getMyProfile();
                setProfile(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        getMyProfile()
    }, [])
    const orderProcess = orders.filter((value)=>{
        return value.status=== 'Processing'
    })
    const getOrders = async () => {
        try {
            const response = await orderApi.getMyOrders();
            if(response.status===200){
                setOrders(response.data.data.orders.result)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getOrders()
    },[])

    const handleClickLogout = async () => {
        try {

            const refreshTk = b64DecodeUnicode(localStorage.getItem(refreshToken))
            const userData = JSON.parse(b64DecodeUnicode(localStorage.getItem('user')))
            const dataLogout = {
                refreshToken: refreshTk,
                deviceId: `deviceId-${userData.email}`
            }
            const response = await authApi.logout(dataLogout);
            if (response.data.status === 200) {
                localStorage.removeItem(refreshToken)
                localStorage.removeItem(accessToken)
                localStorage.removeItem('user')
                navigate('/home')
                toast.success(response.data.message)
            }
            else {
                toast.error('Logout fail')
            }
        } catch (error) {
            console.log(error)
            toast.error('Logout fail')
        }

    }

    const checkClass = (typeActive) => {
        if (type === typeActive) {
            return styles.active
        }
        return styles.nonActive
    }

    return (
        <HeaderOnly>
            <div className={styles.wrap}>
                <div className={styles.nav}>
                    <div className={styles.navList}>
                        <ul>
                            <li>Home</li>
                            <ArrowForwardIosIcon fontSize='small' sx={{ color: '#6C757D' }} />
                            <li>My Accout</li>
                        </ul>
                    </div>
                </div>

                <h1>My Account</h1>
                <div className={styles.wrapBody}>
                    <div className={styles.navigation}>
                        <h2>Navigate</h2>
                        <ul>
                            <li className={checkClass('My Profile')} onClick={() => { setType('My Profile') }} >My Profile</li>
                            <li className={checkClass('Order History')} onClick={() => { setType('Order History') }}>Order History</li>
                            <li className={styles.nonActive} onClick={handleClickLogout} >Logout</li>
                        </ul>
                    </div>


                    {
                        type === 'My Profile' ? (
                            <div className={styles.wrapProfile}>
                                {
                                    profile === undefined ? <></> :
                                        <Profile profile={profile} />
                                }
                                <h2 style={{marginLeft: '30px'}}>Recent Orders</h2>
                                <TableList listHeader={listHeader} items={orderProcess} />
                            </div>

                        ) : (<OrderHistory listHeader={listHeader} items={orders} />)
                    }


                </div>
            </div>
        </HeaderOnly>
    )
}