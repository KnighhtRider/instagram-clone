import Header from "@/components/Header"
import Head from "next/head"
import Feed from "@/components/Feed"


export default function Home() {
  return (
    <div className=''>
      <Head>
        <title>Cam-Talk</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />

      {/* Feed */}
      <Feed />
      {/* Modal */}
      
    </div>
  )
}
