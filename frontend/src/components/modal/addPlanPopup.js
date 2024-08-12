import React, { useState } from 'react';
import { checkEmptyFields } from '../../utils/formFunctions';
import Loader from '../shared/loader';
import { PostRequest } from '../../utils/requests';
import IconButton from '../custom/iconButton';
import { MdAdd, MdClose, MdCurrencyRupee } from 'react-icons/md';
import Modal from '.';
import ActionButton from '../custom/actionButton';
import TextInput from '../custom/textInput';
import Label from '../custom/label';
import Select from '../custom/select';

const AddPlanPopup = ({setTrigger}) => {
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ disabled, setDisabled ] = useState(false);
    const [ formInput, setFormInput ] = useState({  
        productTitle: "",
        productPrice: "",
        rentalAmount: "",
        rentalDuration: "1",
        noOfBlocks: ""
    })
    const [error, setError] = useState({
        productTitle: "",
        productPrice: null,
        rentalAmount: null,
        rentalDuration: null,
        noOfBlocks: null,
        message: ""
    });

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

    function productHandler(){
        setDisabled(true);
        setError(prevState => ({...prevState, message: ""}));
        if (checkEmptyFields(formInput)) {
            setError(prevState => ({...prevState, message: "Fields must not be empty!"}));
            setDisabled(false);
        }else {
            PostRequest(process.env.REACT_APP_API_URL + 'product/', formInput).then(response => {
                setTrigger(prev => prev + 1);
                setModalOpen(false);
                setDisabled(false);
                resetHandler();
            }).catch(err => {
                console.log("error >", err)
            });
        }
    }

    function resetHandler(){
        setFormInput({
            productTitle: "",
            productPrice: null,
            rentalAmount: null,
            rentalDuration: null,
            noOfBlocks: null,
        })
    }

    return (
        <>
            <div className="fixed bottom-[30px] right-[30px] z-[1111]">
                <IconButton 
                    icon={<MdAdd size={30} color='#fff' />} 
                    onClick={() => setModalOpen(true)}
                    className='bg-[#000244] h-[50px] min-w-[50px] !hover:bg-[#000244]'
                />
            </div>
            <Modal open={modalOpen} close={() => setModalOpen(false)}>
                {disabled && (<Loader />)}
                <div className='text-center text-[24px] font-bold flex justify-between items-center bg-[#10203f] px-[30px] py-[10px]'>
                    <h4 className='text-white'>Add New Plan</h4>
                    <IconButton 
                        icon={<MdClose size={20} color='#fff' />}
                        onClick={() => {
                            setModalOpen(false);
                            resetHandler();
                        }}
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
                                icon={<MdCurrencyRupee size={20} />}
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
                                    icon={<MdCurrencyRupee size={20} />}
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
                            onClick={resetHandler}
                            title='Reset'
                            className='w-[40%]'
                            variant="secondary"
                        />
                        <ActionButton 
                            disabled={disabled}
                            title="Submit"
                            onClick={productHandler}
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
                    <h3 className='!mb-0 text-white'>New Plan</h3>
                    <Tooltip title="Close" placement="top" arrow>
                        <IconButton onClick={() => setModalOpen(false)} >
                            <Close className='text-white !text-[28px]' fontSize='large' />
                        </IconButton>
                    </Tooltip>
                </DialogTitle>
                <DialogContent className='!w-[100%] !max-w-[700px] mx-auto'>
                    <p className={`text-[16px] text-left text-[#FF0000] font-semibold mb-[10px] ${error.message ? 'block' : 'hidden'}`}>Error: {error.message}</p>
                    <Box display={"grid"}>
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
                        onClick={resetHandler}
                    >Reset</Button>
                    <Button 
                        color="success"
                        variant="contained" 
                        className='w-full h-[56px]'
                        size="large"
                        fullWidth
                        onClick={registerationHandler}
                    >Add</Button>
                </DialogActions>
            </Dialog> */}
        </>
    )
}

export default AddPlanPopup;