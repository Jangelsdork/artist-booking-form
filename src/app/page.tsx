'use client'

import { BookingForm } from '@/components/BookingForm'
import { ModeToggle } from '@/components/mode-toggle'
import Image from 'next/image'
import { Form } from 'react-hook-form'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20 ">
      <div className='w-[100%] top-0 fixed flex flex-row justify-end items-center p-8'>
        <ModeToggle/> 
        </div>
      <h1  className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pb-8">We are E Artist Booking Form</h1>
      <BookingForm />
    </main>
  )
}
