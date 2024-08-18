import React from 'react';
import { useController, Control } from 'react-hook-form';
import { FormControl, FormLabel, RadioGroup as MuiRadioGroup, FormControlLabel, Radio } from '@mui/material';

interface RadioOption {
    label: string;
    value: string | number;
}

interface RadioGroupProps {
    name: string;
    control: Control<any>;
    label: string;
    options: RadioOption[];
}

const RadioGroup: React.FC<RadioGroupProps> = ({ name, control, label, options }) => {
    const {
        field: { value, onChange },
    } = useController({
        name,
        control,
    });

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <MuiRadioGroup value={value} onChange={onChange}>
                {options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                    />
                ))}
            </MuiRadioGroup>
        </FormControl>
    );
};

export default RadioGroup;
