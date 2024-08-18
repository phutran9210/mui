import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import FileUpload from './FileUpload.tsx';

interface NestedDialog {
    open: boolean;
    handleClose: () => void;
}

const NestedDialog: React.FC<NestedDialog> = ({ open, handleClose }) => {
    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Nested Dialog</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This is the content of the nested dialog.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close Nested Dialog
                    </Button>
                </DialogActions>
            </Dialog>
        <FileUpload/>
        </>


    );
};

export default NestedDialog;
