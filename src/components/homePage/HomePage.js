import React from 'react';
import { FileUploader } from "react-drag-drop-files";

import './HomePage.css';
import mainPageComputer from './../../resources/images/mainpageComputer.png';
import mainPageImageIcon from './../../resources/images/mainpageImageIcon.png';

const fileTypes = ["JPEG", "PDF"];

export default function HomePage() {

    const [file, setFile] = React.useState(null);
    const handleChange = (file) => {
        setFile(file);
    };
    console.log(file);
    return (
        <div>
            <div className='commonbg' />
            <div className='mainPageContent'>
                <div className='dragAndDropOutsideContainer'>
                    <br />
                    <div className='dragAndDropContainer'>
                        <FileUploader
                            multiple={false}
                            handleChange={handleChange}
                            name="file"
                            types={fileTypes}
                            classes='uploader'
                        >
                            <div style={{marginTop:180}}>
                                <img src={mainPageImageIcon} alt='decoration image - image icon' width={80} style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }} />
                                <h4 style={{ textAlign: 'center', color: '#043B63' }}> Upload your .pdf here</h4>
                            </div>
                        </FileUploader>
                    </div>
                    <img src={mainPageComputer} alt='decoration image - computer' className='decorationComputerImage' />
                </div>
            </div>
        </div>
    )
}
