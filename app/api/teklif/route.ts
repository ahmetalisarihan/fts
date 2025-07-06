import { NextResponse, NextRequest } from 'next/server';
const nodemailer = require("nodemailer");

export async function POST(req: NextRequest) {
    const username = process.env.EMAIL_USERNAME;
    const password = process.env.EMAIL_PASSWORD;
    const myEmail = process.env.PERSONAL_EMAIL;


    const data = await req.json();
    const { name, email, phone, companyName, address } = data;

    const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false,
        auth: {
            user: username,
            pass: password
        }
    });

    try {
        const _mail = await transporter.sendMail({
            from: username,
            to: myEmail,
            replyTo: email,
            subject: `Website activity from ${email}`,
            html: `
            <p>Name: ${name} </p>
            <p>Phone: ${phone} </p>
            <p>Email: ${email} </p>
            <p>Company: ${companyName} </p>
            <p>Address: ${address} </p>
            `,
        });

        return NextResponse.json({ message: "Istek basarili sekilde iletildi." });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Istek iletilemedi.' }, { status: 500 });
    }
}
