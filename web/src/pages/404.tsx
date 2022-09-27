import Lottie from "lottie-react";

import animationData from "@assets/404.json";

export default function _404() {
  return (
    <main className="w-full max-h-screen flex items-center justify-center overflow-hidden">
      <Lottie animationData={animationData} loop className="w-full" />
    </main>
  );
}
