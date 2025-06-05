import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Optional CSS class name to apply custom styles
   */
  className?: string;
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean;
  /**
   * Whether to pause the animation on hover
   * @default false
   */
  pauseOnHover?: boolean;
  /**
   * Content to be displayed in the marquee
   */
  children: React.ReactNode;
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean;
  /**
   * Number of times to repeat the content
   * @default 4
   */
  repeat?: number;
  /**
   * Whether to take full width
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Whether to take full height
   * @default false
   */
  fullHeight?: boolean;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  fullWidth = false,
  fullHeight = false,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group relative flex w-full overflow-visible [--duration:60s] px-8 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-32 before:bg-gradient-to-r before:from-neutral-100 before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-32 after:bg-gradient-to-l after:from-neutral-100 after:to-transparent",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
          "w-full": fullWidth,
          "h-full": fullHeight,
          "before:from-[#495f43] after:from-[#495f43]": className?.includes("bg-[#495f43]"),
          "before:from-neutral-100 after:from-neutral-100": className?.includes("bg-neutral-200"),
          "before:from-dark after:from-dark": className?.includes("bg-dark"),
        },
        className,
      )}
    >
      <div className={cn(
        "flex shrink-0 animate-marquee overflow-visible",
        {
          "flex-row [&>*]:mr-12 [&>*]:mb-16": !vertical,
          "flex-col [&>*]:mb-12": vertical,
          "group-hover:[animation-play-state:paused]": pauseOnHover,
          "[animation-direction:reverse]": reverse,
        }
      )}>
        {children}
      </div>
      <div className={cn(
        "flex shrink-0 animate-marquee overflow-visible",
        {
          "flex-row [&>*]:mr-12 [&>*]:mb-16": !vertical,
          "flex-col [&>*]:mb-12": vertical,
          "group-hover:[animation-play-state:paused]": pauseOnHover,
          "[animation-direction:reverse]": reverse,
        }
      )}>
        {children}
      </div>
    </div>
  );
}
