import React, { useEffect } from 'react'
import Header from "@/components/Header"
import Head from "next/head"
import Feed from "@/components/Feed"
import Modal from "@/components/Modal"
import { useRouter } from 'next/router';
import { getTokenFromLocalStorage } from '../pages/utils/auth'

export default function Home() {

  const router = useRouter();
  const token = getTokenFromLocalStorage();

  return (
    <div className='h-screen overflow-y-scroll scrollbar-hide'>
      <Head>
        <title>Instagram-Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Feed />
      <Modal />

    </div>
  )
}

