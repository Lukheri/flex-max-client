'use client'
import Link from 'next/link'
import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import { UserIcon } from 'lucide-react'

const NavbarUser = () => {
  const { data: session } = useSession()

  return (
    <>
      {!!session ? (
        <div className='navbar-end flex gap-4'>
          <Link href={'/account'}>
            <UserIcon />
          </Link>

          <button
            onClick={() => signOut()}
            className='btn btn-outline btn-accent'
          >
            Log out
          </button>
        </div>
      ) : (
        <div className='navbar-end flex gap-4'>
          <Link href={'/login'} className='btn btn-outline btn-accent'>
            Login
          </Link>
          <Link href={'/register'} className='btn btn-accent'>
            Sign up
          </Link>
        </div>
      )}
    </>
  )
}

export default NavbarUser
