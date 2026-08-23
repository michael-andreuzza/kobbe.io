import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const notificationCardVariants = cva(
  "not-prose rounded-md p-4 text-sm leading-6",
  {
    variants: {
      state: {
        info: "bg-info/10",
        success: "bg-success/10",
        warning: "bg-warning/10",
        caution: "bg-caution/10",
        destructive: "bg-destructive/10",
      },
    },
    defaultVariants: {
      state: "info",
    },
  },
);

type NotificationState = NonNullable<
  VariantProps<typeof notificationCardVariants>["state"]
>;

/* The state color lives on the title instead of an icon, keeping the
   card a quiet typographic block. */
const titleClassByState: Record<NotificationState, string> = {
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  caution: "text-caution",
  destructive: "text-destructive",
};

type NotificationCardProps = React.ComponentProps<"div"> &
  VariantProps<typeof notificationCardVariants> & {
    title?: string;
  };

function NotificationCard({
  className,
  state = "info",
  title,
  children,
  ...props
}: NotificationCardProps) {
  const resolvedState = state ?? "info";

  return (
    <div
      data-slot="notification-card"
      role={
        resolvedState === "warning" ||
        resolvedState === "caution" ||
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
      {title ? (
        <h3 className={cn("font-normal text-sm", titleClassByState[resolvedState])}>
          {title}
        </h3>
      ) : null}
      <p className={cn(title && "mt-1", "text-foreground/70 text-balance")}>{children}</p>
    </div>
  );
}

export { NotificationCard };
