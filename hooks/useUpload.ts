'use client'
import { db, storage } from '@/firebase';
import { useUser } from '@clerk/nextjs';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import {v4 as uuidv4} from "uuid"

export enum statusText {
       UPLOADING = "Uploading file...",
       UPLOADED = "File Uploaded Successfully",
       SAVING = "Saving file to database...",
       GENERATING = "Generating AI Embeddings, This will only take a few seconds...",

}

export type Status = statusText[keyof statusText]

function useUpload() {
    const [progress, setProgress] = useState<number | null>(null);
    const [fileId, setFileId] = useState<string | null>(null);
    const [status, setStatus] = useState<Status | null>(null);
    const {user} = useUser();
    const router = useRouter();

    const handleUpload = async(file:File)=>{
        if(!file || !user) return;
       
        const fileTouploadID = uuidv4();

        const storageRef = ref(storage, `users/${user.id}/files/${fileTouploadID}`)

        const uploadtask = uploadBytesResumable(storageRef, file);

         uploadtask.on("state_changed", (snapshot)=>{
            const percent = Math.round(
                (snapshot.bytesTransferred/snapshot.totalBytes) *100
            );
            setStatus(statusText.UPLOADING);
            setProgress(percent)
         }, (error)=>{
            console.log("Error Uploading file", error)
         }, async()=>{
              setStatus(statusText.UPLOADED)
             
             const downloadURL = await getDownloadURL(uploadtask.snapshot.ref)
             setStatus(statusText.SAVING)

             await setDoc(doc(db, "users", user.id, "files", fileTouploadID),{
                name:file.name,
                size:file.size,
                type:file.type,
                downloadURL: downloadURL,
                ref: uploadtask.snapshot.ref.fullPath,
                createdAt : new Date(),
             })

             setStatus(statusText.GENERATING);
             // generating embedding

             setFileId(fileTouploadID);
          }
        
     )
     }

     return {progress, status, fileId, handleUpload}
  
}

export default useUpload