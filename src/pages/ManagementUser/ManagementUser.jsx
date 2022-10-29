import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import userApi from "../../api/userApi"
import AdminLayout from "../../layouts/AdminLayout"
import { updateUser } from "../../store/managementSlice"
import ModalConfirmDelete from "../ManagementProduct/components/ModalConfirmDelete/ModalConfirmDelete"
import Navigate from "../ManagementProduct/components/Navigate"
import TableItems from "../ManagementProduct/components/TableItems/TableItems"
import styles from './ManagementUser.module.scss'
const listNav = ['Dashboard', 'User']
const listHeader = ['ID', 'User', 'Contact', 'Status', 'Verify Email', 'Verify Contact']
export default function ManagementUser() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(5)
    const [listUser, setListUser] = useState()
    const [stateModal, setStateModal] = useState(false)
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
        const getAllUsers = async () => {
            try {
                const res = await userApi.getAllUsers(page, size)
                if (res.status === 200) {
                    setListUser(res.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getAllUsers()
    }, [page, size,stateDelete])

    const handleEdit = (value) => {
        const action = updateUser(value)
        dispatch(action)
        navigate(`update-user/${value.id}`)
    }

    const deleteUser = async (id) => {
        try {
            const res = await userApi.deleteUser(id)
            if (res.status === 200) {
                toast.success(res.data.message)
                setStateDelete(state => !state)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleDelete = (value) => {
        const action = updateUser(value)
        dispatch(action)
        setStateModal(true)
    }

    return (
        <AdminLayout>
            <Navigate listNav={listNav} />
            <div className={styles.wrapHeader}>
                <h2 style={{ marginLeft: '31px' }}>User</h2>
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
                        navigate('/admin/management/user/add-user')
                    }}
                >New user</Button>
            </div>
            <div className={styles.wrapList}>
                {
                    listUser === undefined ? <></> :
                        <TableItems
                            type={'user'}
                            listHeader={listHeader}
                            listItems={listUser.result}
                            setPage={setPageList}
                            setSize={setSizeList}
                            totalPages={listUser.totalPages}
                            size={size}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                }

            </div>

            <ModalConfirmDelete type={'user'} stateModal={stateModal} setStateModal={setStateModalDelete} handleDelete={deleteUser} />
        </AdminLayout>
    )
} 