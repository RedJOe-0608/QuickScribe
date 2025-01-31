"use client"

import { useEffect, useState } from "react";

export function useLocalStorage<T>(key:string,initialValue: T) {

    const [value,setValue] = useState<T>(() => {
        if(typeof window !== "undefined")
        {
            const jsonValue = localStorage.getItem(key);
    
            if(jsonValue === null){
                return initialValue
            }else{
                return JSON.parse(jsonValue)
            }
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    },[key,value])

    return [value,setValue] as [T, typeof setValue] //this is important.
}