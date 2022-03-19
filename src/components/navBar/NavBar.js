import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import './NavBar.css';
import Logo from '../../resources/images/stack4uLOGO_OG_T.png';
import b from '../../resources/images/Construct2.jfif';
import eLearningLogo from '../../resources/images/elearningLogo.png';
import { useNavigate } from "react-router";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const pages = ['Home', 'Tech info', 'Forum', 'About ', 'Contact '];
const settings = ['Account', 'Logout'];


const NavBar = (props) => {

    const navigate = useNavigate();
    const storage = getStorage();
    const profilePic = b;
    const profilePictureRef = ref(storage, 'users/' + props.uidValue);
    console.log(profilePictureRef)
    getDownloadURL(ref(storage, 'users/' + props.uidValue + '/picture.jpeg'))
    .then((url) => {
      const img = document.getElementById('myimg');
      img.setAttribute('src', url);
      profilePic = url;
    })
    .catch((error) => {
      console.log(error)
    });

    // const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    // const handleOpenNavMenu = (event) => {
    //     setAnchorElNav(event.currentTarget);
    // };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    // const handleCloseNavMenu = () => {
    //     setAnchorElNav(null);
    // };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (

        <AppBar style={{ backgroundColor: 'white', height: '77px', boxShadow: '0px 0px', marginTop: '0px' }} position="static" >

            <Container maxWidth="xL">
                <Toolbar disableGutters>

                    <img src={Logo} alt="logo" style={{ height: '11%', width: '12%', marginLeft: '105px', marginTop: '1px' }} />

                    {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box> */}
                    
                    <Box sx={{ paddingLeft:'15%', flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
                        
                        
                            <Button                                
                                onClick={() => navigate("/home")}
                                sx={{ paddingInline:'5%', color: '0167B0', fontSize:'19px',fontWeight:"580", fontFamily:'Calibri', height:'76px' }}
                            >
                             {pages[0]}   
                            </Button>

                            <Button             
                                onClick={() => navigate("/techInfoPage")}                                
                                sx={{ paddingInline:'5%', color: '0167B0', fontSize:'19px',fontWeight:"580", fontFamily:'Calibri', height:'76px' }}
                            >
                             {pages[1]}   
                            </Button>

                            <Button                                 
                                onClick={() => navigate("/forum")}                               
                                sx={{ paddingInline:'5%', color: '0167B0', fontSize:'19px',fontWeight:"580", fontFamily:'Calibri', height:'76px' }}
                            >
                             {pages[2]}   
                            </Button>

                            <Button                                 
                                onClick={() => navigate("/aboutus")}                                
                                sx={{ paddingInline:'5%', color: '0167B0', fontSize:'19px',fontWeight:"580", fontFamily:'Calibri', height:'76px' }}
                            >
                             {pages[3]}   
                            </Button>
                               
                            <Button                                 
                                onClick={() => navigate("/contactUs")}                                
                                sx={{ paddingInline:'5%', color: '0167B0', fontSize:'19px',fontWeight:"580", fontFamily:'Calibri', height:'76px' }}
                            >
                             {pages[4]}   
                            </Button>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, marginRight: '130px' }}>
                                <Avatar><img id='myimg' src={b} width={50} alt='profile-avatar'/>  </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Button onClick={() => navigate("/constructionPage")} style={{ float: 'right' }} > <img src={eLearningLogo} width={34} alt='elearning site- logo' /> </Button>
                        <Menu
                            sx={{ mt: '50px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >

                            <MenuItem onClick={() => navigate("/home/profile")} >
                                <Typography textAlign="center"> {settings[0]} </Typography>

                            </MenuItem>

                            <MenuItem onClick={() => navigate("/login")} >
                                <Typography textAlign="center"> {settings[1]} </Typography>
                            </MenuItem>

                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>

    );

};
export default NavBar;

