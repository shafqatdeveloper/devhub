import React from 'react'
import Posts from '../components/Home/Posts/Posts';

export const metadata = {
  title: "Home - DevHub",
  description: "Find the best tools and resources for developers.",
  keywords: "developer, resources, tools",
  authors: [{ name: "DevHub" }],
};

const page = async () => {
  return (
    <>
    <Posts/>
    </>
  )
}

export default page