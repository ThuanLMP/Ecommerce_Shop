import styles from './ListOrders.module.scss'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { CardMedia, Divider, IconButton, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from '@mui/system';

export default function ListOrders({ listHeader, listItems, totalAmount }) {
    
    return (
        <TableContainer sx={{ marginTop: '20px' }}>
            <Table sx={{ width: '100%' }} aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        {
                            listHeader.map((value) => {
                                return (
                                    <TableCell
                                        align='left'
                                        style={{
                                            fontSize: '20px',
                                            fontFamily: 'Arial',
                                            fontWeight: '700',
                                            borderTop: 'solid 2px #929395'
                                        }}
                                    >
                                        <div className={styles.wrapValue}>
                                            {value}
                                            <div className={styles.iconsSort}>
                                                <IconButton sx={{
                                                    marginBottom: '-15px'
                                                }}>
                                                    <ArrowDropUpIcon />
                                                </IconButton>
                                                <br />
                                                <IconButton
                                                    sx={{
                                                        marginTop: '-10px'
                                                    }}>
                                                    <ArrowDropDownIcon />
                                                </IconButton>

                                            </div>
                                        </div>
                                    </TableCell>
                                )
                            })
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        listItems.map((value, index) => {
                            return (
                                <TableRow>
                                    <TableCell
                                        style={{
                                            fontSize: '24px',
                                            fontWeight: '700',
                                            display: 'flex'
                                        }}>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            style={{ borderRadius: 5 }}
                                            image={ value.itemInfo.images[0].url ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl36--VRVflpNnYoYgnED5j1sF1xaoSUpcmQ&usqp=CAU'}
                                            alt="No Image"
                                            sx={{
                                                display: 'block',
                                                maxWidth: '93px',
                                                maxHeight: '60px',
                                            }}
                                        />
                                        <Box sx={{
                                            marginLeft: '14px'
                                        }}>
                                            Adidas shoes <br />
                                            ID: 123
                                        </Box>

                                    </TableCell>

                                    <TableCell
                                        style={{
                                            fontSize: '20px',
                                            fontWeight: '400'
                                        }}
                                    >
                                        ${value.price}
                                    </TableCell>

                                    <TableCell
                                        style={{
                                            fontSize: '20px',
                                            fontWeight: '400'
                                        }}
                                    >
                                        {value.quantity}
                                    </TableCell>

                                    <TableCell
                                        style={{
                                            fontSize: '20px',
                                            fontWeight: '400'
                                        }}
                                    >
                                        ${value.total}
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }


                    <TableRow>
                        <TableCell style={{
                            borderBottom: 'none'
                        }}>

                        </TableCell>

                        <TableCell
                            style={{
                                fontSize: '25px',
                                fontWeight: '700',
                                borderBottom: 'none'
                            }}
                        >
                            Total Amount:
                        </TableCell>

                        <TableCell style={{
                            borderBottom: 'none'
                        }}>

                        </TableCell>

                        <TableCell
                            style={{
                                fontSize: '25px',
                                fontWeight: '700',
                                borderBottom: 'none'
                            }}
                        >
                            $
                            {
                                totalAmount
                            }
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

        </TableContainer>
    )
}