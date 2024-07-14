import React from 'react';
import { Snackbar, Button } from '@mui/material';

const SnackbarComponent = () => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <div>
                <Button onClick={handleClick}>Click</Button>
                <Snackbar
                    open={open}
                    onClose={handleClose}
                    autoHideDuration={6000} // Set a duration for auto hide, or remove if not needed
                    message="This is a snackbar message"
                    action={
                        <Button color="secondary" size="small" onClick={handleClose}>
                            Dismiss
                        </Button>
                    }
                />
            </div>
        </>
    );
};

export default SnackbarComponent;
