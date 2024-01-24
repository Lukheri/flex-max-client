import React from 'react'
import Logo from '../app/assets/Logo_image.png'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='navbar bg-slate-900 p-3'>
      <div className='navbar-start flex gap-4'>
        <Link href={'/'}>
          <Image className='rounded-lg' src={Logo} alt='logo' height={48} />
        </Link>

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
          </ul>
        </div>
      </div>
      <div className='navbar-end flex gap-4'>
        <Link href={'/login'} className='btn btn-outline btn-accent'>
          Log in
        </Link>
        <Link href={'/register'} className='btn btn-accent'>
          Sign up
        </Link>
      </div>
    </div>
  )
}

export default Navbar
