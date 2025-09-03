"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import LoginLandingPic from '../../../public/Login/login_landing.png'
import { FaFacebook } from "react-icons/fa";
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchApi } from '@/app/lib/api';
import { useRouter, useSearchParams } from 'next/navigation';
import TextInput from '../Inputs/TextInput';
import PasswordInput from '../Inputs/PasswordInput';
import BaseButton from '../Buttons/BaseButton';
import { loginSchema } from '@/app/lib/helpers/validationSchemas';





const LoginComponent =  ({user}) => {

    const router = useRouter()
    const search = useSearchParams()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(loginSchema)
    })


    const links = [
        { title: "About", href: "/about" },
        { title: "Contact", href: "/contact" },
        { title: "Privacy Policy", href: "/privacy" },
        { title: "Terms of Service", href: "/terms" },
        { title: "Help", href: "/help" },
    ]

    useEffect(() => {
        if (user) router.replace("/")
    }, [router,user])
    async function onSubmit(data) {
        const res = await fetchApi("/auth/login", { method: "POST", body: JSON.stringify(data) })
        if (res.ok) {
            alert("Logged In")
            const callback = search.get("callback") || "/";
            router.replace(callback);
        } else {
            const err = await res.json()
            alert(err.error || "Unable to login")
        }
    }

    return (
        <div className='h-screen'>
            <div className='w-full flex items-center justify-center lg:items-start lg:justify-start'>
                {/* Landing Image */}
                <div className='relative lg:mt-28 w-1/2 h-full hidden lg:flex items-center justify-center'>
                    <Image
                        alt='LOgin Screen Landing Pic'
                        src={LoginLandingPic}
                    />
                </div>
                {/* Form Input */}
                <form onSubmit={handleSubmit(onSubmit)} className='w-full lg:w-1/2 lg:h-full items-center justify-center lg:items-start lg:justify-start flex lg:ml-40 flex-col gap-5 lg:pt-28 pt-32'>
                    <h1 className='text-3xl md:text-4xl w-full sm:w-2/6 lg:w-3/5 text-center font-extralight pb-4 text-textBlack dark:text-textWhite'>DevHub</h1>
                    <div className='flex flex-col gap-3 w-full items-center justify-center lg:items-start lg:justify-start'>
                        <div className="w-3/4 sm:w-2/6 lg:w-3/5">
                            <TextInput
                                id="emailOrUsername"
                                label="Username or Email"
                                type="text"
                                placeholder="Username or Email"
                                {...register("emailOrUsername")}
                                error={errors.emailOrUsername}
                                className="text-textBlack dark:text-textWhite placeholder:text-gray-400"
                            />
                        </div>
                        <div className="w-3/4 sm:w-2/6 lg:w-3/5">
                            <PasswordInput
                                id="password"
                                label="Password"
                                placeholder="**********"
                                {...register("password")}
                                error={errors.password}
                                className="text-textBlack dark:text-textWhite placeholder:text-gray-400"
                            />
                        </div>
                        <BaseButton title="Login" id="login-button" disabled={isSubmitting} classNames='text-textWhite sm:w-2/6 w-3/4 lg:w-3/5'>
                        </BaseButton>
                    </div>
                    <div className="flex items-center w-3/4 sm:w-2/6 lg:w-3/5 my-4">
                        <div className="flex-grow border-t border-gray-600"></div>
                        <span className="px-2 text-gray-500 text-sm">OR</span>
                        <div className="flex-grow border-t border-gray-600"></div>
                    </div>
                    <div className='flex flex-col w-3/4 items-center sm:w-2/6 lg:w-3/5 gap-4'>
                        <button className='text-blue-500 font-medium border-b border-b-transparent flex text-sm sm:text-lg items-center cursor-pointer hover:border-b-primaryLight w-max justify-center'> <FaFacebook className=' mr-2' size={22} /> Login with Facebook</button>
                        <Link href={'/forgot-password'} className='ml-2 w-max dark:text-textWhite text-textBlack border-b border-b-transparent hover:border-b-primaryDark hover:text-primaryLight text-sm sm:text-base'>Forgot Password?</Link>
                    </div>
                    <div className="flex justify-center items-center w-3/4 sm:w-2/6 lg:w-3/5 my-2 sm:my-3.5">
                        <span className="px-2 text-gray-400 text-sm">Don't have an account?</span>
                        <Link href={'/signup'} className='text-primaryLight border-b border-b-transparent hover:border-b-primaryLight'>Sign Up</Link>
                    </div>

                </form>

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