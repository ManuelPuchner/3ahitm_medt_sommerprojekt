import React, { useEffect } from 'react'
import Header from '../components/header/Header'

type Props = {
  children: React.ReactNode
}

function Layout({ children }: Props) {
  return (
    <div className="layout min-h-screen">
      <Header />
      <div className="h-24"></div>
      {children}
    </div>
  );
}

export default Layout