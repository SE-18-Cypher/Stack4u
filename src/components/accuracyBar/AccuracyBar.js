import React from 'react';
import './AccuracyBar.css';

export default function AccuracyBar(props) {
    // use state hook to hold the accuracy value 
    const [accuracyValue, setAccuracyValue] = React.useState(30)
    // use effect hook to update the accuracy value from the parameters
    React.useEffect(() => {
        setAccuracyValue(props.value);
    },[])
    // use effect hook to updat the colors in the accuracy bar according to 
    // the accuracy value, hook runs everytime the accuracy value changes 
    React.useEffect(() => {
        var progress = document.getElementById("progress");
        if(accuracyValue <= 10){ //low accuracy is red
            progress.style.backgroundColor = "red";
        }
        if(accuracyValue > 10 && accuracyValue <= 30){ // medium accuracy is orange
            progress.style.backgroundColor = "orange";
        }
        if(accuracyValue >= 30){    // high accuracy is green
            progress.style.backgroundColor = "green";
        }        
    }, [accuracyValue])

    return (
        <div>
            <div className='progressBar'>
                <div id="progress" style={{ width: accuracyValue + "%", height: '100%' }} />
            </div>
        </div>
    )
}
