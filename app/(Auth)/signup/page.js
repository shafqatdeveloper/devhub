import SignupComponent from '@/app/components/Auth/Signup';
import React from 'react'

export const metadata = {
  title: "Signup - DevHub",
  description: "Find the best tools and resources for developers.",
  keywords: "developer, resources, tools",
  authors: [{ name: "DevHub" }],
};

const Signup = () => {
  return (
    <>
    <SignupComponent/>
    </>
  )
}

export default Signup