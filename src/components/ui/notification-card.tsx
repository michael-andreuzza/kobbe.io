import { HugeiconsIcon } from "@hugeicons/react";
import {
  AlertCircleIcon,
  SecurityWarningIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

type HugeIcon = typeof SecurityWarningIcon;

const notificationCardVariants = cva(
  "not-prose flex gap-3 rounded p-4 text-sm leading-6",
  {
    variants: {
      state: {
        info: "bg-info/5 text-foreground",
        success: "bg-success/5 text-foreground",
        warning: "bg-warning/5 text-foreground",
        danger: "bg-destructive/5 text-foreground",
        destructive: "bg-destructive/5 text-foreground",
      },
    },
    defaultVariants: {
      state: "info",
    },
  },
);

const iconByState: Record<
  NonNullable<VariantProps<typeof notificationCardVariants>["state"]>,
  HugeIcon
> = {
  info: AlertCircleIcon,
  success: Tick02Icon,
  warning: SecurityWarningIcon,
  danger: AlertCircleIcon,
  destructive: AlertCircleIcon,
};

const iconClassByState: Record<
  NonNullable<VariantProps<typeof notificationCardVariants>["state"]>,
  string
> = {
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  danger: "text-destructive",
  destructive: "text-destructive",
};

type NotificationCardProps = React.ComponentProps<"div"> &
  VariantProps<typeof notificationCardVariants> & {
    title?: string;
    icon?: HugeIcon;
  };

function NotificationCard({
  className,
  state = "info",
  title,
  icon,
  children,
  ...props
}: NotificationCardProps) {
  const resolvedState = state ?? "info";
  const Icon = icon ?? iconByState[resolvedState];

  return (
    <div
      data-slot="notification-card"
      role={
        resolvedState === "warning" ||
        resolvedState === "danger" ||
        resolvedState === "destructive"
          ? "alert"
          : "status"
      }
      className={cn(
        notificationCardVariants({ state: resolvedState }),
        className,
      )}
      {...props}
    >
      <HugeiconsIcon
        icon={Icon}
        size={18}
        strokeWidth={1.8}
        className={cn("mt-0.5 shrink-0", iconClassByState[resolvedState])}
        aria-hidden="true"
      />
      <div className="min-w-0">
        {title ? (
          <h3 className="text-foreground font-medium">{title}</h3>
        ) : null}
        <p className={cn(title && "mt-1", "text-muted-foreground")}>
          {children}
        </p>
      </div>
    </div>
  );
}

export { NotificationCard };
