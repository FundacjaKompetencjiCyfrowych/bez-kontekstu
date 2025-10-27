"use client";

interface HeaderProps {
  title?: string;
  showTitle?: boolean;
  className?: string;
  hideTitleOnMobile?: boolean;
}

export function Header({ title = "", showTitle = true, className, hideTitleOnMobile = false }: HeaderProps) {
  // Split title into words for vertical display
  const titleWords = title.split(" ");

  return (
    <>
      {/* Title Section */}
      {showTitle && (
        <div className={`w-full flex justify-between items-center my-10 px-4 md:my-12 md:px-6 z-10 ${className}`}>
          <div className="flex flex-col">
            {titleWords.map((word, index) => (
              <h2 key={index} className={hideTitleOnMobile ? "text-transparent md:text-inherit" : ""}>
                {word}
              </h2>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
