import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";


export async function POST(req: Request) {
    const { priceName, pdfUrl } = await req.json();
    if (!priceName || !pdfUrl) {
        return NextResponse.json({ error: 'priceName ve pdfUrl alanları gereklidir.' }, { status: 400 });
    }
    try {
        const pricelist = await prisma.priceList.create({
            data: {
                priceName,
                pdfUrl,
            },
        });
        return NextResponse.json(pricelist);
    } catch (error) {
        return NextResponse.json({ error: 'Veritabanı işlemi sırasında bir hata oluştu.', details: error }, { status: 500 });
    }
}


export async function GET() {
    try {
       const pricelists = await prisma.priceList.findMany();
         return NextResponse.json(pricelists);
    } catch (error) {
        return NextResponse.json('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
    

}
