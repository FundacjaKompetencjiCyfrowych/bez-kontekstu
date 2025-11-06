import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { cn } from "@/app/lib/utils";

interface PaginationItem {
    slug?: {
        current?: string;
    } | null;
}

interface PaginationNavProps {
    previous?: PaginationItem | null;
    next?: PaginationItem | null;
    basePath: string;
    dictionary: {
        previous: string;
        next: string;
    };
    variant?: "default" | "compact" | "desktop";
    className?: string;
    containerClassName?: string;
}

// All styles for each variant
const variantStyles = {
    default: {
        container: "px-8 pb-10 text-sm",
        flex: "flex justify-around items-center",
        link: "flex items-center md:text-xl hover:text-gray-300 transition-colors",
        iconPrev: "inline-block mr-4 w-2 h-2 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6",
        iconNext: "inline-block ml-4 w-2 h-2 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6",
    },
    compact: {
        container: "lg:hidden relative text-sm z-10 pb-8 lg:pb-0",
        flex: "flex justify-between lg:justify-around items-center",
        link: "flex items-center hover:text-gray-300 transition-colors",
        iconPrev: "inline-block mr-4 w-2 h-2 md:w-4 md:h-4",
        iconNext: "inline-block ml-4 w-2 h-2 md:w-4 md:h-4",
    },
    desktop: {
        container: "text-base",
        flex: "flex justify-evenly items-center",
        link: "flex items-center hover:text-gray-300 transition-colors",
        iconPrev: "inline-block mr-4 w-5 h-6 lg:w-3 lg:h-4",
        iconNext: "inline-block ml-4 w-5 h-5 lg:w-3 lg:h-4",
    },
};

export function PaginationNav({
    previous,
    next,
    basePath,
    dictionary,
    variant = "default",
    className,
    containerClassName,
}: PaginationNavProps) {
    const styles = variantStyles[variant];

    return (
        <div className={cn(styles.container, containerClassName)}>
            <div className={cn(styles.flex, className)}>
                {/* Previous Item */}
                <div>
                    {previous?.slug?.current ? (
                        <Link
                            href={`/${basePath}/${previous.slug.current}`}
                            className={styles.link}
                        >
                            <div>
                                <FiArrowLeft className={styles.iconPrev} />
                                <span>{dictionary.previous}</span>
                            </div>
                        </Link>
                    ) : (
                        <div></div>
                    )}
                </div>

                {/* Next Item */}
                <div className="text-right">
                    {next?.slug?.current ? (
                        <Link
                            href={`/${basePath}/${next.slug.current}`}
                            className={cn(styles.link, "justify-end gap-2")}
                        >
                            <div>
                                <span>{dictionary.next}</span>
                                <FiArrowRight className={styles.iconNext} />
                            </div>
                        </Link>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </div>
    );
}