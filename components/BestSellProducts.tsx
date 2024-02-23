import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import boyler from '@/public/boyler.webp'
import basincTanki from '@/public/basinc-tanki.jpeg'

const BestSellProducts = () => {
  return (
    <div className='flex flex-auto gap-5'>
        <Link href='' className=''>
            <Image src={boyler} alt=''height={200} width={200}/>
            Boyler Tank
        </Link>
        <Link href=''>
            <Image src={basincTanki} alt='' height={200} width={200}/>
            Basinc Tank
        </Link>
        <Link href=''>
            <Image src={boyler} alt=''height={200} width={200}/>
        </Link>
        <Link href=''>
            <Image src={basincTanki} alt=''height={200} width={200}/>
        </Link>
        <Link href=''>
            <Image src={boyler} alt=''height={200} width={200}/>
        </Link>
        <Link href=''>
            <Image src={basincTanki} alt=''height={200} width={200}/>
        </Link>
        <Link href=''>
            <Image src={boyler} alt=''height={200} width={200}/>
        </Link>
        <Link href=''>
            <Image src={basincTanki} alt=''height={200} width={200}/>
        </Link>
    </div>
  )
}

export default BestSellProducts