import Link from 'next/link';
import React from 'react';
import { AiFillGithub, AiOutlineGoogle } from 'react-icons/ai';

const RegisterMain = () => {
    return (
        <div className='my-24 container mx-auto px-4 grid grid-cols-1 md:grid-cols-2'>
        <div className='md:w-1/2 mx-auto p-4 '>
            <div>
            <img  className='w-3/4' src="login.svg" alt="" />
            </div>
            
        </div>
        <div className='md:w-1/2'>
            <form>

                <div className="w-full drop-shadow-lg   block  bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100  flex items-center justify-center" >
                    <div className="bg-white rounded-lg py-6 px-10 sm:max-w-md w-full ">
                        <div className="sm:text-3xl text-2xl font-semibold text-center text-sky-600  mb-12">
                            Register Form
                        </div>
                        <div className="">

                            <div>
                                <input type="text" name='name' className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 my-8" placeholder="Name" />
                            </div>
                            <div>
                                <input type="email" name='email' className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 my-8" placeholder="Eamil Adress " />
                            </div>
                            <div>
                                <input type="text" name='address' className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 my-8" placeholder="Adress " />
                            </div>


                            <div className="">
                                <input type="password" name='password' className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 mb-8" placeholder="Password " />
                            </div>

                            <div className="flex justify-center my-6">
                                <button type='submit' className=" rounded-full  p-3 w-full sm:w-56   bg-gradient-to-r from-sky-600  to-teal-300 text-white text-lg font-semibold " >
                                    Register
                                </button>
                            </div>
                            <div className='text-center'>
                                    <p>Or Register in with</p>
                                    <div className='flex justify-center my-2'>
                                        <div className='mx-1'>
                                        <AiOutlineGoogle />
                                        </div>
                                         <div className='mx-1'>
                                           <AiFillGithub /> 
                                         </div>
                                    
                                    </div>
                                    
                                </div>
                            <div className="flex justify-center ">
                                <p className="text-gray-500">Already have an acount? </p>
                                <Link href='/login'>
                                   <a href="" className="text-sky-600 pl-2">Log in</a>
                                </Link>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    );
};

export default RegisterMain;