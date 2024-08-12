import React from 'react'

const Loader = () => {
    return (
        <div className='h-full w-full absolute top-[0] left-[0] bg-[#aaaaaa9e] z-[11] flex justify-center items-center rounded-[5px]'>
            <div className="loading">
                <div></div>
                <div></div>
            </div>  
            {/* <div class="loading">
                <div class="cloud"></div>
                <div class="data">
                    <span>0</span>
                    <span>1</span>
                    <span>0</span>
                    <span>1</span>
                    <span>0</span>
                    <span>1</span>
                    <span>0</span>
                </div>
                <div class="browser">
                    <div class="buttons"></div>
                </div>
            </div> */}
        </div>
    )
}

export default Loader;