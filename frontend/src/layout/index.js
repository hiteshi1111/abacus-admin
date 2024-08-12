import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AccountContext } from "../App";
import { IoIosSettings } from "react-icons/io";
import { MdMenu, MdSupervisorAccount } from "react-icons/md";
import Label from "../components/custom/label";
import { GiStoneBlock } from "react-icons/gi";
import { BiRupee } from "react-icons/bi";
import { RiPagesFill } from "react-icons/ri";
import { ImBlog } from "react-icons/im";
import logo from "../assets/images/logo.png";
import logosmall from "../assets/images/small_logo.svg";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { MdOutlinePayment } from "react-icons/md";
import { IoMdContacts } from "react-icons/io";
import IconButton from "../components/custom/iconButton";
import Avatar from "../components/custom/avatar";

const Layout = ({ children }) => {
    const [isActive, setIsActive] = useState(true);
    const { userData, setUserData } = useContext(AccountContext);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const initialLetter = userData?.fullName && userData.fullName.charAt(0).toUpperCase();

    const filteredLinks = userData ? sideBarLinks.filter(index => {
        return (index.role === "both" || index.role === userData?.role);
    }) : [];

    function logoutHandler(){
        sessionStorage.removeItem("xios");
        setUserData(null);
        if (!userData){
            navigate("/")
        }
    }
    return (
        <div className='flex dashboard'>
            <div className={!isActive ? 'is_active dashboard_left' : 'dashboard_left'}>
                <div className={`h-[100vh] w-[200px]`}>
                    <div className="w-full max-w-[360px]">
                        <Link className={`flex py-[9px] bg-[#fff] ${isActive ? "justify-center" : "justify-start pl-[15px]"}`} to='/' alt="logo">
                            {isActive ? (
                                <img
                                    src={logo}
                                    alt="fullLogo"
                                />
                            ):(
                                <img
                                    src={logosmall}
                                    alt="logosmall"
                                />
                            )}
                        </Link>
                    
                        {filteredLinks?.length > 0 && filteredLinks.map((link, index) => (
                            <Link 
                                to={link.handle} 
                                key={index} 
                                className={`flex py-[10px] px-[20px] hover:bg-[#aaa] ${!isActive && "justify-left pl-[30px]"} items-center gap-[20px] ${pathname === link.handle && "bg-[#e6f5ff]"} `}
                            >
                                {link.icon}
                                {/* <Label title={link.title} className="!mb-0 cursor-pointer" /> */}
                                {isActive && (
                                    <Label title={link.title} className="!mb-0 cursor-pointer" />
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className={!isActive ? "dashboard_right is_active" : "dashboard_right"}>
                <div className='header flex justify-between items-center w-full bg-[#000244] py-[15px] px-[30px]'>
                    <IconButton
                        icon={<MdMenu color="#fff" size={25} />}
                        onClick={() => setIsActive(prev => !prev)}
                    />
                    <div className="relative group">
                        <Avatar 
                            initialLetter={initialLetter} 
                            userData={userData} 
                        />
                        <div className="z-10 hidden group-hover:block bg-white divide-y divide-gray-100 rounded-lg shadow-md w-26 dark:bg-gray-700 absolute right-0">
                            <ul className="py-2" aria-labelledby="dropdownDefaultButton">
                                <li>
                                    <div onClick={logoutHandler} className="cursor-pointer flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-[14px]"><RiLogoutCircleRLine size={15} className="mr-[10px]" /> Logout</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="lg:px-[30px] px-[15px] py-[30px] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}

const sideBarLinks = [
    {
        icon: <RiPagesFill size={20} />,
        title: "Dashboard",
        handle: "/dashboard",
        role: "customer"
    },
    {
        icon: <RiPagesFill size={20} />,
        title: "Dashboard",
        handle: "/admin/dashboard",
        role: "admin"
    },
    {
        icon: <MdSupervisorAccount size={20} />,
        title: "Referral",
        handle: "/referral",
        role: "customer"
    },
    {
        icon: <GiStoneBlock size={20} />,
        title: "Products",
        handle: "/products",
        role: "customer"
    },
    {
        icon: <GiStoneBlock size={20} />,
        title: "Products",
        handle: "/admin/products",
        role: "admin"
    },
    {
        icon: <MdSupervisorAccount size={20} />,
        title: "Customers",
        handle: "/admin/customers",
        role: "admin"
    },
    {
        icon: <BiRupee size={20} />,
        title: "Taxes",
        handle: "/admin/taxes",
        role: "admin"
    },
    {
        icon: <MdOutlinePayment size={20} />,
        title: "Payment",
        handle: "/admin/payment",
        role: "admin"
    },
    {
        icon: <ImBlog size={20} />,
        title: "Blogs",
        handle: "/admin/blogs",
        role: "admin"
    },
    {
        icon: <IoIosSettings size={20} />,
        title: "Settings",
        handle: "/admin/settings",
        role: "admin"
    },
    {
        icon: <IoIosSettings size={20} />,
        title: "Settings",
        handle: "/settings",
        role: "customer"
    },
    {
        icon: <IoMdContacts  size={20} />,
        title: "Leads",
        handle: "/admin/contacts",
        role: "admin"
    }
]

export default Layout;