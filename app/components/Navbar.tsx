import React from 'react'
import Logo from "../assets/Logo_text.png"
import Image from "next/image";
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className='navbar bg-slate-900 p-3 justify-between'>
      <div className='flex gap-4'>
        <Image className='rounded-lg' src={Logo} alt="logo" height={48} />
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
      <div className='flex gap-4'>
        <button className="btn btn-outline btn-accent">Default</button>
        <button className="btn btn-accent">Sign up</button>
      </div>
    </div>
  )
}

export default Navbar