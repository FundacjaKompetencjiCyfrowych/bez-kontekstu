"use client";

import { useState } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";

export function SoundToggler() {
  const [isOn, setIsOn] = useState(false);
  return (
    <button onClick={() => setIsOn(!isOn)} aria-label={`Toggle sound`} className="cursor-pointer hover:text-white">
      {isOn ? <FiVolume2 className="w-10 h-10" /> : <FiVolumeX className="w-10 h-10" />}
    </button>
  );
}
