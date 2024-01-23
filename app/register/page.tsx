"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import MailChecker from 'mailchecker'

const RegisterPage = () => {
    const [email, setEmail] = useState<string>("")
    const [userName, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [validationError, setValidationError] = useState<string>("")

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail(event.target.value as string)
    }

    const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUserName(event.target.value as string)
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPassword(event.target.value as string)
    }

    const handleLoginClick = async () => {
        if(!MailChecker.isValid(email)){
            setValidationError("Invalid email")
        }
    }
    return (
        <div className='flex justify-around items-center h-[calc(100vh-72px)]'>
            <div className="card bg-slate-400 w-1/3 text-black glass shadow-xl p-8 pb-16 relative">
                <div className="card-body justify-center">
                    <h1 className="card-title capitalize">Register</h1>
                    <input onChange={handleUserNameChange} type="text" placeholder="Username" className="input input-bordered input-accent w-full" />
                    <input onChange={handleEmailChange} type="text" placeholder="Email" className="input input-bordered input-accent w-full" />
                    <input onChange={handlePasswordChange} type="text" placeholder="Password" className="input input-bordered input-accent w-full" />
                </div>
                <div className="card-actions justify-center">
                    <button className="btn btn-accent">Register</button>
                </div>
                {validationError && <div onClick={() => setValidationError("")} className="badge badge-error gap-2 absolute left-3 bottom-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    {validationError}
                </div>}
                <p className='flex justify-end gap-1 mt-6 absolute right-3 bottom-3'>
                    Already registered? Login <Link href='/login' className='underline text-blue-700'>here</Link>
                </p>
            </div>                
        </div>
    )
}

export default RegisterPage