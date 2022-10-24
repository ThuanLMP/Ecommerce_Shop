import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function ModalConfirm({ stateModal, setStateModal, value, handleClickDelete }) {
    const handleDisagree = () => {
        setStateModal(false)
    }

    const handleAgree = () => {
        setStateModal(false)
        handleClickDelete(value.id)
    }

    return (
        <div>
            <Dialog
                open={stateModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Hành động này sẽ xóa vĩnh viễn và không thể khôi phục !"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có chắc chắn muốn xóa ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDisagree}>Disagree</Button>
                    <Button onClick={handleAgree} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}