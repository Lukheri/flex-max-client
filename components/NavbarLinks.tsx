'use client'
import Link from 'next/link'
import React from 'react'
import { useSession } from 'next-auth/react'

const NavbarLinks = () => {
  const { data: session } = useSession()

  return (
    <div className='breadcrumbs'>
      <ul>
        <li>
          <Link href={'/'} className='text-white'>
            Home
          </Link>
        </li>
        <li>
          <Link href={'/exercises'} className='text-white'>
            Exercises
          </Link>
        </li>
        {!!session && (
          <li>
            <Link href={'/routines'} className='text-white'>
              Routines
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default NavbarLinks
