import { useRef, useState } from 'react';
import { Button, Grid, ImageList, ImageListItem, styled } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Upload = () => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const imageRef = useRef<HTMLInputElement | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result as string);
                setIsImageLoaded(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if (imageSrc) {
            // Xử lý gửi ảnh về server ở đây
            console.log('Image submitted:', imageSrc);
            // Reset lại ảnh sau khi submit
            setImageSrc(null);
            setIsImageLoaded(false);
            if (imageRef.current) {
                imageRef.current.value = '';
            }
        }
    };

    return (
        <Grid container direction="column" alignItems="start" justifyContent="center">
            <Grid item>
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Upload file
                    <VisuallyHiddenInput type="file" ref={imageRef} onChange={handleImageChange} />
                </Button>
                {isImageLoaded && imageSrc && (
                    <ImageList sx={{ width: 900, height: 500, mt: 2 }} cols={1}>
                        <ImageListItem>
                            <img
                                src={imageSrc}
                                alt="Uploaded"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </ImageListItem>
                    </ImageList>
                )}
            </Grid>
            <Grid item>
                <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
                    Submit
                </Button>
            </Grid>
        </Grid>
    );
};

export default Upload;

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
});
