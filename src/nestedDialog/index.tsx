import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import NestedDialog from './NestedDialog.tsx';

const MainDialog: React.FC = () => {
    const [openMainDialog, setOpenMainDialog] = useState(false);
    const [openNestedDialog, setOpenNestedDialog] = useState(false);

    const handleOpenMainDialog = () => {
        setOpenMainDialog(true);
    };

    const handleCloseMainDialog = () => {
        setOpenMainDialog(false);
    };

    const handleOpenNestedDialog = () => {
        setOpenNestedDialog(true);
    };

    const handleCloseNestedDialog = () => {
        setOpenNestedDialog(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleOpenMainDialog}>
                Open Main Dialog
            </Button>

            <Dialog open={openMainDialog} onClose={handleCloseMainDialog}>
                <DialogTitle>Main Dialog</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This is the main dialog content. You can open another nested dialog from here.
                    </DialogContentText>
                    <Button variant="outlined" onClick={handleOpenNestedDialog}>
                        Open Nested Dialog
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseMainDialog} color="primary">
                        Close Main Dialog
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Sử dụng NestedDialog */}
            <NestedDialog open={openNestedDialog} handleClose={handleCloseNestedDialog} />
        </div>
    );
};

export default MainDialog;
