"use client";

import { useState } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";

export function SoundToggler() {
  const [isOn, setIsOn] = useState(false);
  return (
    <button
      onClick={() => setIsOn(!isOn)}
      aria-label={isOn ? "Turn sound off" : "Turn sound on"}
      aria-pressed={isOn}
      className="cursor-pointer text-muted hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-opacity-50 rounded"
    >
      {isOn ? (
        <FiVolume2 className="w-10 h-10 xl:w-7 xl:h-7" aria-hidden="true" />
      ) : (
        <FiVolumeX className="w-10 h-10 xl:w-7 xl:h-7" aria-hidden="true" />
      )}
    </button>
  );
}
