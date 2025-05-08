
'use client'

import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { CirclePlus } from 'lucide-react'


function PlaceholderDoc() {
    const router = useRouter();

    const HandleClick = ()=>{
      router.push("/dashboard/upload")
    }

  return (
    <Button 
    onClick={HandleClick}
    className='flex flex-col items-center justify-center w-64 h-80 rounded-xl bg-gray-200 drop-shadow-md text-gray-400 hover:cursor-pointer '>
        <div className='text-7xl'>&#8853;</div>
        <p>Add a Document</p>
    </Button>
  )
}

export default PlaceholderDoc