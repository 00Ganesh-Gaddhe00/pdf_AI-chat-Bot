'use client'

import React, { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { CheckCircleIcon, CircleArrowDown, HammerIcon, RocketIcon, SaveIcon } from 'lucide-react'
import useUpload, { statusText } from '@/hooks/useUpload'
import { useRouter } from 'next/navigation'

function FileUploader() {
const { progress, status, fileId, handleUpload } = useUpload();
const router = useRouter()


useEffect(()=>{
  if (fileId){
    router.push(`files/${fileId}`)
  }

},[fileId, router])

    const onDrop = useCallback(async(acceptedFiles:File[]) => {
       const file = acceptedFiles[0]
     if(file){
          await handleUpload(file);
      }else{
         
      }
         }, [])

         const statusIcons: {
          [key in statusText]: JSX.Element;
        } = {
          [statusText.UPLOADING]: (
            <RocketIcon className="h-20 w-20 text-indigo-600" />
          ),
          [statusText.UPLOADED]: (
            <CheckCircleIcon className="h-20 w-20 text-indigo-600" />
          ),
          [statusText.SAVING]: <SaveIcon className="h-20 w-20 text-indigo-600" />,
          [statusText.GENERATING]: (
            <HammerIcon className="h-20 w-20 text-indigo-600 animate-bounce" />
          ),
        };

      const {getRootProps, getInputProps, isDragActive, isFocused, isDragAccept} = 
      useDropzone({
        onDrop,
        maxFiles:1,
        accept : {
          "application/pdf":[".pdf"] 
        }
      })

const uploadInProgress = progress!=null && progress>=0 && progress<=100;

  return (
    <div className='flex flex-col gap-4 items-center max-w-7xl mx-auto'>
     {uploadInProgress && (
     <div className='mt-32 flex flex-col justify-center items-center gap-5 '>
        <div className={`relative w-24 h-24 flex items-center justify-center ${
              progress === 100 && "hidden"
            }`}>
       <div className="absolute w-full h-full border-4 border-indigo-200 border-t-transparent rounded-full animate-spin"></div>
       <div className="text-indigo-400 font-medium">
       {progress}%
       </div>
     </div>
        {
            // @ts-ignore
            statusIcons[status!]
          }
        {/* @ts-ignore */}
        <p className="text-indigo-600 animate-pulse">{status}</p>

      </div>)} 
    {!uploadInProgress &&(<div {...getRootProps()} className={`p-10 border-2 border-dashed mt-10 w-[90%] border-indigo-600
         text-indigo-600 rounded-lg h-96 flex items-center justify-center ${isFocused||isDragAccept ? "bg-indigo-300" : "bg-indigo-100"}`}>
      <input {...getInputProps()} />
      <div className='flex flex-col justify-center items-center'>
      {
        isDragActive ?
        <>
          <RocketIcon className='h-20 w-20 animate-ping'></RocketIcon>
          <p>Drop the files here ...</p> 
          </>:
          <>
          <CircleArrowDown className='h-20 w-20 animate-bounce'></CircleArrowDown>
          <p>Drag 'n' drop some files here, or click to select files</p>
          </>
      }
      </div>
    </div>)}
    </div>
  )
}

export default FileUploader