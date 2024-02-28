'use client'
import React, { useState } from 'react'
import { CldImage } from 'next-cloudinary';
import { CldUploadButton } from 'next-cloudinary';
import { Button, Flex } from 'antd';






const UploadImage = () => {

  const [imageId, setImageId] = useState('')

  return (
    <>
      <div className='flex items-center justify-center'>
        <Flex gap="small" align="flex-start" vertical>
          <Button type="primary">
            <CldUploadButton
              onSuccess={(result) => {
                setImageId((result?.info as { secure_url: string })?.secure_url || "");
              }}
              uploadPreset="h8bib2qh" />

            {imageId &&
              <CldImage
                width="400"
                height="300"
                src={imageId}
                sizes="100vw"
                alt="Description of my image"
              />
            }
          </Button>
        </Flex>
      </div>
    </>


  )
}

export default UploadImage