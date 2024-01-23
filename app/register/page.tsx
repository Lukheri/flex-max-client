import Link from 'next/link'
import React from 'react'

const RegisterPage = () => {
  return (
    <div className='flex justify-around items-center h-[calc(100vh-72px)]'>
        <div className="card bg-slate-400 w-1/3 text-black glass shadow-xl p-8 pb-16 relative">
            <div className="card-body justify-center">
                <h1 className="card-title capitalize">Register</h1>
                <input type="text" placeholder="Username" className="input input-bordered input-accent w-full" />
                <input type="text" placeholder="Email" className="input input-bordered input-accent w-full" />
                <input type="text" placeholder="Password" className="input input-bordered input-accent w-full" />
            </div>
            <div className="card-actions justify-center">
                <button className="btn btn-accent">Register</button>
            </div>
            <p className='flex justify-end gap-1 mt-6 absolute right-3 bottom-3'>
                Already registered? Login <Link href='/login' className='underline text-blue-700'>here</Link>
            </p>
        </div>                
    </div>
  )
}

export default RegisterPage