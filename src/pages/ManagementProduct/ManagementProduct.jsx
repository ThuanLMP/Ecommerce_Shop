import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import productsApi from "../../api/productsApi";
import AdminLayout from "../../layouts/AdminLayout";
import Navigate from "./components/Navigate";
import TableItems from "./components/TableItems/TableItems";
import styles from './ManagementProduct.module.scss'
const listNav = ['Dashboard', 'Product']

const listHeader = [
    'ID', 'Product', 'Brand', 'Category', 'Stock', 'Price', 'Rating'
]
export default function ManagementProduct() {
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(5)
    const navigate = useNavigate()

    const [listProduct, setListProduct] = useState()
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
    }, [page, size])
    const handleEdit = (value) => {
        navigate(`update-product/${value.id}`)
    }
    const handleDelete = (value) => {

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

        </AdminLayout>
    )
}