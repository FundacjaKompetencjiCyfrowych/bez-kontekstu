// components/home/ResponsiveTitle.tsx
import titleCutWord from "@/app/lib/titleCutWord";

interface ResponsiveTitleProps {
  mobileText: string;
  desktopText: string;
  align?: "left" | "right";
  className?: string;
}

export function ResponsiveTitle({ mobileText, desktopText, align = "right", className = "" }: ResponsiveTitleProps) {
  const mobileLines = mobileText.split(" ");

  return (
    <div className={`flex flex-col ${align === "right" ? "items-end text-right" : "items-start text-left"} ${className}`}>
      {/* Mobile version */}
      <div className="block xl:hidden">
        {mobileLines.map((line, index) => (
          <h3 key={index} className="text-2xl sm:text-4xl md:text-6xl leading-tight">
            {line}
          </h3>
        ))}
      </div>

      {/* Desktop version */}
      <div className={`hidden xl:block xl:text-${align}`}>{titleCutWord(desktopText)}</div>
    </div>
  );
}
