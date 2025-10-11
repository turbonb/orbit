import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right";

export interface RevealProps<T extends ElementType = "div">
  extends Omit<ComponentPropsWithoutRef<T>, "as" | "ref"> {
  as?: T;
  children: ReactNode;
  delay?: number;
  direction?: Direction;
}

const hiddenTransforms: Record<Direction, string> = {
  up: "translate3d(0, 16px, 0)",
  down: "translate3d(0, -16px, 0)",
  left: "translate3d(16px, 0, 0)",
  right: "translate3d(-16px, 0, 0)"
};

/**
 * Lightweight reveal wrapper that animates children into view when scrolled.
 */
export function Reveal<T extends ElementType = "div">({
  as,
  children,
  className,
  delay = 0,
  direction = "up",
  style,
  ...props
}: RevealProps<T>) {
  const Component = (as ?? "div") as ElementType;
  const { ref, isInView } = useInView<HTMLElement>({
    rootMargin: "0px 0px -10%",
    threshold: 0.25
  });

  const hiddenTransform = hiddenTransforms[direction] ?? hiddenTransforms.up;

  return (
    <Component
      ref={ref as never}
      className={cn(
        "will-change-[opacity,transform]",
        "transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
        className
      )}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translate3d(0, 0, 0)" : hiddenTransform,
        transitionDelay: `${delay}s`,
        filter: isInView ? "none" : "blur(2px)",
        ...style
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
