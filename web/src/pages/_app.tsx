import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.min.css";
import "keen-slider/keen-slider.min.css";
import { ToastContainer } from "react-toastify";

import type { AppProps } from "next/app";

import { AuthProvider } from "@contexts/AuthContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={4000} hideProgressBar theme="dark" />
    </AuthProvider>
  );
}
