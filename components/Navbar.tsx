import React from 'react'
import Logo from '../app/assets/Logo_image.png'
import Image from 'next/image'
import Link from 'next/link'
import NavbarUser from './NavbarUser'
import NavbarLinks from './NavbarLinks'

const Navbar = () => {
  return (
    <div className='navbar bg-slate-900 p-3'>
      <div className='navbar-start flex gap-4'>
        <Link href={'/'}>
          <Image className='rounded-lg' src={Logo} alt='logo' height={48} />
        </Link>

        <NavbarLinks />
      </div>
      <NavbarUser />
    </div>
  )
}

export default Navbar
