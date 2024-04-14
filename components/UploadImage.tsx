'use client'
import React, { useEffect, useState } from 'react'
import { CldImage, CldUploadButton } from 'next-cloudinary'
import { Button } from './ui/button'

interface UploadImageProps {
    imageUrl?: string;
    }

const UploadImage:React.FC<UploadImageProps> = () => {
    const [imageUrl, setImageUrl] = useState('')
  return (
    <div>
          <Button className="max-w-[180px] p-6 flex justify-center items-center  bg-sky-500 hover:bg-sky-700 focus:ring-sky-500 focus:ring-offset-sky-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
            <svg width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
              <path d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z">
              </path>
            </svg>
            <CldUploadButton
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
              onSuccess={(result) => {
                setImageUrl((result?.info as { secure_url: string })?.secure_url || "");
              }}
            >
              Resim Yükle
            </CldUploadButton>
            
          </Button>
    </div>
  )
}

export default UploadImage