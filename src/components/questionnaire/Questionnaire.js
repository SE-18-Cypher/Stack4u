import * as React from 'react';
import { useState } from "react";
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
        description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
    },
    {
        label: 'Question 2',
        description:
            'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
        label: 'Question 3',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
    {
        label: 'Question 4',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
    {
        label: 'Question 5',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
];
const n = ['1', '2', '3', '4', '5']
const checkList = ["Apple", "Cat", "Tea"];
// const checkList1 = ["Banana", "Bat", "Water"];
// const checkList2 = ["Papaya", "Dog", "Soft drink"];
// const checkList3 = ["Pineapple", "Bird", "Coffee"];

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

    const [checked, setChecked] = useState([]);

    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };
//-------------------------------------------------------------
    const [selectedValue, setSelectedValue] = React.useState('a');

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
                                        <p><Radio {...controlProps(n[0])}  size="small" />answer 1</p>
                                        <p><Radio {...controlProps(n[0])}  size="small" />answer 2</p>
                                        <p><Radio {...controlProps(n[2])}  size="small" />answer 3</p>
                                        <p><Radio {...controlProps(n[3])}  size="small" />answer 4</p>
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

                            {/* var i=0
                            {checkList.map((item, index) => (
                                <div key={index}>
                                    <input value={item} type="radio" value=1 onChange={handleCheck}/>
                                    <span>{item}</span>
                                </div>
                            ))} */}
                            {/* <input id={checklist[0]} value={checklist[0].item} type="radio" onChange={handleCheck} />
                            <input id={checklist[1]} value={checklist1[1].item} type="radio" onChange={handleCheck} />
                            <input id={checklist[2]} value={checklist2[2].item} type="radio" onChange={handleCheck} /> */}
                            {/* <input id={checklist.index()} value={checklist3.item} type="radio" onChange={handleCheck} /> */}

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
                <img id='pht' src={astro} style={{ height: '40%', width: '20%' }} />
            </div>
        </div>
    );
}