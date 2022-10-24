import { CardMedia, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Quantity from "../Quantity";
import styles from './TableItems.module.scss'
import DeleteIcon from '@mui/icons-material/Delete';
import ModalConfirm from "../ModalConfirm/ModalConfirm";
import { useState } from "react";
const listHeader = [
    'Image', 'Product', 'Price', 'Quantity', 'Total', 'Action'
]

export default function TableItems({ items, updateItem, handleDelete }) {
    const [value, setValue] = useState({})
    const [stateModal, setStateModal] = useState(false)

    const handleClickDelete = (value) => {
        setStateModal(true)
        setValue(value)
    }


    return (
        <div className={styles.table}>
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: '700px', width: '100%' }} aria-label='simple table'>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#C4C4C4' }}>
                            {
                                listHeader.map((value) => {
                                    return (
                                        <TableCell
                                            align='left'
                                            style={{
                                                fontSize: '16px',
                                                fontWeight: '700'
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
                        {
                            items.map((value, index) => {
                                return (
                                    <TableRow>
                                        <TableCell>
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                style={{ borderRadius: 5 }}
                                                image={value.itemCartInfo.images[0].url ?? ''}
                                                alt="No Image"
                                                sx={{
                                                    display: 'block',
                                                    maxWidth: '100px',
                                                    maxHeight: '100px',

                                                }}

                                            />
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                fontSize: '24px',
                                                fontWeight: '700'
                                            }}
                                        >
                                            {value.itemCartInfo.name}
                                        </TableCell>

                                        <TableCell
                                            style={{
                                                fontSize: '24px',
                                                fontWeight: '700'
                                            }}
                                        >
                                            ${value.price}
                                        </TableCell>

                                        <TableCell
                                            style={{
                                                fontSize: '24px',
                                                fontWeight: '700'
                                            }}
                                        >
                                            <Quantity amount={value.quantity} product={value} index={index} handleUpdate={updateItem} type={'cart'} />
                                        </TableCell>

                                        <TableCell
                                            style={{
                                                fontSize: '24px',
                                                fontWeight: '700'
                                            }}
                                        >
                                            ${value.total}
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                fontSize: '24px',
                                                fontWeight: '700'
                                            }}
                                            onClick={() => handleClickDelete(value)}
                                        >
                                            <DeleteIcon
                                                fontSize="large"
                                                sx={{
                                                    marginLeft: '10px',
                                                    marginTop: '5px',
                                                    color: 'red',
                                                    cursor: 'pointer'
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <ModalConfirm stateModal={stateModal} setStateModal={setStateModal} value={value} handleClickDelete={handleDelete} />
        </div>

    )
}