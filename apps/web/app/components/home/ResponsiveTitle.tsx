import titleCutWord from "@/app/lib/titleCutWord";
import { cn } from "@/app/lib/utils";

interface ResponsiveTitleProps {
  mobileText: string;
  desktopText: string;
  desktopAlign?: "left" | "right";
  mobileAlign?: "left" | "right";
  className?: string;
}

export function ResponsiveTitle({
  mobileText,
  desktopText,
  desktopAlign = "right",
  mobileAlign = "right",
  className = "",
}: ResponsiveTitleProps) {
  const mobileLines = mobileText.split(" ");

  return (
    <div
      className={cn(
        `flex flex-col`,
        // Mobile alignment
        mobileAlign === "right" && "self-end text-end md:items-stretch md:text-left",
        mobileAlign === "left" && "self-start text-start md:items-stretch md:text-left",
        // Desktop positioning
        "md:absolute",
        desktopAlign === "right" && "md:top-0 md:right-0",
        desktopAlign === "left" && "md:bottom-0 md:left-0",
        className
      )}
    >
      {/* Mobile version */}
      <div className="block md:hidden">
        {mobileLines.map((line, index) => (
          <h3 key={index} className="text-4xl sm:text-4xl md:text-6xl leading-tight">
            {line}
          </h3>
        ))}
      </div>

      {/* Desktop version */}
      <div className={cn("hidden md:block", desktopAlign === "right" && "md:text-right", desktopAlign === "left" && "md:text-left")}>
        {titleCutWord(desktopText)}
      </div>
    </div>
  );
}
