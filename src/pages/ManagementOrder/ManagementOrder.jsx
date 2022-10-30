import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import orderApi from "../../api/orderApi";
import AdminLayout from "../../layouts/AdminLayout";
import Navigate from "../ManagementProduct/components/Navigate";
import TableItems from "../ManagementProduct/components/TableItems/TableItems";
import styles from './ManagementOrder.module.scss'

const listNav = ['Dashboard', 'Order']
const listHeader = ['ID', 'User ID', 'Amount', 'Address', 'Contact', 'Date', 'Paided', 'Status']
export default function ManagementOrder() {
    const dispatch = useDispatch()
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(5)
    const navigate = useNavigate()
    const [stateModal, setStateModal] = useState(false)
    const [listOrder, setListOrder] = useState()
    const [stateDelete, setStateDelete] = useState(false)
    const setStateModalDelete = (value) => {
        setStateModal(value)
    }
    const setPageList = (value) => {
        setPage(value)
    }
    const setSizeList = (size) => {
        setSize(size)
    }
    useEffect(() => {
        const getAllOrders = async () => {
            try {
                const res = await orderApi.getAllOrders(page, size)
                if (res.status === 200) {
                    setListOrder(res.data.data.orders)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getAllOrders()
    }, [page, size, stateDelete])


    const handleEdit = (value) => {
        navigate(`order-detail/${value.id}`)
    }

    const deleteProduct = async (id) => {

    }

    const handleDelete = (value) => {

    }

    return (
        <AdminLayout>
            <Navigate listNav={listNav} />
            <Typography sx={{
                fontSize: '35px',
                fontWeight: '700px',
                marginLeft: '26px'
            }}>Orders</Typography>
            <div className={styles.wrapList}>
            {
                listOrder === undefined ? <></> :
                    <TableItems
                        type={'order'}
                        listHeader={listHeader}
                        listItems={listOrder.result}
                        setPage={setPageList}
                        totalPages={listOrder.totalPages}
                        setSize={setSizeList}
                        size={size}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}

                    />
            }
            </div>

        </AdminLayout>
    )
}