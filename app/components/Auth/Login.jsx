"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import LoginLandingPic from '../../../public/Login/login_landing.png'
import { FaFacebook } from "react-icons/fa";
import Link from 'next/link';

const LoginComponent = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");

    const links = [
        {title:"About", href:"/about"},
        {title:"Contact", href:"/contact"},
        {title:"Privacy Policy", href:"/privacy"},
        {title:"Terms of Service", href:"/terms"},
        {title:"Help", href:"/help"},
    ]

    return (
        <div className='h-screen'>
            <div className='w-full flex items-center justify-center lg:items-start lg:justify-start'>
                {/* Landing Image */}
                <div className='relative lg:mt-28 w-1/2 h-full hidden lg:flex items-center justify-center'>
                    <Image
                    src={LoginLandingPic}
                    />
                </div>
                {/* Form Input */}
                <div className='w-full lg:w-1/2 lg:h-full items-center justify-center lg:items-start lg:justify-start flex lg:ml-40 flex-col gap-5 lg:pt-28 pt-32'>
                    <h1 className='text-3xl md:text-4xl w-full sm:w-2/6 lg:w-3/5 text-center font-extralight pb-4 text-textBlack dark:text-textWhite'>DevHub</h1>
                    <div className='flex flex-col gap-3 w-full items-center justify-center lg:items-start lg:justify-start'>
                        <input
                            type="text"
                            placeholder="Username or Email"
                            value={usernameOrEmail}
                            className='border-[0.0001px] text-sm sm:text-base border-gray-600 p-2 sm:p-1.5 rounded w-3/4 sm:w-2/6 lg:w-3/5 outline-none focus:outline-none focus:border-primaryLight focus:border-[0.5px] transition-all duration-200'
                            onChange={(e) => setUsernameOrEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            className='border-[0.0001px] text-sm sm:text-base border-gray-600 p-2 sm:p-1.5 rounded w-3/4 sm:w-2/6 lg:w-3/5 outline-none focus:outline-none focus:border-primaryLight focus:border-[0.5px] transition-all duration-200'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className='border-[0.0001
                        px] bg-primaryLight p-1 text-sm sm:text-base hover:bg-primaryDark transition-all duration-300 cursor-pointer  sm:p-1.5 rounded sm:w-2/6 w-3/4 lg:w-3/5'>Login</button>
                    </div>
                    <div className="flex items-center w-3/4 sm:w-2/6 lg:w-3/5 my-4">
                        <div className="flex-grow border-t border-gray-600"></div>
                        <span className="px-2 text-gray-500 text-sm">OR</span>
                        <div className="flex-grow border-t border-gray-600"></div>
                    </div>
                    <div className='flex flex-col w-3/4 items-center sm:w-2/6 lg:w-3/5 gap-4'>
                        <button className='text-blue-500 font-medium border-b border-b-transparent flex text-sm sm:text-lg items-center cursor-pointer hover:border-b-primaryLight w-max justify-center'> <FaFacebook className=' mr-2' size={22} /> Login with Facebook</button>
                        <Link href={'/forgot-password'} className=' ml-2 w-max border-b border-b-transparent hover:border-b-primaryDark hover:text-primaryLight text-sm sm:text-base'>Forgot Password?</Link>
                    </div>
                    <div className="flex justify-center items-center w-3/4 sm:w-2/6 lg:w-3/5 my-2 sm:my-3.5">
                        <span className="px-2 text-gray-500 text-sm">Don't have an account?</span>
                        <Link href={'/signup'} className='text-primaryLight border-b border-b-transparent hover:border-b-primaryLight'>Sign Up</Link>
                    </div>

                </div>
                
            </div>
            {/* Pages Links */}
                <div className='px-5 absolute bottom-10 lg:bottom-16 w-full flex items-center justify-center gap-x-6 gap-y-3 flex-wrap text-sm md:text-base'>
                    {links.map((link) => (
                        <Link key={link.title} href={link.href} className='border-b border-b-transparent hover:border-b-primaryLight text-textGray hover:text-primaryLight'>
                            {link.title}
                        </Link>
                    ))}
                </div>
                {/* All Rights reserved */}
                <div className='absolute bottom-2.5 lg:bottom-5 w-full flex items-center justify-center text-sm text-textGray'>
                    <span>&copy; {new Date().getFullYear()} DevHub. All rights reserved.</span>
                </div>
        </div>
    )
}

export default LoginComponent