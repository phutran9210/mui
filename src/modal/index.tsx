import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { useEffect, useState } from 'react';
import CustomerInfoDialog, { CustomerInfoDialogProps } from './CustomerInfoDialog.tsx';
import { useForm, FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

export const TestModal = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [customer, setCustomer] = useState<CustomerInfoDialogProps['customer']>(null);
    const { register, handleSubmit, formState: { errors }, setValue, trigger, clearErrors } = useForm();

    useEffect(() => {
        fetch('http://dummyjson.com/users/1')
            .then(res => res.json())
            .then(data => setCustomer(data));
    }, []);

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const onSubmit = (data: any) => {
        console.log(data);
    };

    const getErrorMessage = (error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined) => {
        if (!error) return null;
        if ('message' in error) {
            return typeof error.message === 'string' ? error.message : 'Invalid input';
        }
        return 'Invalid input';
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Allow: backspace, delete, tab, escape, enter, home, end, left, right, ctrl+A, ctrl+C, ctrl+V, ctrl+X
        if (
            e.key === 'Backspace' ||
            e.key === 'Delete' ||
            e.key === 'Tab' ||
            e.key === 'Escape' ||
            e.key === 'Enter' ||
            e.key === 'Home' ||
            e.key === 'End' ||
            e.key === 'ArrowLeft' ||
            e.key === 'ArrowRight' ||
            (e.ctrlKey === true && (e.key === 'a' || e.key === 'c' || e.key === 'v' || e.key === 'x'))
        ) {
            return;
        }
        // Ensure that it is a number and stop the keypress if not
        if (!/^\d$/.test(e.key)) {
            e.preventDefault();
        }

    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Check if the value is a number
        if (/^\d*$/.test(value)) {
            setValue('number', value);
            clearErrors('number');
        } else {
            trigger('number');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Input
                        id="number"
                        {...register('number', {
                            required: 'Number is required',
                            validate: {
                                isNumber: (value) => {
                                    if (isNaN(value)) {
                                        return 'Only numbers are allowed';
                                    }
                                    return true;
                                }
                            }
                        })}
                        onKeyDown={handleKeyDown}
                        onInput={handleInputChange}
                        onBlur={() => trigger('number')}
                    />
                    {errors.number && <p>{getErrorMessage(errors.number)}</p>}
                </div>

                <Button type="submit">Submit</Button>
            </form>
            <div>
                <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                    Hiển thị thông tin khách hàng
                </Button>
                <CustomerInfoDialog open={dialogOpen} onClose={handleCloseDialog} customer={customer} />
            </div>
        </>
    );
};
