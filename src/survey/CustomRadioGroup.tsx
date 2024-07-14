// src/components/CustomSurveyStyles.ts
import styled from 'styled-components';

export const CustomRadioGroup = styled.div`
    .sd-item__decorator {
    label {
      color: #007bff; /* Màu chữ của label */
    }
    input[type='radio'] {
      accent-color: #007bff; /* Màu sắc của nút radio */
    }
  }
    .sd-item__control:focus{
        label {
            color: #007bff; /* Màu chữ của label */
        }
    }
`;
