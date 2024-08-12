import React, { useState } from 'react';
import { PostRequest } from '../../utils/requests';
import Loader from '../shared/loader';
import IconButton from '../custom/iconButton';
import { BiEdit } from 'react-icons/bi';
import Modal from '.';
import Label from '../custom/label';
import TextInput from '../custom/textInput';
import { MdClose, MdCurrencyRupee } from 'react-icons/md';
import ActionButton from '../custom/actionButton';
import Select from '../custom/select';

const EditPlanPopup = ({setTrigger=()=>{}, ...props}) => {
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ disabled, setDisabled ] = useState(false);
    const [ formInput, setFormInput ] = useState({  
        productTitle: props.currentPlan,
        productPrice: props.price,
        rentalAmount: props.rentalAmount,
        rentalDuration: props.timePeriod,
        noOfBlocks: props.noOfBlocks
    })
    const [error, setError] = useState("");

    const handleRentalAmountChange = (e) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/\D/g, '');
    
        if (numericValue.length <= 10) {
            setFormInput((prevState) => ({ ...prevState, rentalAmount: numericValue }));
            setError((prevState) => ({ ...prevState, rentalAmount: false, message: '' }));
        }
    };

    const handleProductPriceChange = (e) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/\D/g, '');
    
        if (numericValue.length <= 10) {
            setFormInput((prevState) => ({ ...prevState, productPrice: numericValue }));
            setError((prevState) => ({ ...prevState, productPrice: false, message: '' }));
        }
    };

    const handleBlocksChange = (e) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/\D/g, '');
    
        if (numericValue.length <= 10) {
            setFormInput((prevState) => ({ ...prevState, noOfBlocks: numericValue }));
            setError((prevState) => ({ ...prevState, noOfBlocks: false, message: '' }));
        }
    };

    function updationHandler(){
        setDisabled(true);
        const updatedData = {};
        if (formInput.productTitle) {
            updatedData.productTitle = formInput.productTitle;
        }
        if (formInput.productPrice) {
            updatedData.productPrice = formInput.productPrice;
        }
        if (formInput.noOfBlocks) {
            updatedData.noOfBlocks = formInput.noOfBlocks;
        }
        if (formInput.rentalAmount) {
            updatedData.rentalAmount = formInput.rentalAmount;
        }
        if (formInput.rentalDuration) {
            updatedData.rentalDuration = formInput.rentalDuration;
        }
        PostRequest(process.env.REACT_APP_API_URL + 'product/update/'+ props.productId, formInput).then(response => {
            setTrigger(prev => prev + 1);
            setModalOpen(false);
            setDisabled(false);
        }).catch(err => {
            console.log("error >", err);
            setDisabled(false);
            setError("Something went wrong. Try again later!");
        });
    }

    return (
        <>
            <IconButton 
                icon={<BiEdit size={20} />}
                className='!bg-transparent'
                onClick={() => setModalOpen(true)}
            />
            <Modal open={modalOpen} close={() => setModalOpen(false)}>
                {disabled && (<Loader />)}
                <div className='text-center text-[24px] font-bold flex justify-between items-center bg-[#10203f] px-[30px] py-[10px]'>
                    <h4 className='text-white'>Edit Plan</h4>
                    <IconButton 
                        icon={<MdClose size={20} color='#fff' />}
                        onClick={() => setModalOpen(false)}
                        className='!p-0'
                    />
                </div>
                <div className='w-[100%] max-w-[700px] mx-auto px-[30px] py-[10px]'>
                    <p className={`text-[14px] text-left text-[#FF0000] font-semibold mb-[5px] ${error.message ? 'block' : 'hidden'}`}>{error.message}</p>
                    <div className='grid gap-[5px]'>
                        <div>
                            <Label title='Title' important />
                            <TextInput
                                label="Plan Title" 
                                id="productTitle" 
                                value={formInput.productTitle} 
                                disabled={disabled}
                                onChange={(e) => {
                                    setFormInput(prevState => ({ ...prevState, productTitle: e.target.value }));
                                    setError(prevState => ({...prevState, productTitle: false, message: "" }));
                                }}
                            />
                        </div>
                        <div>
                            <Label htmlFor='Price' title='Price' important />
                            <TextInput
                                value={formInput.productPrice}
                                disabled={disabled}
                                onChange={(e) => handleProductPriceChange(e)}
                                icon={<MdCurrencyRupee size={17} color='#0d3b89' />}
                            />
                        </div>
                        <div>
                            <Label htmlFor='No of blocks' title='No of blocks' important />
                            <TextInput
                                value={formInput.noOfBlocks}
                                disabled={disabled}
                                onChange={(e) => handleBlocksChange(e)}
                            />
                        </div>
                        <div className='grid grid-cols-2 gap-[10px]'>
                            <div>
                                <Label htmlFor='Rental Amount' title='Rental Amount' important />
                                <TextInput
                                    value={formInput.rentalAmount}
                                    disabled={disabled}
                                    onChange={(e) => handleRentalAmountChange(e)}
                                    icon={<MdCurrencyRupee size={17} color='#0d3b89' />}
                                />
                            </div>
                            <div>
                                <Label htmlFor='rentalDuration' title='Rental Duration (years)' important />
                                <Select 
                                    options={[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]}
                                    value={formInput.rentalDuration}
                                    onChange={(e) => setFormInput(prevState => ({ ...prevState, rentalDuration: e.target.value }))}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-[10px] mt-[30px] mb-[20px]'>
                        <ActionButton
                            onClick={() => setModalOpen(false)}
                            title='Cancel'
                            className='w-[40%]'
                            variant="secondary"
                        />
                        <ActionButton 
                            disabled={disabled}
                            title="Update"
                            onClick={updationHandler}
                            className='w-[60%]'
                            variant="primary"
                        />
                    </div>
                </div>
            </Modal>
            {/* <Dialog
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='md:!p-[30px] !p-0 !w-[100%] !max-w-[700px] mx-auto'
                fullWidth
            >
                {disabled && (<Loader />)}
                <DialogTitle id="alert-dialog-title" className='text-center !text-[24px] font-bold flex justify-between bg-[#10203f] !mb-[20px]'>
                    <h3 className='!mb-0 text-white'>Edit Plan</h3>
                    <Tooltip title="Close" placement="top" arrow>
                        <IconButton onClick={() => setModalOpen(false)} >
                            <Close className='text-white !text-[28px]' fontSize='large' />
                        </IconButton>
                    </Tooltip>
                </DialogTitle>
                <DialogContent className='!w-[100%] !max-w-[700px] mx-auto'>
                    <p className={`text-[16px] text-left text-[#FF0000] font-semibold mb-[10px] ${error.message ? 'block' : 'hidden'}`}>Error: {error.message}</p>
                    <Box display={"grid"}>
                        <FormControl sx={{ my: 1, width: '100%' }} variant="outlined">
                            <TextField 
                                fullWidth 
                                label="Plan Title" 
                                id="productTitle" 
                                value={formInput.productTitle} 
                                disabled={disabled}
                                onChange={(e) => {
                                    setFormInput(prevState => ({ ...prevState, productTitle: e.target.value }));
                                    setError(prevState => ({...prevState, productTitle: false, message: "" }));
                                }}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ my: 1 }}>
                            <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                                label="Price"
                                value={formInput.productPrice}
                                disabled={disabled}
                                onChange={(e) => handleProductPriceChange(e)}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ my: 1 }}>
                            <InputLabel htmlFor="outlined-adornment-amount">Rental Amount</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                                label="Price"
                                value={formInput.rentalAmount}
                                disabled={disabled}
                                onChange={(e) => handleRentalAmountChange(e)}
                            />
                        </FormControl>
                        <Grid container spacing={{ xs: 0, sm: 2 }}>
                            <Grid item sm={6} xs={12}>
                                <FormControl sx={{ my: 1, width: "100%" }} variant="outlined">
                                    <TextField 
                                        label="No of blocks" 
                                        id="noOfBlocks" 
                                        value={formInput?.noOfBlocks}
                                        disabled={disabled}
                                        error={error.noOfBlocks}
                                        onChange={(e) => handleBlocksChange(e)}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <FormControl sx={{ my: 1, width: "100%" }}>
                                    <InputLabel id="rentalDuration">Rental Duration (years)</InputLabel>
                                    <Select
                                        labelId="rentalDuration"
                                        id="rentalDuration"
                                        value={formInput.rentalDuration}
                                        label="Rental Duration"
                                        onChange={(e) => setFormInput(prevState => ({ ...prevState, rentalDuration: e.target.value }))}
                                    >
                                        {Array.from({length: 50}).map((item,i) => (
                                            <MenuItem value={i+1}>{i+1}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions className='!px-[24px] !py-[5px] mb-[25px]'>
                    <Button 
                        color="primary"
                        variant="outlined" 
                        className='w-full h-[56px]'
                        size="large"
                        fullWidth
                        onClick={() => setModalOpen(false)}
                    >Cancel</Button>
                    <Button 
                        color="success"
                        variant="contained" 
                        className='w-full h-[56px]'
                        size="large"
                        fullWidth
                        onClick={updationHandler}
                    >Update</Button>
                </DialogActions>
            </Dialog> */}
        </>
    )
}

export default EditPlanPopup;