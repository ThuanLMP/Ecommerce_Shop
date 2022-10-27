import styles from './TableItems.module.scss'
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { CardMedia, Pagination, Paper, Rating, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';




export default function TableItems({ listHeader, listItems, setPage, totalPages, setSize, size, handleEdit, handleDelete }) {

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

                                listItems.map((value, index) => {
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
                                                    onClick={()=>handleEdit(value)}
                                                >
                                                    <BorderColorIcon />
                                                </IconButton>
                                                <IconButton style={{
                                                    color: '#F02020'
                                                }}
                                                    onClick={()=>handleDelete(value)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )

                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{
                    display: 'flex',
                    position: 'relative'
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