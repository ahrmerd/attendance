import { Head, Link } from '@inertiajs/react'
import React, { ReactNode } from 'react'

interface GuestProps {
  children: ReactNode
}

export default function GuestLayout({ children }: GuestProps) {
  return (
    <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0">
      <Head title="Guest" />
      <div>
        <Link href="/">Attendance</Link>
      </div>

      <div className="w-full px-6 py-4 mt-6 overflow-hidden shadow-md sm:max-w-md sm:rounded-lg">
        {children}
      </div>
    </div>
  )
}
