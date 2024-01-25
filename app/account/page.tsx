'use client'
import React from 'react'
import Image from 'next/image'
import LogoImage from '../assets/Logo_image.png'
import { useSession } from 'next-auth/react'

const Account = () => {
  const { data: session } = useSession()

  return (
    <div className='flex justify-center p-12'>
      <div className='card glass card-side max-w-[50%] bg-slate-400 text-black shadow-xl'>
        <figure>
          <Image src={LogoImage} alt='Movie' width={200} height={200} />
        </figure>
        <div className='card-body'>
          <h2 className='card-title'>{session?.user?.email}</h2>
          <p>Display user details here.</p>
          <p>Display user details here.</p>
          <p>Display user details here.</p>
        </div>
      </div>
    </div>
  )
}

export default Account
