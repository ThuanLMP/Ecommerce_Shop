import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import productsApi from "../../api/productsApi";
import AdminLayout from "../../layouts/AdminLayout";
import { updateProduct } from "../../store/managementSlice";
import ModalConfirmDelete from "./components/ModalConfirmDelete";
import Navigate from "./components/Navigate";
import TableItems from "./components/TableItems/TableItems";
import styles from './ManagementProduct.module.scss'
const listNav = ['Dashboard', 'Product']

const listHeader = [
    'ID', 'Product', 'Brand', 'Category', 'Stock', 'Price', 'Rating'
]
export default function ManagementProduct() {
    const dispatch = useDispatch()
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(5)
    const navigate = useNavigate()
    const [stateModal, setStateModal] = useState(false)
    const [listProduct, setListProduct] = useState()
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
        const getAllProducts = async () => {
            try {
                const response = await productsApi.getAllProducts(page, size)
                setListProduct(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        getAllProducts()
    }, [page, size, stateDelete])


    const handleEdit = (value) => {
        const action = updateProduct(value)
        dispatch(action)
        navigate(`update-order/${value.id}`)
    }

    const deleteProduct = async (id) => {
        try {
            const res = await productsApi.deleteProduct(id)
            if (res.status === 200) {
                toast.success(res.data.message)
                setStateDelete(state => !state)
            }
        } catch (error) {
            console.log(error)
            toast.error('Delete fail')
        }
    }

    const handleDelete = (value) => {
        const action = updateProduct(value)
        dispatch(action)
        setStateModal(true)
    }

    return (
        <AdminLayout>
            <Navigate listNav={listNav} />

            <div className={styles.wrapHeader}>
                <h2 style={{ marginLeft: '31px' }}>Product</h2>
                <Button
                    sx={{
                        backgroundColor: '#FFD333',
                        color: 'black',
                        textTransform: 'none',
                        fontSize: '20px',
                        fontWeight: '600',
                        width: '150px',
                        height: '40px',
                        position: 'absolute',
                        right: '39px'
                    }}
                    onClick={() => {
                        navigate('/admin/management/product/add-product')
                    }}
                >New product</Button>
            </div>
            <div className={styles.wrapList}>
                {
                    listProduct === undefined ? <></> :
                        <TableItems
                            type={'product'}
                            listHeader={listHeader}
                            listItems={listProduct.result}
                            setPage={setPageList}
                            totalPages={listProduct.totalPages}
                            setSize={setSizeList}
                            size={size}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                }

            </div>
            <ModalConfirmDelete stateModal={stateModal} setStateModal={setStateModalDelete} handleDelete={deleteProduct} />
        </AdminLayout>
    )
}