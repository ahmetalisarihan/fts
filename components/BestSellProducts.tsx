import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import boyler from '@/public/boyler.webp'
import basincTanki from '@/public/basinc-tanki.jpeg'

const BestSellProducts = () => {
    return (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <Link href='' className='flex flex-col justify-center items-center'>
                <Image src={boyler} alt='' height={200} width={200} />
                <h4>Baymak</h4>
                <h5>Boyler Tank</h5>
            </Link>
            <Link href='' className='flex flex-col justify-center items-center'>
                <Image src={basincTanki} alt='' height={200} width={200} />
                
                <h4>Baymak</h4>
                <h5>Basinc Tank</h5>
            </Link>
            <Link href='' className='flex flex-col justify-center items-center'>
                <Image src={boyler} alt='' height={200} width={200} />
                <h4>Baymak</h4>
                <h5>Boyler Tank</h5>
            </Link>
            <Link href='' className='flex flex-col justify-center items-center'>
                <Image src={basincTanki} alt='' height={200} width={200} />
                
                <h4>Baymak</h4>
                <h5>Basinc Tank</h5>
            </Link>
            <Link href='' className='flex flex-col justify-center items-center'>
                <Image src={boyler} alt='' height={200} width={200} />
                <h4>Baymak</h4>
                <h5>Boyler Tank</h5>
            </Link>
            <Link href='' className='flex flex-col justify-center items-center'>
                <Image src={basincTanki} alt='' height={200} width={200} />
                
                <h4>Baymak</h4>
                <h5>Basinc Tank</h5>
            </Link>
            <Link href='' className='flex flex-col justify-center items-center'>
                <Image src={boyler} alt='' height={200} width={200} />
                <h4>Baymak</h4>
                <h5>Boyler Tank</h5>
            </Link>
            <Link href='' className='flex flex-col justify-center items-center'>
                <Image src={basincTanki} alt='' height={200} width={200} />
                
                <h4>Baymak</h4>
                <h5>Basinc Tank</h5>
            </Link>
        </div>
    )
}

export default BestSellProducts