import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@mui/material';
import RadioGroup from './RadioGroup'; // Import RadioGroup component đã tạo

interface FormValues {
    favoriteColor: string;
}

const options = [
    { label: 'Red', value: 'red' },
    { label: 'Blue', value: 'blue' },
    { label: 'Green', value: 'green' },
];

const MyForm: React.FC = () => {
    const { control, handleSubmit } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <RadioGroup
                name="favoriteColor"
                control={control}
                label="Favorite Color"
                options={options}
            />
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </form>
    );
};

export default MyForm;
