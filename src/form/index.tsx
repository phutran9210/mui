import {
    Button,
    Checkbox, Container,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Radio,
    RadioGroup,
    TextField
} from '@mui/material';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useEffect } from 'react';

const CheckboxQuestion = ({ name, options, defaultValues }) => {
    const { register, setValue } = useFormContext();

    useEffect(() => {
        if (defaultValues) {
            defaultValues.forEach(value => {
                setValue(`${name}[${value}]`, true);
            });
        }
    }, [defaultValues, setValue, name]);

    return (
        <FormGroup>
            {options.map((option, index) => (
                <FormControlLabel
                    key={index}
                    control={<Checkbox {...register(name)} value={index} defaultChecked={defaultValues?.includes(index)} />}
                    label={option}
                />
            ))}
        </FormGroup>
    );
};

const RadioQuestion = ({ name, options, defaultValues }) => {
    const { register, setValue } = useFormContext();

    useEffect(() => {
        if (defaultValues && defaultValues.length > 0) {
            setValue(name, defaultValues[0]);
        }
    }, [defaultValues, setValue, name]);

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{name}</FormLabel>
            <RadioGroup {...register(name)} defaultValue={defaultValues?.[0]}>
                {options.map((option, index) => (
                    <FormControlLabel key={index} value={index} control={<Radio />} label={option} />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

const TextQuestion = ({ name, defaultValues }) => {
    const { register, setValue } = useFormContext();

    useEffect(() => {
        if (defaultValues) {
            setValue(name, defaultValues);
        }
    }, [defaultValues, setValue, name]);

    return (
        <TextField {...register(name)} label={name} variant="outlined" fullWidth defaultValue={defaultValues} />
    );
};

const EqualRadioQuestion = ({ name, levels, defaultValues }) => {
    const { register, setValue } = useFormContext();

    useEffect(() => {
        if (defaultValues && defaultValues.length > 0) {
            setValue(name, defaultValues[0]);
        }
    }, [defaultValues, setValue, name]);

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{name}</FormLabel>
            <RadioGroup {...register(name)} defaultValue={defaultValues?.[0]}>
                {[...Array(levels.max - levels.min + 1)].map((_, index) => (
                    <FormControlLabel key={index} value={index + levels.min} control={<Radio />} label={`${levels.label_min} ${index + levels.min}`} />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

const mockData = [
    {
        "type": 2,
        "required": 0,
        "name": "Question 1",
        "description": "Description 1",
        "options": [
            "Option 1",
            "Option 2",
            "その他"
        ],
        "answer": [1]
    },
    {
        "type": 1,
        "required": 0,
        "name": "Question 2",
        "description": "Description 2",
        "options": [
            "Option 1",
            "Option 2",
            "Option 3",
            "その他"
        ],
        "answer": [1,2]
    },
    {
        "type": 4,
        "name": "Question 3",
        "description": "Description 3",
        "required": 0,
        "levels": {
            "min": 1,
            "max": 2,
            "label_min": "Min Label",
            "label_max": "Max Label"
        },
        "answer": [1]
    },
    {
        "type": 3,
        "name": "Question 4",
        "description": "Description 4",
        "required": 0,
        "answer": "test"
    },
    {
        "type": 1,
        "required": 0,
        "name": "Question 5",
        "description": "Description 5",
        "options": [
            "Option 1",
            "その他"
        ],
        "answer": [1]
    },
]

const AppForm = () => {
    const methods = useForm();

    const onSubmit = data => console.log(data);

    return (
        <Container>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    {mockData.map((question, index) => {
                        if (!question.answer || question.answer.length === 0) {
                            return null;
                        }

                        const commonProps = {
                            key: index,
                            name: question.name,
                            defaultValues: question.answer
                        };

                        switch (question.type) {
                            case 1:
                                return <CheckboxQuestion {...commonProps} options={question.options} />;
                            case 2:
                                return <RadioQuestion {...commonProps} options={question.options} />;
                            case 3:
                                return <TextQuestion {...commonProps} />;
                            case 4:
                                return <EqualRadioQuestion {...commonProps} levels={question.levels} />;
                            default:
                                return null;
                        }
                    })}
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                </form>
            </FormProvider>
        </Container>
    );
}

export default AppForm;