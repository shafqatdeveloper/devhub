"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"


export const useTheme = create(
    persist(
        (set,get)=>({
            theme:"light",
            toggleTheme:()=>set({theme:get().theme==="light"?"dark":"light"}),
            setTheme:(t)=>set({theme:t})
        }),
        {name:"theme:V1"}
    )
)