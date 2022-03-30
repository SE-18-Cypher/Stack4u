import React from 'react';
import './AccuracyBar.css';

export default function AccuracyBar() {
    const [accuracyValue, setAccuracyValue] = React.useState(0)


    React.useEffect(() => {
        var progress = document.getElementById("progress");
        if(accuracyValue <= 10){
            progress.style.backgroundColor = "red";
        }
        if(accuracyValue >= 10 && accuracyValue <= 30){
            progress.style.backgroundColor = "green";
        }
        //continue this put gradient values
        
    }, [accuracyValue])

    return (
        <div>
            <div className='progressBar'>
                <div id="progress" style={{ width: accuracyValue + "%", height: '100%' }} />
            </div>
        </div>
    )
}
