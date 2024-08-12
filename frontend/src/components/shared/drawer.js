import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Menu } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router';
import { IconButton } from '@mui/material';
import ImageIcons from "../imageComponent/ImageIcons";
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

const MenuDrawer = ({ navLinks }) => {
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const [toggleDropdown, setToggleDropdown] = React.useState(false);

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 260 }}
            role="presentation"
            onClick={toggleDrawer(anchor, true)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100vh" }}>
                <List>
                    <div className='p-[16px] border-b-[1px] border-[#ddd]'>
                        <Link to="/" ><img src={ImageIcons.logoFull} alt='logo' loading="lazy"/></Link>
                    </div>
                    {navLinks.map((item, index) => (
                        <div key={index}>
                            <ListItem disablePadding className={`border-solid border-b border-[#ddd] last:border-none ${pathname === item.handle && "bg-[#000244] text-white border-none"}`}>
                                <ListItemButton onClick={() => navigate(item.handle)}>
                                    <ListItemText primary={item.title} />
                                </ListItemButton>
                                {item.subLinks && (
                                    <ListItemButton className='!flex !justify-end !absolute right-0' onClick={() => setToggleDropdown(prev => !prev)}>{toggleDropdown ? <ExpandLess /> : <ExpandMore />}</ListItemButton>
                                )}
                            </ListItem>
                            {item.subLinks && (
                                <Collapse in={toggleDropdown} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {item.subLinks.map((item, i) => (
                                            <ListItem key={i} disablePadding className={`bg-[#010467] text-white border-solid border-b border-[#ffffff29] last:border-none ${pathname === item.handle && "!bg-[#000244] text-white"}`}>
                                                <ListItemButton 
                                                    onClick={() => {
                                                        navigate(`/service/${item.handle}`)
                                                        toggleDrawer('left', false);
                                                    }}
                                                >
                                                    <ListItemText primary={item.title} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            )}
                        </div>
                    ))}
                </List>
                <List>
                    <ListItem >
                        <Link to="https://www.abacuscloud.in/" className='!duration-500 !text-[#000244] hover:!text-[#fff] !text-center !text-[18px] !font-bold border-[1px] border-[#2E2F5C] hover:!border-[#2E2F5C] hover:!bg-[#000244] !w-full flex justify-center items-center h-[50px]' style={{ border: '1px solid' }}>
                            <ListItemText primary="Login" />
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link to="https://abacuscloud.in/register" className='!duration-500 !bg-[#000244] hover:!bg-[#020573] !text-white !text-center !text-[18px] !font-bold h-[50px] !w-full flex justify-center items-center'>
                            <ListItemText primary="Register" />
                        </Link>
                    </ListItem>
                </List>
            </Box>
        </Box>
    );

    return (
        <React.Fragment key={'left'}>
            <IconButton onClick={toggleDrawer('left', true)} aria-label='Menu'>
                <Menu fontSize='large' htmlColor='#fff' />
            </IconButton>
            <Drawer
                anchor={'left'}
                open={state['left']}
                onClose={toggleDrawer('left', false)}
            >
                {list('left')}
            </Drawer>
        </React.Fragment>
    );
}

export default MenuDrawer;