
import {
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material'
import { formatDate } from '../../../../utils/ultils'

import styles from './TableList.module.scss'



export default function TableList({ listHeader, items}) {


    return (
        <div>
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
                        {
                            items.map((value, index) => {
                                return (
                                    <TableRow key={value.id}>
                                        <TableCell
                                            style={{
                                                fontSize: '24px',
                                                fontWeight: 'bold',
                                                borderBottom: "none"
                                            }}
                                        >
                                            #{value.id}
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                fontSize: '24px',
                                                fontWeight: 'bold',
                                                borderBottom: "none"
                                            }}
                                        >
                                            {formatDate(value.createdAt)}
                                        </TableCell><TableCell
                                            style={{
                                                fontSize: '24px',
                                                fontWeight: 'bold',
                                                borderBottom: "none"
                                            }}
                                        >
                                            {value.status}
                                        </TableCell><TableCell
                                            style={{
                                                fontSize: '24px',
                                                fontWeight: 'bold',
                                                borderBottom: "none"
                                            }}
                                        >
                                            ${value.totalPrice}
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                            )
                        }


                    </TableBody>
                </Table>
            </TableContainer>

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
    )
}