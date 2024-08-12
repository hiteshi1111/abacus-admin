import React, { useState } from 'react'
import Loader from '../../components/shared/loader';
import { checkEmptyFields } from '../../utils/formFunctions';
import { getCurrentDateTime } from '../../utils/getCurrentDateTime';
import ReactQuill from 'react-quill';
import Layout from '../../layout';
import TextInput from '../../components/custom/textInput';
import ActionButton from '../../components/custom/actionButton';
import Label from '../../components/custom/label';
import 'react-quill/dist/quill.snow.css';
import { PostRequest } from '../../utils/requests';
import AllBlogs from '../../components/blog/allBlogs';

const Blogs = () => {
    const [trigger, setTrigger] = useState(0);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');
    const [formInput, setFormInput] = useState({
        title: "",
        handle: "",
        content: "",
        shortDescription: "",
        author: "Admin",
        publishedAt: getCurrentDateTime(),
        // featuredImage: null,
        // bannerImage: null,
        imgTitle: "",
        altText: "",
        metaTitle: "",
        metaDescription: "",
        keywords: ""
    });

    function submitHandler(){
        setDisabled(true);
        setError("");
        if (checkEmptyFields(formInput)) {
            setError("Fields must not be empty!");
            setDisabled(false);
        }else{
            PostRequest(process.env.REACT_APP_API_URL + 'blog/', formInput).then(response => {
                setTrigger(prev => prev+1);
                setDisabled(false);
            }).catch(err => {
                console.log("error >", err)
                setError(err.data || "Something went wrong")
                setDisabled(false);
            });
        }
    }

    return (
        <Layout>
            <div className='flex justify-between items-center border-b py-[10px]'>
                <h2 className="capitalize text-[25px] leading-[92.857%] font-bold text-[#21407E] w-full px-[30px]">Blogs</h2>
            </div>
            <div className='flex w-full gap-[10px] 2xl:gap-[30px]'>
                <div className='relative w-full p-[20px] 2xl:p-[30px] mt-[30px] bg-[#f2f3f4]'>
                    {disabled && <Loader />}
                    <h3 className="capitalize text-[20px] leading-[92.857%] font-bold text-[#21407E] w-full mb-[20px]">Add New Blog</h3>
                    <p className={`text-[14px] text-left text-[#FF0000] font-semibold ${error ? 'block' : 'hidden'}`}>{error}</p>
                    <div className='grid grid-cols-2 gap-[10px]'>
                        <div>
                            <Label title='Title' />
                            <TextInput
                                value={formInput.title} 
                                disabled={disabled}
                                onChange={(e) => {
                                    setFormInput(prevState => ({ ...prevState, title: e.target.value }));
                                    setError("");
                                }}
                            />
                        </div>
                        <div>
                            <Label title='Handle' />
                            <TextInput
                                value={formInput.handle} 
                                disabled={disabled}
                                onChange={(e) => {
                                    setFormInput(prevState => ({ ...prevState, handle: e.target.value }));
                                    setError("");
                                }}
                                icon={<span className='text-[16px] pl-[10px]'>/blog/</span>}
                                className='pl-[60px]'
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-[10px] mt-[5px]'>
                        <div>
                            <Label title='Author' />
                            <TextInput
                                label="Author"
                                value={formInput.author} 
                                disabled={disabled}
                                onChange={(e) => {
                                    setFormInput(prevState => ({ ...prevState, author: e.target.value }));
                                    setError("");
                                }}
                            />
                        </div>
                        <div>
                            <Label title='Published Date' />
                            <TextInput
                                type="datetime-local"
                                value={formInput.publishedAt} 
                                disabled={disabled}
                                onChange={(e) => {
                                    setFormInput(prevState => ({ ...prevState, publishedAt: e.target.value }));
                                    setError("");
                                }}
                            />
                        </div>
                    </div>
                    {/* <div className='grid grid-cols-2 gap-[10px] mt-[5px]'>
                        <div>
                            <Label title='Featured Image' />
                            <TextInput
                                id='featuredImage'
                                type="file"
                                disabled={disabled}
                                value={formInput.featuredImage}
                                accept="image/*"
                                onChange={(e) => {
                                    setFormInput(prevState => ({ ...prevState, featuredImage: URL.createObjectURL(e.target.files[0]) }));
                                    setError("");
                                }}
                                className='bg-[#fff]'
                            />
                        </div>
                        <div>
                            <Label title='Banner Image' />
                            <TextInput
                                id="bannerImage"
                                type="file"
                                value={formInput.bannerImage}
                                disabled={disabled}
                                accept="image/*"
                                onChange={(e) => {
                                    setFormInput(prevState => ({ ...prevState, bannerImage: URL.createObjectURL(e.target.files[0]) }));
                                    setError("");
                                }}
                                className='bg-[#fff]'
                            />
                        </div>
                    </div> */}
                    <div className='grid grid-cols-2 gap-[10px] mt-[5px]'>
                        <div>
                            <Label title='Img Title' />
                            <TextInput
                                value={formInput.imgTitle} 
                                disabled={disabled}
                                onChange={(e) => {
                                    setFormInput(prevState => ({ ...prevState, imgTitle: e.target.value }));
                                    setError("");
                                }}
                            />
                        </div>
                        <div>
                            <Label title='Alt Text' />
                            <TextInput
                                value={formInput.altText} 
                                disabled={disabled}
                                onChange={(e) => {
                                    setFormInput(prevState => ({ ...prevState, altText: e.target.value }));
                                    setError("");
                                }}
                            />
                        </div>
                    </div>
                    <div className='mt-[5px]'>
                        <Label title='Short Description' />
                        <TextInput
                            label="Short Description"
                            value={formInput.shortDescription} 
                            maxLength={200}
                            disabled={disabled}
                            onChange={(e) => {
                                setFormInput(prevState => ({ ...prevState, shortDescription: e.target.value }));
                                setError("");
                            }}
                        />
                    </div>
                    <div className='mt-[5px]'>
                        <Label title='Content'/>
                        <ReactQuill
                            id='content'
                            theme="snow"
                            onChange={(input) => {
                                setFormInput(prevState => ({ ...prevState, content: input }));
                                setError("");
                            }}
                            value={formInput.content}
                            bounds={'.app'}
                            placeholder="Write your content here..."
                            preserveWhitespace
                            className='relative'
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-[10px] mt-[5px]'>
                        <div>
                            <Label title='Meta Title' />
                            <TextInput
                                value={formInput.metaTitle} 
                                disabled={disabled}
                                onChange={(e) => {
                                    setFormInput(prevState => ({ ...prevState, metaTitle: e.target.value }));
                                    setError("");
                                }}
                            />
                        </div>
                        <div>
                            <Label title='Meta Description' />
                            <TextInput
                                value={formInput.metaDescription} 
                                disabled={disabled}
                                onChange={(e) => {
                                    setFormInput(prevState => ({ ...prevState, metaDescription: e.target.value }));
                                    setError("");
                                }}
                            />
                        </div>
                    </div>
                    <div className='mt-[5px]'>
                        <Label title="Keywords (separated by comma ',' )" />
                        <TextInput
                            value={formInput.keywords} 
                            disabled={disabled}
                            onChange={(e) => {
                                setFormInput(prevState => ({ ...prevState, keywords: e.target.value }));
                                setError("");
                            }}
                        />
                    </div>
                    <ActionButton 
                        variant='primary'
                        className='mt-[30px] w-full'
                        onClick={submitHandler}
                        title='Add'
                    />
                </div>
                <div className='max-h-[700px] overflow-y-auto relative w-full p-[20px] 2xl:p-[30px] mt-[30px] bg-[#f2f3f4] max-h-[700px] hidden xl:block'>
                    {formInput.bannerImage && (
                        <div className='relative w-full pt-[35%] mb-[30px]'>
                            <img 
                                src={formInput.bannerImage}
                                alt={formInput.altText}
                                title={formInput.imgTitle}
                                className='absolute top-0 left-0 object-center w-full h-full'
                            />
                        </div>
                    )}
                    <div className='heading-animation'>
                        <h2 className="capitalize font-bold text-[#21407E] w-full text-center">{formInput.title || "This is a blog title"}</h2>
                    </div>
                    <div 
                        dangerouslySetInnerHTML={{__html: formInput.content || "Your content will be preview here..."}}
                        className="richtext my-[20px] text-[14px]"
                    />
                    <div className='w-full mx-auto !max-w-[1200px] flex justify-between items-center mb-[20px]'>
                        <div className='mb-0 font-medium text-[14px]'><span className="font-bold text-[14px]">Author:</span> {formInput.author || "Admin"}</div>
                        <div className='mb-0 font-medium text-[14px]'><span className="font-bold text-[14px]">Published At:</span> {formInput.publishedAt}</div>
                    </div>
                </div>
            </div>
            <AllBlogs trigger={trigger} setTrigger={setTrigger} />
        </Layout>
    )
}

export default Blogs;