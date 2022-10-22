import { CardMedia, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import styles from './ListItems.module.scss'

const listHeader = [
    'Image', 'Product', 'Total'
]

export default function TableItems({ items }) {
    return (
        <div className={styles.table}>
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: '700px', width: '100%' }} aria-label='simple table'>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#C4C4C4' }}>

                            <TableCell
                                align='left'
                                width='24%'
                                style={{
                                    fontSize: '16px',
                                    fontWeight: '700'
                                }}
                            >
                                Image
                            </TableCell>

                            <TableCell
                                width='66%'
                                align='left'
                                style={{
                                    fontSize: '16px',
                                    fontWeight: '700'
                                }}
                            >
                                Product
                            </TableCell>

                            <TableCell
                                width='10%'
                                align='left'
                                style={{
                                    fontSize: '16px',
                                    fontWeight: '700'
                                }}
                            >
                                Total
                            </TableCell>



                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {
                            items.map((value, index) => {
                                return (
                                    <TableRow sx={{ backgroundColor: '#EBEAEA' }}>
                                        <TableCell>
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                style={{ borderRadius: 5 }}
                                                image={value.url ?? ''}
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
                                            <div className={styles.quantity}>
                                                <label>Qty: </label> {value.quantity}
                                            </div>

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