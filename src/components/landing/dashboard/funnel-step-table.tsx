import {
  DashboardTable,
  DashboardTableBody,
  DashboardTableCell,
  DashboardTableHead,
  DashboardTableHeader,
  DashboardTableRow,
} from "./dashboard-table";

export type FunnelStepTableRow = {
  label: string;
  visitors: number;
  conversionRate: number;
  dropoffRate?: number;
};

function formatPercent(value: number): string {
  return `${Math.round(value * 1000) / 10}%`;
}

export function FunnelStepTable(props: { steps: readonly FunnelStepTableRow[] }) {
  return (
    <DashboardTable>
      <DashboardTableHeader>
        <DashboardTableRow>
          <DashboardTableHead>Step</DashboardTableHead>
          <DashboardTableHead className="text-right">Visitors</DashboardTableHead>
          <DashboardTableHead className="text-right">Conv.</DashboardTableHead>
          <DashboardTableHead className="text-right">Drop-off</DashboardTableHead>
        </DashboardTableRow>
      </DashboardTableHeader>
      <DashboardTableBody>
        {props.steps.map((step, index) => (
          <DashboardTableRow key={`${index}-${step.label}`}>
            <DashboardTableCell
              className="max-w-[min(100%,20rem)] truncate font-medium"
              title={step.label}
            >
              {index + 1}. {step.label}
            </DashboardTableCell>
            <DashboardTableCell className="text-right tabular-nums">
              {step.visitors.toLocaleString()}
            </DashboardTableCell>
            <DashboardTableCell className="text-muted-foreground text-right tabular-nums">
              {formatPercent(step.conversionRate)}
            </DashboardTableCell>
            <DashboardTableCell className="text-muted-foreground text-right tabular-nums">
              {index === 0
                ? "-"
                : formatPercent(step.dropoffRate ?? 0)}
            </DashboardTableCell>
          </DashboardTableRow>
        ))}
      </DashboardTableBody>
    </DashboardTable>
  );
}
