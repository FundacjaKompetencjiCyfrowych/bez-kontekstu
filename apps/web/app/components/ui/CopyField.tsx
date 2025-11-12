"use client";

import { useCopyToClipboard, useTimeout } from "usehooks-ts";
import { useCallback, useState } from "react";
import { FiCopy } from "react-icons/fi";
import { cn } from "@/app/lib/utils";

type CopyFieldProps = {
  label: string;
  value: string;
  elementId: string;
  className?: string;
  copiedText: string;
  ariaLiveCopiedMessage?: string;
  ariaLabel?: string;
  disabled?: boolean;
};

export function CopyField({
  label,
  value,
  elementId,
  className,
  copiedText,
  ariaLiveCopiedMessage = copiedText,
  ariaLabel,
  disabled,
}: CopyFieldProps) {
  const [, copy] = useCopyToClipboard();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useTimeout(() => setCopiedId(null), copiedId ? 2000 : null);

  const handleCopy = useCallback(() => {
    copy(value)
      .then(() => setCopiedId(elementId))
      .catch((error) => console.error("Failed to copy!", error));
  }, [copy, value, elementId]);

  return (
    <button
      type="button"
      className={cn("glass border-white/10 rounded-3xl px-3 py-2 w-full text-left relative", !disabled && "cursor-pointer", className)}
      onClick={disabled ? undefined : handleCopy}
      aria-label={ariaLabel}
    >
      {/* Live region only when copied */}
      {!disabled && (
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {copiedId === elementId ? ariaLiveCopiedMessage : undefined}
        </div>
      )}

      <div className="flex justify-between items-end mx-2 my-2">
        <div>
          {label && <p className="mb-4">{label}</p>}
          <p>{copiedId === elementId ? copiedText : value}</p>
        </div>
        {!disabled && <FiCopy className="shrink-0 w-[1.2em] h-[1.2em] mb-1 mr-1" aria-hidden />}
      </div>
    </button>
  );
}

export default CopyField;
