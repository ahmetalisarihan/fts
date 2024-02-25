import { NextRequest, NextResponse } from "next/server";


export const POST =async (req:NextRequest) => {
    const formData = await req.formData()

    const image = formData.get('image') as unknown as File

    console.log({image})

    return NextResponse.json({msg: image}, { status:200})
    
}