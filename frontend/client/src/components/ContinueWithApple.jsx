import React from "react";
import apple from '../assets/apple.png'

export default function AppleButton() {
  return (
    <button
      className="max-w-[320px] w-full flex items-center tracking-wider font-sans font-thin justify-center px-6 py-2 text-sm text-center uppercase text-white bg-black rounded-xl transition-colors duration-300 ease-in-out hover:bg-gray-900 sm:max-w-full"
    >
      <img src={apple} alt="" className="w-5 h-6 mr-5"/>Continue with Apple
    </button>
  );
}
