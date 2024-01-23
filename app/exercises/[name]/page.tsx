"use client"
import React from 'react'
import { useRouter } from 'next/router'

const Exercise = () => {
    const router = useRouter()
    return <p>Post: {router.query.name}</p>
}

export default Exercise