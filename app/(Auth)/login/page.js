import LoginComponent from '@/app/components/Auth/Login';
import React from 'react'
export const metadata = {
  title: "Login - DevHub",
  description: "Find the best tools and resources for developers.",
  keywords: "developer, resources, tools",
  authors: [{ name: "DevHub" }],
};

const Login = () => {
  return (
    <LoginComponent/>
  )
}

export default Login