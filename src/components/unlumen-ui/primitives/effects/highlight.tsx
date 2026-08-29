"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";


interface HighlightContextValue {
  hover: boolean;
  controlledItems: boolean;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  highlightProps: {
    className?: string;
    style?: React.CSSProperties;
  };
}

const HighlightContext = React.createContext<HighlightContextValue | null>(null);

export interface HighlightProps extends React.HTMLAttributes<HTMLDivElement> {
  mode?: "parent" | "standalone";
  controlledItems?: boolean;
  hover?: boolean;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}

export function Highlight({
  mode = "parent",
  controlledItems = false,
  hover = true,
  className,
  containerClassName,
  style,
  children,
  ...props
}: HighlightProps) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const contextValue = React.useMemo(
    () => ({
      hover,
      controlledItems,
      activeId,
      setActiveId,
      highlightProps: { className, style },
    }),
    [hover, controlledItems, activeId, className, style]
  );

  return (
    <HighlightContext.Provider value={contextValue}>
      <div className={cn("relative", containerClassName)} {...props}>
        {children}
      </div>
    </HighlightContext.Provider>
  );
}

export interface HighlightItemProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
  id?: string;
  children: React.ReactNode;
}

export function HighlightItem({
  asChild = false,
  id: explicitId,
  children,
  className,
  onPointerEnter,
  onPointerLeave,
  ...props
}: HighlightItemProps) {
  const generatedId = React.useId();
  const id = explicitId ?? generatedId;
  const context = React.useContext(HighlightContext);
  const isHovered = context?.activeId === id;

  const handlePointerEnter = (e: React.PointerEvent<HTMLElement>) => {
    onPointerEnter?.(e as any);
    if (context?.hover) {
      context.setActiveId(id);
    }
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLElement>) => {
    onPointerLeave?.(e as any);
    if (context?.hover && context.activeId === id) {
      context.setActiveId(null);
    }
  };

  if (asChild && React.isValidElement(children)) {
    const childElement = children as React.ReactElement<any>;
    return (
      <div className="relative inline-flex" onPointerEnter={handlePointerEnter} onPointerLeave={handlePointerLeave}>
        {isHovered && (
          <motion.div
            layoutId="motion-nav-highlight"
            className={cn(
              "absolute inset-0 rounded-md bg-accent/15 pointer-events-none -z-1",
              context?.highlightProps?.className
            )}
            style={context?.highlightProps?.style}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
        )}
        {React.cloneElement(childElement, {
          className: cn(childElement.props.className, className),
        })}
      </div>
    );
  }

  return (
    <div
      className={cn("relative inline-flex", className)}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      {isHovered && (
        <motion.div
          layoutId="motion-nav-highlight"
          className={cn(
            "absolute inset-0 rounded-md bg-accent/15 pointer-events-none -z-1",
            context?.highlightProps?.className
          )}
          style={context?.highlightProps?.style}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
      {children}
    </div>
  );
}

export default Highlight;
