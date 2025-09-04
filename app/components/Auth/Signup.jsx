"use client"
import { signupSchema } from '@/app/lib/helpers/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import TextInput from '../Inputs/TextInput'
import PasswordInput from '../Inputs/PasswordInput'
import BaseButton from '../Buttons/BaseButton'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { AuthAPI } from '@/app/services/authServices'
import { toast } from 'sonner'
const SignupComponent = () => {
    const router = useRouter()
    const { register, handleSubmit,reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(signupSchema)
    })

    console.log(isSubmitting);


    async function onSubmit(payload) {
        try {
            const { data } = await AuthAPI.register(payload)
            toast.success(data?.message)
            reset()
            setTimeout(() => {
                router.push('/login')
            }, 2000);
        } catch (error) {
            const msg =
                error?.details?.error || error?.message || "Something went wrong";
            toast.error(String(msg));
        }
    }

    return (
        <div className='w-full flex items-center justify-center flex-col min-h-screen'>
            <div className='w-10/12 sm:w-2/4 md:w-2/5 xl:w-1/4 py-5'>

                <div className='border w-full border-gray-500 p-3 sm:p-8 md:p-12 rounded-md'>
                    <h1 className='text-2xl font-bold text-textWhite text-center mb-7'>Create an Account</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2.5 w-full'>
                        <TextInput
                            id="name"
                            label="Full Name *"
                            type="text"
                            placeholder="Full Name"
                            {...register("name")}
                            error={errors.name}
                            className="text-textBlack dark:text-textWhite placeholder:text-gray-400"
                        />
                        <TextInput
                            id="email"
                            label="Email *"
                            type="email"
                            placeholder="Email"
                            {...register("email")}
                            error={errors.email}
                            className="text-textBlack dark:text-textWhite placeholder:text-gray-400"
                        />
                        <TextInput
                            id="username"
                            label="Username *"
                            type="text"
                            placeholder="Username"
                            {...register("username")}
                            error={errors.username}
                            className="text-textBlack dark:text-textWhite placeholder:text-gray-400"
                        />
                        <PasswordInput
                            id="password"
                            label="Password *"
                            placeholder="**********"
                            {...register("password")}
                            error={errors.password}
                            className="text-textBlack dark:text-textWhite placeholder:text-gray-400"
                        />
                        <PasswordInput
                            id="confirmPassword"
                            label="Confirm Password *"
                            placeholder="**********"
                            {...register("confirmPassword")}
                            error={errors.confirmPassword}
                            className="text-textBlack dark:text-textWhite placeholder:text-gray-400"
                        />
                        <BaseButton classNames="text-textWhite w-full mt-4" title="Sign Up" id="signup-button" isSubmitting={isSubmitting} disabled={isSubmitting} />
                    </form>
                    <div>
                        <p className='text-gray-500 text-xs pt-3.5'>By signing up, you agree to our <Link className='text-primaryLight font-bold border-b-transparent border-b hover:border-b-primaryLight' href={'/terms'}>Terms of Service</Link> and <Link className='text-primaryLight font-bold border-b-transparent border-b hover:border-b-primaryLight' href={'/privacy'}>Privacy Policy</Link>.</p>
                    </div>
                    <div className="flex items-center w-full my-7">
                        <div className="flex-grow border-t border-gray-600"></div>
                        <span className="px-2 text-gray-500 text-sm">OR</span>
                        <div className="flex-grow border-t border-gray-600"></div>
                    </div>
                </div>
                <div className='border border-gray-500 p-3 sm:p-5 rounded-md flex flex-col items-center justify-center mt-5 w-full'>
                    <h1 className='text-textBlack dark:text-textWhite'>Have an Account?</h1>
                    <Link className='text-primaryLight font-bold border-b-transparent border-b hover:border-b-primaryLight' href={'/login'}>Log in</Link>
                </div>

            </div>
        </div>
    )
}

export default SignupComponent