import Link from "next/link";

interface SectionButtonProps {
  href: string;
  label: string;
  newTab?: boolean;
  className?: string;
}

export function SectionButton({ href, label, newTab, className = "" }: SectionButtonProps) {
  const baseClasses = `
    h-10 px-7 py-6 
    w-full max-w-[80vw] md:max-w-md lg:max-w-xs
    mx-auto inline-flex items-center justify-center 
    transition-all duration-300 
    rounded-2xl text-white 
    border border-violet-400 
    hover:bg-violet-900/30 hover:border-violet-300 
    shadow-lg hover:cursor-pointer
    ${className}
  `;

  return (
    <div className="relative flex justify-center items-center z-10">
      <Link
        href={href}
        className={`${baseClasses} focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-opacity-50`}
        target={newTab ? "_blank" : "_self"}
        rel="noopener noreferrer"
      >
        {label}
      </Link>
    </div>
  );
}
