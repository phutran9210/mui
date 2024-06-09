import {
    Box,
    Container,
    Grid,
    TextField,
    Button,
    IconButton
} from '@mui/material';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';

// Định nghĩa kiểu cho dữ liệu của form
interface IFormInput {
    pairs: {
        email: string;
        phone: string;
    }[];
}

function App() {
    const navigate = useNavigate();
    const {
        control,
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IFormInput>({
        defaultValues: {
            pairs: [{ email: '', phone: '' }]
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'pairs'
    });

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log(data);
        navigate('/info', { state: data });
    };

    const addPair = () => {
        append({ email: '', phone: '' });
    };

    return (
        <Container maxWidth="xl">
            <Box
                sx={{
                    height: '100vh',
                    backgroundColor: '#fbf9ef'
                }}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    {fields.map((field, index) => (
                        <Grid
                            container
                            direction={'row'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
                            key={field.id}
                            sx={{ marginBottom: 2 }}
                            spacing={30}
                        >
                            <Grid item xs={5}>
                                <TextField
                                    {...register(`pairs.${index}.email`, {
                                        required: 'Email là bắt buộc',
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: 'Email không hợp lệ'
                                        }
                                    })}
                                    id={`email-${index}`}
                                    label="Email"
                                    variant="outlined"
                                    error={!!errors.pairs?.[index]?.email}
                                    helperText={
                                        errors.pairs?.[index]?.email?.message
                                    }
                                    sx={{ width: '500px' }}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <Grid container sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                }}>
                                    <Grid item xs={10}>
                                        <TextField
                                            {...register(
                                                `pairs.${index}.phone`,
                                                {
                                                    required:
                                                        'Số điện thoại là bắt buộc',
                                                    pattern: {
                                                        value: /^[0-9]+$/,
                                                        message:
                                                            'Số điện thoại không hợp lệ'
                                                    }
                                                }
                                            )}
                                            id={`phone-${index}`}
                                            label="Số điện thoại"
                                            variant="outlined"
                                            sx={{ width: '500px', marginLeft: '-100px'}}
                                            error={
                                                !!errors.pairs?.[index]?.phone
                                            }
                                            helperText={
                                                errors.pairs?.[index]?.phone
                                                    ?.message
                                            }
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={2}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            marginRight: '-80px'
                                        }}
                                    >
                                        {index === fields.length - 1 ? (
                                            <IconButton
                                                onClick={addPair}
                                                color="primary"
                                            >
                                                <AddIcon />
                                            </IconButton>
                                        ) : (
                                            index > 0 && (
                                                <IconButton
                                                    onClick={() =>
                                                        remove(index)
                                                    }
                                                    color="secondary"
                                                >
                                                    <RemoveIcon />
                                                </IconButton>
                                            )
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    ))}
                    <Grid
                        item
                        xs={12}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: 2
                        }}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Lấy dữ liệu
                        </Button>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
}

export default App;
