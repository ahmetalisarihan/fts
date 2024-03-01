'use client'
import React from 'react'
import { CldImage } from 'next-cloudinary';

const CloudinaryImage = (props: any) => {
    return (
        <div>
            <CldImage
                {...props}
            />

        </div>
    )
}

export default CloudinaryImage