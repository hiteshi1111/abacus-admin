import React, { useState } from 'react'
import Layout from '../../layout';
import Loader from '../../components/shared/loader';
import PasswordUpdate from '../../components/settings/passwordUpdate';

const Settings = () => {
    const [ disabled, setDisabled ] = useState(false);

    return (
        <Layout>
            <div className='flex justify-between items-center border-b py-[10px]'>
                {disabled && (<Loader/>)}
                <h2 className="capitalize text-[25px] leading-[92.857%] font-bold text-[#21407E] w-full px-[30px]">Settings</h2>
            </div>
            <PasswordUpdate disabled={disabled} setDisabled={setDisabled} />
        </Layout>
    )
}

export default Settings;