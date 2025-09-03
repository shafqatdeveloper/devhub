"use client"
import { useTheme } from '@/app/lib/stores/theme'
import React, { useEffect } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'

const ThemeSwitch = () => {

    const theme = useTheme(state=>state.theme)
    const toggleTheme = useTheme(state=>state.toggleTheme)

    useEffect(()=>{
        document.documentElement.classList.toggle("dark",theme==="dark")
    },[theme])

  return (
    <div onClick={toggleTheme} className='absolute text-textBlack dark:text-textWhite top-5 left-5 cursor-pointer text-2xl'>
        {
            theme === "dark" ? <FaSun /> : <FaMoon />
        }
    </div>
  )
}

export default ThemeSwitch