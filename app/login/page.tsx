'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import MailChecker from 'mailchecker'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const LoginPage = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [validationError, setValidationError] = useState<string>('')

  const router = useRouter()

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEmail(event.target.value as string)
  }

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPassword(event.target.value as string)
  }

  const handleLoginClick = async (event: any) => {
    event.preventDefault()

    if (!email || !password) {
      setValidationError('All fields are required')
    } else if (!MailChecker.isValid(email)) {
      setValidationError('Invalid email')
    }

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (res && res.error) {
        setValidationError('Invalid Credentials')
        return
      }

      toast.success('Successfully logged in!', {
        position: 'bottom-right',
      })
      router.replace('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex h-[calc(100vh-72px)] items-center justify-around'>
      <form
        onSubmit={handleLoginClick}
        className='card glass relative h-full w-full bg-slate-400 p-8 pb-16 text-black shadow-xl md:h-fit md:w-1/2'
      >
        <div className='card-body justify-center'>
          <h1 className='card-title capitalize'>Login</h1>
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
          <button className='btn btn-accent'>Login</button>
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
          No account? Register{' '}
          <Link href='/register' className='text-blue-700 underline'>
            here
          </Link>
        </p>
      </form>
    </div>
  )
}

export default LoginPage
