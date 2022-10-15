import Link from 'next/link';
import React from 'react';
import { BsFacebook } from 'react-icons/bs';
import { AiFillSkype } from 'react-icons/ai';
import { AiFillLinkedin } from 'react-icons/ai';
import { AiFillInstagram } from 'react-icons/ai';


const Footer = () => {
    return (
        <div className='container mx-auto'>
              
         <footer className='grid grid-cols-1 gap-4 py-16 lg:grid-cols-4 '>
            <div>
                <div>
                    <img src="logo1.png" alt="" />
                </div>
                <div>
                    <p>’m available for commissions and collaborations, and i’m excited to hear from you about new projects.!!</p>
                </div>
                <div className='flex'>
                    <div><Link href='https://www.facebook.com/Docy-107057608607026'><a><BsFacebook /></a></Link></div>
                    <div><Link href='https://www.facebook.com/Docy-107057608607026'><a><AiFillSkype/></a></Link></div>
                    <div><Link href='https://www.facebook.com/Docy-107057608607026'><a><AiFillLinkedin/></a></Link></div>
                    <div><Link href='https://www.facebook.com/Docy-107057608607026'><a><AiFillInstagram/></a></Link></div>
                    
                   
                </div>
            </div>
            <div>
                <h4 className='text-2xl'>Quick links</h4>
                    <div><Link href='#'><a>About us</a></Link></div>
                    <div><Link href='#'><a>Ask Question</a></Link></div>
                    <div><Link href='#'><a>Contact Us</a></Link></div>
                    <div><Link href='#'><a>Help desk</a></Link></div>

            </div>
            <div>
                    <h4 className='text-2xl'>Quick links</h4>
                    <div><Link href='#'><a>Documentation</a></Link></div>
                    <div><Link href='#'><a>Blogs</a></Link></div>
                    <div><Link href='#'><a>404 Pages</a></Link></div>
                    <div><Link href='#'><a>Help desk</a></Link></div>
            </div>
            <div>
                    <h4 className='text-2xl'>Contact Us</h4>
                    <div><Link href='#'><a>Chittagong,bangladesh</a></Link></div>
                    <div><Link href='#'><a>Office : aaa@gmail.com</a></Link></div>
                    <div><Link href='#'><a>Help Line : 010101011001</a></Link></div>
                    
            </div>
         </footer>
        </div>
    );
};

export default Footer;