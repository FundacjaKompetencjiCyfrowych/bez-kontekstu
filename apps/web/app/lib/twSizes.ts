const bp = {
  /**640px*/
  sm: "40rem",
  /**768px*/
  md: "48rem",
  /**1024px*/
  lg: "64rem",
  /**1280px*/
  xl: "80rem",
  /**1536px*/
  "2xl": "96rem",
} as const;

type Breakpoint = keyof typeof bp;

/**
 * Converts a Tailwind-style sizes string to a valid HTML sizes attribute, supports `px` values and extra `max:` prefix for a max-width container layout
 * e.g. `sm:100px md:200px max:300px` => `(min-width: 40rem) 100px, (min-width: 48rem) 200px, (min-width: 1280px) 300px`
 */
export const twSizes = (sizesString: string): string => {
  const maxBreakpoint = "1280px"; // Used in a max-width container layout

  const parts = sizesString.trim().split(/\s+/);

  type SizeRule = {
    breakpoint: Breakpoint | null;
    size: string;
    minWidth: string;
    minWidthValue: number;
  };

  const rules: SizeRule[] = [];
  let defaultSize = "100vw";
  let maxSize: string | null = null;

  for (const part of parts) {
    if (part.includes(":")) {
      const [breakpoint, size] = part.split(":");

      if (breakpoint === "max") {
        maxSize = size;
      } else if (breakpoint in bp) {
        const bpKey = breakpoint as Breakpoint;
        const minWidth = bp[bpKey];
        rules.push({
          breakpoint: bpKey,
          size,
          minWidth,
          minWidthValue: parseFloat(minWidth),
        });
      }
    } else {
      defaultSize = part;
    }
  }

  rules.sort((a, b) => b.minWidthValue - a.minWidthValue);
  const mediaQueries = rules.map((rule) => `(min-width: ${rule.minWidth}) ${rule.size}`);

  if (maxSize) {
    return [`(min-width: ${maxBreakpoint}) ${maxSize}`, ...mediaQueries, defaultSize].join(", ");
  }
  return [...mediaQueries, defaultSize].join(", ");
};
