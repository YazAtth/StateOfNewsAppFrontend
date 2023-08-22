import React from "react";
import 'tailwindcss/tailwind.css';
import {BarLoader} from "react-spinners";

interface Prop {
  barColor?: string
}

export default function LoadingBar({barColor = "#60A5FA"}: Prop) {

  return (
    <>

      <BarLoader
        color={barColor}
        loading
        speedMultiplier={1}
        // size={80}
      />

    </>
  )
}
