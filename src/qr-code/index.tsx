import { useState } from 'react';
import QRCode from 'qrcode.react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useAppContext } from '../context';
import Count from './Count.tsx';


const QRCodeGenerator = () => {
    const [link, setLink] = useState('');
    const [info, setInfo] = useState('');
    const [qrData, setQrData] = useState('');
    const {  dispatch } = useAppContext();
    const apiUrl = import.meta.env.VITE_REACT_APP_URL || 'http://localhost:5173'
    console.log('appUrl:', apiUrl);
    const handleGenerateQR = () => {
        const data = {
            apiUrl
        };
        setQrData(JSON.stringify(data));
    };

    return (
        <Box width="100%" padding={2}>
            <Grid container direction="column" alignItems="center" spacing={2}>
                <Grid item>
                    <Typography variant="h5">QR Code Generator</Typography>
                </Grid>
                <Grid item>
                    <TextField
                        label="Link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label="Info"
                        value={info}
                        onChange={(e) => setInfo(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid
                    item
                    container
                    sx={{ gap: 2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Button
                        sx={{ maxWidth: 300, minWidth: 200 }}
                        variant="contained"
                        color="primary"
                        onClick={handleGenerateQR}
                    >
                        Generate QR Code
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => dispatch({ type: 'increment' })}
                        sx={{ maxWidth: 300, minWidth: 200 }}
                    >
                        increment
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => dispatch({ type: 'decrement' })}
                        sx={{ maxWidth: 300, minWidth: 200 }}
                    >
                        decrement
                    </Button>
                </Grid>
                <Grid item>
                    {qrData && (
                        <Box>
                            <QRCode value={qrData} size={256} />
                        </Box>
                    )}
                </Grid>
            </Grid>
            <Count />
        </Box>
    );
};

export default QRCodeGenerator;
