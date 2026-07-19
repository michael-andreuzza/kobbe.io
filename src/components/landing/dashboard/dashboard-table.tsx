import type { ReactNode } from "react";

import { CardContent } from "@/components/ui/card";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import {
  dashboardCardContentTableClass,
  dashboardTableBodyClass,
  dashboardTableCellClass,
  dashboardTableClass,
  dashboardTableHeadClass,
} from "./dashboard-card-layout";

export function DashboardCardTable(props: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <CardContent className={cn(dashboardCardContentTableClass, props.className)}>
      {props.children}
    </CardContent>
  );
}

export function DashboardTable(props: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Table className={cn(dashboardTableClass, props.className)}>
      {props.children}
    </Table>
  );
}

export function DashboardTableHeader(props: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <TableHeader className={cn("[&_tr]:border-border", props.className)}>
      {props.children}
    </TableHeader>
  );
}

export function DashboardTableBody(props: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(dashboardTableBodyClass, props.className)}
    >
      {props.children}
    </tbody>
  );
}

export function DashboardTableRow(props: {
  children: ReactNode;
  className?: string;
}) {
  return <TableRow className={props.className}>{props.children}</TableRow>;
}

export function DashboardTableHead(props: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <TableHead className={cn(dashboardTableHeadClass, props.className)}>
      {props.children}
    </TableHead>
  );
}

export function DashboardTableCell(props: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <TableCell className={cn(dashboardTableCellClass, props.className)}>
      {props.children}
    </TableCell>
  );
}
