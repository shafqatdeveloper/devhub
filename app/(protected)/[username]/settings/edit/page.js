import React from 'react'

const page = async ({params}) => {
const {username} = await params
  return (
    <div>page</div>
  )
}

export default page