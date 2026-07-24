const authPanelSparkline = [
  { visitors: 42, revenueMinor: 9900 },
  { visitors: 58, revenueMinor: 14800 },
  { visitors: 51, revenueMinor: 9900 },
  { visitors: 74, revenueMinor: 24700 },
  { visitors: 66, revenueMinor: 19800 },
  { visitors: 88, revenueMinor: 29600 },
  { visitors: 79, revenueMinor: 19800 },
  { visitors: 95, revenueMinor: 34600 },
  { visitors: 84, revenueMinor: 24700 },
  { visitors: 108, revenueMinor: 39500 },
  { visitors: 97, revenueMinor: 29600 },
  { visitors: 121, revenueMinor: 44400 },
  { visitors: 112, revenueMinor: 39500 },
  { visitors: 134, revenueMinor: 54300 },
] as const;

function AuthPanelMetricRow(props: {
  label: string;
  value: string;
  chipClassName: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 leading-none">
      <span className="text-muted-foreground inline-flex min-w-0 items-center gap-1.5 text-xs">
        <span
          className={`size-2 shrink-0 rounded-[2px] ${props.chipClassName}`}
        />
        {props.label}
      </span>
      <span className="text-foreground shrink-0 text-xs font-medium tabular-nums">
        {props.value}
      </span>
    </div>
  );
}

function AuthPanelSparkline() {
  const width = 320;
  const height = 48;
  const padding = { top: 7, right: 2, left: 2, bottom: 5 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const maxVisitors = Math.max(...authPanelSparkline.map((p) => p.visitors));
  const maxRevenue = Math.max(...authPanelSparkline.map((p) => p.revenueMinor));
  const step = innerWidth / Math.max(authPanelSparkline.length - 1, 1);

  const revenuePoints = authPanelSparkline
    .map((point, index) => {
      const x = padding.left + index * step;
      const y =
        padding.top +
        innerHeight -
        (point.revenueMinor / maxRevenue) * innerHeight;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-12 min-h-12 w-full"
      aria-hidden="true"
    >
      {authPanelSparkline.map((point, index) => {
        const x = padding.left + index * step;
        const barHeight = (point.visitors / maxVisitors) * innerHeight;
        const y = padding.top + innerHeight - barHeight;
        return (
          <rect
            key={index}
            x={x - 2}
            y={y}
            width={4}
            height={barHeight}
            rx={2}
            className="fill-foreground"
          />
        );
      })}
      <polyline
        points={revenuePoints}
        fill="none"
        className="stroke-brand"
        strokeWidth={1.4}
        strokeOpacity={0.75}
      />
    </svg>
  );
}

export function AuthPanelSiteCardWidget() {
  return (
    <div className="pointer-events-none w-full max-w-xs rounded-xl border border-border/70 bg-card p-4 shadow-lg sm:p-5">
      <div className="flex min-w-0 items-start gap-3">
        <span className="bg-foreground text-background grid size-8 shrink-0 place-items-center rounded-md text-sm font-semibold">
          S
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-foreground truncate text-sm leading-tight font-semibold">
            Studio
          </div>
          <div className="text-muted-foreground truncate text-xs leading-snug">
            studio.example
          </div>
        </div>
      </div>
      <div className="mt-4">
        <AuthPanelSparkline />
      </div>
      <div className="mt-4 space-y-2">
        <AuthPanelMetricRow
          label="Visitors"
          value="1.2k"
          chipClassName="bg-foreground"
        />
        <AuthPanelMetricRow
          label="Revenue"
          value="$4.2k"
          chipClassName="bg-brand"
        />
      </div>
    </div>
  );
}

export default AuthPanelSiteCardWidget;
