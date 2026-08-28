"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface TextBlockAnimationProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
  blockColor?: string;
  duration?: number;
  className?: string;
}

/**
 * TextBlockAnimation - High-Performance Block Revealer Component
 * 
 * Performance & Architecture:
 * - Zero Layout Thrashing: Driven via CSS GPU transforms (scaleX) and opacity.
 * - Zero Paid Plugin Dependency: Replaces proprietary gsap/SplitText with standards-based CSS pseudo-block revealer.
 * - IntersectionObserver Triggering: Uses passive threshold detection to fire animations on viewport entry.
 * - Reduced Motion: Automatically falls back to instant visibility when prefers-reduced-motion is active.
 */
export default function TextBlockAnimation({
  children,
  animateOnScroll = true,
  delay = 0,
  blockColor = "var(--color-accent, #6366f1)",
  duration = 0.65,
  className,
  ...props
}: TextBlockAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const block = blockRef.current;
    const content = contentRef.current;
    if (!container || !block || !content) return;

    // Check OS-level accessibility preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      content.style.opacity = "1";
      block.style.display = "none";
      return;
    }

    const startAnimation = () => {
      // Set initial styles
      content.style.opacity = "0";
      block.style.transform = "scaleX(0)";
      block.style.transformOrigin = "left center";

      const startTime = performance.now() + delay * 1000;
      const totalDuration = duration * 1000;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        if (elapsed < 0) {
          requestAnimationFrame(animate);
          return;
        }

        const progress = Math.min(1, elapsed / totalDuration);

        // Phase 1: Block expands Left -> Right (0% to 50%)
        if (progress < 0.5) {
          const expandProgress = progress * 2;
          const ease = 1 - Math.pow(1 - expandProgress, 3); // Cubic ease out
          block.style.transformOrigin = "left center";
          block.style.transform = `scaleX(${ease})`;
        } 
        // Phase 2: Content appears, Block retracts Left -> Right (50% to 100%)
        else {
          content.style.opacity = "1";
          const contractProgress = (progress - 0.5) * 2;
          const ease = Math.pow(contractProgress, 3); // Cubic ease in
          block.style.transformOrigin = "right center";
          block.style.transform = `scaleX(${1 - ease})`;
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          block.style.transform = "scaleX(0)";
        }
      };

      requestAnimationFrame(animate);
    };

    if (animateOnScroll) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startAnimation();
              observer.unobserve(container);
            }
          });
        },
        { threshold: 0.15 }
      );
      observer.observe(container);
      return () => observer.disconnect();
    } else {
      startAnimation();
    }
  }, [animateOnScroll, delay, duration]);

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-block overflow-hidden", className)}
      {...props}
    >
      <div
        ref={contentRef}
        className="transition-opacity duration-75"
        style={{ opacity: 0 }}
      >
        {children}
      </div>

      <div
        ref={blockRef}
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backgroundColor: blockColor,
          transform: "scaleX(0)",
          transformOrigin: "left center",
          willChange: "transform",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
