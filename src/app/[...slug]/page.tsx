import { ModeToggle } from "@/components/mode-toggle"
import { BookingForm } from "@/components/BookingForm"
import { redirect } from 'next/navigation';


export default function Page({ params }: { params: { slug: string } }) {
  
  const currentUrl:string = params.slug
  console.log(currentUrl)

  if(currentUrl!="jason" && currentUrl!="pete" && currentUrl!="cammy"){
    redirect("/")
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20 ">
    <div className='w-[100%] top-0 fixed flex flex-row justify-end items-center p-8'>
      <ModeToggle/> 
      </div>
    <h1  className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pb-8">We Are E Artist Booking Form</h1>
    <BookingForm currentAgent={currentUrl}/>
  </main>
  )
  }