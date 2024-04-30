"use client"
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React from 'react'
import { UploadButton } from '~/utils/uploadthing'

const TopNav = () => {
  const router = useRouter()
  return (
    <nav className="flex w-full items-center justify-between p-4 text-xl font-semibold border-b">
        <div>Gallery</div>
        <div className="flex flex-row">
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
              <UploadButton endpoint='imageUploader' onClientUploadComplete={()=>{
                router.refresh();
              }}/>
                <UserButton />
            </SignedIn>
        </div>
    </nav>
  )
}

export default TopNav