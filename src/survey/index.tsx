// src/components/SurveyComponent.tsx
import React from 'react';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { CustomRadioGroup } from './CustomRadioGroup.tsx';

const SurveyComponent: React.FC = () => {
    const surveyJson = {
        title: "Product Feedback Survey",
        pages: [
            {
                elements: [
                    {
                        type: "radiogroup",
                        name: "satisfaction",
                        title: "How satisfied are you with our product?",
                        choices: ["Very Satisfied", "Satisfied", "Neutral", "Unsatisfied", "Very Unsatisfied"]
                    },
                    {
                        type: "comment",
                        name: "suggestions",
                        title: "What would you suggest to improve our product?"
                    }
                ]
            }
        ]
    };

    const survey = new Model(surveyJson);

    survey.onComplete.add((result) => {
        console.log("Survey results: ", result.data);
    });

    return (
        <CustomRadioGroup>
            <Survey model={survey} />
        </CustomRadioGroup>
    );
};

export default SurveyComponent;
