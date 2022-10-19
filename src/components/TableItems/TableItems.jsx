import { CardMedia, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useSelector } from "react-redux";
import Quantity from "../Quantity";
import styles from './TableItems.module.scss'

const listHeader = [
    'Image', 'Product', 'Price', 'Quantity', 'Total'
]
export default function TableItems() {
    const cart = useSelector(state => state.cart.cart)

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
                            cart.itemArr.map((value, index) => {
                                return (
                                    <TableRow>
                                        <TableCell>
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                style={{ borderRadius: 5 }}
                                                image={value.img}
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
                                            {value.name}
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
                                            <Quantity amount={value.quantity} index={index}/>
                                        </TableCell>

                                        <TableCell
                                            style={{
                                                fontSize: '24px',
                                                fontWeight: '700'
                                            }}
                                        >
                                            ${value.total}
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }



                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    )
}