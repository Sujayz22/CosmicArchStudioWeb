import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, useState, useEffect } from "react";

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
  /**
   * Animation speed in pixels per second
   * @default 50
   */
  speed?: number;
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
  speed = 50,
  ...props
}: MarqueeProps) {
  // Calculate duration based on speed (lower speed = longer duration)
  const duration = Math.max(20, 100 - speed); // 20s minimum, 100s maximum
  const [isHovered, setIsHovered] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get the appropriate CSS class based on direction and orientation
  const getAnimationClass = () => {
    if (vertical) {
      return reverse ? 'marquee-animation-vertical-reverse' : 'marquee-animation-vertical';
    } else {
      return reverse ? 'marquee-animation-reverse' : 'marquee-animation';
    }
  };

  // Get the appropriate CSS class based on direction and orientation
  const getAnimationStyle = () => {
    const animationName = vertical 
      ? (reverse ? 'marquee-vertical-reverse' : 'marquee-vertical')
      : (reverse ? 'marquee-reverse' : 'marquee');

    return {
      animation: `${animationName} ${duration}s linear infinite`,
      animationPlayState: isHovered && pauseOnHover ? 'paused' : 'running',
      willChange: 'transform',
      transform: 'translateZ(0)'
    };
  };

  return (
    <div
      {...props}
      className={cn(
        `group relative flex w-full overflow-hidden px-4 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-32 before:bg-gradient-to-r before:from-neutral-100 before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-32 after:bg-gradient-to-l after:from-neutral-100 after:to-transparent`,
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={cn(
          "flex shrink-0 marquee-hardware-accelerated",
          {
            "flex-row": !vertical,
            "flex-col": vertical,
          }
        )}
        style={getAnimationStyle()}
      >
        {/* First copy */}
        <div className="flex shrink-0">
          {children}
        </div>
        {/* Second copy for seamless loop */}
        <div className="flex shrink-0">
          {children}
        </div>
        {/* Third copy for extra safety */}
        <div className="flex shrink-0">
          {children}
        </div>
      </div>
    </div>
  );
}
