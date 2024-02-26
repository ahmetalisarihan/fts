import { ConnectDB } from "@/libs/db.config";
import { UploadImage } from "@/libs/upload-image";
import { NextRequest, NextResponse } from "next/server";


ConnectDB()

export const POST =async (req:NextRequest) => {
    const formData = await req.formData()

    const image = formData.get('image') as unknown as File

    const data = await UploadImage(image, 'nextjs-imagegallary')



    return NextResponse.json({msg: data}, { status:200})
    
}