import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
    styled
} from '@mui/material';

interface FormValues {
    [key: string]: any;
}

const FormContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    max-width: 400px;
    margin: 100px auto;
    cursor: pointer;
    min-height: 200px;
`;

const ButtonContainer = styled(Box)`
    display: flex;
    justify-content: space-between;
    margin: 20px auto;
    max-width: 400px;
`;

const DynamicForm: React.FC = () => {
    const { control, handleSubmit, setValue } = useForm<FormValues>();
    const [divs, setDivs] = useState<
        {
            id: number;
            fields: {
                name: string;
                type: 'checkbox' | 'radio' | 'input' | 'textfield';
                label?: string;
            }[];
        }[]
    >([{ id: 0, fields: [] }]);
    const [selectedDiv, setSelectedDiv] = useState<number | null>(null);
    const [fieldCount, setFieldCount] = useState(0);

    const handleDivClick = (divId: number) => {
        setSelectedDiv(divId);
    };

    const addFieldToDiv = (
        divId: number,
        fieldType: 'checkbox' | 'radio' | 'input' | 'textfield',
        label?: string
    ) => {
        const name = `${fieldType}-${fieldCount}`;
        const updatedDivs = divs.map((div) => {
            if (div.id === divId) {
                return {
                    ...div,
                    fields: [...div.fields, { name, type: fieldType, label }]
                };
            }
            return div;
        });
        setDivs(updatedDivs);
        setValue(name, fieldType === 'checkbox' ? false : '');
        setFieldCount((prevCount) => prevCount + 1);
    };

    const addCheckbox = () => {
        if (selectedDiv !== null) {
            addFieldToDiv(selectedDiv, 'checkbox', '');
        }
    };

    const handleLabelChange = (divId: number, fieldName: string, label: string) => {
        const updatedDivs = divs.map((div) => {
            if (div.id === divId) {
                return {
                    ...div,
                    fields: div.fields.map((field) =>
                        field.name === fieldName ? { ...field, label } : field
                    )
                };
            }
            return div;
        });
        setDivs(updatedDivs);
    };

    const addRadio = () => {
        if (selectedDiv !== null) {
            addFieldToDiv(selectedDiv, 'radio');
        }
    };

    const addInput = () => {
        if (selectedDiv !== null) {
            addFieldToDiv(selectedDiv, 'input');
        }
    };

    const addTextField = () => {
        if (selectedDiv !== null) {
            addFieldToDiv(selectedDiv, 'textfield');
        }
    };

    const addBox = () => {
        const newDivId = divs.length;
        setDivs([...divs, { id: newDivId, fields: [] }]);
    };

    const onSubmit = (data: FormValues) => {
        const formData = {
            divs: divs.map((div) => ({
                id: div.id,
                fields: div.fields.map((field) => ({
                    ...field,
                    value: data[field.name]
                }))
            }))
        };
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {divs.map((div) => (
                <FormContainer
                    key={div.id}
                    onClick={() => handleDivClick(div.id)}
                    style={{ borderColor: selectedDiv === div.id ? 'blue' : '#ccc' }}
                >
                    <div>
                        {div.fields.map((field, index) => (
                            <Controller
                                key={index}
                                name={field.name}
                                control={control}
                                render={({ field: controllerField }) =>
                                    field.type === 'checkbox' ? (
                                        <Box display="flex" alignItems="center">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        {...controllerField}
                                                        checked={!!controllerField.value}
                                                    />
                                                }
                                                label=""
                                            />
                                            <TextField
                                                value={field.label}
                                                onChange={(e) =>
                                                    handleLabelChange(
                                                        div.id,
                                                        field.name,
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Checkbox label"
                                                variant="outlined"
                                                size="small"
                                                sx={{ ml: 1 }}
                                            />
                                        </Box>
                                    ) : field.type === 'radio' ? (
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">
                                                Radio {index + 1}
                                            </FormLabel>
                                            <RadioGroup {...controllerField}>
                                                <FormControlLabel
                                                    value="option1"
                                                    control={<Radio />}
                                                    label="Option 1"
                                                />
                                                <FormControlLabel
                                                    value="option2"
                                                    control={<Radio />}
                                                    label="Option 2"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    ) : field.type === 'input' ? (
                                        <TextField
                                            {...controllerField}
                                            label={`Input ${index + 1}`}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    ) : (
                                        <TextField
                                            {...controllerField}
                                            label={`TextField ${index + 1}`}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    )
                                }
                            />
                        ))}
                    </div>
                </FormContainer>
            ))}
            <ButtonContainer>
                <Button variant="contained" color="primary" type="button" onClick={addCheckbox}>
                    Add Checkbox
                </Button>
                <Button variant="contained" color="secondary" type="button" onClick={addRadio}>
                    Add Radio
                </Button>
                <Button variant="contained" color="info" type="button" onClick={addInput}>
                    Add Input
                </Button>
                <Button variant="contained" color="warning" type="button" onClick={addTextField}>
                    Add TextField
                </Button>
                <Button variant="contained" color="success" type="button" onClick={addBox}>
                    Add Div
                </Button>
                <Button variant="contained" color="success" type="submit" sx={{ mt: 2 }}>
                    Submit
                </Button>
            </ButtonContainer>
        </form>
    );
};

export default DynamicForm;
