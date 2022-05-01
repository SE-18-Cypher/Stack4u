import * as React from 'react';
// import { useState } from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import './Questionnaire.css';
import astro from '../../resources/images/output.png'
import Radio from '@mui/material/Radio';

const steps = [
    {
        label: 'Question 1',
        description: 'What is the type of application?',
        answers: ["11", "12", "13", "14"],
        ca: ["Web Application", "Mobile Application"],
        ra: ["false", "false", "true", "true"]
    },
    {
        label: 'Question 2',
        description: 'If it is a mobile application, what type is it?',
        answers: ["21", "22", "23", "24"],
        ca: ["Native", "Cross Platform"],
        ra: ["false", "false", "false", "true"]
    },
    {
        label: 'Question 3',
        description: 'Database type?',
        answers: ["31", "32", "33", "34"],
        ra: ["false", "false", "false", "false"]
    },
    {
        label: 'Question 4',
        description: '',
        answers: ["41", "42", "43", "44"],
        ra: ["false", "false", "false", "false"]
    },
    {
        label: 'Question 5',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
        answers: ["51", "52", "53", "54"],
        ra: ["false", "false", "false", "false"]
    },
];

export default function VerticalLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    // const [checked, setChecked] = useState([]);

    // const handleCheck = (event) => {
    //     var updatedList = [...checked];
    //     if (event.target.checked) {
    //         updatedList = [...checked, event.target.value];
    //     } else {
    //         updatedList.splice(checked.indexOf(event.target.value), 1);
    //     }
    //     setChecked(updatedList);
    // };
    //-------------------------------------------------------------
    const [selectedValue, setSelectedValue] = React.useState('');

    // const [selectedAnswer1, setSelectedAnswer1] = React.useState(0);
    // const [selectedAnswer2, setSelectedAnswer2] = React.useState(0);
    // const [selectedAnswer3, setSelectedAnswer3] = React.useState(0);
    // const [selectedAnswer4, setSelectedAnswer4] = React.useState(0);

    const controlProps = (item) => ({
        checked: selectedValue === item,
        onChange: handleChange,
        value: item,
        name: 'size-radio-button-demo',
        inputProps: { 'aria-label': item },
    });

    const handleChange = (event) => {
        console.log(event.target.value)
        setSelectedValue(event.target.value);
    };

    // const handleAnswerChange = e => {
    //     const { name, value } = e.target;

    //     this.setState({
    //         [name]: value
    //     });
    // };

    //-------------------------------------------------------------
    return (
        <div className='divM'>
            <div className='divP'>
                <Paper
                    className='paper'
                    elevation={4}
                >
                    <Box sx={{ maxWidth: 1000 }}>
                        <Stepper activeStep={activeStep} orientation="vertical" >
                            {steps.map((step, index) => (
                                <Step key={step.label}>
                                    <StepLabel
                                        optional={
                                            index === 4 ? (
                                                <Typography variant="caption">Last step</Typography>
                                            ) : null
                                        }
                                    >
                                        {step.label}
                                    </StepLabel>
                                    <StepContent>
                                        <Typography>{step.description}</Typography>
                                        {/* <script>
                                            var size = step.answers.length-1
                                            var pAnswer = step.answers.ac
                                            p = document.createElement("p");
                                            for (let i=0; i <= size; i++){
                                                p.innerHTML = pAnswer[i];
                                            <p><Radio {...controlProps(step.answers[0])} size="small" />p.innerHTML</p>
                                            } 
                                        </script> */}
                                        <p><Radio {...controlProps(step.answers[0])} size="small" de />answer 1</p>
                                        <p><Radio {...controlProps(step.answers[1])} size="small" disabled={step.ra[1]} />answer 2</p>
                                        <p><Radio {...controlProps(step.answers[2])} size="small" disabled={step.ra[2]} />answer 3</p>
                                        <p><Radio {...controlProps(step.answers[3])} size="small" disabled={step.ra[3]} />answer 4</p>
                                        <Box sx={{ mb: 2 }}>
                                            <div>
                                                <Button
                                                    variant="contained"
                                                    onClick={handleNext}
                                                    sx={{ mt: 1, mr: 1 }}
                                                >
                                                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                                </Button>
                                                <Button
                                                    disabled={index === 0}
                                                    onClick={handleBack}
                                                    sx={{ mt: 1, mr: 1 }}
                                                >
                                                    Back
                                                </Button>
                                            </div>
                                        </Box>
                                    </StepContent>
                                </Step>
                            ))}

                        </Stepper>
                        {activeStep === steps.length && (
                            <Paper square elevation={0} sx={{ p: 3 }}>
                                <Typography>All steps completed - you&apos;re finished</Typography>
                                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                                    Reset
                                </Button>
                            </Paper>
                        )}
                    </Box>
                </Paper>
                <img id='pht' src={astro} style={{ height: '40%', width: '20%' }} alt="" />
            </div>
        </div>
    );
}