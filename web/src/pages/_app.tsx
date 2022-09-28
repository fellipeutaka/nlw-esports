import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.min.css";
import "keen-slider/keen-slider.min.css";
import { ToastContainer } from "react-toastify";

import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar
        pauseOnHover
        draggable
        closeOnClick
        theme="dark"
      />
    </>
  );
}
