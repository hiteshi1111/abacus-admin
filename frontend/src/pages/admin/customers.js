import React, { useContext, useEffect, useState } from 'react';
import { GetRequest, PostRequest } from '../../utils/requests';
import DeletePopup from '../../components/modal/deletePopup';
import ViewPopup from '../../components/modal/viewPopup';
import { AccountContext } from '../../App';
import AddUserPopup from '../../components/modal/addUserPopup';
import Layout from '../../layout';
import Tooltip from '../../components/custom/tooltip';
import Checkbox from '../../components/custom/checkbox';
import { FaCircle } from 'react-icons/fa';
import Search from '../../components/custom/search';
import { MdDelete } from 'react-icons/md';

const Customers = () => {
    const [users, setUsers] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [filteredData, setFilteredData] = useState(users);
    const [trigger, setTrigger] = useState(0);
    const { userData } = useContext(AccountContext);

    useEffect(() => {
        if (userData?.userId) {
            GetRequest(process.env.REACT_APP_API_URL + 'user/all/' + userData.userId).then(response => {
                setUsers(response.data);
            }).catch(err => {
                console.log(err.data);
            });
        }
    }, [userData, trigger]);

    useEffect(() => {
        const filtered = users.length > 0 ? users.filter(index => {
            return (index.email.includes(searchKey) || index.fullName.includes(searchKey))
        }) : [];
        setFilteredData(filtered)
    },[searchKey, users])

    function onRowClick(userId) {
        if (selectedRows.includes(userId)) {
            const filtered = selectedRows.filter(index => { return index !== userId });
            setSelectedRows(filtered);
        } else {
            setSelectedRows(prevState => [...prevState, userId]);
        }
    }
    function selectAllHandler() {
        if (users.length !== 0 && selectedRows.length === users.length) {
            setSelectedRows([]);
        } else {
            const allIds = users.map(user => user._id);
            setSelectedRows(allIds);
        }
    }
    function multipleDeleteHandler(){
        PostRequest(process.env.REACT_APP_API_URL + 'user/deactivate',{
            userIds: selectedRows
        }).then(response => {
            setTrigger(prev => prev+1)
        }).catch(err => {
            console.log("error >", err)
        });
    }
    return (
        <Layout>
            <div className='h-[80vh]'>
                <div className='flex justify-between items-center border-b py-[10px]'>
                    <h2 className="capitalize text-[25px] leading-[92.857%] font-bold text-[#21407E] w-full px-[30px]">All Customers</h2>
                    <div className='flex justify-between items-center gap-[10px]' >
                        <Search
                            value={searchKey}
                            onChange={(e) => setSearchKey(e.target.value)}
                        />
                        <div className='flex gap-[10px]'>
                            {selectedRows.length > 0 && (
                                <DeletePopup 
                                    title="Are you sure that you want to deactivate the selected users?"
                                    subTitle="He/She will not be able to log in. You may reactivate the customers one by one."
                                    action={multipleDeleteHandler} 
                                    icon={<MdDelete size={18} color='#fff' />} 
                                />
                            )}
                            <AddUserPopup setTrigger={setTrigger}/>
                        </div>
                    </div>
                </div>
                <div className='mt-[20px] pb-[50px] w-full overflow-x-auto'>
                    <table className='max-w-[1500px] mx-auto'>
                        <thead>
                            <tr className='bg-[#dcdcdc] py-[120px]'>
                                <td className='w-[5%] pl-[10px]'>
                                    <Checkbox
                                        checked={users.length > 0 && selectedRows.length === users.length}
                                        onClick={() => selectAllHandler()}
                                    />
                                </td>
                                {columns.map((col, i) => (
                                    <td
                                        key={i}
                                        style={{ width: col.width}}
                                        className='!font-bold !text-[14px] text-left'
                                    >{col.headerName}</td>
                                ))}
                                <td className='text-left'></td>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 && filteredData.map((user, i) => (
                                <tr key={i} className={`${selectedRows.includes(user._id) ? "!bg-[#e0dfee]" : "!bg-[#f8f8ff]"}`}>
                                    <td className='pl-[10px]'>
                                        <Checkbox
                                            checked={selectedRows.includes(user._id)}
                                            onClick={() => onRowClick(user._id)}
                                        />
                                    </td>
                                    <td className='text-left text-[14px]'>{user.fullName || "----"}</td>
                                    <td className='text-left text-[14px]'>{user.email || "----"}</td>
                                    <td className='text-left text-[14px]'>
                                        <span className={`px-[5px] capitalize rounded-full ${user.role === "admin" ? "bg-[#6BA259]" : "bg-[#FFFF00]"}`} backgroundColor={user.role === "admin" ? "#6BA259" : "#FFFF00"} textTransform="capitalize">{user.role}</span>
                                    </td>
                                    <td className='block 2xl:hidden text-left text-[14px]'>{user.fullAddress?.length > 20 ? `${user.fullAddress.slice(0, 15)}...` : user.fullAddress || "----"}</td>
                                    <td className='hidden 2xl:block text-left text-[14px]'>{user.fullAddress || "----"}</td>
                                    <td className='text-left text-[14px]'>{user.state || "----"}</td>
                                    {/* <td className='text-left text-[14px]'>{user.country || "----"}</td> */}
                                    <td className='text-left text-[14px]'>{user.panNumber || "----"}</td>
                                    <td className='text-left text-[14px]'>{user.aadharNumber || "----"}</td>
                                    <td className='text-center text-[14px]'>
                                        <Tooltip title={user.active ? "Active" : "InActive"} position="bottom">
                                            <FaCircle color={user.active ? "#008000" : "#ff0000"} className='mx-auto' />
                                        </Tooltip>
                                    </td>
                                    <td>
                                        <ViewPopup userData={user} setTrigger={setTrigger}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredData.length === 0 && (
                    <div className='w-full flex items-center justify-center text-[20px] mt-[30px]'>No User found!</div>
                )}
            </div>
        </Layout>
    )
}

const columns = [
    { field: 'fullName', headerName: 'Full Name', width: '10%' },
    { field: 'email', headerName: 'Email', width: '10%' },
    { field: 'role', headerName: 'Role', width: '10%' },
    { field: 'fullAddress', headerName: 'Full Address', width: '25%' },
    { field: 'state', headerName: 'State', width: '10%' },
    // { field: 'country', headerName: 'Country', width: '10%' },
    { field: 'panNumber', headerName: 'Pan Number', width: '12%' },
    { field: 'aadharNumber', headerName: 'Aadhar Number', width: '13%' },
    { field: 'status', headerName: 'Status', width: '5%' },
];

export default Customers;