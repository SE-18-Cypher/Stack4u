import React from 'react';
import './commonProfile.css';
import { Avatar} from '@mui/material';
import NavBar from '../../navBar/NavBar';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router';

export default function CommonProfile() {
    const user = sessionStorage.getItem("user");
    const navigate = useNavigate();

    React.useEffect(() => {
        if (user === '0') {
            navigate('/access_error')
        }
    },)

    return (
        <div>
            <NavBar/>

            <div className="profilePage">
                <div className='commonProfileHeader'>
                    
                    <Avatar alt="Profile photo"
                        src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                        sx={{ width: 220, height: 220, marginTop: -13, marginLeft: 10}}/>

                    <div style={{backgroundColor: "white", marginTop: -120, height: 280,width: 1400, borderRadius: 30}}>
                    
                        <Avatar sx={{ width: 56, height: 56, float: "right", marginRight: "2%", marginTop: "2%" }}>
                            <EditIcon fontSize='large' />
                        </Avatar>

                        <div style={{paddingTop: "9%", paddingLeft: "8%", fontSize: 25}}>
                            <p style={{}}>FirstName LastName</p>
                            <p>email address</p>
                        </div>    
                    </div>
                </div>

            </div>
        </div>

    )
}
