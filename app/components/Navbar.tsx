import React from 'react'
import Logo from "../assets/Logo_image.png"
import Image from "next/image";
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className='navbar bg-slate-900 p-3'>
      <div className='navbar-start flex gap-4'>
        <Link href={'/'}>
          <Image className='rounded-lg' src={Logo} alt="logo" height={48} />
        </Link>
        
        <div className='breadcrumbs'>
          <ul>
            <li>
              <Link href={'/'}>
                Home
              </Link>
            </li> 
            <li>
              <Link href={'/exercises'}>
                Exercises
              </Link>
            </li> 
          </ul>
        </div>
      </div>
      <div className='navbar-end flex gap-4'>
        <button className="btn btn-outline btn-accent">Log in</button>
        <button className="btn btn-accent">Sign up</button>
      </div>
    </div>
  )
}

export default Navbar