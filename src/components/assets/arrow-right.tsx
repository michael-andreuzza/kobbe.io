import { cn } from "@/lib/utils";

const sizeClasses = {
  xs: "size-3",
  sm: "size-4",
  base: "size-5",
  md: "size-6",
  lg: "size-7",
  xl: "size-8",
} as const;

export function ArrowRight({
  size = "base",
  className,
}: {
  size?: keyof typeof sizeClasses;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn(sizeClasses[size], className)}
      aria-hidden="true"
    >
      <path d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z" />
    </svg>
  );
}
