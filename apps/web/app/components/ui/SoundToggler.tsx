"use client";

import { useState } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";

export function SoundToggler() {
  const [isOn, setIsOn] = useState(false);
  return (
    <button
      onClick={() => setIsOn(!isOn)}
      aria-label={`Toggle sound`}
      className="cursor-pointer text-white hover:text-brand-200 xl:text-muted xl:hover:text-white focus-brand rounded"
    >
      {isOn ? <FiVolume2 style={{ width: "1.3em", height: "1.3em" }} /> : <FiVolumeX style={{ width: "1.3em", height: "1.3em" }} />}
    </button>
  );
}
