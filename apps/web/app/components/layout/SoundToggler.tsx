"use client";

import { useState } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";

export function SoundToggler() {
  const [isOn, setIsOn] = useState(false);
  return (
    <button onClick={() => setIsOn(!isOn)} aria-label={`Toggle sound`} className="cursor-pointer text-muted hover:text-white">
      {isOn ? <FiVolume2 className="w-10 h-10 xl:w-7 xl:h-7" /> : <FiVolumeX className="w-10 h-10 xl:w-7 xl:h-7" />}
    </button>
  );
}
