import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { PersonTwoTone, Settings } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { AccountContext } from '../../App';
import { MenuItem } from '@mui/material';

const UserProfile = ({initialLetter}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { setUserData, setLogin } = React.useContext(AccountContext);
    const navigate = useNavigate();

    const handleClose = () => {
        sessionStorage.removeItem("xios");
        navigate("/account/login");
        setLogin(false);
        setUserData(null);
    };
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const closeHandler = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <Avatar sx={{ width: 35, height: 35 }}>
                    {initialLetter ? (
                        <div>{initialLetter}</div>
                    ): (
                        <PersonTwoTone />
                    )}
                </Avatar>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={closeHandler}
            >
                <MenuItem onClick={handleClose}><Settings fontSize="medium" className='mr-[10px]'/> Settings</MenuItem>
                <MenuItem onClick={handleClose}><LogoutIcon fontSize="medium" className='mr-[10px]'/> Logout</MenuItem>
            </Menu>
        </>
    )
}

export default UserProfile;