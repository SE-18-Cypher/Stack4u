import * as React from 'react';
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


var dict = {}

const steps = [
    {
        label: 'Question 1',
        description: 'What is the type of application?',
        answers: ["11", "12"],
        ca: ["Web Application", "Mobile Application"],
    },
    {
        label: 'Question 2',
        description: 'If it is a mobile application, what type is it?',
        answers: ["21", "22"],
        ca: ["Native", "Cross Platform"],
    },
    {
        label: 'Question 3',
        description: 'Database type?',
        answers: ["31", "32"],
        ca: ["SQL", "noSQL"]
    },
    {
        label: 'Question 4',
        description: 'If it is web, what do you value in a library, framework or in a language? ',
        answers: ["41", "42"],
        ca: ["community support", "Cross Platform"],
    },
    {
        label: 'Question 5',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
        answers: ["51", "52"],
        ca: ["Native", "Cross Platform"],
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
        var str = event.target.value+""
        var key = str.substring(0,1)
        var value = str.substring(1)
        console.log(key)
        console.log(value)
        dict[key] = value
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
                                        {step.ca.map((pAnswer, indexCount) => (
                                            <p><Radio {...controlProps(step.answers[indexCount])} size="small" />{pAnswer}</p>
                                        ))}

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