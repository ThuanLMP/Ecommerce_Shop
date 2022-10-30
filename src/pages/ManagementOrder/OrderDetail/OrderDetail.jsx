import { Box } from "@mui/system";
import AdminLayout from "../../../layouts/AdminLayout";
import Navigate from "../../ManagementProduct/components/Navigate";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Divider, IconButton, Select, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { LoadingButton } from "@mui/lab";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PlaceIcon from '@mui/icons-material/Place';

import ListOrders from "../components/ListOrders";
import { useParams } from "react-router-dom";
import orderApi from "../../../api/orderApi";
import { formatDate } from "../../../utils/ultils";
import userApi from "../../../api/userApi";
import { array } from "yup/lib/locale";
import { toast } from "react-toastify";
const listNav = ['Dashboard', 'Order']
const listHeader = ['Product', 'Price', 'Quantity', 'Total']
function sumArray(array) {
    let sum = 0;
    array.map(function (value) {
        return sum =sum+value.total

    });

    return sum;
}
export default function OrderDetail() {
    const { id } = useParams()
    const [order, setOrder] = useState()
    const [status, setStatus] = useState('Processing')
    const [paided, setPaided] = useState('No')
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(false)
    const handleChangeStatus = (event, value) => {
        setStatus(value.props.value)
    }
    const handleChangePaided = (event, value) => {
        setPaided(value.props.value)
    }
    const getOrderById = async () => {
        try {
            const res = await orderApi.getOrderById(id)

            if (res.status === 200) {
                setOrder(res.data.data)
                setStatus(res.data.data.order.status)
                setPaided(res.data.data.order.isPaid === true ? 'Yes' : 'No')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getUserById = async () => {
       
        try {
            const res = await userApi.getUserById(order.order.userId)
            if (res.status === 200) {
                setUser(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        if (order !== undefined) {
            getUserById()
        }

    }, [order])

    useEffect(() => {
        getOrderById()
    }, [id])

    const handleUpdate = async () => {
        setLoading(true)
        try {
            const dataOrder = {
                status: status,
                isPaid: paided === 'Yes'
            }
            const res = await orderApi.updateOrder(dataOrder,order.order.id)
            if(res.status===200){
                toast.success('Update done')
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    return (
        <AdminLayout>
            <Navigate listNav={listNav} />
            {
                order === undefined ? <></> :
                    <Box sx={{
                        width: '96%',
                        backgroundColor: 'white',
                        margin: '0 auto',
                        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                    }}>
                        <Box sx={{
                            display: 'flex'
                        }}>
                            <Box sx={{
                                marginTop: '16px',
                                marginLeft: '23px'
                            }}>
                                <Box sx={{
                                    display: 'flex'
                                }}>
                                    <CalendarTodayIcon fontSize="small" />
                                    <Typography sx={{
                                        fontSize: '15px'
                                    }}>Cteated at: {formatDate(order.order.createdAt)}</Typography>
                                </Box>
                                <Box sx={{
                                    display: 'flex'
                                }}>
                                    <CalendarTodayIcon fontSize="small" />
                                    <Typography sx={{
                                        fontSize: '15px'
                                    }}>Updated at: {formatDate(order.order.updatedAt)}</Typography>
                                </Box>
                                <Typography sx={{
                                    fontWeight: '500',
                                    fontSize: '16px',
                                    color: '#929395',
                                    marginTop: '9px'
                                }}>Order ID: {order.order.id}</Typography>
                            </Box>
                            <Box sx={{
                                marginLeft: '35%',
                                marginTop: '14px'
                            }}>
                                <Typography>Status</Typography>
                                <Box sx={{ width: 200, marginTop: '11px' }}>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={status}
                                            onChange={handleChangeStatus}
                                        >
                                            <MenuItem value={'Processing'}>Processing</MenuItem>
                                            <MenuItem value={'Shipping'}>Shipping</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                            <Box sx={{
                                marginLeft: '3%',
                                marginTop: '14px'
                            }}>
                                <Typography>Paided</Typography>
                                <Box sx={{ width: 200, marginTop: '11px' }}>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={paided}
                                            onChange={handleChangePaided}
                                        >
                                            <MenuItem value={'Yes'}>Yes</MenuItem>
                                            <MenuItem value={'No'}>No</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                            <LoadingButton
                                variant="contained"
                                loading={loading}
                                sx={{
                                    width: 150,
                                    height: 40,
                                    backgroundColor: '#FFD333',
                                    color: 'black',
                                    fontWeight: '600',
                                    marginLeft: '4%',
                                    marginTop: '52px'
                                }}
                                onClick={handleUpdate}
                            >
                                Update Order
                            </LoadingButton>
                        </Box>
                        <Divider
                            sx={{
                                borderRightWidth: 2,
                                backgroundColor: '#737070',
                                marginTop: '20px',
                            }}
                        />
                        {
                            user === undefined ? <></> : <Box sx={{
                                display: 'flex',
                                flexWrap: 'wrap'
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    marginTop: '35px',
                                    marginLeft: '7%'
                                }}>
                                    <Box sx={{
                                        width: '75px',
                                        height: '75px',
                                        borderRadius: '100%',
                                        backgroundColor: '#3D464D',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <PermIdentityIcon fontSize="large" sx={{
                                            color: '#FFD333'
                                        }} />
                                    </Box>
                                    <Box sx={{
                                        marginLeft: '15px'
                                    }}>
                                        <Typography sx={{
                                            fontWeight: '600',
                                            fontSize: '20px'
                                        }}>Customer</Typography>
                                        <Typography>Name: {user.username}</Typography>
                                        <Typography>Email: {user.email}</Typography>
                                        <Typography>Phone: {user.contact}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    marginTop: '35px',
                                    marginLeft: '12%'
                                }}>
                                    <Box sx={{
                                        width: '75px',
                                        height: '75px',
                                        borderRadius: '100%',
                                        backgroundColor: '#3D464D',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <LocalShippingIcon fontSize="large" sx={{
                                            color: '#FFD333'
                                        }} />
                                    </Box>
                                    <Box sx={{
                                        marginLeft: '15px'
                                    }}>
                                        <Typography sx={{
                                            fontWeight: '600',
                                            fontSize: '20px'
                                        }}>Order Info</Typography>
                                        <Typography>Status: {order.order.status}</Typography>
                                        <Typography>Pay method: {order.order.paymentMethod}</Typography>
                                        <Typography>Paided: {order.order.isPaid === true ? 'Yes' : 'No'}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    marginTop: '35px',
                                    marginLeft: '12%'
                                }}>
                                    <Box sx={{
                                        width: '75px',
                                        height: '75px',
                                        borderRadius: '100%',
                                        backgroundColor: '#3D464D',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <PlaceIcon fontSize="large" sx={{
                                            color: '#FFD333'
                                        }} />
                                    </Box>
                                    <Box sx={{
                                        marginLeft: '15px'
                                    }}>
                                        <Typography sx={{
                                            fontWeight: '600',
                                            fontSize: '20px'
                                        }}>Deliver to</Typography>
                                        <Typography>Address: {order.order.address}</Typography>
                                        <Typography>Contact: {user.contact}</Typography>
                                        <Typography>Shipper: GHTK</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        }

                        <ListOrders listHeader={listHeader} listItems={order.items} totalAmount={sumArray(order.items)} />
                    </Box>
            }


        </AdminLayout>
    )
}