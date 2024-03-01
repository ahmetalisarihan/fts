'use client'
import React, { useState } from 'react'
import { CldImage } from 'next-cloudinary';
import { CldUploadButton } from 'next-cloudinary';
import { Button, Flex } from 'antd';
import { UploadOutlined } from '@ant-design/icons';






const UploadButton = () => {

  const [imageId, setImageId] = useState('')

  return (
    <>
      <div className='flex items-center justify-center'>
        <Flex gap="small" align="flex-start" vertical>
          <Button 
          type="primary"
          size="large"
          icon={<UploadOutlined />}
          >

            
            <CldUploadButton
              onSuccess={(result) => {
                setImageId((result?.info as { secure_url: string })?.secure_url || "");
              }}
              uploadPreset="h8bib2qh" >
                Fotoğraf Ekle
              </CldUploadButton>
                
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

export default UploadButton