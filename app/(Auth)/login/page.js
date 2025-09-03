import LoginComponent from '@/app/components/Auth/Login';
import { getUserFromCookies } from '@/app/lib/server/auth';
import React from 'react'
export const metadata = {
  title: "Login - DevHub",
  description: "Find the best tools and resources for developers.",
  keywords: "developer, resources, tools",
  authors: [{ name: "DevHub" }],
};

const Login = async() => {
      const user = await getUserFromCookies()
  return (
    <LoginComponent user={user}/>
  )
}

export default Login