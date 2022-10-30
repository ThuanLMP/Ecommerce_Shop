import styles from './TableItems.module.scss'
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { CardMedia, Pagination, Paper, Rating, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatDate } from '../../../../utils/ultils';




export default function TableItems({ type, listHeader, listItems, setPage, totalPages, setSize, size, handleEdit, handleDelete }) {

    const showList = listItems.map((value, index) => {
        if (type === 'product') {
            return (
                <TableRow>
                    <TableCell
                        align='left'
                        style={{
                            fontSize: '24px',
                            fontWeight: '700'
                        }}
                    >
                        {index + 1}

                    </TableCell>
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
                            image={value.images[0].url}
                            alt="No Image"
                            sx={{
                                display: 'block',
                                maxWidth: '60px',
                                maxHeight: '60px',
                            }}
                        />
                        <Box sx={{
                            marginLeft: '14px'
                        }}>
                            {value.brand} <br />
                            ID: {value.id}
                        </Box>

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
                        {value.category}
                    </TableCell>

                    <TableCell
                        style={{
                            fontSize: '24px',
                            fontWeight: '700'
                        }}
                    >
                        {value.countInStock} items
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
                        <Rating name="half-rating-read" precision={0.5} value={value.rating} readOnly size='small' />
                    </TableCell>
                    <TableCell
                        style={{
                            fontSize: '24px',
                            fontWeight: '700'
                        }}
                    >
                        <IconButton style={{
                            color: '#387B18'
                        }}
                            onClick={() => handleEdit(value)}
                        >
                            <BorderColorIcon />
                        </IconButton>
                        <IconButton style={{
                            color: '#F02020'
                        }}
                            onClick={() => handleDelete(value)}>
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
            )
        }
        else if (type === 'user') {
            return (
                <TableRow>
                    <TableCell
                        align='left'
                        style={{
                            fontSize: '20px',
                            fontWeight: '400'
                        }}
                    >
                        {index + 1}

                    </TableCell>
                    <TableCell
                        style={{
                            fontSize: '20px',
                            fontWeight: '400',
                            display: 'flex',
                            paddingBottom: '3px'
                        }}>
                        <CardMedia
                            component="img"
                            height="200"
                            style={{ borderRadius: 5 }}
                            image={value.avatar ?? 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'}
                            alt="No Image"
                            sx={{
                                display: 'block',
                                maxWidth: '60px',
                                maxHeight: '60px',
                            }}
                        />
                        <Box sx={{
                            marginLeft: '14px',
                            position: 'relative'
                        }}>
                            {value.username}
                            {
                                value.role === 'admin' ?
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: '5px',
                                            left: '170px',
                                            width: '50px',
                                            height: '18px',
                                            backgroundColor: '#4B9528',
                                            fontSize: '12px',
                                            borderRadius: '10px',
                                            color: 'white',
                                            paddingLeft: '15px'
                                        }}
                                    >
                                        Admin
                                    </Box> : <Box
                                        sx={{
                                            position: 'absolute',
                                            top: '5px',
                                            left: '170px',
                                            width: '59px',
                                            height: '18px',
                                            backgroundColor: '#E13A44',
                                            fontSize: '12px',
                                            borderRadius: '10px',
                                            color: 'white',
                                            paddingLeft: '5px'
                                        }}
                                    >
                                        Customer
                                    </Box>
                            }

                            <br />
                            {value.email}
                        </Box>

                    </TableCell>
                    <TableCell
                        style={{
                            fontSize: '20px',
                            fontWeight: '400'
                        }}
                    >
                        {value.contact ?? 'None'}
                    </TableCell>

                    <TableCell
                        style={{
                            fontSize: '20px',
                            fontWeight: '400'
                        }}
                    >
                        {value.isActive === true ? 'Active' : 'Disabled'}
                    </TableCell>

                    <TableCell
                        style={{
                            fontSize: '20px',
                            fontWeight: '400'
                        }}
                    >
                        {value.isEmailVerified === true ? 'Yes' : 'No'}
                    </TableCell>

                    <TableCell
                        style={{
                            fontSize: '20px',
                            fontWeight: '400'
                        }}
                    >
                        {value.isContactVerified === true ? 'Yes' : 'No'}
                    </TableCell>

                    <TableCell
                        style={{
                            fontSize: '20px',
                            fontWeight: '400'
                        }}
                    >
                        <IconButton style={{
                            color: '#387B18'
                        }}
                            onClick={() => handleEdit(value)}
                        >
                            <BorderColorIcon />
                        </IconButton>
                        <IconButton style={{
                            color: '#F02020'
                        }}
                            onClick={() => handleDelete(value)}>
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
            )
        } else if (type === 'order') {
            return (
                <TableRow>
                    <TableCell
                        align='left'
                        style={{
                            fontSize: '20px',
                            fontWeight: '400'
                        }}
                    >
                        {index + 1}

                    </TableCell>

                    <TableCell
                        style={{
                            fontSize: '20px',
                            fontWeight: '400'
                        }}
                    >
                        {value.userId}
                    </TableCell>

                    <TableCell
                        style={{
                            fontSize: '20px',
                            fontWeight: '400'
                        }}
                    >
                        {value.totalPrice}
                    </TableCell>

                    <TableCell
                        style={{
                            fontSize: '20px',
                            fontWeight: '400'
                        }}
                    >
                        {value.address}
                    </TableCell>

                    <TableCell
                        style={{
                            fontSize: '20px',
                            fontWeight: '400'
                        }}
                    >
                        {value.contact}
                    </TableCell>

                    <TableCell
                        style={{
                            fontSize: '20px',
                            fontWeight: '400'
                        }}
                    >
                        {formatDate(value.createdAt)}
                    </TableCell>
                    <TableCell
                        style={{
                            fontSize: '20px',
                            fontWeight: '400'
                        }}
                    >
                        {value.isPaid === true ? <Box sx={{
                            width: '72px',
                            height: '25px',
                            backgroundColor: '#FFD333',
                            borderRadius: '20px',
                            display: 'flex',
                            justifyContent: 'center',

                        }}> <Typography sx={{
                            fontSize: '20px',
                            color: 'white',
                            fontWeight: '400'
                        }}>Yes</Typography> </Box> : <Box sx={{
                            width: '72px',
                            height: '25px',
                            backgroundColor: '#366AB8',
                            borderRadius: '20px',
                            display: 'flex',
                            justifyContent: 'center',

                        }}><Typography sx={{
                            fontSize: '20px',
                            color: 'white',
                            fontWeight: '400'
                        }}>No</Typography> </Box>}
                    </TableCell>
                    <TableCell
                        style={{
                            fontSize: '20px',
                            fontWeight: '400'
                        }}
                    >
                        {value.status}
                    </TableCell>
                    <TableCell
                        style={{
                            fontSize: '20px',
                            fontWeight: '400'
                        }}
                    >
                        <IconButton style={{
                            color: '#387B18'
                        }}
                            onClick={() => handleEdit(value)}
                        >
                            <BorderColorIcon />
                        </IconButton>
                        <IconButton style={{
                            color: '#F02020'
                        }}
                            onClick={() => handleDelete(value)}>
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
            )
        }

    })


    return (
        <>
            <div className={styles.search}>
                <Box
                    component="form"
                    sx={{
                        p: "2px 4px",
                        backgroundColor: "#F5F7FA",
                        borderRadius: '5px',
                        border: 'solid 1.5px #C4C4C4',
                        display: "flex",
                        alignItems: "center",
                        width: '90%',
                        marginLeft: '5%',
                        marginTop: '43px',
                        height: 42
                    }}
                >
                    <IconButton type="button" sx={{ p: "10px" }} aria-label="search" >
                        <SearchIcon fontSize='large' />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search"
                        inputProps={{ "aria-label": "search google maps" }}
                    />
                </Box>
            </div>

            <div className={styles.tableItems}>
                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: '700px', width: '100%' }} aria-label='simple table'>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#FFFFFF' }}>
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
                                <TableCell
                                    align='left'
                                    style={{
                                        fontSize: '20px',
                                        fontFamily: 'Arial',
                                        fontWeight: '700',
                                        borderTop: 'solid 2px #929395'
                                    }}
                                >


                                </TableCell>

                            </TableRow>

                        </TableHead>
                        <TableBody>
                            {
                                listItems === undefined ? <></> : showList
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{
                    display: 'flex',
                    position: 'relative',
                    marginBottom: '30px'
                }}>
                    <Pagination
                        count={totalPages}
                        variant="outlined"
                        shape="rounded"
                        defaultPage={1}
                        sx={{
                            marginTop: '50px',
                            marginLeft: '44px',
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
                        onChange={(event, value) => {
                            setPage(value)
                        }}
                    />
                    <Box sx={{
                        display: 'flex',
                        marginTop: '55px',
                        position: 'absolute',
                        right: '40px'

                    }}>
                        Items per page
                        <div className={styles.numberOfList}>
                            <label>{size}</label>
                            <Box sx={{ marginTop: '-14px' }}>
                                <IconButton sx={{
                                    marginBottom: '-13px'
                                }}
                                    onClick={() => {
                                        setSize(size => size + 1)
                                    }}
                                >
                                    <ArrowDropUpIcon />
                                </IconButton>
                                <br />
                                <IconButton
                                    sx={{
                                        marginTop: '-15px'
                                    }}
                                    onClick={() => {
                                        setSize(size => size - 1)
                                    }}
                                >
                                    <ArrowDropDownIcon />
                                </IconButton>
                            </Box>

                        </div>

                    </Box>
                </Box>

            </div>
        </>
    )
}