import NavbarUser from '../components/NavbarUser'
import { useSession } from 'next-auth/react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

jest.mock('next-auth/react')

describe('NavbarUser', () => {
  test('renders the "Log out" button when user is logged in', () => {
    useSession.mockReturnValue({ data: { user: { email: 'John@gmail.com' } } })

    render(<NavbarUser />)

    expect(screen.getByRole('button', { name: 'Log out' })).toBeInTheDocument()
  })

  test('renders the "Login" and "Sign up" button when user is logged out', () => {
    useSession.mockReturnValue({ data: null })

    render(<NavbarUser />)

    expect(screen.getByRole('link', { name: 'Login' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Sign up' })).toBeInTheDocument()
  })
})
