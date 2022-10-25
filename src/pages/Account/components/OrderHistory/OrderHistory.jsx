
import { Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import TableList from '../TableList'
import styles from './OrderHistory.module.scss'
const listHeader = [
    'Order', 'Date', 'Status', 'Total'
]
export default function OrderHistory({listHeader,items}) {
    return (
        <div className={styles.wrapOrderHistory}>
            <h2 style={{marginLeft: '30px'}}>Order History</h2>
            <TableList listHeader={listHeader} items={items}/>
        </div>
    )
}