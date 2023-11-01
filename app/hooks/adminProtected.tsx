
import { redirect } from 'next/navigation'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'

interface ProtectedProps {
  children: React.ReactNode
}


function AdminProtected({children}: ProtectedProps) {

  const { user } = useSelector((state:any) => state.auth)

  if (user) {
    const isAdmin = user?.role === 'admin'
    return isAdmin ? children : redirect('/')
  }

}

export default AdminProtected