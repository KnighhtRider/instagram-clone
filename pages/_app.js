import react, { useEffect } from 'react';
import '@/styles/globals.css'
import { RecoilRoot } from 'recoil'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {


  return (
    <RecoilRoot>
      <Component {...pageProps} />
      <ToastContainer theme='dark'/>
    </RecoilRoot>
    )
}
