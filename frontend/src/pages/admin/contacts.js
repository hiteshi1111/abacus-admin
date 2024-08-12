import React, { useEffect, useState } from 'react';
import { GetRequest} from '../../utils/requests';
import Layout from '../../layout';
// import Statistics from "../../components/dashboard/statistics";
import convertDate from '../../utils/convertDate';



const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const [trigger, setTrigger] = useState(0);

    useEffect(() => {
        
            GetRequest(process.env.REACT_APP_API_URL + 'contact/getContacts').then(response => {
                setContacts(response.data);
                console.log(">>>>",response.data)
            }).catch(err => {
                console.log(err.data);
            });
        
    }, [ trigger]);
   
    return (
        <Layout>
              <div className='h-[80vh]'>
                <div className='flex justify-between items-center border-b py-[10px]'>
                    <h2 className="capitalize text-[25px] leading-[92.857%] font-bold text-[#21407E] w-full px-[30px]">All Leads</h2>
                    {/* <div className='flex justify-between items-center gap-[10px]' >
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
                                />
                            )}
                            <AddUserPopup setTrigger={setTrigger}/>
                        </div>
                    </div> */}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[10px] mt-[20px] max-w-[1500px] mx-auto">
                    {contacts.length > 0 && contacts.map((contact, index) => (
                    <div className=" hover:bg-[#aaa] p-[5px] bg-[#e6f5ff]"key={index}>
                       <p>Full Name : {contact.firstName+ " "+contact.lastName}</p>
                       <p>Email : {contact.email}</p>
                       <p>Phone : {contact.phone}</p>
                       <p>Subject : {contact.Subject}</p>
                       <p>Message : {contact.message}</p>
                       <p>Date and Time : {convertDate(contact.createdAt)}</p>
                    </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Contacts;