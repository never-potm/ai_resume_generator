'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {ModeToggle} from "@/components/nav/mode-toggle";
import {SignInButton, SignedIn, SignedOut, UserButton} from '@clerk/nextjs'
import {useUser} from '@clerk/nextjs';

function TopNav() {

    const { isSignedIn, user} = useUser();

    return (
        <nav className="flex justify-between items-center p-1 shadow">
            <Link href="/">
                <Image src="/logo.svg" alt="logo" width={50} height={50}/>
            </Link>

            <div className="flex justify-end items-center gap-2">

                {isSignedIn && (<Link href="/dashboard">{user?.fullName}'s Dashboard</Link>)}

                <SignedOut>
                    <SignInButton/>
                </SignedOut>
                <SignedIn>
                    <UserButton/>
                </SignedIn>
                <ModeToggle/>
            </div>
        </nav>
    );
}

export default TopNav;