
import { redirect } from 'next/navigation'
import UserAuth from './userAuth'
import React, { FC } from 'react'

interface ProtectedProps {
  children: React.ReactNode
}

function Protected({children}: ProtectedProps) {
const isAuthenticated = UserAuth()



return isAuthenticated ? children : redirect('/')

}

export default Protected