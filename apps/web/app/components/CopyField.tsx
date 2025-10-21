"use client";

import Image from "next/image";
import copyIcon from "@/app/assets/icons/copy.png";
import { useCopyToClipboard, useTimeout } from "usehooks-ts";
import { useCallback, useState } from "react";

type CopyFieldProps = {
    label: string;
    value: string;
    elementId: string;
    className: string;
    copiedText: string;
    ariaLiveCopiedMessage?: string;
    /** Optional className for the value container */
    valueClassName?: string;
    ariaLabel?: string;
};

export function CopyField({
    label,
    value,
    elementId,
    className,
    copiedText,
    ariaLiveCopiedMessage = copiedText,
    valueClassName,
    ariaLabel,
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
        <button type="button" className={className} onClick={handleCopy} aria-label={ariaLabel}>
            {/* Live region only when copied */}
            <div aria-live="polite" aria-atomic="true" className="sr-only">
                {copiedId === elementId ? ariaLiveCopiedMessage : undefined}
            </div>

            <div className="flex justify-between items-end mx-2 my-2">
                <div>
                    <p className="mb-4">{label}</p>
                    <p className={valueClassName}>{copiedId === elementId ? copiedText : value}</p>
                </div>
                <div className="w-6 h-6 md:w-12 md:h-12 flex items-center justify-center" aria-hidden>
                    <Image src={copyIcon} alt="" width={40} height={40} className="w-6 h-6 md:w-12 md:h-12" />
                </div>
            </div>
        </button>
    );
}

export default CopyField;


