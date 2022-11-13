import React from 'react';

const ContactForm = () => {
    return (
        <div>
            
            <div className='container mx-auto px-4'>
                 <div className='grid grid-cols-1 md:grid-cols-2 gap-5 bg-white'>
                    <div className='p-10'>
                        <h1 className='text-3xl'>Let’s get in touch</h1>
                        <p className='my-5'><small >I have world-class, flexible support via live chat, email & phone. I guar antee that you’ll be able to have any issue resolved within 24/7</small></p>
                        <form className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                            <div>
                            <label >First Name
                                <input type="text" placeholder='Enter Your First name ' className='block w-full border rounded mt-2 h-10 ' />
                            </label>
                            </div>
                            <div>
                            <label >Last Name
                                <input type="text" placeholder='Enter Your Last Name' className='block w-full border rounded mt-2 h-10' />
                            </label>
                            </div>
                            <div>
                            <label >Email
                                <input type="email" placeholder='Enter Your Email'  className='block w-full border rounded mt-2 h-10'/>
                            </label>
                            </div>
                            <div>
                            <label >Subject
                                <input type="text" placeholder='Enter Your Subject' className='block w-full border rounded mt-2 h-10' />
                            </label>
                            </div>
                            <div className='col-span-2'>
                            <label >Your Message
                                
                                <textarea type="text" placeholder='Enter Your Message' className='block w-full border rounded mt-2'></textarea>
                            </label>
                            </div>
                            <input className='rounded bg-cyan-600 hover:bg-white h-10' type="submit" value='Send message' />
                        </form>
                    </div>
                    <div className='p-10'>
                        <div className='p-10 hover:shadow-lg rounded'>
                             <h3 className='font-bold text-xl'>Phone</h3>
                             <p>Our customer care is open from Mon-Fri, 10:00 am to 6:00 pm</p>
                             <p className='my-2 font-bold'>+880 122 4333 444</p>
                        </div>
                        <div className='p-10 hover:shadow-lg rounded'>
                             <h3 className='font-bold text-xl'>Email</h3>
                             <p>Our support team will be reply in 48-h during your Question.</p>
                             <p className='my-2 font-bold'>prime@gmail.com</p>
                        </div>
                        <div className='p-10 hover:shadow-lg rounded'>
                             <h3 className='font-bold text-xl'>Location</h3>
                             <p>168/170, Ave 01, Dhanmondi, Bangladesh</p>
                             
                        </div>
                        
                    </div>
                 </div>
            </div>
        </div>
    );
};

export default ContactForm;