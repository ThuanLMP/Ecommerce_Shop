import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider, Typography } from '@mui/material';
import { useSelector } from 'react-redux';


export default function ModalConfirmDelete({ type, stateModal, setStateModal, handleDelete }) {
    const product = useSelector(state => state.management.product)
    const user = useSelector(state => state.management.user)
    const handleDisagree = () => {
        setStateModal(false)
    }
    const handleAgree = () => {
        if (type === 'user') {
            handleDelete(user.id)
            setStateModal(false)
        } else {
            handleDelete(product.id)
            setStateModal(false)
        }
    }

    return (
        <div>
            <Dialog
                open={stateModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography
                        sx={{
                            fontWeight: '700',
                            fontSize: '25px'
                        }}

                    >Confirm Delete</Typography>

                </DialogTitle>
                <Divider
                    sx={{
                        width: '600px',
                        backgroundColor: '#737070',
                        marginBottom: '19px',
                        marginTop: '20px'
                    }}
                />
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {type === 'user' ?
                            <Typography
                                sx={{
                                    fontWeight: '400',
                                    fontSize: '20px',
                                    color: 'black',
                                    marginTop: '-10px'
                                }}
                            >Are you sure to delete user #{user.id} ?</Typography> :
                            <Typography
                                sx={{
                                    fontWeight: '400',
                                    fontSize: '20px',
                                    color: 'black',
                                    marginTop: '-10px'
                                }}
                            >Are you sure to delete product #{product.id} ?</Typography>
                        }

                    </DialogContentText>


                </DialogContent>
                <Divider
                    sx={{
                        width: '600px',
                        backgroundColor: '#737070',
                        marginBottom: '19px',
                        marginTop: '20px'
                    }}
                />
                <DialogActions>
                    <Button
                        onClick={handleDisagree}
                        variant='contained'
                        sx={{
                            backgroundColor: '#C4C4C4',
                            color: 'black'
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleAgree}
                        autoFocus
                        variant='contained'
                        sx={{
                            backgroundColor: 'red'
                        }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}