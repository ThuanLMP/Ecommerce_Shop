import HeaderOnly from '../../layouts/HeaderOnly'
import styles from './Account.module.scss'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Profile from './components/Profile';
import { CardMedia, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from 'react';
import userApi from '../../api/userApi';
import { useNavigate } from 'react-router-dom';
import { accessToken, refreshToken } from '../../config/tokens';
import authApi from '../../api/authApi';
import { toast } from 'react-toastify';
const listHeader = [
    'Order', 'Date', 'Status', 'Total'
]
export default function Account() {
    const navigate = useNavigate()
    const [profile, setProfile] = useState()
    const [type, setType] = useState('My Profile')
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
                    <div className={styles.wrapProfile}>
                        {
                            profile === undefined ? <></> :
                                <Profile profile={profile} />
                        }


                        <div className={styles.listOrders}>
                            <h2 className={styles.titleOrders}>Render Orders</h2>

                            <TableContainer component={Paper} >
                                <Table sx={{ minWidth: '700px', width: '100%', borderBottom: "none" }} aria-label='simple table'>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: '#C4C4C4' }}>
                                            {
                                                listHeader.map((value) => {
                                                    return (
                                                        <TableCell
                                                            align='left'
                                                            style={{
                                                                fontSize: '24px',
                                                                fontWeight: 'bolder',
                                                                fontFamily: 'Roboto'
                                                            }}
                                                        >
                                                            {value}
                                                        </TableCell>
                                                    )

                                                })
                                            }


                                        </TableRow>

                                    </TableHead>
                                    <TableBody>

                                        <TableRow >
                                            <TableCell
                                                style={{
                                                    fontSize: '24px',
                                                    fontWeight: 'bold',
                                                    borderBottom: "none"
                                                }}
                                            >
                                                #123
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    fontSize: '24px',
                                                    fontWeight: 'bold',
                                                    borderBottom: "none"
                                                }}
                                            >
                                                09/03/2022
                                            </TableCell><TableCell
                                                style={{
                                                    fontSize: '24px',
                                                    fontWeight: 'bold',
                                                    borderBottom: "none"
                                                }}
                                            >
                                                Processing
                                            </TableCell><TableCell
                                                style={{
                                                    fontSize: '24px',
                                                    fontWeight: 'bold',
                                                    borderBottom: "none"
                                                }}
                                            >
                                                $120.00
                                            </TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell
                                                style={{
                                                    fontSize: '24px',
                                                    fontWeight: 'bold',
                                                    borderBottom: "none"
                                                }}
                                            >
                                                #123
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    fontSize: '24px',
                                                    fontWeight: 'bold',
                                                    borderBottom: "none"
                                                }}
                                            >
                                                09/03/2022
                                            </TableCell><TableCell
                                                style={{
                                                    fontSize: '24px',
                                                    fontWeight: 'bold',
                                                    borderBottom: "none"
                                                }}
                                            >
                                                Processing
                                            </TableCell><TableCell
                                                style={{
                                                    fontSize: '24px',
                                                    fontWeight: 'bold',
                                                    borderBottom: "none"
                                                }}
                                            >
                                                $120.00
                                            </TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell
                                                style={{
                                                    fontSize: '24px',
                                                    fontWeight: 'bold',
                                                    borderBottom: "none"
                                                }}
                                            >
                                                #123
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    fontSize: '24px',
                                                    fontWeight: 'bold',
                                                    borderBottom: "none"
                                                }}
                                            >
                                                09/03/2022
                                            </TableCell><TableCell
                                                style={{
                                                    fontSize: '24px',
                                                    fontWeight: 'bold',
                                                    borderBottom: "none"
                                                }}
                                            >
                                                Processing
                                            </TableCell><TableCell
                                                style={{
                                                    fontSize: '24px',
                                                    fontWeight: 'bold',
                                                    borderBottom: "none"
                                                }}
                                            >
                                                $120.00
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        <div className={styles.pagination}>
                            <Pagination
                                count={3}
                                variant="outlined"
                                shape="rounded"
                                defaultPage={1}
                                sx={{
                                    button: {
                                        backgroundColor: '#DFE3E8'
                                    },
                                    ul: {
                                        '& .MuiPaginationItem-root': {
                                            '&.Mui-selected': {
                                                background: '#FFD333',
                                                color: 'black',
                                            },
                                        },
                                    },
                                }}

                            />
                        </div>
                    </div>
                </div>
            </div>
        </HeaderOnly>
    )
}