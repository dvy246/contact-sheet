import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";

export function DotPatternDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-marketing-border bg-marketing-panel md:shadow-xl">
      <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-marketing-text">
        Dot Pattern
      </p>
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
        )}
      />
    </div>
  );
}

export default DotPatternDemo;
