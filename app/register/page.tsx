'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import MailChecker from 'mailchecker'

const RegisterPage = () => {
  const [email, setEmail] = useState<string>('')
  const [userName, setUserName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [validationError, setValidationError] = useState<string>('')

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEmail(event.target.value as string)
  }

  const handleUserNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setUserName(event.target.value as string)
  }

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPassword(event.target.value as string)
  }

  const handleRegClick = async (event: any) => {
    event.preventDefault()

    if (!email || !password || !userName) {
      setValidationError('All fields are required')
    } else if (!MailChecker.isValid(email)) {
      setValidationError('Invalid email')
    }

    try {
      const res = await fetch('api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          email,
          password,
        }),
      })

      if (res.ok) {
        const form = event.target
        form.reset()
      } else {
        console.log('Register Failed')
      }
    } catch (error) {
      console.log('Error in registration: ', error)
    }
  }

  return (
    <div className='flex h-[calc(100vh-72px)] items-center justify-around'>
      <form
        onSubmit={handleRegClick}
        className='card glass relative w-1/3 bg-slate-400 p-8 pb-16 text-black shadow-xl'
      >
        <div className='card-body justify-center'>
          <h1 className='card-title capitalize'>Register</h1>
          <input
            onChange={handleUserNameChange}
            type='text'
            placeholder='Username'
            className='input input-bordered input-accent w-full'
          />
          <input
            onChange={handleEmailChange}
            type='text'
            placeholder='Email'
            className='input input-bordered input-accent w-full'
          />
          <input
            onChange={handlePasswordChange}
            type='password'
            placeholder='Password'
            className='input input-bordered input-accent w-full'
          />
        </div>
        <div className='card-actions justify-center'>
          <button className='btn btn-accent'>Register</button>
        </div>
        {validationError && (
          <div
            onClick={() => setValidationError('')}
            className='badge badge-error absolute bottom-3 left-3 gap-2'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='inline-block h-4 w-4 stroke-current'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              ></path>
            </svg>
            {validationError}
          </div>
        )}
        <p className='absolute bottom-3 right-3 mt-6 flex justify-end gap-1'>
          Already registered? Login{' '}
          <Link href='/login' className='text-blue-700 underline'>
            here
          </Link>
        </p>
      </form>
    </div>
  )
}

export default RegisterPage
