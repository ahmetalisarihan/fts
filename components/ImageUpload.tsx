'use client'
import axios from 'axios'
import React, { ChangeEvent, FormEvent } from 'react'

const UploadImage = () => {

    const [image, setImage] = React.useState<File | null>(null)

    const OnChangehandler = (e:ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files){
            
            setImage(e.target.files[0])
        }
    }

    const OnSubmitHandler = async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try {
            if(!image) return

            const formData = new FormData()
            formData.append('image', image)
            const response = await axios.post('/api/upload-image', formData)
            const data = await response.data
            console.log({data})
            
        } catch (error:any) {
            console.log('Error',error.message)
            
        }
    }


  return (
    <div>
        <form onSubmit={OnSubmitHandler} className='w-1/2 mx-auto py-10'>
            <input onChange={OnChangehandler} type="file" name='' id='' />
            <button className=''>Upload</button>
        </form>
    </div>
  )
}

export default UploadImage